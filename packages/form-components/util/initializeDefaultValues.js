import dayjs from "dayjs";

import setDefaultValue from "./setDefaultValue";

const initializeDefaultValues = (components, submission, data, setData) => {
  let initialData = {};

  for (const component of components) {
    setDefaultValue(component, data, initialData);
  }

  if (submission?.data) {
    initialData = { ...initialData, ...submission.data };
  }

  // All date strings need to be converted to dayjs objects
  for (const component of components) {
    convertDates(component, initialData);
  }

  setData(initialData);
};

const convertDates = (component, data) => {
  const key = component.key;

  switch (component.type) {
    case "datetime":
      data[key] = dayjs(data[key]);
      break;

    case "panel":
      for (const panelComponent of component.components) {
        convertDates(panelComponent, data);
      }
      break;

    case "datagrid":
      for (const rowData of data[key]) {
        for (const datagridComponent of component.components) {
          convertDates(datagridComponent, rowData);
        }
      }
      break;

    default:
      break;
  }
};

export default initializeDefaultValues;
