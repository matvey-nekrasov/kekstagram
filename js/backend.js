'use strict';

const UrlList = {
  URL_LOAD_MINIATURES: `https://21.javascript.pages.academy/kekstagram/data`,
  URL_UPLOAD_PICTURE: `https://javascript.pages.academy/kekstagram`
};
const StatusCode = {
  OK: 200
};
const TIMEOUT_IN_MS = 2000;

const xmlHttpRequestWrapper = function (method, url, data, onLoad, onError) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === StatusCode.OK) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });
  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(method, url);
  xhr.send(data);
};

const loadMiniatures = (onLoad, onError) => {
  xmlHttpRequestWrapper(`GET`, UrlList.URL_LOAD_MINIATURES, null, onLoad, onError);
};

const uploadPictureForm = (data, onLoad, onError) => {
  xmlHttpRequestWrapper(`POST`, UrlList.URL_UPLOAD_PICTURE, data, onLoad, onError);
};

window.backend = {
  loadMiniatures,
  uploadPictureForm
};
