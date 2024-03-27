import axios from "axios";

const validateUniqueField = async (components, data, token, formJson) => {
  let uniqueValidation = {
    validationStatus: false,
    validationErrMsg: "",
  };

  await Promise.all(
    components.map(async (component) => {
      const { key, label, unique } = component;

      if (unique && key !== "uuid") {
        const headers = {
          "x-jwt-token": token,
        };
        let submissionUrl =
          process.env.REACT_APP_FORMS_URL + "/form/" + formJson._id;
        submissionUrl += `/submissions?data.${key}=${data[key]}`;

        try {
          const response = await axios.get(submissionUrl, { headers });

          if (response.status === 200 && response.data.count >= 1) {
            uniqueValidation.validationErrMsg = {
              [key]: `${label} should be unique`,
            };
            uniqueValidation.validationStatus = true;
          }
        } catch (error) {
          console.error(`Error fetching data at ${submissionUrl}`, error);
        }
      }
    }),
  );

  return uniqueValidation;
};

export default validateUniqueField;
