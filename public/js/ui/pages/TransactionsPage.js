 /**
  * Класс TransactionsPage управляет
  * страницей отображения доходов и
  * расходов конкретного счёта
  * */

  class TransactionsPage {
    /**
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * Сохраняет переданный элемент и регистрирует события
     * через registerEvents()
     * */
    constructor(element) {
      // console.log("problem NP")
      try {
        this.element = element;
        this.registerEvents();
        // console.log(element)
      } catch (err) {
        console.log(err);
      };
 
 
    }
 
    /**
     * Вызывает метод render для отрисовки страницы
     * */
    update() {
      this.render(this.lastOptions);
    }
 
    /**
     * Отслеживает нажатие на кнопку удаления транзакции
     * и удаления самого счёта. Внутри обработчика пользуйтесь
     * методами TransactionsPage.removeTransaction и
     * TransactionsPage.removeAccount соответственно
     * */
    registerEvents() {
      this.element.addEventListener('click', event => {
        if (event.target.classList.contains('remove-account')) {
          this.removeAccount();
        }
 
        if (event.target.classList.contains('transaction__remove')) {
          this.removeTransaction(event.target.dataset.id);
        }
      });
    }
 
    /**
     * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
     * Если пользователь согласен удалить счёт, вызовите
     * Account.remove, а также TransactionsPage.clear с
     * пустыми данными для того, чтобы очистить страницу.
     * По успешному удалению необходимо вызвать метод App.updateWidgets(),
     * либо обновляйте только виджет со счетами
     * для обновления приложения
     * */
    removeAccount() {
      if (this.lastOptions) {
        if (confirm("Хотите удалить счет?")) {
          Account.remove({
            id: this.lastOptions.account_id
          }, () => {
            App.updateWidgets();
          });
          this.clear();
        }
      } else {
        return;
      };
    }
 
    /**
     * Удаляет транзакцию (доход или расход). Требует
     * подтверждеия действия (с помощью confirm()).
     * По удалению транзакции вызовите метод App.update(),
     * либо обновляйте текущую страницу (метод update) и виджет со счетами
     * */
    removeTransaction(id) {
      if (confirm("Хотите удалить эту транзакцию?")) {
        Transaction.remove(id, () => {
          App.update();
        });
      } else {
        return;
      };
    }
 
    /**
     * С помощью Account.get() получает название счёта и отображает
     * его через TransactionsPage.renderTitle.
     * Получает список Transaction.list и полученные данные передаёт
     * в TransactionsPage.renderTransactions()
     * */
    render(options) {
      if (!options) {
        return;
      } else {
        this.lastOptions = options;
        Account.get(options, (err, response) => {
          for (const i of response.data) {
            if (i.id === options.account_id) {
              this.renderTitle(i.name);
              console.log(response.data)
            };
          };
        });
        Transaction.list(options, (err, response) => {
          console.log(options.data)
 
          this.renderTransactions(response.data);
          // console.log(options.account_id, data)
 
        });
      };
    }
 
    /**
     * Очищает страницу. Вызывает
     * TransactionsPage.renderTransactions() с пустым массивом.
     * Устанавливает заголовок: «Название счёта»
     * */
    clear() {
      this.renderTransactions([]);
      this.renderTitle('Название счета');
      this.lastOptions = null;
    }
 
    /**
     * Устанавливает заголовок в элемент .content-title
     * */
    renderTitle(name) {
      return document.querySelector('.content-title').textContent = name;
    }
 
    /**
     * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
     * в формат «10 марта 2019 г. в 03:20»
     * */
    formatDate(date) {
 
      const DMY = new Date(date).toLocaleString('ru', {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      const HM = new Date(date).toLocaleString('ru', {
        hour: "numeric",
        minute: "numeric"
      });
 
      return `${DMY} в ${HM}`;
    };
 
    /**
     * Формирует HTML-код транзакции (дохода или расхода).
     * item - объект с информацией о транзакции
     * */
    getTransactionHTML(item) {
      return `<div class="transaction transaction_${item.type} row">
           <div class="col-md-7 transaction__details">
             <div class="transaction__icon">
                 <span class="fa fa-money fa-2x"></span>
             </div>
             <div class="transaction__info">
                 <h4 class="transaction__title">${item.name}</h4>
                 <div class="transaction__date">${this.formatDate(item.created_at)}</div>
             </div>
           </div>
           <div class="col-md-3">
             <div class="transaction__summ">
               ${item.sum}<span class="currency">₽</span>
             </div>
           </div>
           <div class="col-md-2 transaction__controls">
               <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                   <i class="fa fa-trash"></i>  
               </button>
           </div>
       </div>`
 
    }
 
    /**
     * Отрисовывает список транзакций на странице
     * используя getTransactionHTML
     * */
    renderTransactions(data) {
      console.log(data)
      data.forEach(item => {
        this.getTransactionHTML(item);
      });
      if (data.length === 0) {
        document.querySelector('.content').innerHTML = '';
      };
 
    };
  };