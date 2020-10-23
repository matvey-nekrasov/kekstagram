// Модуль, который занимается изменением порядка миниатюр
'use strict';

(() => {
  const OrderType = {
    DEFAULT: 0,
    RANDOM: 1,
    DISCUSSED: 2
  };

  const filtersSection = document.querySelector(`.img-filters`);
  const filtersForm = filtersSection.querySelector(`.img-filters__form`);

  const changeOrder = (evt) => {
    switch (evt.target.id) {
      case `filter-default`:
        window.minitaures.renderByOrder(OrderType.DEFAULT);
        break;
      case `filter-random`:
        window.minitaures.renderByOrder(OrderType.RANDOM);
        break;
      case `filter-discussed`:
        window.minitaures.renderByOrder(OrderType.DISCUSSED);
        break;
      default:
        window.util.onError(`Не найден ID кнопки: ${evt.target.id}`);
    }
  };

  const onClick = (evt) => {
    // Если кликнули не кнопку, или не активную кнопку, то выход
    if (!evt.target || !evt.target.matches(`.img-filters__button`) || evt.target.matches(`.img-filters__button--active`)) {
      return;
    }

    // Убрать активность со всех кнопок, и установить на кликнутую
    const buttons = filtersSection.querySelectorAll(`.img-filters__button`);
    buttons.forEach((button) => button.classList.remove(`img-filters__button--active`));
    evt.target.classList.add(`img-filters__button--active`);

    changeOrderDebounced(evt);
  };

  const changeOrderDebounced = window.debounce(changeOrder);

  filtersForm.addEventListener(`click`, onClick);

  window.miniaturesOrder = {
    OrderType
  };
})();
