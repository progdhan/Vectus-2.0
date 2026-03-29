import React from 'react';

export default function OptionButton({ label, state, onClick, disabled }) {
  // state: 'default' | 'correct' | 'wrong'
  return (
    <button
      className={`option-btn option-${state}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
