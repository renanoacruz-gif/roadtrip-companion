const CACHE='rtc-shell-3.5-9bfbf5890ae4';
const FILES=["./","./assets/CockpitMap-qPHiz71y.js","./assets/HeroScene-BGVPmTaA.js","./assets/JourneyAtlas-CCdzs98A.js","./assets/MapCanvas-BEWhNdCi.js","./assets/PlannerMap-B02CKcNU.js","./assets/index-C7fcMopj.js","./assets/index-J07lMQhP.css","./assets/maplibre-gl-Bjz4VXhZ.js","./assets/maplibre-gl-C_xo-iQb.js","./assets/maplibre-gl-qvkd0SPb.css","./assets/maplibre-gl-worker-DTh23QKw.js","./assets/motionFeatures-Bs4SES7Q.js","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./index.html","./manifest.webmanifest"];
const urls=new Set(FILES.map(p=>new URL(p,self.registration.scope).href));
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE')self.skipWaiting()});
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('rtc-shell-')&&key!==CACHE)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
if(req.mode==='navigate'){event.respondWith(fetch(req).catch(async()=>{const cache=await caches.open(CACHE);return await cache.match('./index.html')||Response.error()}));return;}
if(urls.has(req.url))event.respondWith(caches.open(CACHE).then(async cache=>await cache.match(req)||fetch(req)));
});
