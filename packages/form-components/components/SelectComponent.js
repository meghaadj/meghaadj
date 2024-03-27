import { useContext } from "react";
import { Grid, MenuItem, Select, Typography, Box } from "@mui/material";
import { FormContext } from "../DynamicForm";
import createLabel from "../util/createLabel";

const SelectComponent = (props) => {
  const { config, updateField } = props;
  const { data, errors, showErrors } = useContext(FormContext);

  const disabled = config?.disabled || false;
  const gridWidth = config?.gridWidth || 12;
  const key = config?.key;
  const label = createLabel(config);
  const selectOptions = config?.data?.values || [];
  const multiple = config?.multiple || false;

  const handleSelectChange = (event) => {
    updateField(key, event.target.value);
  };

  let hasError = false;
  let errorMessage = "123";
  if (showErrors) {
    hasError = errors[key] ? true : false;
    errorMessage = errors[key];
  }

  if (config?.hidden) {
    return <></>;
  }

  if (config.viewOnly) {
    return (
      <Grid item xs={gridWidth}>
        {label}
        {multiple ? (
          data[key].length &&
          data[key].map((sel, i) => (
            <Box sx={{ paddingTop: "10px" }} key={i}>{`${
              i + 1
            }. ${getOptionLabel(sel, config.data.values)}`}</Box>
          ))
        ) : (
          <Box>
            {data[key] && getOptionLabel(data[key], config.data.values)}{" "}
          </Box>
        )}
      </Grid>
    );
  }

  return (
    <Grid item xs={gridWidth}>
      {label}
      <Select
        multiple={multiple}
        disabled={disabled}
        id={key}
        error={hasError}
        onChange={handleSelectChange}
        sx={{ width: "100%" }}
        value={data[key]}
      >
        {selectOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
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

const getOptionLabel = (item, values) => {
  const option = values.find((option) => option.value === item);
  return option?.label;
};

export { SelectComponent };
