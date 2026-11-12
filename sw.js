const CACHE='rtc-shell-3.5-c25f064d61d8';
const FILES=["./","./assets/Cockpit-C_QgLIlf.js","./assets/CockpitMap-BTgC1JAC.js","./assets/HeroScene-CuJRcTVq.js","./assets/JourneyAtlas-Bq3rdrte.js","./assets/MapCanvas-78ZKrRBB.js","./assets/Memorial-DmKtPfPg.css","./assets/Memorial-Nr-yrKWQ.js","./assets/Memories-D0jlIF_i.js","./assets/PlanStory-BdtjTMry.js","./assets/Planner-C4ojBcvr.js","./assets/PlannerMap-BYAzyEqH.js","./assets/Story-Bd2WQAEJ.js","./assets/index-B8j3UI68.js","./assets/index-CmS4k_e5.css","./assets/jsx-runtime-Wy9s6hX0.js","./assets/maplibre-gl-Bjz4VXhZ.js","./assets/maplibre-gl-C_xo-iQb.js","./assets/maplibre-gl-qvkd0SPb.css","./assets/maplibre-gl-worker-DTh23QKw.js","./assets/mission-D9CrYIIt.js","./assets/motionFeatures-BvJV3oai.js","./assets/planner-BiKU84Qa.js","./assets/preload-helper-BF6VsCtD.js","./assets/registry-CQN8PKUN.js","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./index.html","./manifest.webmanifest"];
const urls=new Set(FILES.map(p=>new URL(p,self.registration.scope).href));
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE')self.skipWaiting()});
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('rtc-shell-')&&key!==CACHE)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
if(req.mode==='navigate'){event.respondWith(fetch(req).catch(async()=>{const cache=await caches.open(CACHE);return await cache.match('./index.html')||Response.error()}));return;}
if(urls.has(req.url))event.respondWith(caches.open(CACHE).then(async cache=>await cache.match(req)||fetch(req)));
});
