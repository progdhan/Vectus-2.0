import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTopicsBySubjectId, getSubjectById } from '../db/indexedDB.js';
import { saveTopicId, getTopicLevel, hasTopicBeenAttempted, LEVEL_META } from '../store/localStorage.js';

export default function TopicsPage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject]  = useState(null);
  const [topics, setTopics]    = useState([]);
  const [loading, setLoading]  = useState(true);
  const [error, setError]      = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [sub, tops] = await Promise.all([
          getSubjectById(subjectId),
          getTopicsBySubjectId(subjectId),
        ]);
        setSubject(sub);
        setTopics(tops);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [subjectId]);

  function handleSelect(topic) {
    saveTopicId(topic.id);
    navigate(`/topic/${topic.id}`);
  }

  if (loading) {
    return (
      <div className="page center-page">
        <div className="spinner" />
        <p className="loading-text">Loading topics…</p>
      </div>
    );
  }

  if (error || !subject) {
    return (
      <div className="page center-page">
        <p className="loading-text" style={{ color: 'var(--wrong)', padding: '0 24px', textAlign: 'center' }}>
          {error ?? 'Subject not found.'}
        </p>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/')}>← Home</button>
      </div>
    );
  }

  const TOPIC_DIFF_META = {
    easy:   { label: 'Beginner',     badge: 'badge-easy'   },
    medium: { label: 'Intermediate', badge: 'badge-medium' },
    hard:   { label: 'Advanced',     badge: 'badge-hard'   },
  };

  return (
    <div className="page topics-page">
      <header className="page-header" style={{ '--card-color': subject.color }}>
        <button className="back-btn" onClick={() => navigate('/')} aria-label="Back to subjects">
          ← Back
        </button>
        <div className="header-subject">
          <span className="header-subject-icon">{subject.icon}</span>
          <span className="app-name">{subject.name}</span>
        </div>
      </header>

      <main className="topics-main">
        <p className="topics-intro">Choose a topic to study</p>

        <div className="topics-list">
          {topics.map((topic, i) => {
            const topicMeta    = TOPIC_DIFF_META[topic.difficulty] ?? TOPIC_DIFF_META.easy;
            const attempted    = hasTopicBeenAttempted(topic.id);
            const currentLevel = getTopicLevel(topic.id);
            const levelMeta    = LEVEL_META[currentLevel];

            return (
              <button
                key={topic.id}
                id={`topic-${topic.id}`}
                className="topic-item"
                onClick={() => handleSelect(topic)}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="topic-item-num">{i + 1}</span>
                <div className="topic-item-info">
                  <span className="topic-item-title">{topic.title}</span>
                  <div className="topic-item-badges">
                    {/* Topic content level */}
                    <span className={`difficulty-badge ${topicMeta.badge}`}>
                      {topicMeta.label}
                    </span>
                    {/* Per-user adaptive quiz level (only if attempted) */}
                    {attempted && (
                      <span className="adaptive-badge" style={{ color: levelMeta.color }}>
                        Quiz: {levelMeta.emoji} {levelMeta.label}
                      </span>
                    )}
                  </div>
                </div>
                <span className="topic-item-arrow">›</span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
