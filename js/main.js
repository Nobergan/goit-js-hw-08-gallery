import galleryItems from './gallery-items.js';

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const ref = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxContent: document.querySelector('.lightbox__content'),
  lightboxImage: document.querySelector('.lightbox__image'),
  lightboxButton: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
};

ref.gallery.addEventListener('click', handleGalleryClick);
ref.lightboxButton.addEventListener('click', handleCloseImg);
ref.lightboxOverlay.addEventListener('click', handleBackdropClick);

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

function createImgItem(item) {
  const itemRef = document.createElement('li');
  itemRef.classList.add('gallery__item');

  const linkRef = document.createElement('a');
  linkRef.classList.add('gallery__link');
  linkRef.setAttribute('href', item.original);

  const imgRef = document.createElement('img');
  imgRef.classList.add('gallery__image');
  imgRef.setAttribute('src', item.preview);
  imgRef.setAttribute('data-source', item.original);
  imgRef.setAttribute('alt', item.description);

  itemRef.append(linkRef);
  linkRef.append(imgRef);

  return itemRef;
}

const galleryItem = galleryItems.map(item => createImgItem(item));

ref.gallery.append(...galleryItem);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.

function handleGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const newUrl = event.target.dataset.source;
  ref.lightboxImage.src = newUrl;
  ref.lightbox.classList.add('is-open');

  document.addEventListener('keydown', handleCloseModalByEscape);
}

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

function handleCloseImg() {
  ref.lightbox.classList.remove('is-open');
  ref.lightboxImage.src = '';
}

// Закрытие модального окна по клику на div.lightbox__overlay.

function handleBackdropClick(event) {
  if (event.target === event.currentTarget) {
    handleCloseImg();
  }
}

// Закрытие модального окна по нажатию клавиши ESC.

function handleCloseModalByEscape(event) {
  if (event.code === 'Escape') {
    handleCloseImg();
  }
}
