const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
export const TODAY = `${day}/${month}/${year}`;
