/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static URL = '';
  static list(data, callback) {
    createRequest({
      method: 'GET',
      url: this.URL,
      data,
      callback: (err, response) => {
        if (err === null) {
          callback(err, response);
        } else {
          console.log(err);
        };
      }
    });
  };

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    createRequest({
      method: 'PUT',
      url: this.URL,
      data,
      callback: (err, response) => {
        if (err === null) {
          callback(err, response);
        } else {
          console.log(err);
        };
      }
    });
  };

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback) {
    createRequest({
      method: 'DELETE',
      url: this.URL,
      data,
      callback: (err, response) => {
        if (err === null) {
          callback(err, response.data);
        } else {
          console.log(err);
        }
      }
    });
  };
};