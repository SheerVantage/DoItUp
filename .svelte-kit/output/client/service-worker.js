var a="sgtoilet-cache-"+Date.now(),s=["./","./favicon.png","./configs.json","./manifest.json"];self.addEventListener("install",function(e){e.waitUntil(caches.open(a).then(function(n){return n.addAll(s)}))});self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(function(n){return Promise.all(n.map(function(t){if(t!==a)return caches.delete(t)}))}))});self.addEventListener("fetch",e=>{e.respondWith(async function(){return await caches.match(e.request)||fetch(e.request)}())});