import { useEffect, useContext } from "react";
import { calculateValue } from "../util";
import { FormContext } from "../DynamicForm";

// custom hook for components that use calculated values
// will run whenever data updates
export const useCalculatedValue = (config, key, valueRef, updateField) => {
  const { data } = useContext(FormContext);

  useEffect(() => {
    if (!config.calculateValue || config.viewOnly) return;

    const calculatedValue = calculateValue(config, data);

    if (calculatedValue && calculatedValue !== valueRef) {
      updateField(key, calculatedValue);
    }
  }, [config, updateField, valueRef, key, data]);
};
