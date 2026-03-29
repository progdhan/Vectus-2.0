import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="progress-wrapper" aria-label={`Question ${current} of ${total}`}>
      <div className="progress-bar" style={{ width: `${pct}%` }} />
      <span className="progress-label">{current} / {total}</span>
    </div>
  );
}
