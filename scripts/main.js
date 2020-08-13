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
const wordTrending = document.querySelector(".paragraph");


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
    //alert("funciona");
    let change = document.body;
    change.classList.toggle("oscuro");
}

//------------------------------------------------------------------
//TRENDING SEARCH

function trendingSearch() {
    fetch('https://api.giphy.com/v1/trending/searches?api_key=A1hJOpkrFlJITK2YiwMHoqqnOKdoKKYs')
    .then((response) => {
        console.log(response);
        return response.json})
    .then((json) => {
        console.log(json);
    }).catch((error) => {return error})
}

//------------------------------------------------------------------
//SEARCH GIF
function search(value) {
    const URL = `https://api.giphy.com/v1/gifs/search?api_key=A1hJOpkrFlJITK2YiwMHoqqnOKdoKKYs&q=${value}&limit=12&rating=g`;
    fetch(URL)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        let imagesGif = json.data;
        let containerGif = document.querySelector('.searchGif');
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
 * @method getTrendingGifos
 * @description - funcion para autocompletar la palabra o frase del input search
 * @return {}
 */

function getAutoComplete() {
    let that = this;
    const URL = `https://api.giphy.com/v1/gifs/search/tags?api_key=A1hJOpkrFlJITK2YiwMHoqqnOKdoKKYs&q=${this.value}`;
    fetch(URL)
    .then((response) => {
        return response.json();
    }) 
    .then((json) => {
        console.log(json);
        let a, b, i, val = that.value;
        let arr = json.data;
        console.log(arr);
        //Agregamos como child del input lo que devuelve el api
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", that.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        that.parentNode.appendChild(a);
        /*for each item in the array...*/
        for ( i = 0; i < arr.length; i++) {
            console.log(arr[i]);
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].name.substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                search(this.getElementsByTagName("input")[0].value);
                that.value = this.getElementsByTagName("input")[0].value;
                /*insert the value for the autocomplete text field:*/
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists(that);
            });
            a.appendChild(b);
            }
        }
    }).catch((error) => {return error})
}

const removeElements = (elms) => elms.forEach(el => el.remove());

// Use like:
removeElements( document.querySelectorAll(".remove"));

function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    document.querySelectorAll('.autocomplete-items').forEach(function(a){
        a.remove()
    })
}

//------------------------------------------------------------------

/**
 * Listener
 */
blackout.addEventListener("click", changeMode);
searchGif.addEventListener('input', getAutoComplete);
wordTrending.addEventListener('change', trendingSearch);
