import React, { useState } from "react";

export default function HtmlEditor() {
  const [code, setCode] = useState("<h1>Hello</h1>");

  return (
    <div style={{ width: "100%", marginTop: "2rem" }}>
      
      {/* EDITOR */}
      <div style={{ width: "100%", marginBottom: "1.5rem" }}>
        <h3>Editor</h3>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            width: "100%",
            height: "300px",
            fontFamily: "monospace",
            fontSize: "14px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "vertical",
          }}
        />
      </div>

      {/* PREVIEW */}
      <div
        style={{
          width: "100%",
          border: "1px solid #ddd",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        <h3>Preview</h3>
        <div dangerouslySetInnerHTML={{ __html: code }} />
      </div>
    </div>
  );
}
