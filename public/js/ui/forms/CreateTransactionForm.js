/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    // this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
  //   if (this.element === document.querySelector('#new-income-form')) {
  //     Account.list(User.current(), (err, response) => {
  //       document.querySelector('#income-accounts-list').innerHTML = '';
  //         let html = [];
  //         for (let i = 0; i < response.length; i++) {
  //             html.push(`<option value="${response[i].id}">${response[i].name}</option>`);
  //         }
  //         document.querySelector('#income-accounts-list').insertAdjacentHTML('beforeend', html.join(''));
  //         console.log(222)
  //     });
  // }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {

  }
}