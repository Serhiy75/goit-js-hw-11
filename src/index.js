import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { API } from './api.js';

let lightbox = new SimpleLightbox('.gallery a') 

const refs = {
  form: document.querySelector('.search-form'),
  btnLoadmore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.btnLoadmore.addEventListener('click', onLoadmore);

async function onLoadmore() {
  if (API.page > maxPage) {
    refs.btnLoadmore.classList.add('hide');
    
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
  }
  else {
    const result = await API.getImages()
    if (result.totalHits === 0)
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    else
    renderImages(result.hits)
  }
}

let maxPage = 0;

async function onFormSubmit(event) {
  event.preventDefault();
  const query = refs.form.elements.searchQuery.value;
  refs.gallery.innerHTML = '';
  API.query = query;
  API.page = 1;
  refs.btnLoadmore.classList.add('hide');
  const result = await API.getImages()
    maxPage = result.totalHits / 40
  if (result.totalHits === 0)
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  else {
    renderImages(result.hits)
    refs.btnLoadmore.classList.remove('hide')
  }
}

function renderImages(images) {
  const markup = creatMarkup(images)
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh()
}

function creatMarkup(images) {
  return images.map((el) => {
    return `
<div class="photo-card">
  <a href="${el.largeImageURL}" ><img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info info-item">
      <b>Likes</b>${el.likes}
    </p>
    <p class="info info-item">
      <b>Views</b>${el.views}
    </p>
    <p class="info info-item">
      <b>Comments</b>${el.comments}
    </p>
    <p class="info info-item">
      <b> Downloads </b>${el.downloads}
    </p>
  </div>
</div>`
  }).join('');
};


