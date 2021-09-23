const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


let currentIndex = 0;

const listGaleryItemsEl = document.querySelector(".js-gallery");

const backDropModal = document.querySelector(".js-lightbox");

const buttonClose = document.querySelector(".lightbox__button");

const imgOnBackDrop = document.querySelector(".lightbox__image");

const divBackDrop = document.querySelector(".lightbox__overlay");

const markupHTML = createMarkupGallery(galleryItems);

listGaleryItemsEl.insertAdjacentHTML("beforeend", markupHTML);

listGaleryItemsEl.addEventListener("click", onGalleryListClick);

buttonClose.addEventListener("click", onCloseModalW);

window.addEventListener("keydown", closeModalOnPressEsc);

divBackDrop.addEventListener("click", onCloseModalW);

// разметка
function createMarkupGallery(params) {
  return params
    .map(({ preview, original, description }, inx) => {
      return ` <li li class="gallery__item" >
    <a
        class="gallery__link"
        href="${original}"
    >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-index="${inx}"
            alt="${description}"
        />
    </a>
</li>`;
    })
    .join("");
}
function onGalleryListClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  const pictureElement = evt.target;
  Number.currentIndex = pictureElement.dataset.index;

  const href = pictureElement.dataset.source;
  const alt = pictureElement.alt;
  onClickOpenModal();
  createImgOnBackDrop(href, alt);
}
function onClickOpenModal(evt) {
  backDropModal.classList.add("is-open");
}
function onCloseModalW(evt) {
  backDropModal.classList.remove("is-open");
  imgOnBackDrop.src = ` `;
  imgOnBackDrop.alt = ` `;
}
function createImgOnBackDrop(src, alt) {
  imgOnBackDrop.src = src;
  imgOnBackDrop.alt = alt;
}
function closeModalOnPressEsc(evt) {
  if (evt.key !== "Escape") {
    slider(evt, currentIndex);

    return;
  }
  onCloseModalW();
}

function slider(key, index) {
  if (key.key === "ArrowRight") {
    if (index === galleryItems.length-1) {
      return;
    } else {
      currentIndex += 1;

      imgOnBackDrop.src = galleryItems[currentIndex].original;

      imgOnBackDrop.alt = galleryItems[currentIndex].description;
    }
  } else if (key.key === "ArrowLeft") {
    if (index === 0) {
      return;
    } else {
      currentIndex = index - 1;
      
      imgOnBackDrop.src = galleryItems[currentIndex].original;
      imgOnBackDrop.alt = galleryItems[currentIndex].description;
    }
  }
}