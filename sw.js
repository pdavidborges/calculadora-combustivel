const CACHE_NAME = "economiza-ae-v1";

const arquivos = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./capa.webp",
    "./icon.jpg"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(arquivos))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});