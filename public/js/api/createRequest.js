/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
//  const createRequest = (options = {}) => {
//   const xhr = new XMLHttpRequest;
//   const formData = new FormData;
//   xhr.responseType = 'json';
//   // console.log(options.url += '?')
//   xhr.addEventListener('readystatechange', () => {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       options.callback(null, xhr.response);
//     }
//   });
//   if (options.method === 'GET') {
//     xhr.open(options.method, options.url);
//     xhr.send();
//   } else if (options.method === 'POST') {
//     if (options.data !== undefined) {
//       Object.keys(options.data).forEach(key => {
//         formData.append(key, options.data[key]);
//       });
//       xhr.responseType = options.responseType;
//       xhr.open(options.method, options.url);
//       xhr.send(formData);
//     } else {
//       xhr.open(options.method, options.url);
//       xhr.send();
//     };
//   };
// };
const createRequest = (options = {}) => {

  const xhr = new XMLHttpRequest;
  const formData = new FormData;
  xhr.responseType = 'json';
  // console.log(options.data)
  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      options.callback(null, xhr.response);
    }
  });
  if (options.method === 'GET') {
    xhr.open(options.method, options.url);
    xhr.send();
  } else {
    if (options.data !== undefined) {
      Object.keys(options.data).forEach(key => {
        formData.append(key, options.data[key]);
      });
    }
   
    // xhr.responseType = options.responseType;
    xhr.open(options.method, options.url);
    xhr.send(formData);

  };
};