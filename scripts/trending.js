import api from './services.js';
import addFavorites from './main.js';

let gif = '';


//TRENDING GIFOS
/**
 * @method getTrendingGifos
 * @description - funcion para mostrar los trending gifos
 * @return {}
 */

function getTrendingGifos() {
    api.gifosTrending()
    .then(async (json) => {
      let images = json.data;
      console.log(images);
      let containerSlider = document.querySelector('.card');
      for(let i = 0 ; i < images.length; i++){
        let image = await fetch(images[i].images.downsized.url);
        let imageConverted = await image.blob();
        let favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites'))  : null;
        let srcHeart = favorites != null && favorites[images[i].id] ? '/assets/icon-fav-active.svg' : '/assets/icon-fav-hover.svg';        
        gif += markUpGifTrending(window.URL.createObjectURL(imageConverted), images[i].id, srcHeart, images[i].username, images[i].title);
        containerSlider.innerHTML = gif;
      }
  
      let cards = document.querySelectorAll('.card-container');
      cards.forEach(card => {
        let image = card.querySelector('.card-gif').src;
        let heartIcon = card.querySelector('.heart-fav');
        heartIcon.addEventListener("click", function(){
          const iconFav = heartIcon.querySelector('.icon-fav');
          //Ubica el host
          const baseUrl = window.location.origin;
          if(iconFav.src === `${baseUrl}/assets/icon-fav-hover.svg`) {
            iconFav.src = `${baseUrl}/assets/icon-fav-active.svg`;
          }else {
            iconFav.src = `${baseUrl}/assets/icon-fav-hover.svg`;
          }
          addFavorites(image, heartIcon.id);
        });
        const modal = document.querySelector('.icon-max');
        modal.addEventListener('click', modalOpen);
        
        function modalOpen() {
          const myModal = document.createElement('div');
          myModal.style = 'background: rgba(0,0,0,0.9)';
          const close = document.createElement('span');
          close.innerHTML = 'x';
          myModal.appendChild(close);
        }
      });
    }).catch((error) => {return(error)})
  }
  
  /**
   * Enlarge gif...
   * Al dar click sobre el icono de ampliar
   * Se me debe abrir el modal mostrando el gif grande
   * con una X en la parte superior derecha
   * Mostrando nombre y titulo de gif en la parte inferior izq
   * y mostrando iconos de corazon y descaarga en la parte inferior derecha
   */
  /*
  
      <!--<div class="myModal">
        <span class="close">&times;</span>
        <img class="modal-content" id="${id}">
        <div class="caption"></div>
      </div>-->
  */ 
  
  const markUpGifTrending = ((url, id, srcHeart, user, title) => {
    const baseUrl = window.location.origin;
  
    return (`<div class="card-container">
      <img src='${url}' id="${id}" alt="gifs" class="card-gif">
      <a href='#/' id="${id}" class="card-gif_link hidden heart-fav">
      <img class="icon-fav" src="${baseUrl}${srcHeart}" alt="favorites">
      </a>
      <a href='${url}' class="card-gif_link hidden" download>
      <img class="icon-download" src="./assets/icon-download.svg" alt="download">
      </a>
      <a href='${url}' class="card-gif_link hidden">
      <img class="icon-max" src="./assets/icon-max.svg" alt="Enlarge Gif">
      </a>
      <div class="overlay">
      <p class="information__gif--user">${user}</p>
      <p class="information__gif--title">${title}</p>
      </div>
      </div>`
    );
  });
  
  getTrendingGifos();