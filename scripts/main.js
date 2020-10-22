/**
 * Imports
 */
import api from './services.js';
import capitalize  from './helpers.js';
//import search from './search.js';
//import search from './search.js';

/**
 * Global variables
 */
/*const trendingWords = document.querySelector(".trending_topics-words");
let item = '';

/**
 * @method trendingSearch
 * @description - funcion que muestra las palabras trendings
 * @return {}
 */

//TRENDING SEARCH
/*function trendingSearch() {
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
/*function selectedSuggestion(event) {
  searchGif.value = event.target.innerText;
  search(event.target.innerText);
}
*/
/**
 * @method addFavorites
 * @param {favorite, id}
 * @description - funcion para agregar favoritos al localstorage
 * @return {}
 */
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

export default addFavorites;