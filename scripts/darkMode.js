/**
 * GLOBAL VARIABLES
 */
/*
const blackout = document.querySelector(".dark");
const daylight = document.querySelector('.light');
*/
//CHANGE MODE

const blackout = document.querySelector(".dark");

/**
* @method changeMode
*/ 

const changeMode = (event) => {
    document.body.classList.toggle('oscuro');
    if(event.target.innerHTML === 'Modo Nocturno') {
        localStorage.setItem('darkMode', 'true');
        //blackout.classList.add('hidden');
        //daylight.classList.remove('hidden');
        document.getElementById('changeMode').innerHTML = 'Modo Diurno';
    } else {
        console.log('false');
        localStorage.setItem('darkMode', 'false');
        /*blackout.classList.remove('hidden');
        daylight.classList.add('hidden');*/
        document.getElementById('changeMode').innerHTML = 'Modo Nocturno';
    }
};

function verifyDarkMode() {
    if(localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('oscuro');
        /*blackout.classList.add('hidden');
        daylight.classList.remove('hidden');*/
        document.getElementById('changeMode').innerHTML = 'Modo Diurno'
    } else {
        document.body.classList.remove('oscuro');
        /*blackout.classList.remove('hidden');
        daylight.classList.add('hidden');*/
        document.getElementById('changeMode').innerHTML = 'Modo Nocturno';
    }
}

document.addEventListener('DOMContentLoaded', verifyDarkMode);

/**
 * LISTENER
 */

blackout.addEventListener('click', changeMode);
daylight.addEventListener('click', changeMode);