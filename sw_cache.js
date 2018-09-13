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
	e.respondWith(fetch(e.request)
		.catch(() => caches.match(e.request)));
});