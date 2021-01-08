import imagesTpl from '../templates/imagesTpl.hbs';
import refs from './refs';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
const basicLightbox = require('basiclightbox');
import 'basicLightbox/dist/basicLightbox.min.css';

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

function updateGalleryMarkup(hits) {
  const markup = imagesTpl(hits);

  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  toastr['success']('Успешный результат запроса');

  refs.galleryContainer.addEventListener('click', onImageClickHandler);
  function onImageClickHandler(event) {
    console.log(event.target.srcset);
    const instance = basicLightbox.create(
      `<img src=${event.target.srcset} width="800" height="600">`,
    );
    instance.show();
  }
  console.log(refs.galleryContainer);
}

export default updateGalleryMarkup;
