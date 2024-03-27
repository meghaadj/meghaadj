import { useContext } from "react";
import { Grid, TextField } from "@mui/material";
import { FormContext } from "../DynamicForm";
import { createLabel } from "../util";

const PasswordComponent = (props) => {
  const { config, updateField } = props;
  const { data, errors, showErrors } = useContext(FormContext);
  const label = createLabel(config);

  const disabled = config?.disabled || false;
  const gridWidth = config?.gridWidth || 12;
  const key = config?.key;
  const placeholder = config?.placeholder || "";
  const variant = disabled ? "filled" : "outlined";

  const valueRef = props?.valueRef || data[key] || "";

  let hasError = false;
  let errorMessage = "";
  if (showErrors) {
    hasError = errors[key] ? true : false;
    errorMessage = errors[key];
  }

  const handleTextChange = (event) => {
    const input = event.target.value;
    updateField(key, input);
  };

  if (config.hidden || config.viewOnly) {
    return <></>;
  }

  return (
    <Grid item xs={gridWidth}>
      {label}
      <TextField
        id={key}
        disabled={disabled}
        error={hasError}
        helperText={errorMessage}
        onChange={handleTextChange}
        placeholder={placeholder}
        sx={{ width: "100%" }}
        type="password"
        value={valueRef}
        variant={variant}
      />
    </Grid>
  );
};

export { PasswordComponent };
