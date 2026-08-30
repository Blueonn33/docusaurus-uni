import React, { useEffect, useRef } from "react";
import CodeBlock from "@theme/CodeBlock";

function Preview({ code }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const shadowRoot =
      containerRef.current.shadowRoot ||
      containerRef.current.attachShadow({ mode: "open" });

    shadowRoot.innerHTML = code;
  }, [code]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        minHeight: "200px",
      }}
    />
  );
}

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
      <div
        style={{
          flex: "1 1 0",
          minWidth: 0,
        }}
      >
        <h3>Code</h3>

        <CodeBlock language="html">
          {code}
        </CodeBlock>
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

        <Preview code={code} />
      </div>
    </div>
  );
}

