

function recover() {
    return localStorage.getItem('favorites');
}


document.addEventListener('DOMContentLoaded', recover);