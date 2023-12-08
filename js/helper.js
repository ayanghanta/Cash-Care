export const formatMoney = function (money) {
  const option = {
    style: "currency",
    currency: "INR",
  };
  return new Intl.NumberFormat(navigator.language, option).format(money);
};
