import React from 'react';
import OriginalCodeBlock from '@theme-original/CodeBlock';

export default function CodeBlock(props) {
  const { id } = props;

  return (
    <div id={id}>
      <OriginalCodeBlock {...props} />
    </div>
  );
}