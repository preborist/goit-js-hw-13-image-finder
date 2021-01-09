import apiService from './js/apiService';
import refs from './js/refs';
import updateGalleryMarkup from './js/updateGalleryMarkup';
import LoadMoreBtn from './js/components/load-more-button';
const basicLightbox = require('basiclightbox');
import 'basicLightbox/dist/basicLightbox.min.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import './styles.scss';

const loadMoreBtn = new LoadMoreBtn({
  selector: 'button[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.galleryContainer.addEventListener('click', onImageClickHandler);
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

function searchFormSubmitHandler(event) {
  event.preventDefault();

  const form = event.currentTarget;

  apiService.query = form.elements.query.value;
  if (apiService.query.length > 0) {
    clearGalleryContainer();
    apiService.resetPage();
    fetchGallery();
    form.reset();
    apiService.fetchGallery();
  } else {
    toastr['error']('Введите запрос в форму поиска');
  }
}

function fetchGallery() {
  loadMoreBtn.disable();

  apiService.fetchGallery().then(hits => {
    if (hits.length === 0) {
      toastr['error']('По вашему запросу ничего не найдено!');
      return;
    }
    updateGalleryMarkup(hits);

    loadMoreBtn.show();

    loadMoreBtn.enable();
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth',
    });
  });
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

function onImageClickHandler(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(
    `<img src=${event.target.dataset.action} width="50" height="50">`,
  );
  instance.show();
}
