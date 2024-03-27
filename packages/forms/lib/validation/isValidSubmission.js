import { getSettings, ObjectId } from "../queries/index.js";

const isValidSubmission = async (req, form, data) => {
  if (!form || !data) return false;

  const specialCharsWhitelist = await getSettings(
    req,
    "SPECIAL_CHARS_WHITELIST",
  );
  const components = form.components || [];

  for (const component of components) {
    if (await hasError(component, data, specialCharsWhitelist, req, form)) {
      return false;
    }
  }

  return true;
};

const hasError = async (component, data, specialCharsWhitelist, req, form) => {
  const { key, type } = component;

  switch (type) {
    case "panel":
      for (const panelComponent of component.components) {
        if (await hasError(panelComponent, data, specialCharsWhitelist, req, form)) {
          return true;
        }
      }
      break;

    case "datagrid":
      for (const rowData of data[key]) {
        for (const datagridComponent of component.components) {
          if (
            hasError(
              datagridComponent,
              rowData,
              specialCharsWhitelist,
              req,
              form,
            )
          ) {
            return true;
          }
        }
      }
      break;

    case "password":
      return false;

    default:
      const input = data[key] || "";
      if (
        await hasInvalidInput(
          input,
          component,
          data,
          specialCharsWhitelist,
          req,
          form,
        )
      ) {
        return true;
      }
  }

  return false;
};

const hasInvalidInput = async (
  input,
  config,
  data,
  specialCharsWhitelist,
  req,
  form,
) => {
  const { key, validate, unique } = config;
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

  if (unique && key !== "uuid") {
    const existsAlready = await uniqueFieldCheck(input, form, key, req);
    if (existsAlready) return existsAlready;
  }

  // if all checks have passed, do one final check for special chars for string values.
  // specialCharsWhitelist is defined in database's Settings
  // extra chars can be added in component's config under specialCharWhitelist array
  const alphanumeric = /[A-Za-z0-9]/;
  const allowedSpecialChars = config?.allowedSpecialChars || "";
  const whitelist = allowedSpecialChars + specialCharsWhitelist;

  if (typeof data[key] === "string") {
    for (const ch of data[key]) {
      if (!alphanumeric.test(ch) && !whitelist.includes(ch)) {
        return `${ch} character is not allowed.`;
      }
    }
  }

  return false;
};

const uniqueFieldCheck = async (input, form, key, req) => {
  const collectionName = form.collectionName || "Submissions";
  try {
    const filter = {
      form: ObjectId(form._id),
      [`data.${key}`]: input,
      deleted: null,
    };

    const submission = await req.backend.models[collectionName].findOne(filter);

    if (submission) {
      return `${key} should be unique`;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export default isValidSubmission;
