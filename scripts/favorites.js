
function createFavorites() {
  const arrLocal = recover();
  let  viewFavorites = document.querySelector('.view-section_img');
  for(let i in arrLocal) {
    let gifFavorite = document.createElement('img');
    gifFavorite.src = arrLocal[i];
    gifFavorite.className = 'img-gif';
    viewFavorites.appendChild(gifFavorite);
  }
}

function recover() {
  return JSON.parse(localStorage.getItem('favorites'));
}

/**
 * LISTENER
 */

 document.addEventListener('DOMContentLoaded', createFavorites);