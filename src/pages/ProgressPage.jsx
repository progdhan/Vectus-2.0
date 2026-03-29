import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSubjects, getTopicsBySubjectId } from '../db/indexedDB.js';
import { getQuizHistory, getTopicLevel, LEVEL_META } from '../store/localStorage.js';

/* Reusable star row — gold filled stars up to `score`, grey after */
function StarRow({ score, max = 3 }) {
  return (
    <div className="topic-prog-stars" aria-label={`Best: ${score}/${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < score ? 'star-gold' : 'star-grey'}>★</span>
      ))}
    </div>
  );
}

export default function ProgressPage() {
  const navigate = useNavigate();
  const [subjects, setSubjects]   = useState([]);
  const [topicMap, setTopicMap]   = useState({});  // { subjectId: Topic[] }
  const [loading, setLoading]     = useState(true);

  // Read history synchronously (localStorage) — no async needed
  const history = getQuizHistory();

  useEffect(() => {
    async function load() {
      try {
        const subs = await getAllSubjects();
        const pairs = await Promise.all(subs.map((s) => getTopicsBySubjectId(s.id)));
        const map = {};
        subs.forEach((s, i) => { map[s.id] = pairs[i]; });
        setSubjects(subs);
        setTopicMap(map);
      } catch (err) {
        console.error('[ProgressPage]', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* ── Aggregate stats ──────────────────────────────────────────────────── */
  const allTopics          = subjects.flatMap((s) => topicMap[s.id] ?? []);
  const attemptedTopics    = allTopics.filter((t) => !!history[t.id]);
  const totalQuizzes       = Object.values(history).reduce((n, h) => n + (h?.attempts ?? 0), 0);
  const avgBestPct         =
    attemptedTopics.length > 0
      ? Math.round(
          attemptedTopics.reduce((n, t) => n + (history[t.id]?.bestScore ?? 0), 0) /
            (attemptedTopics.length * 3) *
            100,
        )
      : null;

  /* ── Derived score colour ─────────────────────────────────────────────── */
  function scoreColor(pct) {
    if (pct === null) return 'var(--text-muted)';
    if (pct >= 80) return '#4ade80';
    if (pct >= 50) return '#facc15';
    return '#f87171';
  }

  if (loading) {
    return (
      <div className="page center-page">
        <div className="spinner" />
        <p className="loading-text">Loading progress…</p>
      </div>
    );
  }

  return (
    <div className="page progress-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/')} aria-label="Back to home">
          ← Back
        </button>
        <span className="app-name">My Progress</span>
      </header>

      <main className="progress-main">

        {/* ── Overall summary ──────────────────────────────────────────── */}
        <div className="progress-overall">
          <div className="stat-box">
            <span className="stat-value" style={{ color: 'var(--accent)' }}>{totalQuizzes}</span>
            <span className="stat-label">Quizzes{'\n'}Taken</span>
          </div>
          <div className="stat-box">
            <span className="stat-value" style={{ color: '#a78bfa' }}>{attemptedTopics.length}</span>
            <span className="stat-label">Topics{'\n'}Tried</span>
          </div>
          <div className="stat-box">
            <span className="stat-value" style={{ color: scoreColor(avgBestPct) }}>
              {avgBestPct !== null ? `${avgBestPct}%` : '—'}
            </span>
            <span className="stat-label">Avg Best{'\n'}Score</span>
          </div>
        </div>

        {/* ── Empty state nudge ────────────────────────────────────────── */}
        {totalQuizzes === 0 && (
          <div className="progress-empty-banner">
            📚 Take your first quiz to start tracking progress!
          </div>
        )}

        {/* ── Per-subject cards ─────────────────────────────────────────── */}
        {subjects.map((subject) => {
          const topics     = topicMap[subject.id] ?? [];
          const tried      = topics.filter((t) => !!history[t.id]);
          const fillPct    = topics.length > 0 ? Math.round((tried.length / topics.length) * 100) : 0;
          const subAvgPct  =
            tried.length > 0
              ? Math.round(
                  tried.reduce((n, t) => n + (history[t.id]?.bestScore ?? 0), 0) /
                    (tried.length * 3) *
                    100,
                )
              : null;

          return (
            <div
              className="subject-progress-card"
              key={subject.id}
              style={{ '--card-color': subject.color }}
            >
              {/* Card header */}
              <div className="subject-progress-header">
                <span className="subj-prog-icon">{subject.icon}</span>
                <div className="subj-prog-titles">
                  <span className="subj-prog-name">{subject.name}</span>
                  <span className="subj-prog-meta">
                    {tried.length}/{topics.length} topics tried
                    {subAvgPct !== null && (
                      <span style={{ color: scoreColor(subAvgPct) }}> · {subAvgPct}% avg</span>
                    )}
                  </span>
                </div>
                {/* Circular-ish percentage badge */}
                {subAvgPct !== null && (
                  <div className="subj-prog-pct" style={{ color: scoreColor(subAvgPct), borderColor: scoreColor(subAvgPct) }}>
                    {subAvgPct}%
                  </div>
                )}
              </div>

              {/* Subject completion bar */}
              <div className="subj-prog-bar-wrap">
                <div
                  className="subj-prog-bar-fill"
                  style={{ width: `${fillPct}%`, background: subject.color }}
                />
              </div>

              {/* Topic list */}
              <div className="prog-topics-list">
                {topics.map((topic) => {
                  const h        = history[topic.id] ?? null;
                  const level    = getTopicLevel(topic.id);
                  const meta     = LEVEL_META[level];
                  const attempted = !!h;

                  return (
                    <div
                      key={topic.id}
                      className={`prog-topic-row ${attempted ? 'prog-topic-attempted' : ''}`}
                    >
                      {/* Left: title + meta */}
                      <div className="prog-topic-info">
                        <span className="prog-topic-title">{topic.title}</span>
                        {attempted ? (
                          <span className="prog-topic-meta">
                            {h.attempts} quiz{h.attempts !== 1 ? 'zes' : ''} &middot; Last: {h.lastScore}/3
                          </span>
                        ) : (
                          <span className="prog-topic-unseen">Not started yet</span>
                        )}
                      </div>

                      {/* Right: stars + level badge or Start button */}
                      {attempted ? (
                        <div className="prog-topic-right">
                          <StarRow score={h.bestScore} />
                          <span className={`difficulty-badge ${meta.badge}`}>
                            {meta.emoji} {meta.label}
                          </span>
                        </div>
                      ) : (
                        <button
                          className="prog-start-btn"
                          onClick={() => navigate(`/topic/${topic.id}`)}
                        >
                          Start →
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Bottom breathing room */}
        <div style={{ height: 24 }} />
      </main>
    </div>
  );
}
