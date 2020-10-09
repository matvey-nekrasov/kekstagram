// Служебные функции
'use strict';

(() => {
  window.util = {
    /**
     * Получение случайного элемента массива
     * @param {Array} items произвольный массив
     * @return {*} случайный элемент массива
     */
    getRandomElementFromArray(items) {
      return items[Math.floor(Math.random() * items.length)];
    },

    /**
     * Получение случайного целого числа в диапазоне [min, max]
     * @param {number} min
     * @param {number} max
     * @return {number}
     */
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  };
})();
