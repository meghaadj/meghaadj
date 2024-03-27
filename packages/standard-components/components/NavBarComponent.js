import {
  AppBar,
  Box,
  Stack,
  ThemeProvider,
  Toolbar,
  Avatar,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import IWSLogo from "standard-components/assets/iws-logo.png";
import { useNavigate } from "react-router-dom";
import NavBarButtonComponent from "./NavBarButtonComponent";
import NavBarStackComponent from "./NavBarStackComponent";

const theme = createTheme({
  palette: {
    dark: {
      main: "#181818",
      contrastText: "#ffffff",
    },
  },
});

const NavBarComponent = (props) => {
  const navigate = useNavigate();

  const buttons = props.buttons || { leftButtons: [], rightButtons: [] };

  const mapFn = (e, i) => {
    if (e.arr && Array.isArray(e.arr)) {
      return <NavBarStackComponent {...e} key={i} />;
    }
    return (
      <NavBarButtonComponent
        title={e.title}
        onClick={e.onClick}
        key={e.title + i}
      />
    );
  };

  return (
    <Box data-testid="navbar">
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="dark">
          <Toolbar variant="dense">
            <Stack direction="row" spacing={0}>
              <Avatar
                sx={{
                  height: "45px",
                  width: "45px",
                  background: "#181818",
                  "&:hover": {
                    cursor: "pointer",
                    background: "#e9015a",
                  },
                }}
                src={IWSLogo}
                alt="IWS Logo"
                onClick={() => navigate("/")}
              />
              {buttons.leftButtons.map(mapFn)}
            </Stack>
            <Stack direction="row" spacing={0} marginLeft="auto">
              {buttons.rightButtons.map(mapFn)}
            </Stack>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
};

export default NavBarComponent;
