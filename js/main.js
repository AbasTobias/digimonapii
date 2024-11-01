let swLocation = "sw.js";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js') 
      .then(reg => console.log('Service Worker registrado', reg))
      .catch(err => console.log('Error al registrar el Service Worker', err));
  }
console.log("holaa chavales")

if(window.Notification && Notification.permission !== 'denied'){
  setTimeout('Notification.requestPermission()',10000)
  
  let noti = new Notification("titulo", {
      body: "soy una notificacion",
      icon: "../img/logo.png",
      image: "../img/noti.jpg",
      badge: "../img/logo.png"
  })
  
}


document.querySelector('#share-app').addEventListener('click', function(){
  if(navigator.share){
      navigator.share({
          title : 'Quereis Compartir?',
          text : 'visita esta pagina que esta de pinga(copada), y ayudanos compartiendo',
          url : 'http://127.0.0.1:5500/index.html',
      })
      .then(function(){
          console.log('se compartio')
      })
      .catch(function(error){
          console.error(error)
      })
  }else{
      console.log('no hay share')
  }
})
