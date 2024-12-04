const CACHE_NAME = 'app-reciclaje-v1';
const urlsToCache = [
    '/', // Página principal
    '/index.html',
    '/manifest.json',
    '/styles.css',
    '/centros_de_reciclaje.html',
    '/seguimiento.html',
    '/images/logo-default-196x47.png',
    '/css/bootstrap.min.css', // Archivo CSS de Bootstrap
    '/js/bootstrap.bundle.min.js', // Archivo JS de Bootstrap
    
    // Agrega más recursos que quieras cachear
];

// Instalar el Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activar el Service Worker y limpiar cachés antiguos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Eliminando cache antigua:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Interceptar las solicitudes y responder desde el cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Responder con cache o hacer fetch desde la red
                return response || fetch(event.request);
            })
    );
});
