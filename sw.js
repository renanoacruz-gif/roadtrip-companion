const CACHE='rtc-shell-3.10-2d40e4a52292';
const MAP_CACHE='rtc-map-v1',MAP_HOST='tiles.openfreemap.org';
// Mapa offline: blocos e glifos do cache primeiro (imutáveis por versão); estilo, TileJSON e sprites pela rede, com cache se cair ou demorar.
const fromMap=url=>caches.open(MAP_CACHE).then(c=>c.match(url));
const slow=(p,ms)=>Promise.race([p,new Promise((_,r)=>setTimeout(()=>r(Error('timeout')),ms))]);
const FILES=["./","./assets/Account-BNhcm0nf.css","./assets/Account-CwB_RlJW.js","./assets/Cockpit-DVCu9ljU.js","./assets/CockpitMap-CrLRkmvn.js","./assets/HeroScene-9m35O2t3.js","./assets/JourneyAtlas-CZgem2Ty.js","./assets/MapCanvas-CO6j9rLA.js","./assets/Memorial-B0l7ntYT.js","./assets/Memorial-DmKtPfPg.css","./assets/Memories-v7CkfW8g.js","./assets/PlanStory-BdXuUuQY.js","./assets/Planner-BxbejhW1.js","./assets/PlannerMap-nItA0LUe.js","./assets/Story-C0aXGfx7.js","./assets/backup-Dj5jJIbk.js","./assets/client-SyCSnkpC.js","./assets/dist-N-wO03gy.js","./assets/engine-BxE10Fvl.js","./assets/index-B-JS_f9Y.js","./assets/index-c_Q-prv8.css","./assets/jsx-runtime-C3cWAN_r.js","./assets/maplibre-gl-Bjz4VXhZ.js","./assets/maplibre-gl-C_xo-iQb.js","./assets/maplibre-gl-qvkd0SPb.css","./assets/maplibre-gl-worker-DTh23QKw.js","./assets/mission-7lNSN20U.js","./assets/model-DS-v8l1Q.js","./assets/motionFeatures-BqgQQUa2.js","./assets/registry-D5bfG1nD.js","./assets/remote-CFuoy3u3.js","./assets/repository-B2SdRPFB.js","./assets/rolldown-runtime-XKyaHtl9.js","./assets/runtime-CKFbZUQT.js","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./index.html","./manifest.webmanifest"];
const urls=new Set(FILES.map(p=>new URL(p,self.registration.scope).href));
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE')self.skipWaiting()});
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('rtc-shell-')&&key!==CACHE)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const u=new URL(req.url);
if(u.hostname===MAP_HOST){if(/\.(pbf|png)$/.test(u.pathname)&&!u.pathname.startsWith('/sprites/'))event.respondWith(fromMap(req.url).then(hit=>hit||fetch(req)));else event.respondWith((async()=>{const net=fetch(req);try{return await slow(net,4000)}catch{return await fromMap(req.url)||net}})());return;}
if(u.origin!==self.location.origin)return;
if(req.mode==='navigate'){event.respondWith(fetch(req).catch(async()=>{const cache=await caches.open(CACHE);return await cache.match('./index.html')||Response.error()}));return;}
if(urls.has(req.url))event.respondWith(caches.open(CACHE).then(async cache=>await cache.match(req)||fetch(req)));
});
