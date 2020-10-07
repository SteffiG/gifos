/**
 * GLOBAL VARIABLES
 */
const blackout = document.querySelector(".dark");
const baseUrl = window.location.origin;
const logo = document.querySelector('.logo_mobile');

//CHANGE MODE

/**
* @method changeMode
*/ 

const changeMode = (event) => {
    document.body.classList.toggle('oscuro');
    if(event.target.innerHTML === 'Modo Nocturno' && logo.src ===`${baseUrl}/assets/logo_light.png`) {
        localStorage.setItem('darkMode', 'true');
        document.getElementById('changeMode').innerHTML = 'Modo Diurno';
        logo.src = `${baseUrl}/assets/logo_black.png`;
    } else {
        console.log('false');
        localStorage.setItem('darkMode', 'false');
        document.getElementById('changeMode').innerHTML = 'Modo Nocturno';
        logo.src = `${baseUrl}/assets/logo_light.png`;
    }
};

function verifyDarkMode() {
    if(localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('oscuro');
        document.getElementById('changeMode').innerHTML = 'Modo Diurno';
        logo.src = `${baseUrl}/assets/logo_black.png`;
    } else {
        document.body.classList.remove('oscuro');
        document.getElementById('changeMode').innerHTML = 'Modo Nocturno';
        logo.src = `${baseUrl}/assets/logo_light.png`;
    }
}

document.addEventListener('DOMContentLoaded', verifyDarkMode);

/**
 * LISTENER
 */

blackout.addEventListener('click', changeMode);