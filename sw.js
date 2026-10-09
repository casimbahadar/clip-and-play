// Keeps a copy of the app so it opens offline. Always checks GitHub for a newer version first,
// skipping the browser's short-term cache, so updates show up on the next open. Music lives in IndexedDB, not here.
const CACHE = 'clip-and-play-v15';
const SHELL = ['./', './index.html', './manifest.webmanifest', './cp-icon-180.png', './cp-icon-192.png', './cp-icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('clip-and-play-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const nav = e.request.mode === 'navigate';
  // 'no-cache' asks GitHub whether the file changed instead of reusing a possibly stale copy
  const req = nav ? new Request(e.request.url, { cache: 'no-cache', credentials: 'same-origin' }) : new Request(e.request, { cache: 'no-cache' });
  e.respondWith(fetch(req).then(r => {
    if (r.ok){ const copy = r.clone(); caches.open(CACHE).then(c => c.put(nav ? './index.html' : e.request, copy)); }
    return r;
  }).catch(() => caches.match(nav ? './index.html' : e.request)));
});
