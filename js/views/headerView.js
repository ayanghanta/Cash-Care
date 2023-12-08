import { formatMoney } from "../helper.js";
class HeaderView {
  _totalExpEl = document.querySelector(".total-data");
  _avarageExpEl = document.querySelector(".avarage-data");
  _data = [];
  _clearfield() {
    this._parentElement.innerHTML = "";
  }

  renderHeader(data) {
    this._data = data;
    this._totalExpEl.textContent = formatMoney(this._data.totalExp);
    this._avarageExpEl.textContent = formatMoney(this._data.avarageExp);
  }
}

export default new HeaderView();
