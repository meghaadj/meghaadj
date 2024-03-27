const validateMultiple = async (components, data) => {
  let multipleValidation = {
    validationStatus: false,
    validationErrMsg: "",
  };

  await Promise.all(
    components.map(async (component) => {
      const { key, label, multiple } = component;

      if (multiple === true) {
        // Check if the 'multiple' property in the component is true and verify if the corresponding data is an array.
        if (key in data && !Array.isArray(data[key])) {
          multipleValidation.validationErrMsg = {
            [key]: `${label} must be array`,
          };
          multipleValidation.validationStatus = true;
        }
      }
    }),
  );
  return multipleValidation;
};

export default validateMultiple;
