import { formatMoney } from "../helper.js";
class CardView {
  _parentElement = document.querySelector(".sidebar--body");
  _data = [];
  _clearFiled() {
    this._parentElement.innerHTML = "";
  }
  createMarkup() {
    const upArrow =
      "M240,56v64a8,8,0,0,1-16,0V75.31l-82.34,82.35a8,8,0,0,1-11.32,0L96,123.31,29.66,189.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0L136,140.69,212.69,64H168a8,8,0,0,1,0-16h64A8,8,0,0,1,240,56Z";
    const downArrow =
      "M240,136v64a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h44.69L136,115.31l-34.34,34.35a8,8,0,0,1-11.32,0l-72-72A8,8,0,0,1,29.66,66.34L96,132.69l34.34-34.35a8,8,0,0,1,11.32,0L224,180.69V136a8,8,0,0,1,16,0Z";
    //   🚨 here we have to create a coppy of the data array orther withe reverse() will muted the state original array.
    const clonedData = Array.from(this._data, (x) => x);
    return clonedData
      .reverse()
      .map((log) => {
        return `
    <div class="card" data-id="${log.id}">
        <div class="card__header">
        <div class="card__date">${log.date}</div>
        <div class="card__btn">
            <span class="card__btn-text">SeeLog</span
            ><svg xmlns="http://www.w3.org/2000/svg" class="sidebar--icon downCaret" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="sidebar--icon upCaret" viewBox="0 0 256 256"><path d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"></path></svg>
        </div>
        <div class="card__tag--${log.trend === "upTrend" ? "red" : "green"}">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-tag" viewBox="0 0 256 256"><path d=${
          log.trend === "upTrend" ? upArrow : downArrow
        }></path></svg>
        </div>
        <div class="delete--btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="sidebar--icon"
            viewBox="0 0 256 256"
          >
            <path
              d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"
            ></path>
          </svg>
        </div>
        </div>
        <div class="card__body">
        <div class="card__item">
            <p class="card__item--title">Total item</p>
            <p class="card__item--value">${log.totalItem}</p>
        </div>
        <div class="card__item">
            <p class="card__item--title">Max expenses</p>
            <p class="card__item--value">${formatMoney(log.maxExpense)}</p>
        </div>
        <div class="card__item">
            <p class="card__item--title">Total expences</p>
            <p class="card__item--value">${formatMoney(log.totalExpense)}</p>
        </div>
        </div>
        <div class="card__log">
        <p class="card__log--title">Item name</p>
        <p class="card__log--title">Item price</p>
        ${log.itemsList
          .map(
            (itemLog) => `<p class="log__item--name">${itemLog.itemName}</p>
          <p class="log__item--price">${formatMoney(itemLog.itemPrice)}</p>`
          )
          .join("")}
        </div>
  </div>`;
      })
      .join("");
  }
  renderCards(data) {
    this._data = data;
    this._clearFiled();
    const makup = this.createMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", makup);
  }
  addHandelBtnClick(deleteHandler) {
    this._parentElement.addEventListener("click", function (e) {
      const logSeenBtn = e.target.closest(".card__btn");
      const cardDeleteBtn = e.target.closest(".delete--btn");
      if (!logSeenBtn && !cardDeleteBtn) return;
      if (logSeenBtn)
        logSeenBtn.closest(".card").classList.toggle("card__log--visible");
      if (cardDeleteBtn) {
        const id = +cardDeleteBtn.closest(".card").dataset.id;
        deleteHandler(id);
      }
    });
  }
}

export default new CardView();
