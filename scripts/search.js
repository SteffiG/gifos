/**
 * Imports
 */
import api from './services.js';
import capitalize from './helpers.js';
import addFavorites from './main.js';


const searchGif = document.querySelector(".search-input");
let gif = '';

const trendingWords = document.querySelector(".trending_topics-words");
let item = '';


//SEARCH GIF
/**
 * @method search
 * @description - busca los gifs segun el valor ingresado por el usuario
 * @param {*} value 
 */

 function search(value) {
  const URL = `https://api.giphy.com/v1/gifs/search?api_key=A1hJOpkrFlJITK2YiwMHoqqnOKdoKKYs&q=${value}&limit=12&rating=g`;
  fetch(URL)
  .then((response) => {
    return response.json();
  })
  .then(async (json) => {
    let images = json.data;
    console.log(images);
    const containerGif = document.querySelector('.containerGif');
    if(searchGif.value !== '') {
      const close = document.querySelector('.close-icon');
      close.classList.remove('hidden');
      close.addEventListener('click', removeValue);
      document.querySelector('.search-icon-right').classList.add('hidden');
      
    }
    show();
    for(let i = 0 ; i < images.length; i++){
      let image = await fetch(images[i].images.downsized.url);
      let imageConverted = await image.blob();
      let favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites'))  : null;
      let srcHeart = favorites != null && favorites[images[i].id] ? '/assets/icon-fav-active.svg' : '/assets/icon-fav-hover.svg';
      gif += markUpGif(window.URL.createObjectURL(imageConverted), images[i].id, srcHeart, images[i].username, images[i].title);
      containerGif.innerHTML = gif;
    }
    let cards = document.querySelectorAll('.searchGif_container');
    cards.forEach(card => {
      let image = card.querySelector('.searchGif_container-img').src;
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
  }).catch((error) => {return error})
}

const markUpGif = ((url, id, srcHeart, user, title) => {
  const baseUrl = window.location.origin;
  return (`<div class="searchGif_container">
    <img src='${url}' alt="gifs" class="searchGif_container-img">
    <a href='#/' id="${id}" class="card-gif_link hidden heart-fav">
    <img class="icon-fav" src="${baseUrl}${srcHeart}" alt="favorites">
    </a>
    <a href='${url}' class="card-gif_link hidden" download>
    <img class="icon-download" src="./assets/icon-download.svg" alt="download">
    </a>
    <a href="#" class="card-gif_link hidden">
    <img class="icon-max" src="./assets/icon-max.svg" alt="Enlarge Gif">
    </a>
    <div class="overlay">
      <p class="information__gif--user">${user}</p>
      <p class="information__gif--title">${title}</p>
    </div>
  </div>`
  );
});


const btn = document.querySelector('.button-more');
btn.addEventListener('click', moreGifs);

function moreGifs() {
  
}


function show() {
  document.querySelector('.searchGif').classList.remove('hidden');
  document.querySelector('.searchGif_results-line').classList.remove('hidden');
  document.querySelector(".searchGif_name").classList.remove('hidden');
  document.querySelector(".searchGif_name").innerHTML = capitalize(myInput.value);
  document.querySelector('.button').classList.remove('hidden');
}

//------------------------------------------------------------------
//AUTOCOMPLETE
/**
 * @method getAutocomplete
 * @description - funcion para autocompletar la palabra o frase del input search
 * @return {}
 */

function getAutocomplete() {
  let that = this;
  const URL = `https://api.giphy.com/v1/gifs/search/tags?api_key=A1hJOpkrFlJITK2YiwMHoqqnOKdoKKYs&q=${this.value}`;
  fetch(URL)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    let a, b, i, val = that.value;
    //currentFocus = -1;
    let arr = json.data;
    a = document.querySelector(".search-autocomplete_list");
    a.classList.remove('hidden');
    a.setAttribute("id", that.id + "autocomplete_list");
    for ( i = 0; i < arr.length; i++) {
      b = document.querySelector(".search-autocomplete_items");
      let wordCompleteSearch = arr[i].name.substr(val.length);
      b.innerHTML = `<a class="autocomplete-selected"><i class="fas fa-search"></i><strong> ${capitalize(arr[i].name.substr(0, val.length))}</strong>${wordCompleteSearch}</a>`;
      document.querySelector('.search-icon-left').classList.remove('hidden');
      document.querySelector('.search-icon-right').classList.add('hidden');
      document.querySelector('.close-icon').classList.remove('hidden');
      const close = document.querySelector('.close-icon');
      searchGif.style = 'margin-left: 10px';
      b.innerHTML += `<input type="hidden" value='${arr[i].name}'>`;
      b.addEventListener("click", function(e) {
      //Llamo la funcion search
        search(that.value);
        that.value = this.getElementsByTagName("input")[0].value;
        closeAllLists(that);
      });
      close.addEventListener('click', removeValue);
      a.appendChild(b);
    }
  }).catch((error) => {return error})
}

function removeValue() {
  searchGif.value = '';
  document.querySelector('.search-icon-left').classList.add('hidden');
  document.querySelector('.search-icon-right').classList.remove('hidden');
  document.querySelector('.close-icon').classList.add('hidden');
  searchGif.style = 'margin-left: 55px';
  document.querySelector('#myInputautocomplete_list').removeAttribute('id');
  document.querySelectorAll('.search-autocomplete_list').forEach((a) => a.className = 'search-autocomplete_list hidden');
}

function closeAllLists() {
  document.querySelectorAll('.search-autocomplete_list').forEach((a) => a.className = 'search-autocomplete_list hidden');
}

/**
 * @method trendingSearch
 * @description - funcion que muestra las palabras trendings
 * @return {}
 */
function trendingSearch() {
  api.trendingTopic()
  .then((json) => {
    let info = json.data.slice(0, 5);
    info.forEach(word => {
    item += markUp(word);
    trendingWords.innerHTML = item;
    trendingWords.querySelectorAll('.trending_topics-words-list').forEach((element) => element.addEventListener('click', selectedSuggestion));
    })
  })
  .catch((error) => {return error})
}
trendingSearch();

const markUp = ((word) => {
  return (`<li class="trending_topics-words-list"><a href='#search' class="topic_list">${capitalize(word)}</a></li>`);
});

/**
 * @method selectedSuggestion
 * @param {event}
 * @description - funcion para buscar la palabra trending seleccionada 
 * @return {}
 */
function selectedSuggestion(event) {
  searchGif.value = event.target.innerText;
  search(event.target.innerText);
}

//------------------------------------------------------------------

/**
 * Listener
*/

searchGif.addEventListener('input', getAutocomplete);

export default search; 
