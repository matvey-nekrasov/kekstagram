// Изменение масштаба
'use strict';

const PictureScaleChange = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const PictureScaleChangeButton = {
  SMALLER: 0,
  BIGGER: 1
};

const picturesSection = document.querySelector(`.pictures`);
const pictureScaleChangeButtonSmaller = picturesSection.querySelector(`.scale__control--smaller`);
const pictureScaleChangeButtonBigger = picturesSection.querySelector(`.scale__control--bigger`);
const pictureScaleChangeTextBox = picturesSection.querySelector(`.scale__control--value`);
const pictureUploadPreviewImage = picturesSection.querySelector(`.img-upload__preview img`);

/**
 * Установка масштаба изображения в процентах
 * @param {number} percent
 */
const pictureScaleSet = (percent) => {
  pictureScaleChangeTextBox.value = `${percent}%`;
  pictureUploadPreviewImage.style.transform = `scale(${percent / 100})`;
};

// Сброс масштаба
const pictureScaleReset = () => {
  pictureScaleSet(PictureScaleChange.MAX);
};

/**
 * Обработчик нажатий на кнопки изменения масштаба + / -
 * @param {number} buttonType
 */
const changeScale = (buttonType) => {
  const oldPercent = parseInt(pictureScaleChangeTextBox.value.slice(0, -1), 10);
  let newPercent;
  switch (buttonType) {
    case PictureScaleChangeButton.SMALLER:
      newPercent = Math.max(oldPercent - PictureScaleChange.STEP, PictureScaleChange.MIN);
      break;
    case PictureScaleChangeButton.BIGGER:
      newPercent = Math.min(oldPercent + PictureScaleChange.STEP, PictureScaleChange.MAX);
      break;
  }
  if (newPercent === oldPercent) {
    return;
  }
  pictureScaleSet(newPercent);
};

// Нажатие на -
pictureScaleChangeButtonSmaller.addEventListener(`click`, () => {
  changeScale(PictureScaleChangeButton.SMALLER);
});

// Нажатие на +
pictureScaleChangeButtonBigger.addEventListener(`click`, () => {
  changeScale(PictureScaleChangeButton.BIGGER);
});

window.formScale = {
  reset: pictureScaleReset
};
