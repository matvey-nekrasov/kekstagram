// Модуль, который создаёт данные
'use strict';

(() => {
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
        avatar: `img/avatar-${window.util.getRandomNumber(AvatarCount.MIN, AvatarCount.MAX)}.svg`,
        message: window.util.getRandomElementFromArray(COMMENT_MESSAGES),
        name: window.util.getRandomElementFromArray(COMMENT_AUTHOR_NAMES)
      };
      comments.push(comment);
    }
    return comments;
  };

  window.data = {
    /**
    * Генерация массива фотографий
    * @param {number} count
    * @return {Array}
    */
    generatePicturesDataArray(count) {
      const pictures = [];
      for (let i = 0; i < count; i++) {
        const picture = {
          url: `photos/${i + 1}.jpg`,
          description: window.util.getRandomElementFromArray(PICTURE_DESCRIPTIONS),
          likes: window.util.getRandomNumber(LikeCount.MIN, LikeCount.MAX),
          comments: generateComments(window.util.getRandomNumber(CommentCount.MIN, CommentCount.MAX))
        };
        pictures.push(picture);
      }
      return pictures;
    }
  };
})();
