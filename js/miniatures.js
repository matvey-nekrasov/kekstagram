// Модуль для отрисовки миниатюр
'use strict';

(() => {
  const PICTURES_COUNT = 25;

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

  const picturesData = window.data.generatePicturesDataArray(PICTURES_COUNT);
  const picturesFragment = renderPicturesToFragment(picturesData);
  const picturesSection = document.querySelector(`.pictures`);
  picturesSection.appendChild(picturesFragment);
})();
