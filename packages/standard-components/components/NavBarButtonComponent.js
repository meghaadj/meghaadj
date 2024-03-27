import { Button, Typography } from "@mui/material";

const sx = {
  backgroundColor: "#181818",
  textTransform: "none",
  paddingY: 1.5,
  "&:hover": {
    backgroundColor: "#e9015a",
  },
};

const NavBarButtonComponent = (props) => {
  return (
    <Button
      data-testid="navbar-link"
      onClick={props.onClick}
      variant="contained"
      sx={sx}
    >
      <Typography
        sx={{
          fontSize: "14px",
        }}
        variant="h6"
      >
        {props.title}
      </Typography>
    </Button>
  );
};

export default NavBarButtonComponent;
