import { useContext } from "react";
import { Button, Grid } from "@mui/material";
import EventEmitter from "events";
import { findFirstError } from "../util";

import { FormContext } from "../DynamicForm";

const eventEmitter = new EventEmitter();

const SecondaryButtonComponent = (props) => {
  const { config } = props;
  const { data, errors, handleSubmit } = useContext(FormContext);

  const disabled = config?.disabled || false;
  const gridWidth = config?.gridWidth || 12;
  const label = config?.label || "";

  const handleClick = async () => {
    if (config.event) {
      // Emit the specified event with the current data
      eventEmitter.emit(config.event, data);
    }
    if (findFirstError(errors) !== null) {
      handleSubmit();
      return;
    }
    handleSubmit();
  };

  if (config.hidden || config.viewOnly) {
    return <></>;
  }

  return (
    <Grid item xs={gridWidth}>
      <Button
        id={config.key}
        color="primary"
        variant="contained"
        disabled={disabled}
        onClick={handleClick}
      >
        {label}
      </Button>
    </Grid>
  );
};

export { SecondaryButtonComponent };
