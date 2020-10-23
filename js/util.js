// Служебные функции
'use strict';

/**
 * Получение случайного элемента массива
 * @param {Array} items произвольный массив
 * @return {*} случайный элемент массива
 */
const getRandomElementFromArray = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

/**
 * Получение случайного целого числа в диапазоне [min, max]
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Создаёт и возвращает новый массив из перемешанного старого
 * @param {Array} array
 * @return {Array}
 */
const shuffleArray = (array) => {
  let a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a;
};

// Колбэк при ошибке запроса
const onError = (errorMessage) => {
  // Убрать старое сообщение об ошибке
  const errorMessageClassName = `error-message`;
  const oldErrorMessage = document.querySelector(`.${errorMessageClassName}`);
  if (oldErrorMessage !== null) {
    oldErrorMessage.remove();
  }

  const node = document.createElement(`div`);
  node.className = errorMessageClassName;
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: #FE4C4C;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `24px`;
  node.style.lineHeight = 1.5;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

window.util = {
  getRandomElementFromArray,
  getRandomNumber,
  shuffleArray,
  onError
};
