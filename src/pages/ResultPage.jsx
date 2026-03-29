import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getScore, getTopicId, advanceTopicLevel, saveQuizResult, LEVEL_META } from '../store/localStorage.js';

const SCORE_FX = [
  { max: 0, emoji: '😔', text: "Don't give up! Try this quiz again." },
  { max: 1, emoji: '😊', text: 'Good effort! One more try will help.' },
  { max: 2, emoji: '😄', text: "Nice work! You're improving."         },
  { max: 3, emoji: '🏆', text: 'Perfect score! Excellent work!'       },
];

export default function ResultPage() {
  const navigate  = useNavigate();
  const score     = getScore();
  const topicId   = getTopicId();
  const savedRef  = useRef(false);

  // Advance the topic's difficulty exactly once on mount
  const nextLevel = useRef(null);
  if (!savedRef.current && topicId) {
    nextLevel.current = advanceTopicLevel(topicId, score);
    saveQuizResult(topicId, score);   // persist to progress history
    savedRef.current  = true;
  }

  const nl   = nextLevel.current ?? 'easy';
  const meta = LEVEL_META[nl];
  const { emoji, text } = SCORE_FX.find((f) => score <= f.max) ?? SCORE_FX[0];
  const stars = Array.from({ length: 3 }, (_, i) => (i < score ? '★' : '☆'));

  // Message describing what will change next time
  const adaptMsg =
    score <= 1
      ? "Questions stay at the same level — keep practising!"
      : score === 2
      ? "Good job! Next quiz will step up to Medium questions."
      : "Brilliant! Next quiz unlocks Hard questions.";

  return (
    <div className="page result-page">
      <div className="result-glow" style={{ '--glow-color': meta.color }} />

      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/')} aria-label="Back to subjects">
          ← Subjects
        </button>
        <span className="app-name">Results</span>
      </header>

      <main className="result-main">
        {/* Score card */}
        <div className="result-card">
          <div className="result-emoji">{emoji}</div>
          <div className="stars-row" aria-label={`${score} out of 3 stars`}>
            {stars.map((s, i) => (
              <span key={i} className={`star ${s === '★' ? 'star-filled' : 'star-empty'}`}>{s}</span>
            ))}
          </div>
          <h1 className="result-score">
            {score} <span className="result-score-total">/ 3</span>
          </h1>
          <p className="result-message">{text}</p>
        </div>

        {/* Adaptive difficulty card */}
        <div className="next-level-card">
          <p className="next-level-label">🎯 Next Quiz Difficulty</p>
          <p className="next-level-value" style={{ color: meta.color }}>
            {meta.emoji} {meta.label}
          </p>
          <p className="next-level-desc">{adaptMsg}</p>
        </div>

        {/* Actions */}
        <div className="result-actions">
          <button
            id="retry-quiz-btn"
            className="btn btn-primary btn-full"
            onClick={() => navigate(-1)}
          >
            Retry This Topic
          </button>
          <button
            id="see-progress-btn"
            className="btn btn-accent btn-full"
            onClick={() => navigate('/progress')}
          >
            📊 See My Progress
          </button>
          <button
            id="back-subjects-btn"
            className="btn btn-secondary btn-full"
            onClick={() => navigate('/')}
          >
            Browse Subjects →
          </button>
        </div>
      </main>
    </div>
  );
}
