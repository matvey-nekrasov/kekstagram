// Модуль для отрисовки миниатюр
'use strict';

(() => {
  /**
   * Заполнение шаблона #picture данными
   * @param {Object} pictureData
   * @return {Object} клонированный шаблон, заполненный данными
   */
  const renderPictureTemplate = (pictureData) => {
    const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector(`.picture__img`).src = pictureData.url;
    picture.querySelector(`.picture__comments`).innerText = pictureData.comments.length.toString();
    picture.querySelector(`.picture__likes`).innerText = pictureData.likes.toString();
    return picture;
  };

  /**
   * Добавление фотографий в DocumentFragment
   * @param {Array} pictures массив объектов фотографий
   * @return {*} DocumentFragment с фотографиями
   */
  const renderPicturesToFragment = (pictures) => {
    const fragment = document.createDocumentFragment();
    pictures.forEach((picture) => {
      const pictureTemplate = renderPictureTemplate(picture);
      fragment.appendChild(pictureTemplate);
    });
    return fragment;
  };

  // Колбэк при получении фотографий при запуске
  const backendLoadOnLoad = (picturesData) => {
    const picturesFragment = renderPicturesToFragment(picturesData);
    const picturesSection = document.querySelector(`.pictures`);
    picturesSection.appendChild(picturesFragment);
  };

  // Колбэк при ошибке запроса
  const backendOnError = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: #FE4C4C;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.style.lineHeight = 1.5;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend.load(backendLoadOnLoad, backendOnError);
})();
