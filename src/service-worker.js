// import { build, files, prerendered, version } from '$service-worker'
// import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

// const precache_list = [...build, ...files, ...prerendered].map((s) => ({
// 	url: s,
// 	revision: version,
// }))

// precacheAndRoute(precache_list)

var s = "sgtoilet-cache-" + Date.now(), a = [
	"./",
	"./favicon.png",
	"./configs.json",
	"./manifest.json"
  ];
  
  self.addEventListener("install", function(e) {
	e.waitUntil(
	  caches.open(s).then(function(n) {
		return n.addAll(a);
	  })
	);
  });
  
  self.addEventListener("activate", (e) => {
	e.waitUntil(
	  caches.keys().then(function(n) {
		return Promise.all(
		  n.map(function(t) {
			if (t !== s)
			  return caches.delete(t);
		  })
		);
	  })
	);
  });
  self.addEventListener("fetch", (e) => {
	e.respondWith(
	  async function() {
		return await caches.match(e.request) || fetch(e.request);
	  }()
	);
  });
  