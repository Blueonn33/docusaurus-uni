import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default function HtmlPlayground({ code }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        marginTop: "2rem",
        width: "100%",
      }}
    >
      {/* CODE */}
      <div style={{ flex: "1 1 0", minWidth: 0 }}>
        <h3>Code</h3>
        <CodeBlock language="html">{code}</CodeBlock>
      </div>

      {/* PREVIEW */}
      <div
        style={{
          flex: "1 1 0",
          minWidth: 0,
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
