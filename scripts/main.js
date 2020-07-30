window.onload = function(){
    //Llamar api con las imagenes TREND
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=A1hJOpkrFlJITK2YiwMHoqqnOKdoKKYs&limit=2&rating=g')
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        //dentro del promise obtengo el json con las imagenes
        let images = data.data;
        for(let i = 0 ; i < images.length; i++ ){
            let containerSlider = document.getElementById('sliderCards');
            let node = document.createElement('img');
            node.src = images[i].images.downsized.url;
            node.className = 'card';
            containerSlider.appendChild(node);
            console.log(images[i].images.downsized.url);
        }
    })
}

const blackout = document.querySelector(".menuInner-link_style");
blackout.addEventListener("click", changeMode);

/**
* Funcion para el efecto modo oscuro
* la variable change llama a el cuerpo de la pagina
* luego le paso a esa variable la propiedad classList y el metodo toggle 
* para llamar a la clase css que contiene las propiedades que cambian el color de fondo
*/ 
function changeMode() {
    let change = document.body;
    change.classList.toggle("oscuro");
}


function getGiphy(url){
}