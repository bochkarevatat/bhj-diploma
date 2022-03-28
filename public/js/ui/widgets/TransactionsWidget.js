/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    try {
      if (element) {
        this.element = element;
        this.registerEvents();
        console.log(11)
      } else {
        throw new Error('Элемент не существует');
      }
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    let incomeBtn = this.element.querySelector('.create-income-button');
    let expenseBtn = this.element.querySelector('.create-expense-button');
    incomeBtn.addEventListener('click', () => {
      App.getModal('newIncome').open();
      console.log(9)
    });
    
    expenseBtn.addEventListener('click', () => {
      App.getModal('newExpense').open();
      console.log(10)
    });
  }
}