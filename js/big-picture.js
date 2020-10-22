// Модуль для отрисовки миниатюр
'use strict';

(() => {
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


  const openBigPictureWindow = (element) => {
    // Добавить обработчик клика на крестик
    bigPictureCloseButton.addEventListener(`click`, closeBigPictureWindow);
    document.addEventListener(`keydown`, onEscPress);

    const pictures = picturesSection.querySelectorAll(`.picture__img`);
    // Индекс в DOM равен индексу в массиве picturesDataLocalOrder
    const indexInDataArray = Array.from(pictures).indexOf(element);

    const pictureData = window.minitaures.getPicturesDataLocalOrder()[indexInDataArray];
    const bigPictureImg = bigPictureSection.querySelector(`.big-picture__img img`);
    bigPictureImg.src = pictureData.url;

    bigPictureSection.querySelector(`.likes-count`).innerText = pictureData.likes;
    bigPictureSection.querySelector(`.comments-shown-count`).innerText = Math.min(pictureData.comments.length, 5);
    bigPictureSection.querySelector(`.comments-count`).innerText = pictureData.comments.length;
    bigPictureSection.querySelector(`.social__caption`).innerText = pictureData.description;

    // social__comments
    const socialCommentsList = bigPictureSection.querySelector(`.social__comments`);
    socialCommentsList.innerHTML = ``;
    pictureData.comments.forEach((commentData) => {
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

    // Задание 3-2. Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев
    bigPictureSection.querySelector(`.social__comment-count`).classList.add(`hidden`);
    bigPictureSection.querySelector(`.comments-loader`).classList.add(`hidden`);

    // Задание 3-2. Добавьте на <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле.
    document.querySelector(`body`).classList.add(`modal-open`);

    // Показать окно полноразмерного просмотра
    bigPictureSection.classList.remove(`hidden`);
  };


  /**
  * Обработчик нажатия Esc - закрывает окно полноразмерного просмотра
  * @param {*} evt событие
  */
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
  picturesSection.addEventListener(`click`, onSmallPictureClick);
})();
