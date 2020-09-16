function createFavorites() {
  const arrLocal = recover();
  console.log(arrLocal);
  const container = document.querySelector('.view');
  const  viewFavorites = document.querySelector('.view-section_img');
  console.log(viewFavorites);
  for(let i in arrLocal) {
    /*let image = arrLocal[i];
    console.log(arrLocal[i]);*/
    let gifFavorite = document.createElement('img');
    gifFavorite.src = arrLocal[i];
    console.log(gifFavorite.src);
    gifFavorite.className = 'img-gif';
    viewFavorites.appendChild(gifFavorite);
  }
}

const markUpGifFavorite = ((url, id, srcHeart) => {
  const baseUrl = window.location.origin;
  return (`<img src='${url}' alt="gifs" class="card-gif">
    <a href='#/' id="${id}" class="card-gif_link hidden heart-fav">
    <img class="icon-fav" src="${baseUrl}${srcHeart}" alt="favorites">
    </a>
    <a href='${url}' class="card-gif_link hidden" download>
    <img class="icon-download" src="./assets/icon-download.svg" alt="download">
    </a>
    <a href="" class="card-gif_link hidden">
    <img class="icon-max" src="./assets/icon-max.svg" alt="max">
    </a>
    <div class="overlay"></div>`
  );
});

function recover() {
  return JSON.parse(localStorage.getItem('favorites'));
}

document.addEventListener('DOMContentLoaded', createFavorites);