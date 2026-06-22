import React from 'react';
import GroqChat from '../components/GroqChat';

export default function Root({ children }) {
  return (
    <>
      {children}
      <GroqChat />
    </>
  );
}
