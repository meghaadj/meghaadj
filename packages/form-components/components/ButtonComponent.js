import { useContext, useState } from "react";
import { Button, Grid } from "@mui/material";
import { FormContext } from "../DynamicForm";
import { findFirstError } from "../util";
import ConfirmationModal from "./ConfirmationModal";

// Currently all buttons behave as a submit button
const ButtonComponent = (props) => {
  const { config } = props;
  const { data, errors, handleSubmit, prevData, setPrevData } =
    useContext(FormContext);

  const disabled = config?.disabled || false;
  const gridWidth = config?.gridWidth || 12;
  const label = config?.label || "";

  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    // invalid submission with at least one error, let handleSubmit handle the error
    if (findFirstError(errors) !== null) {
      handleSubmit();
      return;
    }

    // duplicated submission, happens when user clicks submit twice in a row with same data
    // open a modal asking user to confirm whether they want to submit same data again
    if (JSON.stringify(data) === JSON.stringify(prevData)) {
      setOpenModal(true);
      return;
    }

    setPrevData({ ...data });
    handleSubmit();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleModalYes = () => {
    setPrevData({ ...data });
    handleSubmit();
    handleCloseModal();
  };

  const handleModalNo = () => {
    handleCloseModal();
  };

  if (config.hidden || config.viewOnly) {
    return <></>;
  }

  return (
    <Grid item xs={gridWidth}>
      <Button disabled={disabled} onClick={handleClick} variant="contained">
        {label}
      </Button>
      <ConfirmationModal
        handleYes={handleModalYes}
        handleNo={handleModalNo}
        onClose={handleCloseModal}
        open={openModal}
      />
    </Grid>
  );
};

export { ButtonComponent };
