/**
 * GLOBAL VARIABLES
 */
const blackout = document.querySelector(".dark");

//CHANGE MODE

/**
* @method changeMode
*/ 

const changeMode = (event) => {
    document.body.classList.toggle('oscuro');
    if(event.target.innerHTML === 'Modo Nocturno') {
        localStorage.setItem('darkMode', 'true');
        document.getElementById('changeMode').innerHTML = 'Modo Diurno';
    } else {
        console.log('false');
        localStorage.setItem('darkMode', 'false');
        document.getElementById('changeMode').innerHTML = 'Modo Nocturno';
    }
};

function verifyDarkMode() {
    if(localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('oscuro');
        document.getElementById('changeMode').innerHTML = 'Modo Diurno'
    } else {
        document.body.classList.remove('oscuro');
        document.getElementById('changeMode').innerHTML = 'Modo Nocturno';
    }
}

document.addEventListener('DOMContentLoaded', verifyDarkMode);

/**
 * LISTENER
 */

blackout.addEventListener('click', changeMode);