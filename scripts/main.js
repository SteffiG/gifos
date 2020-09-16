/**
 * Imports
 */
import api from './services.js';
import capitalize  from './helpers.js';

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
    })
  })
  .catch((error) => {return error})
}
trendingSearch();

const markUp = ((word, url) => {
  return (`<li class="trending_topics-words-list"><a href='${url}' class="topic_list">${capitalize(word)}</a></li>`);
});

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
const markUpGifTrending = ((url, id, srcHeart) => {
  const baseUrl = window.location.origin;

  return (`<div class="card-container">
    <img src='${url}' alt="gifs" class="card-gif">
    <a href='#/' id="${id}" class="card-gif_link hidden heart-fav">
    <img class="icon-fav" src="${baseUrl}${srcHeart}" alt="favorites">
    </a>
    <a href='${url}' class="card-gif_link hidden" download>
    <img class="icon-download" src="./assets/icon-download.svg" alt="download">
    </a>
    <a href="" class="card-gif_link hidden">
    <img class="icon-max" src="./assets/icon-max.svg" alt="max">
    </a>
    <div class="overlay"></div>
    </div>`
  );
});
getTrendingGifos();