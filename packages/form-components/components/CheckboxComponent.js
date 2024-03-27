import { useContext } from "react";
import { Checkbox, Grid, Typography, Box } from "@mui/material";
import { FormContext } from "../DynamicForm";
import createLabel from "../util/createLabel";

const CheckboxComponent = (props) => {
  const { config, updateField } = props;
  const { data, errors, showErrors } = useContext(FormContext);

  const disabled = config?.disabled || false;
  const gridWidth = config?.gridWidth || 12;
  const key = config.key;
  const label = createLabel(config);
  const viewOnly = config?.viewOnly || false;

  let hasError = false;
  let errorMessage = "";
  if (showErrors) {
    hasError = errors[key] ? true : false;
    errorMessage = errors[key];
  }

  const handleChange = (event) => {
    updateField(key, event.target.checked);
  };

  if (config.hidden) {
    return <></>;
  }

  if (viewOnly) {
    return (
      <Grid item xs={gridWidth}>
        {label}
        <Box sx={{ paddingTop: "10px" }}>{data[key] ? "Yes" : "No"}</Box>
      </Grid>
    );
  }

  return (
    <Grid item container alignItems="flex-start" xs={gridWidth}>
      <Grid item>
        <Checkbox
          id={key}
          checked={data[key] || false}
          color="primary"
          disabled={disabled}
          onChange={handleChange}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            width: "10px",
            height: "10px",
            marginRight: "10px",
          }}
          value={data[key]}
        />
      </Grid>
      <Grid item xs style={{ display: "flex", alignItems: "center" }}>
        {label}
      </Grid>
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

export { CheckboxComponent };
