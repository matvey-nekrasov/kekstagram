'use strict';

const PHOTOS_COUNT = 5;

const generateMockPhotos = (count) => {
  const MIN_LIKES = 15;
  const MAX_LIKES = 200;
  const MIN_AVATAR = 1;
  const MAX_AVATAR = 6;
  const MIN_COMMENTS = 0;
  const MAX_COMMENTS = 3;

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

  const PHOTO_DESCRIPTIONS = [
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

  const getRandomItem = (items) =>
    items[Math.floor(Math.random() * items.length)];

  const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const generateShuffledArray = (size) => {
    const array = Array.from(Array(size).keys(), (v) => v + 1);
    array.sort(() => Math.random() - 0.5);
    return array;
  };

  const generateComments = (size) => {
    let comments = [];
    for (let i = 0; i < size; i++) {
      const comment = {
        avatar: `img/avatar-${randomNumber(MIN_AVATAR, MAX_AVATAR)}.svg`,
        message: getRandomItem(COMMENT_MESSAGES),
        name: getRandomItem(COMMENT_AUTHOR_NAMES)
      };
      comments.push(comment);
    }
    return comments;
  };

  let photos = [];
  const urlPhotoNumbers = generateShuffledArray(count);
  for (let i = 0; i < count; i++) {
    let photo = {
      url: `photos/${urlPhotoNumbers[i]}.jpg`,
      description: getRandomItem(PHOTO_DESCRIPTIONS),
      likes: randomNumber(MIN_LIKES, MAX_LIKES),
      comments: generateComments(randomNumber(MIN_COMMENTS, MAX_COMMENTS))
    };
    photos.push(photo);
  }
  return photos;
};

const mockPhotos = generateMockPhotos(PHOTOS_COUNT);
window.console.table(mockPhotos);
