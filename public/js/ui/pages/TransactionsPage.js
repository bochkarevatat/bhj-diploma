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
     if (!element) {
       throw new Error("Переданный элемент TransactionsPage не существует");
     };
     this.element = element;
     this.registerEvents();
   };
   /**
    * Вызывает метод render для отрисовки страницы
    * */
   update() {
     this.render(this.lastOptions);
   };
   /**
    * Отслеживает нажатие на кнопку удаления транзакции
    * и удаления самого счёта. Внутри обработчика пользуйтесь
    * методами TransactionsPage.removeTransaction и
    * TransactionsPage.removeAccount соответственно
    * */
   registerEvents() {
     const removeAccount = document.querySelector('.remove-account');
     removeAccount.addEventListener('click', () => {
       this.removeAccount();
     });
     if (document.querySelector('.transaction') !== null) {
       for (const i of document.querySelectorAll('.transaction__remove')) {
         i.addEventListener('click', (e) => {
           this.removeTransaction({
             id: e.target.closest('.transaction__remove').dataset.id
           });
         });
       };
     };
   };
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
     if (!this.lastOptions) {
       return;
     };
     if (confirm('Вы желаете удалить счёт?')) {
       Account.remove({
           id: this.lastOptions.account_id
         },
         (err, response) => {
           if (response && response.success) {
             App.update();
           };
         }
       );
       this.clear();
     };
   };
   /**
    * Удаляет транзакцию (доход или расход). Требует
    * подтверждеия действия (с помощью confirm()).
    * По удалению транзакции вызовите метод App.update(),
    * либо обновляйте текущую страницу (метод update) и виджет со счетами
    * */
   removeTransaction(id) {
     if (confirm('Вы желаете удалить транзакцию ?')) {
       Transaction.remove(id, () => {
         App.update();
       });
     };
   };
   /**
    * С помощью Account.get() получает название счёта и отображает
    * его через TransactionsPage.renderTitle.
    * Получает список Transaction.list и полученные данные передаёт
    * в TransactionsPage.renderTransactions()
    * */
   render(options) {
     this.lastOptions = options;
     Account.get(options.account_id, (err, response) => {
       if (response && response.success) {
         this.renderTitle(response.data.name);
       };
     });
     Transaction.list(options, (err, response) => {
       if (response && response.success) {
         this.renderTransactions(response.data);
       };
     });
   };
   /**
    * Очищает страницу. Вызывает
    * TransactionsPage.renderTransactions() с пустым массивом.
    * Устанавливает заголовок: «Название счёта»
    * */
   clear() {
     this.renderTransactions([]);
     this.renderTitle('Название счета');
     this.lastOptions = '';
   };
   /**
    * Устанавливает заголовок в элемент .content-title
    * */
   renderTitle(name) {
     this.element.querySelector(".content-title").textContent = name;;
   };
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
   };
   /**
    * Отрисовывает список транзакций на странице
    * используя getTransactionHTML
    * */
   renderTransactions(data) {
     const content = document.querySelector('.content');
     let transArray = [];
     for (let i = 0; i < data.length; i++) {
       transArray.push(this.getTransactionHTML(data[i]));
     };
     content.innerHTML = '';
     content.insertAdjacentHTML('beforeend', transArray.join(''));
     this.registerEvents();
   };
 };