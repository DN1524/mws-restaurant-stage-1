const cacheName = "restRevws";

// files to be cached
const cacheFiles = [
	"/index.html",
	"/restaurant.html",
	"/js/check_sw.js",
	"/data/restaurants.json",
	"/js/dbhelper.js",
	"/js/main.js",
	"/js/restaurant_info.js",
	"/css/home-responsive.css",
	"/css/review-responsive.css",
	"/css/styles.css",
	"/img/1.jpg",
	"/img/2.jpg",
	"/img/3.jpg",
	"/img/4.jpg",
	"/img/5.jpg",
	"/img/6.jpg",
	"/img/7.jpg",
	"/img/8.jpg",
	"/img/9.jpg",
	"/img/10.jpg"
];

// Calls install event
self.addEventListener("install", (e) => {
	console.log("Service Worker: Installed");

	e.waitUntil(
		caches
			.open(cacheName)
			.then(cache => {
				console.log("Service Worker: Caching Files...");
				cache.addAll(cacheFiles);
			})
			.then(() => self.skipWaiting())
			.catch(err => console.log(`Service Worker: Caching Failed! : ${err}`))
	);
})

// Calls activate event
self.addEventListener("activate", (e) => {
	console.log("Service Worker: Activated");
})

// Calls fetch
self.addEventListener("fetch", e => {
	console.log("Service Worker: Fetching Files...");
	e.respondWith(
		caches.match(e.request).then((response) => {
			if (response) {
				// Returns response if request is found in cache
				console.log(`Service Worker: Found ${e.request} in cache`);
				return response;

			} else {
				// If response does not exist in cache, the 
				// service worker fetches a new response.
				console.log(`Service Worker: ${e.request} not found in cache!. Fetching...`);
				return fetch(e.request)
				.then (response => {
					// Creates a new response for the new request
					const clonedResponse = response.clone();
					// caches needed files then adds new request
					// to cloned response
					caches.open(cacheName).then(cache => {
						cache.put(e.request, clonedResponse);
					})
					return response;
				})
				.catch(err => console.error(err));
			}
		})
	)
});