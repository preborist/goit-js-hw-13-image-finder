import apiService from './js/apiService';
import refs from './js/refs';
import updateGalleryMarkup from './js/updateGalleryMarkup';
import LoadMoreBtn from './js/components/load-more-button';
import './styles.scss';

const loadMoreBtn = new LoadMoreBtn({
  selector: 'button[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

console.log(refs.galleryContainer);
function searchFormSubmitHandler(event) {
  event.preventDefault();

  const form = event.currentTarget;
  apiService.query = form.elements.query.value;

  clearGalleryContainer();
  apiService.resetPage();
  fetchGallery();
  form.reset();
  apiService.fetchGallery();
}

function fetchGallery() {
  loadMoreBtn.disable();

  apiService.fetchGallery().then(hits => {
    updateGalleryMarkup(hits);
    loadMoreBtn.show();
    loadMoreBtn.enable();
  });
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
console.log(refs.galleryContainer);
