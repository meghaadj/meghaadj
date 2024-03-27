import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SubNavBarButtonComponent = (props) => {
  const navigate = useNavigate();

  const text = props.text || "";
  const linkTo = props.linkTo;
  const style = props.style || {};
  const sx = {
    backgroundColor: "#dcdde1",
    color: "#1a1a1a",
    textTransform: "none",
    paddingY: 1.5,
    "&:hover": {
      backgroundColor: "#e9015a",
    },
    ...style,
  };

  const handleClick = () => {
    if (props.handleClick) props.handleClick();
    if (linkTo) navigate(linkTo);
  };

  return (
    <Button
      data-testid="navbar-link"
      onClick={handleClick}
      variant="contained"
      sx={sx}
    >
      <Typography
        sx={{
          fontSize: "14px",
        }}
        variant="h6"
      >
        {text}
      </Typography>
    </Button>
  );
};

export default SubNavBarButtonComponent;
