import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
  form: document.querySelector('.search-form'),
  btnSubmit: document.querySelector('.submit'), 
  
  
}

refs.form.addEventListener('submit', handlerSubmit);
refs.btnSubmit.addEventListener('click', handlerClick);








{/* <form class="search-form" id="search-form">
  <input
    type="text"
    name="searchQuery"
    autocomplete="off"
    placeholder="Search images..."
  />
  <button type="submit">Search</button>
</form> */}