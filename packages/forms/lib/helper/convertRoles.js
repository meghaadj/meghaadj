import { Roles } from "../enums/index.js";

const screamingSnakeToCamel = (input) => {
  const words = input.toLowerCase().split("_");
  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join("");
};

const convertRoles = (arr) => {
  const updated = [];
  for (let key of Object.keys(Roles)) {
    if (arr.includes(Roles[key])) {
      updated.push(screamingSnakeToCamel(key));
    }
  }
  return updated;
};

export default convertRoles;
