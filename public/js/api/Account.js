/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static URL = '/account';
  static get(id = '', callback) {
    createRequest({
      method: 'GET',
      url: '/account',
      callback: (err, response) => {
        if (err === null) {
          if (response.success) {
            callback(err, response);
          }
        }
      }
    });
  };
};