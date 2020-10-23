// Модуль для отрисовки миниатюр
'use strict';

const NUM_OF_COMMENTS = 5;

// Обработчик при клике на миниатюру - открытие полноразмерного окна
const onSmallPictureClick = (evt) => {
  if (!evt.target) {
    return;
  }

  // Если происходит клик - то в evt <img>
  if (evt.target.matches(`.picture__img`)) {
    openBigPictureWindow(evt.target);
  }

  // Если нажат Enter - то в evt <a>
  if (evt.target.matches(`.picture`)) {
    openBigPictureWindow(evt.target.querySelector(`.picture__img`));
  }
};

const showNextComments = () => {
  const pictureData = window.minitaures.getPicturesDataLocalOrder()[bigPictureSection.index];
  const shownCount = parseInt(commentsShownCount.innerText, 10);
  const totalCount = pictureData.comments.length;
  const needToShowCount = Math.min(totalCount - shownCount, NUM_OF_COMMENTS);
  const commentsToShow = pictureData.comments.slice(shownCount, shownCount + needToShowCount);

  commentsToShow.forEach((commentData) => {
    const socialComment = `
          <li class="social__comment">
            <img
              class="social__picture"
              src="${commentData.avatar}"
              alt="${commentData.name}"
              width="35" height="35">
            <p class="social__text">${commentData.message}</p>
          </li>
        `;

    socialCommentsList.insertAdjacentHTML(`beforeend`, socialComment);
  });

  // Комментариев: x
  commentsShownCount.innerText = shownCount + needToShowCount;

  // Если показаны все - скрыть кнопку "загрузить ещё"
  commentsLoader.classList.toggle(`hidden`, shownCount + needToShowCount === totalCount);
};


const openBigPictureWindow = (element) => {
  // Обработчик клика на крестик
  bigPictureCloseButton.addEventListener(`click`, closeBigPictureWindow);
  document.addEventListener(`keydown`, onEscPress);

  const pictures = picturesSection.querySelectorAll(`.picture__img`);
  // Индекс в DOM равен индексу в массиве picturesDataLocalOrder
  const indexInDataArray = Array.from(pictures).indexOf(element);
  bigPictureSection.index = indexInDataArray;

  const pictureData = window.minitaures.getPicturesDataLocalOrder()[indexInDataArray];
  const bigPictureImg = bigPictureSection.querySelector(`.big-picture__img img`);
  bigPictureImg.src = pictureData.url;

  bigPictureSection.querySelector(`.likes-count`).innerText = pictureData.likes;

  // комментариев: x
  commentsShownCount.innerText = `0`;
  // комментариев: из y
  bigPictureSection.querySelector(`.comments-count`).innerText = pictureData.comments.length;

  bigPictureSection.querySelector(`.social__caption`).innerText = pictureData.description;

  // Очистить все комментарии
  socialCommentsList.innerHTML = ``;
  showNextComments();

  // Задание 3-2. Добавьте на <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле.
  document.querySelector(`body`).classList.add(`modal-open`);

  // Показать окно
  bigPictureSection.classList.remove(`hidden`);
};

const onEscPress = (evt) => {
  if (evt.key === `Escape`) {
    closeBigPictureWindow();
  }
};

// Закрытие окна выбора фотографии
const closeBigPictureWindow = () => {
  bigPictureSection.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onEscPress);
  document.querySelector(`body`).classList.remove(`modal-open`);
};


const picturesSection = document.querySelector(`.pictures`);
const bigPictureSection = document.querySelector(`.big-picture`);
const bigPictureCloseButton = bigPictureSection.querySelector(`#picture-cancel`);
const socialCommentsList = bigPictureSection.querySelector(`.social__comments`);
const commentsShownCount = bigPictureSection.querySelector(`.comments-shown-count`);
const commentsLoader = bigPictureSection.querySelector(`.comments-loader`);

picturesSection.addEventListener(`click`, onSmallPictureClick);

commentsLoader.addEventListener(`click`, () => {
  showNextComments();
});
