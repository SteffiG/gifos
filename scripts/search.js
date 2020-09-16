/**
 * Imports
 */

import capitalize from './helpers.js';


const searchGif = document.querySelector(".search-input");
const containerGif = document.querySelector('.searchGif');

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
      node.className = 'searchGif-img';
      containerGif.appendChild(node);
    }
  }).catch((error) => {return error})
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
    a.setAttribute("id", that.id + "autocomplete_list");
    a.setAttribute("class", "search-autocomplete_list");
    for ( i = 0; i < arr.length; i++) {
      b = document.querySelector(".search-autocomplete_items");
      b.innerHTML = `<strong> ${capitalize(arr[i].name.substr(0, val.length))}</strong>`;
      //b += markUpComplete(arr[i].name.substr(0, val.length));
      //console.log(b);
      b.innerHTML += arr[i].name.substr(val.length);
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

const markUpComplete = ((word) => {
  return (`<li class="search-autocomplete_items"><a class="autocomplete-selected"><i class="fas fa-search"></i><strong>${capitalize(word)}</strong></a></li>`)
});

/*execute a function presses a key on the keyboard:*/
/*inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
    //  currentFocus++
      /*and and make the current item more visible:*/
    //  addActive(x);
    //} else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
    //  currentFocus--;
      /*and and make the current item more visible:*/
    //  addActive(x);
    //} else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
    /*  e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:
        if (x) x[currentFocus].click();
      }
    }
});*/

/*const listMarkUp = (topic => {
    return (`<li class="search-autocomplete_items"><a class="autocomplete-selected"><i class="fas fa-search">${capitalize(topic)}</i></a></li>`);
});
*/

//const removeElements = (elms) => elms.forEach(el => el.remove());

// Use like:
//removeElements( document.querySelectorAll(".remove"));

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
