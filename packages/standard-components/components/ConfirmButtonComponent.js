import { Box, Button } from "@mui/material";

const ConfirmButton = (props) => {
  const handleClick = props.handleClick || (() => {});
  const text = props.text || "Confirm Delete";

  return (
    <Box>
      <Button
        sx={{
          marginLeft: "auto",
          marginTop: "5px",
          backgroundColor: "#e9035a",
          color: "white",
          "&:hover": {
            backgroundColor: "#1976d2",
          },
        }}
        onClick={handleClick}
      >
        {text}
      </Button>
    </Box>
  );
};

export default ConfirmButton;
