import { useContext } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Grid, Typography } from "@mui/material";
import { FormContext } from "../DynamicForm";
import createLabel from "../util/createLabel";

const TextAreaComponent = (props) => {
  const { config, updateField } = props;
  const { data, errors, showErrors } = useContext(FormContext);
  const label = createLabel(config);

  const disabled = config?.disabled || false;
  const gridWidth = config?.gridWidth || 12;
  const minRows = config?.rows ? parseInt(config.rows) : 3;
  const key = config?.key;
  const placeholder = config?.placeholder || "";

  const valueRef = props?.valueRef || data[key];

  let hasError = false;
  let errorMessage = "";
  if (showErrors) {
    hasError = errors[key] ? true : false;
    errorMessage = errors[key];
  }

  const handleTextChange = (event) => {
    updateField(key, event.target.value);
  };

  if (config.hidden) {
    return <></>;
  }

  if (config.viewOnly) {
    return (
      <Grid item xs={gridWidth}>
        {label}
        <Typography
          dangerouslySetInnerHTML={{
            __html: valueRef,
          }}
        ></Typography>
      </Grid>
    );
  }

  return (
    <Grid item xs={gridWidth}>
      {label}
      <TextareaAutosize
        id={key}
        disabled={disabled}
        minRows={minRows}
        onChange={handleTextChange}
        placeholder={placeholder}
        style={{
          borderRadius: "4px",
          fontSize: "16px",
          fontFamily: "Helvetica, sans-serif",
          padding: "8px",
          width: "98%",
        }}
        value={valueRef}
        variant="outlined"
      />
      {hasError && (
        <Grid item xs={12}>
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export { TextAreaComponent };
