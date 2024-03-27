import appConfig from "appConfig";

const getFormById = (formId) => {
  return appConfig.FORMS_URL + "/form/" + formId;
};

export default getFormById;
