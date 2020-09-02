/**
 * Imports
 */

import api from './services.js';

//---------------------------------------------------------------------------

/**
 * Global variables
 */
const blackout = document.querySelector(".menuInner-link_style");
const searchGif = document.querySelector(".search-input");
const trendingWords = document.querySelector(".trending_topics-words");
const containerGif = document.querySelector('.searchGif');

//--------------------------------------------------------------------------
//TRENDING GIFOS
/**
 * @method getTrendingGifos
 * @description - funcion para mostrar los trending gifos
 * @return {}
 */
let gif = '';

function getTrendingGifos() {
    api.gifosTrending()
    .then(async (json) => {
        let images = json.data;
        for(let i = 0 ; i < images.length; i++){
            let containerSlider = document.querySelector('.card');
            let image = await fetch(images[i].images.downsized.url);
            let imageConverted = await image.blob();
            gif += markUpGifTrending(window.URL.createObjectURL(imageConverted));
            containerSlider.innerHTML = gif;
        }
    }).catch((error) => {return(error)})
}

const markUpGifTrending = (url => {
    return (`<img src='${url}' alt="gifs" class="card-gif">
      <a href='${url}' class="card-gif_link">
        <img class="icon-fav" src="./assets/icon-fav-hover.svg" alt="favorites">
      </a>
      <a href='${url}' class="card-gif_link" download>
        <img class="icon-download" src="./assets/icon-download.svg" alt="download">
      </a>
      <a href='${url}' class="card-gif_link">
        <img class="icon-max" src="./assets/icon-max.svg" alt="max">
      </a>`)
      ;
});

getTrendingGifos();

//-----------------------------------------------------------------
//TRENDING SEARCH

let item = '';

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

const markUp = (word => {
    return (`<li class="trending_topics-words-list"><a href="#search" class="topic_list">${capitalize(word)}</a></li>`);
});

function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

trendingSearch();


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

//------------------------------------------------------------------
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
let currentFocus; 


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





const listMarkUp = (topic => {
    return (`<li class="search-autocomplete_items"><a class="autocomplete-selected"><i class="fas fa-search">${capitalize(topic)}</i></a></li>`);
});


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
blackout.addEventListener("click", changeMode);
searchGif.addEventListener('input', getAutocomplete);