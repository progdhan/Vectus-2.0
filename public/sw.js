/**
 * Vectus Service Worker — v6
 *
 * Clean, simple, and robust:
 * - Install: pre-cache shell + auto-discover hashed assets from index.html
 * - Activate: delete old caches
 * - Fetch:
 *   - /sw.js → NOT intercepted (let browser handle SW update checks natively)
 *   - navigate → cache-first (SPA: always serve index.html from cache)
 *   - /assets/* → cache-first, populate on miss (immutable hashed files)
 *   - everything else → network-first with cache fallback
 */

const CACHE_NAME = 'vectus-v6';

/* ── Pre-cache on install ─────────────────────────────────────────────────── */
async function precacheAll() {
  const cache = await caches.open(CACHE_NAME);

  // 1. Shell — always needed
  await Promise.allSettled(
    ['/', '/index.html', '/manifest.json'].map((url) =>
      fetch(url).then((r) => { if (r.ok) return cache.put(url, r); }).catch(() => {})
    )
  );

  // 2. Discover hashed JS/CSS in index.html and pre-cache them
  try {
    const resp = await fetch('/');
    const html = await resp.text();

    const assetUrls = [
      ...html.matchAll(/href="(\/assets\/[^"?#]+)"/g),
      ...html.matchAll(/src="(\/assets\/[^"?#]+)"/g),
    ].map((m) => m[1]);

    await Promise.allSettled(
      assetUrls.map((url) =>
        fetch(url).then((r) => { if (r.ok) return cache.put(url, r); }).catch(() => {})
      )
    );

    console.log('[SW v6] Pre-cached assets:', assetUrls);
  } catch (err) {
    console.warn('[SW v6] Pre-cache error:', err.message);
  }
}

/* ── Lifecycle ───────────────────────────────────────────────────────────── */
self.addEventListener('install', (event) => {
  event.waitUntil(precacheAll().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

/* ── Fetch ───────────────────────────────────────────────────────────────── */
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;

  // ✅ CRITICAL: Never intercept sw.js itself — let the browser handle it
  // so its update check always gets the real network file
  if (url.pathname === '/sw.js') return;

  // SPA navigation → always serve cached index.html (React Router handles routing)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches
        .match('/index.html')
        .then((cached) => cached || fetch(event.request))
    );
    return;
  }

  // Hashed assets → cache-first (they are immutable, safe to cache forever)
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((resp) => {
          if (resp.ok) {
            const clone = resp.clone();
            caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
          }
          return resp;
        });
      })
    );
    return;
  }

  // Everything else (icons, manifest…) → network-first, cache fallback
  event.respondWith(
    fetch(event.request)
      .then((resp) => {
        if (resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
        }
        return resp;
      })
      .catch(() => caches.match(event.request))
  );
});
