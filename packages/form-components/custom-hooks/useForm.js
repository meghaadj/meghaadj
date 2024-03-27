/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import DynamicForm from "../DynamicForm";
import axios from "axios";

export const useForm = (formUrl, props = {}, token = null) => {
  const [formConfig, setFormConfig] = useState(null);
  const headers = {
    "x-jwt-token": token,
  };

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(formUrl, { headers: headers });
        if (response.status === 200) {
          const form = await response.data.form;

          // Use form in view only mode. All input fields will be disabled.
          if (props?.viewOnly) {
            viewOnlyAllComponents(form);
          }
          setFormConfig(form);
        } else {
          throw new Error("Failed to fetch form data");
        }
      } catch (error) {
        console.error(`Error fetching form at ${formUrl}`, error);
      }
    };
    fetchFormData();
  }, [formUrl, props.viewOnly]);

  return (
    formConfig && <DynamicForm formJson={formConfig} token={token} {...props} />
  );
};

const viewOnlyAllComponents = (form) => {
  for (const component of form.components) {
    viewOnlyComponent(component);
  }
};

const viewOnlyComponent = (component) => {
  component.viewOnly = true;
  const subComponents = component.components || [];
  for (const subComponent of subComponents) {
    viewOnlyComponent(subComponent);
  }
};
