import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSubjects } from '../db/indexedDB.js';

export default function SubjectsPage() {
  const navigate = useNavigate();

  // ── ALL hooks must be called before any early return ────────────────────
  const [subjects,      setSubjects]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);
  const [installPrompt, setInstallPrompt] = useState(null);

  // Load subjects
  useEffect(() => {
    getAllSubjects()
      .then((data) => { setSubjects(data); setLoading(false); })
      .catch((err)  => { setError(err.message); setLoading(false); });
  }, []);

  // Capture PWA install prompt
  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setInstallPrompt(e); };
    const onInstalled = () => setInstallPrompt(null);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  function handleSelect(subject)  { navigate(`/subject/${subject.id}`); }
  function handleInstall() {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then(() => setInstallPrompt(null));
  }

  // ── Early returns (after all hooks) ────────────────────────────────────
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
