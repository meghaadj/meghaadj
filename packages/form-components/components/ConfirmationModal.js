import { Box, Button, Modal } from "@mui/material";

const ConfirmationModal = (props) => {
  const { handleYes, handleNo, onClose, open } = props;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            You have already submitted this data previously. Are you sure you
            want to proceed with the submission again?
          </Box>
          <Button color="success" variant="contained" onClick={handleYes}>
            Yes, Submit Again.
          </Button>
          <Button color="error" variant="contained" onClick={handleNo}>
            No, Cancel Submission.
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
