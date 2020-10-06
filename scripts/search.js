/**
 * Imports
 */

import capitalize from './helpers.js';

const searchGif = document.querySelector(".search-input");
const containerGif = document.querySelector('.searchGif_container');

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
  .then((json) => {
    let imagesGif = json.data;
    containerGif.innerHTML = '';
    for(let i = 0 ; i < imagesGif.length; i++ ){
      let node = document.createElement('img');
      node.src = imagesGif[i].images.downsized.url;
      node.className = 'searchGif_container-img';
      containerGif.appendChild(node);
    }
    show();
  }).catch((error) => {return error})
}

function show() {
  document.querySelector(".searchGif").classList.remove('hidden');
  document.querySelector(".searchGif_name").classList.remove('hidden');
  document.querySelector(".searchGif_name").innerHTML = capitalize(myInput.value);
  document.querySelector(".search-without-results").classList.add("hidden");
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
    let arr = json.data;
    a = document.querySelector(".search-autocomplete_list");
    a.classList.remove('hidden');
    a.setAttribute("id", that.id + "autocomplete_list");
    a.setAttribute("class", "search-autocomplete_list");
    for ( i = 0; i < arr.length; i++) {
      b = document.querySelector(".search-autocomplete_items");
      let wordCompleteSearch = arr[i].name.substr(val.length);
      b.innerHTML = `<a class="autocomplete-selected"><i class="fas fa-search"></i><strong> ${capitalize(arr[i].name.substr(0, val.length))}</strong>${wordCompleteSearch}</a>`;
      b.innerHTML += `<input type='hidden' value='${arr[i].name}'>`;
      b.addEventListener("click", function(e) {
      //Llamo la funcion search
        search(that.value);
        that.value = this.getElementsByTagName("input")[0].value;
        closeAllLists(that);
      });
      a.appendChild(b);
    }
  }).catch((error) => {return error})
}

/*const state = (() => {
  if(searchGif == '') {
    document.querySelector('.search-icon-left').classList.add('hidden');
    document.querySelector('.search-icon-right').classList.remove('hidden');
    document.querySelector('.close-icon').classList.add('hidden');
  }
  else {
    document.querySelector('.search-icon-left').classList.remove('hidden');
    document.querySelector('.search-icon-right').classList.add('hidden');
    document.querySelector('.close-icon').classList.remove('hidden');
  }
});

state();
*/
function closeAllLists(elmnt) {
  /*close all autocomplete lists in the document,
  except the one passed as an argument:*/
  document.querySelectorAll('.search-autocomplete_items').forEach((b) => b.remove());
  document.querySelectorAll('.search-autocomplete_list').forEach((a) => a.className = 'hidden');
}

//------------------------------------------------------------------

/**
 * Listener
*/

searchGif.addEventListener('input', getAutocomplete);

export default search; 
