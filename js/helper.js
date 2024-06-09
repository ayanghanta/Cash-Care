export const formatMoney = function (money) {
  const option = {
    style: "currency",
    currency: "USD",
  };
  return new Intl.NumberFormat(navigator.language, option).format(money);
};
