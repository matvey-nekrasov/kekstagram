// Модуль, который проверяет хэш-тэги
'use strict';

const hastagCheckValidity = (inputString) => {
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

const picturesSection = document.querySelector(`.pictures`);
const textEditHashtag = picturesSection.querySelector(`.text__hashtags`);
textEditHashtag.addEventListener(`input`, () => {
  const validity = hastagCheckValidity(textEditHashtag.value);
  textEditHashtag.setCustomValidity(validity);
  textEditHashtag.reportValidity();
});
