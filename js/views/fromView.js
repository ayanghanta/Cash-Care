class FormView {
  _parentElement = document.querySelector(".form");
  _addExpenseBtn = document.querySelector(".button");

  formVisible() {
    this._parentElement.closest(".main").classList.add("form--VISIBLE");
    this._parentElement.classList.add("form--visible");
  }
  formHide() {
    this._parentElement.closest(".main").classList.remove("form--VISIBLE");
    this._parentElement.classList.remove("form--visible");
  }
  clearForm() {
    this._parentElement
      .querySelectorAll("input")
      .forEach((inp) => (inp.value = ""));
  }
  addEventHandlerAddExpense(handler) {
    this._addExpenseBtn.addEventListener("click", function (e) {
      handler();
    });
  }
}

export default new FormView();
