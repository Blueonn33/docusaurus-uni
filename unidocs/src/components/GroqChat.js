import React, { useState } from 'react';

export default function GroqChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.REACT_APP_GROQ_KEY
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [...messages, userMessage]
        })
      });

      const data = await response.json();

      if (data.error) {
        setMessages(prev => [...prev, { role: "assistant", content: data.error.message }]);
        return;
      }

      if (!data.choices || !data.choices[0]) {
        setMessages(prev => [...prev, { role: "assistant", content: "Невалиден отговор от Groq." }]);
        return;
      }

      const botMessage = {
        role: "assistant",
        content: data.choices[0].message.content
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Грешка при връзката с Groq." }]);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#6d28d9",
          color: "white",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "20px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
        }}
      >
        <img src="/img/generative.png"/>
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            width: "350px",
            height: "450px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999
          }}
        >
          <div
            style={{
              background: "#6d28d9",
              color: "white",
              padding: "12px",
              fontWeight: "bold"
            }}
          >
            AI Асистент
          </div>

          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto"
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "10px",
                  textAlign: msg.role === "user" ? "right" : "left"
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    background: msg.role === "user" ? "#ede9fe" : "#f3f4f6",
                    color: "#1f2937"
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: "10px", borderTop: "1px solid #ddd" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Напиши съобщение..."
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc"
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
