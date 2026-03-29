import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { deleteDB, seedDB } from './db/indexedDB.js';

// ── Register Service Worker (production only) ──────────────────────────────
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => console.log('[SW] Registered:', reg.scope))
      .catch((err) => console.error('[SW] Failed:', err));
  });
}


// ── 3. Boot: wipe stale DB → seed fresh → render ────────────────────────────
async function init() {
  try {
    await deleteDB();   // always start with a clean slate
    await seedDB();     // populate lessons + questions
  } catch (err) {
    console.error('[App] DB init failed:', err);
    // Non-fatal — app still renders; pages show their own error states
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

init();
