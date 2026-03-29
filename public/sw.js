/**
 * Vectus Service Worker — v7
 *
 * Uses self.registration.scope so all URLs are relative to the SW's own
 * scope — works correctly both on localhost and on GitHub Pages sub-paths
 * like https://progdhan.github.io/Vectus-2.0/
 */

const CACHE_NAME = 'vectus-v8';

function openCache() {
  return caches.open(CACHE_NAME);
}

/** Resolve a path relative to the SW scope. */
function scopeURL(path) {
  // self.registration.scope always ends with '/'
  return self.registration.scope + path.replace(/^\//, '');
}

async function precacheAll() {
  const cache = await openCache();
  const base  = self.registration.scope; // e.g. 'https://progdhan.github.io/Vectus-2.0/'

  // 1. Pre-cache shell pages using scope-relative URLs
  const shell = [base, base + 'index.html', base + 'manifest.json'];
  await Promise.allSettled(
    shell.map((url) =>
      fetch(url)
        .then((r) => { if (r.ok) return cache.put(url, r); })
        .catch(() => {})
    )
  );

  // 2. Parse index.html to discover hashed JS/CSS paths
  try {
    const resp = await fetch(base + 'index.html');
    const html = await resp.text();

    // Match any href/src containing /assets/ (handles base-prefixed paths too)
    const assetPaths = [
      ...html.matchAll(/href="([^"]*\/assets\/[^"?#]+)"/g),
      ...html.matchAll(/src="([^"]*\/assets\/[^"?#]+)"/g),
    ].map((m) => m[1]);

    // Resolve against origin so both absolute (/Vectus-2.0/assets/…) and
    // relative (assets/…) paths work correctly
    const origin    = new URL(base).origin;
    const assetURLs = assetPaths.map((p) =>
      p.startsWith('http') ? p : origin + p
    );

    await Promise.allSettled(
      assetURLs.map((url) =>
        fetch(url)
          .then((r) => { if (r.ok) return cache.put(url, r); })
          .catch(() => {})
      )
    );

    console.log('[SW v7] Pre-cached assets:', assetURLs);
  } catch (err) {
    console.warn('[SW v7] Pre-cache error:', err.message);
  }
}

/* ── Install ─────────────────────────────────────────────────────────────── */
self.addEventListener('install', (event) => {
  event.waitUntil(precacheAll().then(() => self.skipWaiting()));
});

/* ── Activate ────────────────────────────────────────────────────────────── */
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

  // Never intercept the SW script itself
  if (url.pathname.endsWith('/sw.js')) return;

  // Navigation → network-first so new deployments always load when online,
  // falls back to cached index.html for offline use
  if (event.request.mode === 'navigate') {
    const indexURL = self.registration.scope + 'index.html';
    event.respondWith(
      fetch(event.request)
        .then((resp) => {
          if (resp.ok) {
            // Update cached index.html with the latest version
            const clone = resp.clone();
            openCache().then((c) => c.put(indexURL, clone));
          }
          return resp;
        })
        .catch(() => caches.match(indexURL)) // offline fallback
    );
    return;
  }

  // Hashed assets → cache-first (immutable)
  if (url.pathname.includes('/assets/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((resp) => {
          if (resp.ok) {
            const clone = resp.clone();
            openCache().then((c) => c.put(event.request, clone));
          }
          return resp;
        });
      })
    );
    return;
  }

  // Everything else → network-first, cache fallback
  event.respondWith(
    fetch(event.request)
      .then((resp) => {
        if (resp.ok) {
          const clone = resp.clone();
          openCache().then((c) => c.put(event.request, clone));
        }
        return resp;
      })
      .catch(() => caches.match(event.request))
  );
});
