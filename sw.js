const CACHE='rtc-shell-3.5-bb6d7f180b9a';
const FILES=["./","./assets/JourneyAtlas-C8-hrIqD.js","./assets/MapCanvas-CS9ixgza.js","./assets/MapCanvas-qvkd0SPb.css","./assets/index-BxfEQdW8.css","./assets/index-Cq2sAhgN.js","./assets/maplibre-gl-Bjz4VXhZ.js","./assets/maplibre-gl-worker-DTh23QKw.js","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./index.html","./manifest.webmanifest"];
const urls=new Set(FILES.map(p=>new URL(p,self.registration.scope).href));
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE')self.skipWaiting()});
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('rtc-shell-')&&key!==CACHE)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
if(req.mode==='navigate'){event.respondWith(fetch(req).catch(async()=>{const cache=await caches.open(CACHE);return await cache.match('./index.html')||Response.error()}));return;}
if(urls.has(req.url))event.respondWith(caches.open(CACHE).then(async cache=>await cache.match(req)||fetch(req)));
});
