import { TODAY } from "./config.js";

export const state = {
  today: TODAY,
  header: {
    avarageExp: 0,
    totalExp: 0,
  },
  entries: [],
  dailyCardData: [],
  shortedCardData: [],
  isSorted: false,
};
// helpers
const calcTotalExp = function (data) {
  return data.reduce((acc, log) => {
    return (acc += log.itemPrice);
  }, 0);
};
const calcMaxExp = function (data) {
  return data.reduce((acc, log) => {
    if (acc > log.itemPrice) return acc;
    else return (acc = log.itemPrice);
  }, 0);
};
const calcTrend = function (exp, cardData) {
  return exp >
    cardData.reduce((acc, card) => {
      return (acc += card.totalExpense);
    }, 0) /
      cardData.length
    ? "upTrend"
    : "downTrend";
};

const createId = function () {
  return +(Date.now() + "").slice(-10);
};

export const calcHeaderData = function (cardData) {
  if (cardData.length === 0)
    return (state.header.avarageExp = state.header.totalExp = 0);
  state.header.avarageExp = +(
    cardData.reduce((acc, card) => {
      return (acc += card.totalExpense);
    }, 0) / cardData.length
  ).toFixed(2);
  state.header.totalExp = +cardData
    .reduce((acc, card) => {
      return (acc += card.totalExpense);
    }, 0)
    .toFixed(2);
};

export const isDataValid = function (formData) {
  const validData = [];
  let isvalid = true;
  formData
    .filter((entries) => entries.itemName !== "" && entries.itemPrice !== 0)
    .forEach((entries) => {
      const { itemName, itemPrice } = entries;
      if (
        itemPrice < 0 ||
        (itemName !== "" && itemPrice === 0) ||
        !Number.isFinite(itemPrice) ||
        (itemName === "" && itemPrice !== 0) ||
        Number.isFinite(+itemName)
      ) {
        return (isvalid = false);
      } else {
        validData.push({ itemName, itemPrice });
      }
    });
  state.entries = validData;
  return isvalid;
};

export const isSameDayLog = function (newData) {
  if (!state.dailyCardData?.find((card) => card.date === TODAY)) {
    return false;
  }
  const sameCard = state.dailyCardData.find((card) => card.date === TODAY);
  sameCard.itemsList.push(...newData);
  sameCard.totalItem = sameCard.itemsList.length;
  sameCard.totalExpense = calcTotalExp(sameCard.itemsList);
  sameCard.maxExpense = calcMaxExp(sameCard.itemsList);
  sameCard.trend = calcTrend(
    calcTotalExp(sameCard.itemsList),
    state.dailyCardData
  );
  return true;
};
export const formatData = function (newData) {
  state.dailyCardData.push({
    id: createId(),
    date: TODAY,
    totalItem: newData.length,
    totalExpense: calcTotalExp(newData),
    maxExpense: calcMaxExp(newData),
    itemsList: newData,
    trend: calcTrend(calcTotalExp(newData), state.dailyCardData),
  });
};

export const sortCrads = function () {
  const cardDataCoopy = [...state.dailyCardData];
  cardDataCoopy.sort(
    (card, nextCard) => card.totalExpense - nextCard.totalExpense
  );
  state.shortedCardData = cardDataCoopy;
};
export const calcGrothGraph = function (data) {
  data.forEach((card) => {
    card.trend = calcTrend(calcTotalExp(card.itemsList), state.dailyCardData);
  });
};
export const deleteCardData = function (id) {
  state.dailyCardData = state.dailyCardData.filter((log) => log.id !== id);
};
export const storeData = function (cardData) {
  localStorage.setItem("cashCareData", JSON.stringify(cardData));
};
export const getData = function () {
  state.dailyCardData = JSON.parse(localStorage.getItem("cashCareData"));
};
