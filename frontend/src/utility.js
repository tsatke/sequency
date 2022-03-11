import { v4 as uuidv4 } from "uuid";
const currencyFormatter = require("currency-formatter");
const prettyBytes = require("pretty-bytes");

export const projectName = "Sequency";

export const backendDomain =
  process.env.NODE_ENV === "development"
    ? "DEV backend domain"
    : "PROD backend domain";

export const getUUID = () => uuidv4();

export const getPrettyTime = (date) => {
  // date.setMinutes(date.getMinutes() + (date.getTimezoneOffset() * -1))
  const fill = (number) => {
    number = `${number}`;
    return number.length === 1 ? `0${number}` : number;
  };
  const minute = fill(date.getMinutes());
  const hour = fill(date.getHours());
  return `${hour}:${minute}`;
};
export const getPrettyDateTime = (date) => {
  // date.setMinutes(date.getMinutes() + (date.getTimezoneOffset() * -1))
  const fill = (number) => {
    number = `${number}`;
    return number.length === 1 ? `0${number}` : number;
  };
  const day = fill(date.getDate());
  const month = fill(date.getMonth() + 1);
  const year = date.getFullYear();
  const minute = fill(date.getMinutes());
  const hour = fill(date.getHours());
  return `${day}.${month}.${year} ${hour}:${minute}`;
};
export const getPrettyDate = (date) => {
  const fill = (number) => {
    number = `${number}`;
    return number.length === 1 ? `0${number}` : number;
  };
  const day = fill(date.getDate());
  const month = fill(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const addMissingZero = (input) => {
  if (`${input}`.length === 1) {
    return `0${input}`;
  }
  return input;
};

export const formatFileSize = (sizeInBytes, locale = "de") => {
  return prettyBytes(sizeInBytes, { locale });
};

export const formatPrice = (priceInCents, locale = "de-DE") => {
  return currencyFormatter.format(priceInCents / 100, { locale });
};

export const maxMobileWidth = 992;
