import { useContext } from "react";
import { Box, Grid, TextField } from "@mui/material";
import { FormContext } from "../DynamicForm";
import createLabel from "../util/createLabel";

const PhoneNumberComponent = (props) => {
  const { config, updateField } = props;
  const { data, errors, showErrors } = useContext(FormContext);

  const disabled = config?.disabled || false;
  const gridWidth = config?.gridWidth || 12;
  const key = config?.key;
  const label = createLabel(config);
  const placeholder = config?.placeholder || "";
  const valueRef = props.valueRef || data[key];

  let hasError = false;
  let errorMessage = "";
  if (showErrors) {
    hasError = errors[key] ? true : false;
    errorMessage = errors[key];
  }

  const handleChange = (event) => {
    updateField(key, event.target.value);
  };

  if (config.hidden) {
    return <></>;
  }

  if (config.viewOnly) {
    return (
      <Grid item xs={gridWidth}>
        {label}
        <Box sx={{ paddingTop: "10px" }}>{data[key]}</Box>
      </Grid>
    );
  }

  return (
    <Grid item xs={gridWidth}>
      <Box>{label}</Box>
      <Box>
        <TextField
          id={key}
          disabled={disabled}
          error={hasError}
          helperText={errorMessage}
          onChange={handleChange}
          placeholder={placeholder}
          sx={{ width: "100%" }}
          value={valueRef}
          variant="outlined"
        />
      </Box>
    </Grid>
  );
};

export { PhoneNumberComponent };
