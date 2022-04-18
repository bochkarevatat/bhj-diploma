/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  const formData = new FormData;
  xhr.responseType = 'json';
  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      options.callback(null, xhr.response);
    };
  });
  if (options.method === 'GET') {
    options.url += "?";
    for (let key in options.data) {
      options.url += key + "=" + options.data[key] + "&";
    };
  } else {
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    };
  };
  xhr.open(options.method, options.url);
  try {
    xhr.send(formData);
  } catch (err) {
    callback(err);
  };
};