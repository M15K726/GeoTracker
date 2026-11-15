// Change the version number each time you update the app.
const VERSION = "geo-v2";
const FILES = ["/", "/index.html", "/manifest.json", "/icon-192.png", "/icon-512.png", "/globe.gl.min.js", "/countries.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", e => {
  if (e.data === "skip") self.skipWaiting();
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  // App files: cache first. Live data from other sites: always network.
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
