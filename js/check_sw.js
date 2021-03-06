// Makes sure that service workers are supported
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/sw_cache.js")
			.then(reg => console.log("Service Worker: Registered!"))
			.catch(err => console.log(`Service Worker Error: ${err}`));
	})
}