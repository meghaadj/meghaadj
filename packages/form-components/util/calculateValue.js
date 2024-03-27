/* eslint-disable no-eval, no-unused-vars */
import { SHA256, enc } from "crypto-js";

const calculateValue = (config, data) => {
  let value;
  eval(config.calculateValue);
  return value;
};

const hash256 = (stringToHash) => {
  const hash = SHA256(stringToHash).toString(enc.Hex);
  return hash;
};

const formatDate = (date) => {
  if (!date.isValid()) return "";
  const timeZone = "Australia/Sydney";
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone,
  };
  return new Intl.DateTimeFormat("fr-CA", options).format(date);
};

export default calculateValue;
