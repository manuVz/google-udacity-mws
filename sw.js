const cacheName = "restaurant-reviews-001";

self.addEventListener('install', event =>{
    event.waitUntil(caches.open(cacheName)
    .then( cache =>{
        console.log("in cache");
        return cache.addAll([
           '/',
           '/index.html',
           '/restaurant.html',
           'css/styles.css',
           'js/main.js',
           'js/restaurant_info.js',
           'js/dbhelper.js',
           'js/sw_register.js',
           '/data/restaurants.json'  
        ]).catch( err =>{
            console.log(`Cache not open, error: ${err}`);
        });
    })
  );
});

self.addEventListener('fetch', event =>{
    let request = event.request;
    event.respondWith(
        caches.match(request)
        .then(response => {
            return response || fetch(request);
        }).catch(err =>{
            console.log(`Failed ${err}`);
        })
    );
});
