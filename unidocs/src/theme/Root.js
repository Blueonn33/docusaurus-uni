import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Root({ children }) {
  return (
    <>
      {children}

      <BrowserOnly>
        {() => {
          const GroqChat = require('../components/GroqChat').default;
          return <GroqChat />;
        }}
      </BrowserOnly>
    </>
  );
}
