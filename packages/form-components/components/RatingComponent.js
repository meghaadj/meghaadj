import { useContext } from "react";
import { Grid, Box, Rating, Typography } from "@mui/material";
import { FormContext } from "../DynamicForm";

const RatingComponent = (props) => {
  const { config, updateField } = props;
  const { data } = useContext(FormContext);
  const disabled = config?.disabled || false;
  const hide = config.hidden;
  const key = config?.key;
  const gridWidth = config?.gridWidth || 12;
  const label = config?.label;
  const maxValue = config?.values.length || 5;
  const defaultValue = config?.defaultValue || 0;
  const valueRef = data[key] || 0;

  const handleChange = (event) => {
    updateField(key, event.target.value);
  };

  if (config.hidden) {
    return <></>;
  }

  if (config.viewOnly) {
    return (
      <Grid item xs={gridWidth}>
        <Typography component="legend" sx={{ fontWeight: "bold" }}>
          {label}
        </Typography>
        <Box
          sx={{ paddingTop: "10px" }}
        >{`${+valueRef} out of ${maxValue}`}</Box>
      </Grid>
    );
  }

  return (
    !hide && (
      <Grid item xs={gridWidth}>
        <Box>
          <Typography component="legend">{label}</Typography>
          <Rating
            value={+valueRef}
            defaultValue={defaultValue}
            max={maxValue}
            onChange={handleChange}
            disabled={disabled}
          ></Rating>
        </Box>
      </Grid>
    )
  );
};

export { RatingComponent };
