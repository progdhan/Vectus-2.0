import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSubjects } from '../db/indexedDB.js';

export default function SubjectsPage() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllSubjects()
      .then((data) => { setSubjects(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  function handleSelect(subject) {
    navigate(`/subject/${subject.id}`);
  }

  if (loading) {
    return (
      <div className="page center-page">
        <div className="spinner" />
        <p className="loading-text">Loading subjects…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page center-page">
        <p className="loading-text" style={{ color: 'var(--wrong)', padding: '0 24px', textAlign: 'center' }}>{error}</p>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // ── PWA Install Prompt ──────────────────────────────────────────────────
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();          // stop the mini-infobar from appearing
      setInstallPrompt(e);         // save it to trigger later
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstallPrompt(null));
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  function handleInstall() {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then(() => setInstallPrompt(null));
  }

  return (
    <div className="page subjects-page">
      {/* Header */}
      <header className="page-header">
        <div className="logo-mark">V</div>
        <div className="header-text">
          <span className="app-name">Vectus</span>
          <span className="app-tagline">Adaptive Learning</span>
        </div>
        <div className="header-actions">
          {installPrompt && (
            <button
              className="progress-nav-btn install-btn"
              onClick={handleInstall}
              aria-label="Install app"
              title="Install Vectus App"
            >
              📲
            </button>
          )}
          <button
            className="progress-nav-btn"
            onClick={() => navigate('/progress')}
            aria-label="View my progress"
          >
            📊
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="subjects-main">
        <div className="subjects-intro">
          <h1 className="subjects-heading">Choose a Subject</h1>
          <p className="subjects-sub">Select a topic to start learning</p>
        </div>

        <div className="subjects-grid">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              id={`subject-${subject.id}`}
              className="subject-card"
              style={{ '--card-color': subject.color }}
              onClick={() => handleSelect(subject)}
            >
              <span className="subject-card-icon">{subject.icon}</span>
              <span className="subject-card-name">{subject.name}</span>
              <span className="subject-card-desc">{subject.description}</span>
              <span className="subject-card-arrow">→</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
