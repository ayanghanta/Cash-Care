class FormDataView {
  _parentElement = document.querySelector(".form");
  getFormData() {
    return Array.from(this._parentElement.querySelectorAll(".form-row")).map(
      (fRow) => {
        return {
          itemName: fRow.querySelector(".item__input").value,
          itemPrice: +fRow.querySelector(".itemPrice__input").value,
        };
      }
    );
  }
  addEventHandlerFormSubmit(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new FormDataView();
