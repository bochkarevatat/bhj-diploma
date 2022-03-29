/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static URL = '/user';
  static setCurrent(user) {
    let userId = {
      id: user.id,
      name: user.name
    };
    let data = JSON.stringify(userId);
    localStorage.setItem('user', data);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user;
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return null;
    }
  };

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      method: 'GET',

      callback: (err, response) => {
        if (err === null) {
          callback(err, response);
          if (response.success) {
            this.current();
          } else {
            this.unsetCurrent();
            console.log(response.error);
          }
        }
      }
    });
  };

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    return createRequest({

      method: "POST",
      url: this.URL + "/login",
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
      }
      callback(err, response);
        
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      method: 'POST',
      url: this.URL + '/register',
      data,
      callback: (err, response) => {
        if (err === null) {
          if (response.success) {
            this.setCurrent(response.user);
          } else {
            console.log(response.error);
          }
          callback(err, response);
        }

      }
    })
    console.log(data);
  };

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      callback: (err, response) => {
        this.unsetCurrent();
        callback(err, response);
      }
    });


  }
}