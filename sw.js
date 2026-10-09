// Keeps a copy of the app so it opens offline. Always tries the network first, so updates show up right away.
// Music lives in IndexedDB, not here.
const CACHE = 'clip-and-play-v6';
const SHELL = ['./', './index.html', './manifest.webmanifest', './cp-icon-180.png', './cp-icon-192.png', './cp-icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
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
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok){ const copy = r.clone(); caches.open(CACHE).then(c => c.put(nav ? './index.html' : e.request, copy)); }
    return r;
  }).catch(() => caches.match(nav ? './index.html' : e.request)));
});
