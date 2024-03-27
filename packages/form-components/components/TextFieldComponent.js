import { useState, useContext } from "react";
import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import { FormContext } from "../DynamicForm";
import { createLabel } from "../util";
import { useCalculatedValue } from "../custom-hooks";

const TextFieldComponent = (props) => {
  const { config, updateField } = props;
  const { data, errors, showErrors } = useContext(FormContext);
  const label = createLabel(config);

  const [input, setInput] = useState("");

  const disabled = config?.disabled || false;
  const gridWidth = config?.gridWidth || 12;
  const key = config?.key;
  const placeholder = config?.placeholder || "";
  const variant = disabled ? "filled" : "outlined";
  const multiple = config?.multiple || false;

  const valueRef = props?.valueRef || data[key] || "";

  let hasError = false;
  let errorMessage = "";
  if (showErrors) {
    hasError = errors[key] ? true : false;
    errorMessage = errors[key];
  }

  useCalculatedValue(config, key, valueRef, updateField);

  const handleTextChange = (event) => {
    const input = event.target.value;
    updateField(key, input);
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
      {label}
      {multiple === true ? (
        <>
          <Autocomplete
            multiple
            disabled={disabled}
            freeSolo
            id={key}
            options={[]}
            inputValue={input}
            onInputChange={(_event, newInputValue) => {
              setInput(newInputValue);
            }}
            onChange={(_event, newValue) => {
              if (newValue.length === 0) {
                newValue = "";
              }
              updateField(key, newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant={variant}
                placeholder={placeholder}
                InputProps={{
                  style: { height: "40px", padding: 0 },
                  ...params.InputProps,
                  endAdornment: <>{params.InputProps.endAdornment}</>,
                }}
              />
            )}
          />
          {hasError && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error">
                {errorMessage}
              </Typography>
            </Grid>
          )}
        </>
      ) : (
        <TextField
          id={key}
          disabled={disabled}
          error={hasError}
          helperText={errorMessage}
          onChange={handleTextChange}
          placeholder={placeholder}
          sx={{ width: "100%" }}
          value={valueRef}
          variant={variant}
        />
      )}
    </Grid>
  );
};

export { TextFieldComponent };
