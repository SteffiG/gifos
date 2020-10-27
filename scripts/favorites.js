const viewFavorites = document.querySelector('.view-section_img');

function createFavorites() {
  const arrLocal = recover();
  for(let i in arrLocal) {
    let gifFavorite = document.createElement('img');
    gifFavorite.src = arrLocal[i];
    gifFavorite.className = 'img-gif';
    viewFavorites.appendChild(gifFavorite);
  }
}

let favorites;
function recover() {
  //return JSON.parse(localStorage.getItem('favorites'));
  return JSON.parse(localStorage.getItem('favorites'));
}

/**
 * LISTENER
 */

 document.addEventListener('DOMContentLoaded', createFavorites);