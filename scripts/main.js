/**
 * Imports
 */

import api from './services.js';
import capitalize  from './helpers.js';

//---------------------------------------------------------------------------

/**
 * Global variables
 */
const blackout = document.querySelector(".menuInner-link_style");
const trendingWords = document.querySelector(".trending_topics-words");
let gif = '';
let item = '';

//-----------------------------------------------------------------------------
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

//---------------------------------------------------------------------------------------
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


//--------------------------------------------------------------------------
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
            gif += markUpGifTrending(window.URL.createObjectURL(imageConverted), images[i].id);
            containerSlider.innerHTML = gif;
        }

        let cards = document.querySelectorAll('.card-container');
        cards.forEach(card => {
            let image = card.querySelector('.card-gif').src;
            let heartIcon = card.querySelector('.heart-fav');
            heartIcon.addEventListener("click", function(){
                const iconFav = heartIcon.querySelector('.icon-fav');
                const baseUrl = window.location.origin;
                console.log(`${baseUrl}/assets/icon-fav-hover.svg`);
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
const markUpGifTrending = ((url, id) => {
    console.log(url);
    return (`<div class="card-container">
      <img src='${url}' alt="gifs" class="card-gif">
      <a href='#/' id="${id}" class="card-gif_link hidden heart-fav">
        <img class="icon-fav" src="./assets/icon-fav-hover.svg" alt="favorites">
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

//------------------------------------------------------------------
//DARK MODE
/**
* @method changeMode
* @description - Funcion para el efecto modo oscuro,
* la variable change llama a el cuerpo de la pagina, 
* luego le paso a esa variable la propiedad classList 
* y el metodo toggle para llamar a la clase css que 
* contiene las propiedades que cambian el color de fondo
*/ 

function changeMode() {
    let change = document.body;
    change.classList.toggle("oscuro");
    document.querySelector(".menuInner-link_style").innerHTML = "Modo Diurno";    
}


//---------------------------------------------------------------------
//LISTENER

blackout.addEventListener("click", changeMode);
