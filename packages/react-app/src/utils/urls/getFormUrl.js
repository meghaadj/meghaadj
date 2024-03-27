import { FormIds } from "enums";
import appConfig from "appConfig";

const getFormUrl = (formName) => {
  if (!formName || !FormIds[formName]) {
    console.log("Error retrieving id for form:", formName);
    return null;
  }

  const formId = FormIds[formName];
  return appConfig.FORMS_URL + "/form/" + formId;
};

export default getFormUrl;
