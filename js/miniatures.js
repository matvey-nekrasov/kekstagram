// Модуль для отрисовки миниатюр
'use strict';

let picturesDataLocal = [];
let picturesDataLocalOrder = [];

const renderByOrder = (newOrder) => {
  switch (newOrder) {
    case window.miniaturesOrder.OrderType.DEFAULT:
      picturesDataLocalOrder = picturesDataLocal;
      break;
    case window.miniaturesOrder.OrderType.RANDOM:
      // Перемешать копию массива, и взять первые 10 элементов
      picturesDataLocalOrder = window.util.shuffleArray(picturesDataLocal).slice(0, 10);
      break;
    case window.miniaturesOrder.OrderType.DISCUSSED:
      // Отсортировать по количеству комментариев, если одинаково, то лайков
      picturesDataLocalOrder = picturesDataLocal.slice();
      picturesDataLocalOrder.sort((left, right) => {
        let diff = right.comments.length - left.comments.length;
        if (diff === 0) {
          diff = right.likes - left.likes;
        }
        return diff;
      });
      break;
  }

  window.miniaturesRender.render(picturesDataLocalOrder);
};

// Колбэк при получении фотографий при запуске
const onLoaded = (picturesData) => {
  picturesDataLocal = picturesData;
  picturesDataLocalOrder = picturesDataLocal;
  renderByOrder(window.miniaturesOrder.OrderType.DEFAULT);

  // Показ меню вверху страницы: по умолчанию, случайные, осуждаемые
  const imgFilters = document.querySelector(`.img-filters`);
  imgFilters.classList.remove(`img-filters--inactive`);
};

const getPicturesDataLocalOrder = () => picturesDataLocalOrder;

window.backend.loadMiniatures(onLoaded, window.util.onError);

window.minitaures = {
  renderByOrder,
  getPicturesDataLocalOrder
};
