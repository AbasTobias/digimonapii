var cacheDynamic = 'cache2';

const cacheFiles = [
'/',
'index.html',
'views/favoritos.html',
'js/app.js',
'js/main.js',
'js/bootstrap.bundle.min.js',
'img/background.png',
'img/logo.png',
'css/styles.css',
'css/bootstrap.min.css'

];



self.addEventListener('activate', function (event) {
    console.log('el SW esta activado:', event);
});

self.addEventListener('install', function (event) {
    console.log('el SW esta instalado-:', event);
});


self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    //si hay una respuesta y no esta indefinida/null, la devuelve
                    return response;
                }

                var requestToCache = event.request.clone();

                return fetch(requestToCache)
                .then(function(response){
                    if(!response || response.status !== 200){
                        return response
                    }

                    var responseToCache = response.clone();
                    caches.open(cacheDynamic)
                        .then(function(cache){
                            //console.log('requestToCache', requestToCache);
                            //console.log('responseToCache', responseToCache);
                            cache.put(requestToCache, responseToCache)
                            return response
                        });
                })

            })
    )
})

self.addEventListener("push", function(e){
    
    console.log(e)

    let title = "Demo Push";

    let options = {
        body: "Click para regregsar a la aplicacion",
        icon: "assets/img/icon512_maskable.png",
        vibrate :  [100, 50, 200],
        actions: [{
            'action': 'Si', 
            'title': 'Copada la app',
            'icon': 'assets/img/icon512_maskable.png'
        },
        {
            'action': 'No', 
            'title': 'Ya basta de notificacione',
            'icon': 'assets/img/icon512_maskable.png'
        }]
    }
    e.waitUntil(self.registration.showNotification(title,options))
})

self.addEventListener("notificationclick", function(e){
    console.log(e)
    if(e.action === 'Si'){
        console.log("Le gusto la app");
        clients.openWindow('https://google.com')
        console.log(clients)
    }else if(e.action === 'No'){
        console.log("No le gusto la app 😭")
    }

    e.notification.close();
})

