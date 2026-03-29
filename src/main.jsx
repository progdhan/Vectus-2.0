import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { deleteDB, seedDB } from './db/indexedDB.js';

// ── Capture install prompt ASAP before React mounts ────────────────────────
// beforeinstallprompt fires early in page load — before useEffect runs.
// We store it globally and re-dispatch a custom event so React can pick it up.
window.__installPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.__installPrompt = e;
  window.dispatchEvent(new CustomEvent('installpromptready'));
});
window.addEventListener('appinstalled', () => {
  window.__installPrompt = null;
  window.dispatchEvent(new CustomEvent('appinstalled'));
});


// ── Register Service Worker (production only) ──────────────────────────────
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(import.meta.env.BASE_URL + 'sw.js')
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
