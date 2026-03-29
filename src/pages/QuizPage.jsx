import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestionsByTopicAndDifficulty } from '../db/indexedDB.js';
import { getTopicId, getTopicLevel, saveScore, LEVEL_META } from '../store/localStorage.js';
import ProgressBar from '../components/ProgressBar.jsx';
import OptionButton from '../components/OptionButton.jsx';

export default function QuizPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent]     = useState(0);
  const [score, setScore]         = useState(0);
  const [selected, setSelected]   = useState(null);
  const [answered, setAnswered]   = useState(false);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [level, setLevel]         = useState('easy');
  const scoreRef = useRef(0);

  useEffect(() => {
    async function load() {
      try {
        const topicId = getTopicId();
        if (!topicId) throw new Error('No topic selected. Please go back and choose a topic.');
        const currentLevel = getTopicLevel(topicId);
        setLevel(currentLevel);
        const qs = await getQuestionsByTopicAndDifficulty(topicId, currentLevel);
        if (!qs || qs.length === 0) throw new Error('No questions found for this topic.');
        setQuestions(qs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="page center-page">
        <div className="spinner" />
        <p className="loading-text">Loading quiz…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page center-page">
        <p className="loading-text" style={{ color: 'var(--wrong)', textAlign: 'center', padding: '0 24px' }}>
          {error}
        </p>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/')}>
          ← Back to Subjects
        </button>
      </div>
    );
  }

  const q     = questions[current];
  const total = questions.length;
  const meta  = LEVEL_META[level];

  function handleSelect(option) {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === q.answer) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }
  }

  function handleNext() {
    const nextIndex = current + 1;
    if (nextIndex >= total) {
      saveScore(scoreRef.current);
      navigate('/result');
    } else {
      setCurrent(nextIndex);
      setSelected(null);
      setAnswered(false);
    }
  }

  function getOptionState(option) {
    if (!answered) return 'default';
    if (option === q.answer) return 'correct';
    if (option === selected) return 'wrong';
    return 'default';
  }

  return (
    <div className="page quiz-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Back">
          ← Back
        </button>
        <span className="app-name">Quiz</span>
        {/* Show current adaptive difficulty level */}
        <span className={`difficulty-badge ${meta.badge}`}>
          {meta.emoji} {meta.label}
        </span>
      </header>

      <ProgressBar current={current + 1} total={total} />

      <main className="quiz-main">
        <div className="question-card">
          <span className="question-number">Question {current + 1}</span>
          <h2 className="question-text">{q.question}</h2>
        </div>

        <div className="options-grid">
          {q.options.map((option) => (
            <OptionButton
              key={option}
              label={option}
              state={getOptionState(option)}
              onClick={() => handleSelect(option)}
              disabled={answered}
            />
          ))}
        </div>

        {answered && (
          <div className={`feedback-banner ${selected === q.answer ? 'feedback-correct' : 'feedback-wrong'}`}>
            {selected === q.answer ? '✅ Correct!' : `❌ Correct answer: ${q.answer}`}
          </div>
        )}
      </main>

      <footer className="page-footer">
        {answered && (
          <button
            id="next-question-btn"
            className="btn btn-primary btn-full"
            onClick={handleNext}
          >
            {current + 1 >= total ? 'See Results →' : 'Next Question →'}
          </button>
        )}
      </footer>
    </div>
  );
}
