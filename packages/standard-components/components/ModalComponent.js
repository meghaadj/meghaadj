import { Box, Modal } from "@mui/material";

const Style = {
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -25%)",
  bgcolor: "background.paper",
  border: "1px solid transparent",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
  overflowY: "auto",
  p: 4,
  position: "absolute",
  width: 'fit-content',
  maxHeight: "80vh",
};

const ModalComponent = (props) => {
  const { handleClose, open, styles, Components } = props;

  const ModalStyle = {
    ...Style,
    ...styles,
  };

  if (!handleClose || !open || !Components) return;
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={ModalStyle}>{Components}</Box>
    </Modal>
  );
};

export default ModalComponent;
