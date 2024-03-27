// calculates the starting value of a field and updates initialData object
const setDefaultValue = (component, data, initialData) => {
  const { key, type, multiple } = component;

  if (type === "panel") {
    for (const panelComponent of component.components) {
      setDefaultValue(panelComponent, data, initialData);
    }
    return;
  }

  const defaultValueMap = {
    checkbox: false,
    datagrid: [],
    datetime: "",
    email: "",
    file: [],
    hidden: [],
    password: "",
    phoneNumber: "",
    radio: "",
    resource: multiple ? [] : null,
    select: multiple ? [] : "",
    textarea: "",
    textfield: "",
  };

  // some components don't require default values
  if (!defaultValueMap.hasOwnProperty(type)) return;

  let value = defaultValueMap[type];
  if (component.defaultValue) {
    if (component.type === "select") {
      value = multiple ? [component.defaultValue] : component.defaultValue;
    } else {
      value = component.defaultValue;
    }
  }

  if (component.customDefaultValues) {
    // eslint-disable-next-line no-eval
    eval(component.customDefaultValue); // calculates value e.g "value = 'abc';"
  }
  initialData[key] = value;
};

export default setDefaultValue;
