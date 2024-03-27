/* Check all values and nested values in errors object to find the first error
  - Returns the key of the first error
  - If no errors are found, returns null
  - Some values are arrays of objects e.g
  - The below example will return "contact"
  - {
      companyName: false,
      contact: "contact must be in format of xxxx-xxx-xxx",
      employees: [
        {
          name: false,
          dateStarted: false,
          fullTime: false,
        },
        {
          name: false
          dateStarted: false,
          fullTime: false,
        },
      ]
    };
*/

const findFirstError = (errors) => {
  for (const [key, value] of Object.entries(errors)) {
    if (value === false) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        const error = findFirstError(item);
        if (error) return error;
      }
      continue;
    }

    // At least one value is not false
    return key;
  }

  return null;
};

export default findFirstError;
