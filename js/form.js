// Модуль, который работает с формой редактирования изображения
'use strict';

const EFFECT_DEFAULT_VALUE = `20%`;

const picturesSection = document.querySelector(`.pictures`);
const body = document.querySelector(`body`);
const uploadImageOverlay = picturesSection.querySelector(`.img-upload__overlay`);
const uploadFileInput = picturesSection.querySelector(`#upload-file`);
const uploadFileCloseButton = picturesSection.querySelector(`#upload-cancel`);
const textEditHashtag = picturesSection.querySelector(`.text__hashtags`);
const textEditComment = picturesSection.querySelector(`.text__description`);
const pictureEffectLevelPin = picturesSection.querySelector(`.effect-level__pin`);
const pictureEffectLevelDepth = picturesSection.querySelector(`.effect-level__depth`);

/**
 * Обработчик нажатия Esc - закрывает попап с настройками
 * @param {*} evt событие
 */
const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    closePictureEditWindow();
  }
};

// Открытие окна выбора фотографии
const openPictureEditWindow = () => {
  uploadImageOverlay.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
  document.addEventListener(`keydown`, onPopupEscPress);
};

const resetFormToDefaultState = () => {
  uploadFileInput.value = ``;
  picturesSection.querySelector(`.effects__radio`).checked = true; // Сброс - установить первый элемент checked
  window.formScale.reset();
  window.formEffect.reset();
  textEditHashtag.value = ``;
  textEditComment.value = ``;
  pictureEffectLevelPin.style.left = EFFECT_DEFAULT_VALUE;
  pictureEffectLevelDepth.style.width = EFFECT_DEFAULT_VALUE;
};

// Закрытие окна выбора фотографии, сброс формы в исходное состояние
const closePictureEditWindow = (removeModal = true) => {
  uploadImageOverlay.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
  if (removeModal) {
    body.classList.remove(`modal-open`);
  }
  resetFormToDefaultState();
};

// Запрет закрытия окна setup при фокусе на поле для ввода хэштега
textEditHashtag.addEventListener(`focus`, () => {
  document.removeEventListener(`keydown`, onPopupEscPress);
});

// Добавление обработчика закрытия окна setup при уходе фокуса с поля для ввода хэштега
textEditHashtag.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, onPopupEscPress);
});

// Запрет закрытия окна setup при фокусе на поле для ввода комментария
textEditComment.addEventListener(`focus`, () => {
  document.removeEventListener(`keydown`, onPopupEscPress);
});

// Добавление обработчика закрытия окна setup при уходе фокуса с поля для ввода комментария
textEditComment.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, onPopupEscPress);
});

// Обработчик при изменении edit.value
uploadFileInput.addEventListener(`change`, () => {
  openPictureEditWindow();
});

// Обработчик при нажатии на кнопку close popup
uploadFileCloseButton.addEventListener(`click`, () => {
  closePictureEditWindow();
});

window.form = {
  closePictureEditWindow
};
