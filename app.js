const apiUrl = 'https://digimon-api.vercel.app/api/digimon';
let digimonFavoritos = JSON.parse(localStorage.getItem('favoriteDigimon')) || [];

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('favoritos.html')) {
    mostrarFavoritos();
  } else {
    obtenerDigimon();
  }
});

function obtenerDigimon() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const datosLimitados = data.slice(0, 9); 
      mostrarDigimon(datosLimitados);
    })
    .catch(error => console.error('Error al obtener los Digimon:', error));
}

function mostrarDigimon(listaDigimon) {
  const contenedor = document.getElementById('digimonContainer');
  contenedor.innerHTML = ''; 

  listaDigimon.forEach(digimon => {
    const tarjetaDigimon = document.createElement('div');
    tarjetaDigimon.classList.add('card', 'col-md-4', 'mb-4');
    
    tarjetaDigimon.innerHTML = `
      <img src="${digimon.img}" class="card-img-top" alt="${digimon.name}">
      <div class="card-body">
        <h5 class="card-title">${digimon.name}</h5>
        <p class="card-text">Nivel: ${digimon.level}</p>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#digimonModal" onclick="mostrarModal('${digimon.name}')">Ver más</button>
      </div>
    `;
    
    contenedor.appendChild(tarjetaDigimon);
  });
}

function mostrarModal(nombreDigimon) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const digimon = data.find(d => d.name === nombreDigimon);
      const infoModal = document.getElementById('modalInfo');
      const botonFavorito = document.getElementById('favoriteButton');

      infoModal.innerHTML = `
        <h2>${digimon.name}</h2>
        <p><strong>Nivel:</strong> ${digimon.level}</p>
        <p><strong>Nombre:</strong> ${digimon.name}</p>
        <img src="${digimon.img}" class="img-fluid" alt="${digimon.name}">
      `;

      botonFavorito.onclick = () => alternarFavorito(digimon);
      botonFavorito.innerText = digimonFavoritos.some(fav => fav.name === digimon.name) ? 'Eliminar de Favoritos' : 'Agregar a Favoritos';
    });
}

function alternarFavorito(digimon) {
  const indice = digimonFavoritos.findIndex(fav => fav.name === digimon.name);
  if (indice !== -1) {
    digimonFavoritos.splice(indice, 1); 
  } else {
    digimonFavoritos.push(digimon); 
  }
  localStorage.setItem('favoriteDigimon', JSON.stringify(digimonFavoritos));
  mostrarModal(digimon.name); 
}

function mostrarFavoritos() {
  const contenedor = document.getElementById('favoritesContainer');
  contenedor.innerHTML = ''; 

  if (digimonFavoritos.length === 0) {
    contenedor.innerHTML = '<p>No hay Digimon favoritos aún.</p>';
  } else {
    digimonFavoritos.forEach(digimon => {
      const tarjetaDigimon = document.createElement('div');
      tarjetaDigimon.classList.add('card', 'col-md-4', 'mb-4');
      
      tarjetaDigimon.innerHTML = `
        <img src="${digimon.img}" class="card-img-top" alt="${digimon.name}">
        <div class="card-body">
          <h5 class="card-title">${digimon.name}</h5>
          <p class="card-text">Nivel: ${digimon.level}</p>
          <button class="btn btn-danger" onclick="eliminarFavorito('${digimon.name}')">Eliminar de Favoritos</button>
        </div>
      `;
      
      contenedor.appendChild(tarjetaDigimon);
    });
  }
}

function eliminarFavorito(nombreDigimon) {
  const indice = digimonFavoritos.findIndex(fav => fav.name === nombreDigimon);
  if (indice !== -1) {
    digimonFavoritos.splice(indice, 1);
    localStorage.setItem('favoriteDigimon', JSON.stringify(digimonFavoritos));
    mostrarFavoritos(); 
  }
}

