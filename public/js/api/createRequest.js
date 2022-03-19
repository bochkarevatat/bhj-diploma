/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest;
  formData = new FormData;
  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      options.callback(xhr.response.error, xhr.response);
    }
  });

  try {
    if (options.method === 'POST') {
      if (options.data) {
        Object.keys(options.data).forEach(key => {
          formData.append(key, options.data[key]);

        });
        xhr.responseType = options.responseType;
        xhr.responseType = 'json'
      } else {
        xhr.open(options.method, options.url);
      }
      xhr.send(formData);
    };
    if (options.method == 'GET') {
      xhr.open(options.method, options.url);
      xhr.send();
    }
  } catch (ex) {
    console.error(ex);
    options.callback(e, xhr.response);
  };
};