'use strict';

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
const picturesContainer = document.querySelector(`.pictures`);
picturesContainer.appendChild(picturesFragment);
