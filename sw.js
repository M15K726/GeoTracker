// AVW Global Intelligence service worker.
// Bump this value whenever the application shell changes.
const VERSION = "avw-global-v3";
const CORE_FILES = ["/", "/index.html", "/manifest.json", "/icon-192.png", "/icon-512.png"];
const OPTIONAL_FILES = ["/globe.gl.min.js", "/countries.json"];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    // A missing optional asset must not make the whole PWA impossible to install.
    await Promise.allSettled(CORE_FILES.map(path => cache.add(path)));
    await Promise.allSettled(OPTIONAL_FILES.map(path => cache.add(path)));
    // New versions wait for the user to accept the in-app update prompt.
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== VERSION).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Always try the network first for page navigations so deployed updates appear.
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        const cache = await caches.open(VERSION);
        cache.put("/index.html", response.clone());
        return response;
      } catch (error) {
        return (await caches.match("/index.html")) || Response.error();
      }
    })());
    return;
  }

  // App assets use cache-first with a network fallback.
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok) {
        const cache = await caches.open(VERSION);
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      return cached || Response.error();
    }
  })());
});
