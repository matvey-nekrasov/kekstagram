// Модуль для отрисовки миниатюр
'use strict';

(() => {
  let picturesDataLocal = [];

  const renderByOrder = (newOrder) => {
    let picturesDataNewOrder = [];
    switch (newOrder) {
      case window.miniaturesOrder.OrderType.DEFAULT:
        picturesDataNewOrder = picturesDataLocal;
        break;
      case window.miniaturesOrder.OrderType.RANDOM:
        // Перемешать копию массива, и взять первые 10 элементов
        picturesDataNewOrder = window.util.shuffleArray(picturesDataLocal).slice(0, 10);
        break;
      case window.miniaturesOrder.OrderType.DISCUSSED:
        // Отсортировать по количеству комментариев, если одинаково, то лайков
        picturesDataNewOrder = picturesDataLocal.slice();
        picturesDataNewOrder.sort((left, right) => {
          let diff = right.comments.length - left.comments.length;
          if (diff === 0) {
            diff = right.likes - left.likes;
          }
          return diff;
        });
        break;
    }

    window.miniaturesRender.render(picturesDataNewOrder);
  };

  // Колбэк при получении фотографий при запуске
  const onSiteEntered = (picturesData) => {
    picturesDataLocal = picturesData;
    renderByOrder(window.miniaturesOrder.OrderType.DEFAULT);

    // Показ меню вверху страницы: по умолчанию, случайные, осуждаемые
    const imgFilters = document.querySelector(`.img-filters`);
    imgFilters.classList.remove(`img-filters--inactive`);
  };

  window.backend.load(onSiteEntered, window.util.onError);

  window.minitaures = {
    renderByOrder
  };
})();
