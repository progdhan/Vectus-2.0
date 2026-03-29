import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLessonByTopicId, getTopicById, getSubjectById } from '../db/indexedDB.js';
import { saveTopicId } from '../store/localStorage.js';

const DIFFICULTY_BADGE = {
  easy:   'badge-easy',
  medium: 'badge-medium',
  hard:   'badge-hard',
};

export default function LessonDetailPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson]   = useState(null);
  const [topic, setTopic]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [lsn, tpc] = await Promise.all([
          getLessonByTopicId(topicId),
          getTopicById(topicId),
        ]);
        if (!lsn || !tpc) throw new Error('Lesson not found.');
        setLesson(lsn);
        setTopic(tpc);
        // Persist so QuizPage knows which topic to load
        saveTopicId(topicId);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [topicId]);

  if (loading) {
    return (
      <div className="page center-page">
        <div className="spinner" />
        <p className="loading-text">Loading lesson…</p>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="page center-page">
        <p className="loading-text" style={{ color: 'var(--wrong)', padding: '0 24px', textAlign: 'center' }}>
          {error ?? 'Lesson not found.'}
        </p>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate(-1)}>← Back</button>
      </div>
    );
  }

  const badgeClass = DIFFICULTY_BADGE[topic?.difficulty ?? 'easy'];

  return (
    <div className="page lesson-page">
      {/* Header */}
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Back">
          ← Topics
        </button>
        <span className="app-name">Lesson</span>
        <span className={`difficulty-badge ${badgeClass}`}>
          {topic?.difficulty?.toUpperCase()}
        </span>
      </header>

      {/* Lesson card */}
      <main className="lesson-main">
        <div className="lesson-card">
          <h1 className="lesson-title">{lesson.title}</h1>
          <div className="lesson-divider" />
          <div className="lesson-body">
            {lesson.body?.split('\n').map((line, i) =>
              line.trim() === '' ? <br key={i} /> : <p key={i}>{line}</p>
            )}
          </div>
        </div>
      </main>

      {/* CTA */}
      <footer className="page-footer">
        <button
          id="start-quiz-btn"
          className="btn btn-primary btn-full"
          onClick={() => navigate('/quiz')}
        >
          Take Quiz →
        </button>
      </footer>
    </div>
  );
}
