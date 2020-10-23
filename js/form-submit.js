// Модуль, который занимается отправкой формы редактирования изображения
'use strict';

const picturesSection = document.querySelector(`.pictures`);
const form = picturesSection.querySelector(`#upload-select-image`);
const body = document.querySelector(`body`);
const main = document.querySelector(`main`);


const onSuccess = () => {
  const closeSuccess = () => {
    main.removeChild(successElement);
    body.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onEscPress);
  };

  const onEscPress = (evt) => {
    if (evt.key === `Escape`) {
      closeSuccess();
    }
  };

  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const successElement = successTemplate.cloneNode(true);

  // При клике на кнопку "Круто!"
  successElement.querySelector(`.success__button`).addEventListener(`click`, () => {
    closeSuccess();
  });

  // При клике на произвольную область экрана
  successElement.addEventListener(`click`, (evt) => {
    if (evt.target === successElement) {
      closeSuccess();
    }
  });

  // По нажатию на клавишу Esc
  document.addEventListener(`keydown`, onEscPress);

  // Показ окна
  main.appendChild(successElement);
};


const onError = (errorMessage) => {
  const closeError = () => {
    main.removeChild(errorElement);
    body.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onEscPress);
  };

  const onEscPress = (evt) => {
    if (evt.key === `Escape`) {
      closeError();
    }
  };

  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorElement = errorTemplate.cloneNode(true);

  // При клике на кнопку "Круто!"
  errorElement.querySelector(`.error__button`).addEventListener(`click`, () => {
    closeError();
  });

  // При клике на произвольную область экрана
  errorElement.addEventListener(`click`, (evt) => {
    if (evt.target === errorElement) {
      closeError();
    }
  });

  // По нажатию на клавишу Esc
  document.addEventListener(`keydown`, onEscPress);

  // Показ окна
  errorElement.querySelector(`.error__title`).innerText = errorMessage;
  main.appendChild(errorElement);
};


const onSubmit = (evt) => {
  evt.preventDefault();
  window.backend.uploadPictureForm(new FormData(form), onSuccess, onError);
  window.form.closePictureEditWindow(false);
};

// Обработчик при отправке формы
form.addEventListener(`submit`, onSubmit);
