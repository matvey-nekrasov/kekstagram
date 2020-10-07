// Точка входа. Модуль, который связывает другие модули
'use strict';

/**
 * Глобальные константы --------------------------------------------------------------------------------------
 */

const PICTURES_COUNT = 25;

const PictureScaleChange = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const PictureScaleChangeButton = {
  SMALLER: 0,
  BIGGER: 1
};

const ClassNames = {
  EFFECTS_PREVIEW: `effects__preview`
};

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


/**
 * Загрузка изображения и показ формы редактирования ---------------------------------
 */

const bodyTag = document.querySelector(`body`);
const uploadImageOverlay = picturesSection.querySelector(`.img-upload__overlay`);
const uploadFileInput = picturesSection.querySelector(`#upload-file`);
const uploadFileCloseButton = picturesSection.querySelector(`#upload-cancel`);
const textEditHashtag = picturesSection.querySelector(`.text__hashtags`);
const textEditComment = picturesSection.querySelector(`.text__description`);

/**
 * Обработчик нажатия Esc - закрывает попап с настройками
 * @param {*} evt событие
 */
const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePhotoEditWindow();
  }
};

// Запрет закрытия окна setup при фокусе на поле для ввода хэштега
textEditHashtag.addEventListener(`focus`, () => {
  document.removeEventListener(`keydown`, onPopupEscPress);
});

// Добавление закрытия окна setup при уходе фокуса с поля для ввода хэштега
textEditHashtag.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, onPopupEscPress);
});

// Запрет закрытия окна setup при фокусе на поле для ввода комментария
textEditComment.addEventListener(`focus`, () => {
  document.removeEventListener(`keydown`, onPopupEscPress);
});

// Добавление закрытия окна setup при уходе фокуса с поля для ввода комментария
textEditComment.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, onPopupEscPress);
});

// Открытие окна выбора фотографии
const openPhotoEditWindow = () => {
  uploadImageOverlay.classList.remove(`hidden`);
  bodyTag.classList.add(`modal-open`);
  document.addEventListener(`keydown`, onPopupEscPress);
};

// Закрытие окна выбора фотографии
const closePhotoEditWindow = () => {
  uploadImageOverlay.classList.add(`hidden`);
  bodyTag.classList.remove(`modal-open`);
  uploadFileInput.value = ``;
  document.removeEventListener(`keydown`, onPopupEscPress);
};

// Обработчик при изменении edit.value
uploadFileInput.addEventListener(`change`, () => {
  openPhotoEditWindow();
});

// Обработчик при нажатии на кнопку close popup
uploadFileCloseButton.addEventListener(`click`, () => {
  closePhotoEditWindow();
});


/**
 * Редактирование изображения ----------------------------------------------------
 */

/**
 * Масштаб ----------------------------------------------------
 */

const pictureScaleChangeButtonSmaller = picturesSection.querySelector(`.scale__control--smaller`);
const pictureScaleChangeButtonBigger = picturesSection.querySelector(`.scale__control--bigger`);
const pictureScaleChangeTextBox = picturesSection.querySelector(`.scale__control--value`);
const pictureEditUploadPreviewImage = picturesSection.querySelector(`.img-upload__preview img`);

/**
 * Обработчик нажатий на кнопки изменения масштаба + / -
 * @param {number} buttonType
 */
const onScaleChangeButtonPressed = (buttonType) => {
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
  pictureScaleChangeTextBox.value = `${newPercent}%`;
  pictureEditUploadPreviewImage.style.transform = `scale(${newPercent / 100})`;
};

// Нажатие на -
pictureScaleChangeButtonSmaller.addEventListener(`click`, () => {
  onScaleChangeButtonPressed(PictureScaleChangeButton.SMALLER);
});

// Нажатие на +
pictureScaleChangeButtonBigger.addEventListener(`click`, () => {
  onScaleChangeButtonPressed(PictureScaleChangeButton.BIGGER);
});

/**
 * Наложение эффекта на изображение ----------------------------------------------------
 */

// Объект для работы с эффетками
const effects = {
  Properties: {
    none: {
      FILTER_NAME: ``
    },
    chrome: {
      FILTER_NAME: `grayscale`,
      MIN: 0,
      MAX: 1,
      POSTFIX: ``
    },
    sepia: {
      FILTER_NAME: `sepia`,
      MIN: 0,
      MAX: 1,
      POSTFIX: ``
    },
    marvin: {
      FILTER_NAME: `invert`,
      MIN: 0,
      MAX: 100,
      POSTFIX: `%`
    },
    phobos: {
      FILTER_NAME: `blur`,
      MIN: 0,
      MAX: 3,
      POSTFIX: `px`
    },
    heat: {
      FILTER_NAME: `brightness`,
      MIN: 1,
      MAX: 3,
      POSTFIX: ``
    }
  },
  currentEffect: `none`,
  isSliderVisible() {
    return this.Properties[this.currentEffect].FILTER_NAME !== ``;
  },
  getStyleFilter(normalizedValue = 1) {
    const effectProperty = this.Properties[this.currentEffect];
    const resultValue = (effectProperty.MAX - effectProperty.MIN) * normalizedValue + effectProperty.MIN;
    if (!effectProperty.FILTER_NAME) {
      return ``;
    }
    return `${effectProperty.FILTER_NAME}(${resultValue}${effectProperty.POSTFIX})`;
  }
};

const pictureEditEffectsFieldset = picturesSection.querySelector(`.effects`);
const pictureEditEffectLevelSlider = picturesSection.querySelector(`.effect-level`);
const pictureEditEffectLevelPin = picturesSection.querySelector(`.effect-level__pin`);
const effectsArray = Array.from(picturesSection.querySelectorAll(`.effects__radio`)).map((x) => x.value);
const effectsClassNamesArray = effectsArray.map((x) => `${ClassNames.EFFECTS_PREVIEW}--${x}`);

// Обработчик при смене эффекта
const onEffectChange = (evt) => {
  if (!evt.target || !evt.target.matches(`.effects__radio`)) {
    return;
  }
  const effectName = evt.target.value;
  effects.currentEffect = effectName;
  pictureEditUploadPreviewImage.classList.remove(...effectsClassNamesArray);
  pictureEditUploadPreviewImage.classList.add(`${ClassNames.EFFECTS_PREVIEW}--${effectName}`);
  pictureEditUploadPreviewImage.style.filter = ``;
  if (effects.isSliderVisible()) {
    pictureEditEffectLevelSlider.classList.remove(`hidden`);
  } else {
    pictureEditEffectLevelSlider.classList.add(`hidden`);
  }
};

pictureEditEffectsFieldset.addEventListener(`change`, onEffectChange);

// Обработчик при изменении слайдера уровня эффекта
const onEffectLevelChange = () => {
  const normalizedEffectValue = pictureEditEffectLevelPin.offsetLeft / pictureEditEffectLevelPin.parentElement.offsetWidth;
  pictureEditUploadPreviewImage.style.filter = effects.getStyleFilter(normalizedEffectValue);
};

pictureEditEffectLevelPin.addEventListener(`mouseup`, onEffectLevelChange);


/**
 * Хэш-теги ----------------------------------------------------
 */

const hastagsCheckValidity = (inputString) => {
  // Убираются все лишние пробелы из строки
  const trimmed = inputString.replace(/\s+/g, ` `).trim();

  if (trimmed.length === 0) {
    return ``;
  }

  const splittedArray = trimmed.split(` `);
  if (splittedArray.some((x) => x[0] !== `#`)) {
    return `Хэш-тег должен начинаться с символа # (решётка)`;
  }

  const noLatticeArray = splittedArray.map((x) => x.substring(1));
  if (noLatticeArray.some((x) => x.length === 0)) {
    return `Хеш-тег не может состоять только из одной решётки`;
  }

  const re = /[^\w]/;
  if (noLatticeArray.some((x) => re.test(x))) {
    return `Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`;
  }

  if (splittedArray.some((x) => x.length > 20)) {
    return `Максимальная длина одного хэш-тега 20 символов, включая решётку`;
  }

  if (splittedArray.length > 5) {
    return `Нельзя указать больше пяти хэш-тегов`;
  }

  const lowercaseArray = splittedArray.map((x) => x.toLowerCase());
  const duplicatesArray = lowercaseArray.filter((item, index) => lowercaseArray.indexOf(item) !== index);
  if (duplicatesArray.length !== 0) {
    return `Один и тот же хэш-тег не может быть использован дважды (хэш-теги нечувствительны к регистру)`;
  }

  return ``;
};

textEditHashtag.addEventListener(`input`, () => {
  const validity = hastagsCheckValidity(textEditHashtag.value);
  textEditHashtag.setCustomValidity(validity);
  textEditHashtag.reportValidity();
});
