/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    try {
      if (element) {
        this.element = element;
        this.registerEvents();
        console.log(1)
      } else {
        throw new Error('Элемент не существует');
      }
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.addEventListener("click", (e) => {
      if (e.target.closest(".create-account")) {
        App.getModal("createAccount").open();
      }
      this.element.addEventListener('click', (e) => {
        if (e.target.closest('.account')) {
          this.onSelectAccount(e.target.closest('.account'));
        console.log('registerEvents');
        }
        });
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
          this.clear();
          this.renderItem(response);
      });
      console.log(3)
  };

          
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accountsAll = document.querySelectorAll(".account");
    for (let account of accountsAll) {
      account.remove();
      console.log(4)
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    if (element) {
      for (const i of document.querySelectorAll('.account')) {
          if (i.classList.contains('active')) {
              i.classList.remove('active');
          };
      }
      element.classList.add('active');
      App.showPage('transactions', { account_id: element.dataset.id });
  } else {
      return;
  }
    
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    const html = `<li class="active account" data-id="${item.id}">
                        <a href="#">
                            <span>${item.name}</span> /
                            <span>${item.sum} ₽</span>
                        </a>
                    </li>`
        return html;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    for (let i = 0; i < data.length; i++) {
      this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(data[i]));
  };
    
      console.log(7)
    
  }
}