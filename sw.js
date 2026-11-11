const CACHE='rtc-shell-3.5-f041a18d8fa9';
const FILES=["./","./assets/Cockpit-Vq4twXeE.js","./assets/CockpitMap-VU0CFa-e.js","./assets/HeroScene-DmEUKHeD.js","./assets/JourneyAtlas-QbnXGDB_.js","./assets/MapCanvas-BoNKDhOU.js","./assets/Memorial-DP7cXMjy.js","./assets/Memorial-DmKtPfPg.css","./assets/Memories-DrYihSEZ.js","./assets/PlanStory-BTPSuNE7.js","./assets/Planner-D95qp_dq.js","./assets/PlannerMap-C6pHcUph.js","./assets/Story-CFFC5Y_d.js","./assets/index-8wwd9CIK.css","./assets/index-BYLLFjV_.js","./assets/jsx-runtime-Wy9s6hX0.js","./assets/maplibre-gl-Bjz4VXhZ.js","./assets/maplibre-gl-C_xo-iQb.js","./assets/maplibre-gl-qvkd0SPb.css","./assets/maplibre-gl-worker-DTh23QKw.js","./assets/mission-utxa3nsB.js","./assets/motionFeatures-Cqf-sJ8T.js","./assets/planner-4DZYtcTU.js","./assets/preload-helper-DIV0OVds.js","./assets/registry-Bw6XsFJO.js","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./index.html","./manifest.webmanifest"];
const urls=new Set(FILES.map(p=>new URL(p,self.registration.scope).href));
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE')self.skipWaiting()});
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('rtc-shell-')&&key!==CACHE)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
if(req.mode==='navigate'){event.respondWith(fetch(req).catch(async()=>{const cache=await caches.open(CACHE);return await cache.match('./index.html')||Response.error()}));return;}
if(urls.has(req.url))event.respondWith(caches.open(CACHE).then(async cache=>await cache.match(req)||fetch(req)));
});
