import FormView from "./views/fromView.js";
import FormDataView from "./views/formDataView.js";
import CardView from "./views/cardView.js";
import HeaderView from "./views/headerView.js";
import MassageView from "./views/massageView.js";

import * as model from "./model.js";

const controllFromView = function () {
  // 1) show the form to the user
  FormView.formVisible();
};

const UpdateSlidebarUI = function () {
  CardView.renderCards(model.state.dailyCardData);
  model.calcHeaderData(model.state.dailyCardData);
  HeaderView.renderHeader(model.state.header);
};

const controllFromData = function () {
  // 1) getting the row data form the form
  const rawFormData = FormDataView.getFormData();
  // 2) cheak the data and stote to state
  if (!model.isDataValid(rawFormData))
    return MassageView.showMassage("⚠️ Enter a poastive value", "alert");
  // 3) cheak if same day log
  if (model.isSameDayLog(model.state.entries)) {
  } else {
    model.formatData(model.state.entries);
  }
  // 4)update groth graph
  model.calcGrothGraph(model.state.dailyCardData);
  // 3) update the UI
  UpdateSlidebarUI();
  //4) clear the form and hide it
  FormView.clearForm();
  FormView.formHide();
  // 5) sotre data in local storage
  model.storeData(model.state.dailyCardData);
  MassageView.showMassage("✅ Your data is saved", "success");
};

const cardDelete = function (selectedID) {
  // 1) delete the selected card data form state
  model.deleteCardData(selectedID);
  // update growth graph
  model.calcGrothGraph(model.state.dailyCardData);
  // 2) update the UI
  UpdateSlidebarUI();
  // 3) store the new data to local sorage
  MassageView.showMassage("Your log is Deleted.", "warn");
  model.storeData(model.state.dailyCardData);
};

const welcomeMsg = function () {
  console.log("welcome to cashcare");
};
const init = function () {
  FormView.addEventHandlerAddExpense(controllFromView);
  FormDataView.addEventHandlerFormSubmit(controllFromData);
  CardView.addHandelBtnClick(cardDelete);
  welcomeMsg();
  // get the data form local storage
  if (!localStorage.getItem("cashCareData"))
    return MassageView.showMassage(
      "Begin Your Financial Journey 🎉",
      "success",
      4
    );
  model.getData();
  // 3) update the UI
  UpdateSlidebarUI();
};

init();
