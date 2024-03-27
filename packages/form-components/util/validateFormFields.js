const validateFormFields = (
  components,
  data,
  newErrors,
  specialCharsWhitelist,
) => {
  for (const component of components) {
    calculateError(component, data, newErrors, specialCharsWhitelist);
  }
};

const calculateError = (
  component,
  data,
  newErrors,
  specialCharsWhitelist = "",
) => {
  const { key, type } = component;
  let error;

  const input = data[key] || "";

  switch (type) {
    case "panel":
      for (const panelComponent of component.components) {
        calculateError(panelComponent, data, newErrors, specialCharsWhitelist);
      }
      break;
    case "datagrid":
      error = [];
      for (const rowData of data[key]) {
        const rowErrors = {};
        for (const datagridComponent of component.components) {
          calculateError(
            datagridComponent,
            rowData,
            rowErrors,
            specialCharsWhitelist,
          );
        }
        error.push(rowErrors);
      }
      newErrors[key] = error;
      break;
    case "password":
      error = checkForInvalidPassword(input, data, key);
      newErrors[key] = error;
      break;
    default:
      error = checkForInvalidInput(
        input,
        component,
        data,
        specialCharsWhitelist,
      );
      newErrors[key] = error;
  }
};

const checkForInvalidPassword = (password, data, key) => {
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChars = /[$&+,:;=?@#|'<>.^*()%!-/\\]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasLowerCase) return "At least 1 lower case letter required.";
  if (!hasUpperCase) return "At least 1 upper case letter required.";
  if (!hasSpecialChars) return "At least 1 special character required.";
  if (!hasNumber) return "At least 1 number required.";
  if (key === "confirmNewPassword" && data.password !== data.confirmNewPassword)
    return "Passwords don't match";

  return false;
};

// returns false if input is valid and no error
// returns a string if input is invalid with the error message
const checkForInvalidInput = (input, config, data, specialCharsWhitelist) => {
  const { key, validate } = config;

  let valid = true;

  // use custom validation defined in json
  if (validate) {
    const { required, minLength, maxLength, custom } = config.validate;

    if (required && !input) {
      return "This field is required.";
    }

    if (minLength && input.length < minLength) {
      return `Minimum length of ${minLength} required.`;
    }

    if (maxLength && input.length > maxLength) {
      return `Maximum length of ${maxLength} exceeded.`;
    }

    if (custom) {
      // eslint-disable-next-line no-eval
      eval(custom);
      if (valid !== true) return valid;
    }
  }

  // if all checks have passed, do one final check for special chars for string values.
  // specialCharsWhitelist is defined in database's Settings
  // extra chars can be added in component's config under specialCharWhitelist array
  const alphanumeric = /[A-Za-z0-9 ]/;
  const allowedSpecialChars = config?.allowedSpecialChars || "";
  const whitelist = allowedSpecialChars + specialCharsWhitelist;

  if (typeof data[key] === "string" && !config.wysiwyg) {
    for (const ch of data[key]) {
      if (!alphanumeric.test(ch) && !whitelist.includes(ch))
        return `${ch} character is not allowed.`;
    }
  }

  return false;
};
export default validateFormFields;
