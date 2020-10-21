/**
 * Imports
 */
import api from './services.js';
import capitalize  from './helpers.js';
import search from './search.js';
//import search from './search.js';

/**
 * Global variables
 */
const trendingWords = document.querySelector(".trending_topics-words");
let gif = '';
let item = '';

//TRENDING SEARCH
function trendingSearch() {
  api.trendingTopic()
  .then((json) => {
    let info = json.data.slice(0, 5);
    info.forEach(word => {
    item += markUp(word);
    trendingWords.innerHTML = item;
    //Verificar porque no me coloca el value en la barra de busqueda y que no me realiza dicha busqueda
    trendingWords.querySelectorAll('.trending_topics-words-list').forEach((element) => element.addEventListener('click', selectedSuggestion));
    })
  })
  .catch((error) => {return error})
}
trendingSearch();

const markUp = ((word) => {
  return (`<li class="trending_topics-words-list"><a href='#search' class="topic_list">${capitalize(word)}</a></li>`);
});

const searchGif = document.querySelector(".search-input");

function selectedSuggestion(event) {
  searchGif.value = event.target.innerText;
  search(event.target.innerText);
  //document.querySelector('.')
}

//FAVORITES
function addFavorites(favorite, id) {
  let favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : {};
  if(!favorites[id]){
    favorites[id] = favorite;
  } else {
    delete favorites[id];
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

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
    let containerSlider = document.querySelector('.card');
    for(let i = 0 ; i < images.length; i++){
      let image = await fetch(images[i].images.downsized.url);
      let imageConverted = await image.blob();
      let favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites'))  : null;
      let srcHeart = favorites != null && favorites[images[i].id] ? '/assets/icon-fav-active.svg' : '/assets/icon-fav-hover.svg';
      gif += markUpGifTrending(window.URL.createObjectURL(imageConverted), images[i].id, srcHeart);
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
/*const modal = document.querySelector('#myModal')
const img = document.querySelector('.card-gif');
const modalImg = document.querySelector('.icon-max');
const caption = document.querySelector('.caption');
modalImg.addEventListener('click', gifModal)

function gifModal(url) {
  modal.style.display = 'block';
  img.src = `${url}`;
  caption.innerHTML = this.alt;
}

const close = document.querySelector('.close');
close.addEventListener('click', closeModal);

function closeModal() {
  modal.style.display = 'none';
}
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
    <a href="${url}" class="card-gif_link hidden">
    <img class="icon-max" src="./assets/icon-max.svg" alt="Enlarge Gif">
    </a>
    <div class="overlay">
      <div class="information__gif">
      <p class="information__gif--user">${user}</p>
      <p class="information__gif--title">${title}</p>
      </div>
    </div>
    </div>`
  );
});

getTrendingGifos();

export default addFavorites;