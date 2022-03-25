/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const skinBlue = document.querySelector('.skin-blue')
    sidebarToggle.addEventListener('click', () => {
      // console.log("ok")
      if (skinBlue.classList.contains('sidebar-open')) {
        skinBlue.classList.remove('sidebar-open');
        skinBlue.classList.add('sidebar-collapse');
      } else {
        skinBlue.classList.add('sidebar-open');
        skinBlue.classList.remove('sidebar-collapse');
      }
    });
  };

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const itemRegister = document.querySelector('.menu-item_register');
    const itemLogin = document.querySelector('.menu-item_login');
    const itemLogout = document.querySelector('.menu-item_logout');
    itemRegister.addEventListener('click', () => {
      App.getModal('register').open();
      console.log("ok")
    });
    itemLogin.addEventListener('click', () => {
      App.getModal('login').open();
    });
    itemLogout.addEventListener('click', () => {
      User.logout((response) => {
        if (response.success) {
        App.setState('init');
        User.unsetCurrent();
        }
      });
    });
  };
};