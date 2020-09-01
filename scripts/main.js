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

function getTrendingGifos() {
    api.gifosTrending()
    .then((json) => {
        let images = json.data;
        for(let i = 0 ; i < images.length; i++ ){
            let containerSlider = document.querySelector('.card');
            let node = document.createElement('img');
            node.src = images[i].images.downsized.url;
            node.className = 'card-gif';
            containerSlider.appendChild(node);
        }
    })
}

getTrendingGifos();

//-----------------------------------------------------------------
//TRENDING SEARCH

function trendingSearch() {
    api.trendingTopic()
    .then((json) => {
        let info = json.data.slice(0, 5);
        info.forEach(word => {
            let item = document.createElement('li');
            item.className = 'trending_topics-words-list';
            item.innerHTML = capitalize(word);
            trendingWords.appendChild(item);
        })
    })
    .catch((error) => {return error})
}

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
            b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].name.substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
            b.addEventListener("click", function(e) {
                search(this.getElementsByTagName("input")[0].value);
                that.value = this.getElementsByTagName("input")[0].value;
                closeAllLists(that);
            });
            a.appendChild(b);
        }
    }).catch((error) => {return error})
}

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