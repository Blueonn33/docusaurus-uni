import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function GroqChat({ groqKey }) {
  const API_KEY = "Bearer " + window.API_KEY;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": API_KEY
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            messages: [...messages, userMessage]
          })
        }
      );

      const data = await response.json();

      if (data.error) {
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: `**Грешка:** ${data.error.message}`
          }
        ]);

        return;
      }

      if (!data.choices || !data.choices[0]) {
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "**Невалиден отговор от Groq.**"
          }
        ]);

        return;
      }

      const botMessage = {
        role: "assistant",
        content: data.choices[0].message.content
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "**Грешка при връзката с Groq.**"
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Бутон за отваряне */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Отвори AI асистента"
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          background: "#6d28d9",
          color: "white",
          borderRadius: "50%",
          width: "70px",
          height: "70px",
          fontSize: "20px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
          zIndex: 9999
        }}
      >
        <img
          src="/img/generative.png"
          alt="AI Assistant"
          style={{
            width: "38px",
            height: "38px",
            objectFit: "contain"
          }}
        />
      </button>

      {/* Chat */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "115px",
            right: "25px",

            width: "600px",
            height: "700px",

            maxWidth: "calc(100vw - 40px)",
            maxHeight: "calc(100vh - 140px)",

            background: "white",
            borderRadius: "16px",
            boxShadow: "0 8px 35px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
            border: "1px solid var(--ifm-color-emphasis-300)"
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#6d28d9",
              color: "white",
              padding: "18px 20px",
              fontWeight: "bold",
              fontSize: "18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>✨ Порцелан AI</span>

            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer"
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto"
            }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "50px",
                  color: "var(--ifm-color-emphasis-600)"
                }}
              >
                <h3>Здравей! Аз съм Порцелан 🐼</h3>
                <p>Как мога да ти помогна?</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "18px",
                  display: "flex",
                  justifyContent:
                    msg.role === "user"
                      ? "flex-end"
                      : "flex-start"
                }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "12px 16px",
                    borderRadius:
                      msg.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",

                    background:
                      msg.role === "user"
                        ? "#ede9fe"
                        : "var(--ifm-color-emphasis-100)",

                    color: "var(--ifm-font-color-base)",
                    lineHeight: "1.6",
                    wordBreak: "break-word"
                  }}
                >
                  {msg.role === "assistant" ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "15px"
                }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "16px",
                    background: "var(--ifm-color-emphasis-100)"
                  }}
                >
                  Порцелан мисли 😶‍🌫️...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              padding: "15px",
              borderTop:
                "1px solid var(--ifm-color-emphasis-300)",
              display: "flex",
              gap: "10px"
            }}
          >
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Напиши съобщение..."
              disabled={loading}
              rows={2}
              style={{
                flex: 1,
                resize: "none",
                padding: "12px",
                borderRadius: "10px",
                border:
                  "1px solid var(--ifm-color-emphasis-400)",
                fontFamily: "inherit",
                fontSize: "15px",
                outline: "none",
                background:
                  "var(--ifm-background-surface-color)",
                color: "var(--ifm-font-color-base)"
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                background:
                  loading || !input.trim()
                    ? "#a78bfa"
                    : "#6d28d9",

                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "0 20px",
                cursor:
                  loading || !input.trim()
                    ? "not-allowed"
                    : "pointer",

                fontWeight: "bold"
              }}
            >
              Изпрати
            </button>
          </div>
        </div>
      )}
    </>
  );
}