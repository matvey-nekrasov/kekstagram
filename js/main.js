'use strict';

/**
 * Глобальные константы --------------------------------------------------------------------------------------
 */

const PICTURES_COUNT = 25;

const LikeCount = {
  MIN: 15,
  MAX: 200
};
const AvatarCount = {
  MIN: 1,
  MAX: 6
};
const CommentCount = {
  MIN: 0,
  MAX: 3
};

const COMMENT_MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const COMMENT_AUTHOR_NAMES = [
  `Александр`, `София`, `Мария`, `Максим`, `Михаил`, `Артём`, `Анна`, `Даниил`, `Иван`,
  `Виктория`, `Алиса`, `Анастасия`, `Дмитрий`, `Полина`, `Елизавета`, `Александра`, `Дарья`,
  `Варвара`, `Екатерина`, `Кирилл`, `Ксения`, `Андрей`, `Матвей`, `Арина`, `Егор`];

const PICTURE_DESCRIPTIONS = [
  `Приветики`,
  `Коротко и ясно`,
  `Нечего добавить`,
  `*Добавить остроумную подпись*`,
  `Просто наслаждаюсь жизнью`,
  `Идеальный день`,
  `Да, еще одно фото`,
  `Время перемен`,
  `Улыбнись)`,
  `Когда мне говорят следовать своим мечтам, я ложусь спать`,
  `Лучшая тренировка – бег на короткие дистанции, от холодильника к телевизору и обратно`,
  `Если бы у меня было чувство юмора, я бы придумал подпись посмешнее`,
  `Все мы рождаемся немного сумасшедшими, некоторые просто решают не меняться`,
  `У всех есть такой друг…`,
  `Зеркало: ты выглядишь потрясающе сегодня. Камера: неа`,
  `Может, это естественная красота, а может, фильтр Clarendon`,
  `В жизни я лучше, чем в Инстаграм`,
  `Вдруг вы забыли, как я выгляжу`,
  `Пришел, увидел, забыл, что хотел`,
  `Похоже у меня аллергия на утро`,
  `Было бы все в этой жизни так же просто, как растолстеть`
];

const PictureEditScale = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const PictureEditScaleButton = {
  SMALLER: 0,
  BIGGER: 1
};

const ClassNames = {
  EFFECTS_PREVIEW: `effects__preview`
};

/**
 * Служебные функции ---------------------------------------------------
 */

/**
 * Получение случайного элемента массива
 * @param {Array} items произвольный массив
 * @return {*} случайный элемент массива
 */
const getRandomElementFromArray = (items) =>
  items[Math.floor(Math.random() * items.length)];

/**
 * Получение случайного целого числа в диапазоне [min, max]
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);


/**
 * Генерация данных фотографий ---------------------------------------------------
 */

/**
* Генерация массива комментариев из констант
* @param {number} count
* @return {Array}
*/
const generateComments = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    const comment = {
      avatar: `img/avatar-${getRandomNumber(AvatarCount.MIN, AvatarCount.MAX)}.svg`,
      message: getRandomElementFromArray(COMMENT_MESSAGES),
      name: getRandomElementFromArray(COMMENT_AUTHOR_NAMES)
    };
    comments.push(comment);
  }
  return comments;
};

/**
* Генерация массива фотографий
* @param {number} count
* @return {Array}
*/
const generatePicturesDataArray = (count) => {
  const pictures = [];
  for (let i = 0; i < count; i++) {
    const picture = {
      url: `photos/${i + 1}.jpg`,
      description: getRandomElementFromArray(PICTURE_DESCRIPTIONS),
      likes: getRandomNumber(LikeCount.MIN, LikeCount.MAX),
      comments: generateComments(getRandomNumber(CommentCount.MIN, CommentCount.MAX))
    };
    pictures.push(picture);
  }
  return pictures;
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

const picturesData = generatePicturesDataArray(PICTURES_COUNT);
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

const pictureEditScaleButtonSmaller = picturesSection.querySelector(`.scale__control--smaller`);
const pictureEditScaleButtonBigger = picturesSection.querySelector(`.scale__control--bigger`);
const pictureEditScaleTextBox = picturesSection.querySelector(`.scale__control--value`);
const pictureEditUploadPreviewImage = picturesSection.querySelector(`.img-upload__preview img`);

const onScaleDownButtonPressed = (buttonType) => {
  const oldPercent = parseInt(pictureEditScaleTextBox.value.slice(0, -1), 10);
  let newPercent;
  switch (buttonType) {
    case PictureEditScaleButton.SMALLER:
      newPercent = Math.max(oldPercent - PictureEditScale.STEP, PictureEditScale.MIN);
      break;
    case PictureEditScaleButton.BIGGER:
      newPercent = Math.min(oldPercent + PictureEditScale.STEP, PictureEditScale.MAX);
      break;
  }
  if (newPercent === oldPercent) {
    return;
  }
  pictureEditScaleTextBox.value = `${newPercent}%`;
  pictureEditUploadPreviewImage.style.transform = `scale(${newPercent / 100})`;
};

pictureEditScaleButtonSmaller.addEventListener(`click`, () => {
  onScaleDownButtonPressed(PictureEditScaleButton.SMALLER);
});

pictureEditScaleButtonBigger.addEventListener(`click`, () => {
  onScaleDownButtonPressed(PictureEditScaleButton.BIGGER);
});

/**
 * Наложение эффекта на изображение ----------------------------------------------------
 */

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

const onEffectLevelChange = () => {
  const normalizedEffectValue = pictureEditEffectLevelPin.offsetLeft / pictureEditEffectLevelPin.parentElement.offsetWidth;
  pictureEditUploadPreviewImage.style.filter = effects.getStyleFilter(normalizedEffectValue);
};

pictureEditEffectLevelPin.addEventListener(`mouseup`, onEffectLevelChange);
