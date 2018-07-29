import React from 'react';

const Button = ({ children, kind }) => {
  return (
    <button
      style={{
        backgroundColor: kind === 'secondary' ? 'rgb(0, 221, 221)' : 'cyan',
      }}
    >
      {children}
    </button>
  );
};

export default Button;
