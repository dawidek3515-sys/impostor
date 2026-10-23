// Service worker — gra działa offline.
// PRZY KAŻDEJ ZMIANIE PLIKÓW podbij WERSJA, inaczej telefony zostaną przy starej kopii.
const WERSJA = 'impostor-v3';

const PLIKI = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/style.css',
  'js/app.js',
  'js/stan.js',
  'js/magazyn.js',
  'js/dane.js',
  'js/runda.js',
  'js/ekrany.js',
  'js/dzwiek.js',
  'js/tryby/index.js',
  'js/tryby/klasyczny.js',
  'js/tryby/undercover.js',
  'js/tryby/pytania.js',
  'js/modyfikatory/index.js',
  'js/modyfikatory/dwoch.js',
  'js/modyfikatory/chaos.js',
  'ikony/apple-touch-icon.png',
  'ikony/ikona-192.png',
  'ikony/ikona-512.png',
  'ikony/ikona-512-maskable.png',
  'dane/hasla/index.json',
  'dane/undercover.json',
  'dane/pytania.json',
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(WERSJA);
    await cache.addAll(PLIKI.map(p => new Request(p, { cache: 'reload' })));
    // pliki kategorii bierzemy z listy w index.json, żeby nie wpisywać ich w dwóch miejscach
    const indeks = await (await fetch('dane/hasla/index.json', { cache: 'reload' })).json();
    await cache.addAll(indeks.kategorie.map(k => new Request(`dane/hasla/${k}.json`, { cache: 'reload' })));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const klucz of await caches.keys()) if (klucz !== WERSJA) await caches.delete(klucz);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;

  // hasła: od razu z pamięci, a w tle dociągamy świeższą wersję na następne uruchomienie
  if (url.pathname.includes('/dane/')) {
    e.respondWith((async () => {
      const cache = await caches.open(WERSJA);
      const zPamieci = await cache.match(e.request, { ignoreSearch: true });
      const zSieci = fetch(e.request).then(odp => {
        if (odp.ok) cache.put(e.request, odp.clone());
        return odp;
      }).catch(() => null);
      return zPamieci || (await zSieci) || Response.error();
    })());
    return;
  }

  e.respondWith((async () => {
    const zPamieci = await caches.match(e.request, { ignoreSearch: true });
    if (zPamieci) return zPamieci;
    try {
      return await fetch(e.request);
    } catch {
      if (e.request.mode === 'navigate') return caches.match('index.html');
      return Response.error();
    }
  })());
});
