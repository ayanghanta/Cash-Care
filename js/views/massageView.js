class MassageView {
  _parentElement = document.querySelector(".messageWindow");

  _timeLac(sec) {
    return new Promise(function (resolve, reject) {
      setTimeout(() => resolve("ok"), sec * 1000);
    });
  }
  async showMassage(massage, massageType = "success", time = 2) {
    this._parentElement.querySelector(".message--text").textContent = massage;
    this._parentElement.classList.add("window-active");
    this._parentElement.classList.add(`window-${massageType}`);
    await this._timeLac(time);
    this._parentElement.classList.remove("window-active");
    this._parentElement.classList.remove(`window-${massageType}`);
  }
}
export default new MassageView();
