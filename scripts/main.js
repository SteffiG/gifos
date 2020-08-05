window.onload = function(){
    //Llamar api con las imagenes TRENDING
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=A1hJOpkrFlJITK2YiwMHoqqnOKdoKKYs&limit=20&rating=g')
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        //dentro del promise obtengo el json con las imagenes
        let images = data.data;
        for(let i = 0 ; i < images.length; i++ ){
            let containerSlider = document.querySelector('.card');
            //Creo un elemento img
            let node = document.createElement('img');
            node.src = images[i].images.downsized.url;
            node.className = 'card-gif';
            //Le agrego el elemento anteriormente creado al containerSlider()
            containerSlider.appendChild(node);
            //console.log(images[i].images.downsized.url);
        }
    })
}

//-----------------------------------------------------------------
//DARK MODE
const blackout = document.querySelector(".menuInner-link_style");
blackout.addEventListener("click", changeMode);

/**
* Funcion para el efecto modo oscuro
* la variable change llama a el cuerpo de la pagina
* luego le paso a esa variable la propiedad classList y el metodo toggle 
* para llamar a la clase css que contiene las propiedades que cambian el color de fondo
*/ 
function changeMode() {
    //alert("funciona");
    let change = document.body;
    change.classList.toggle("oscuro");
}

//------------------------------------------------------------------
//SEARCH GIF
const searchGif = document.querySelector(".search-input");
searchGif.addEventListener('change', search)

function search() {
    const URL = `https://api.giphy.com/v1/gifs/search?api_key=A1hJOpkrFlJITK2YiwMHoqqnOKdoKKYs&q=${this.value}&limit=12&rating=g`;
    fetch(URL)
    .then((response) => {
        console.log(this.value);
        return response.json();
    })
    .then((data) => {
        console.log(data);
        let imagesGif = data.data;
        for(let i = 0 ; i < imagesGif.length; i++ ){
            let containerGif = document.querySelector('.searchGif');
            let node = document.createElement('img');
            node.src = imagesGif[i].images.downsized.url;
            node.className = 'searchGif-img';
            containerGif.appendChild(node);
            console.log(imagesGif[i].images.downsized.url);
        }
    })

    .catch((error) => reject(error))
}
