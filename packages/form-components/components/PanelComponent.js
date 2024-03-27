import { useContext } from "react";
import { AppBar, Box, Grid, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { FormContext } from "../DynamicForm";
import FormComponent from "../FormComponent";

const PanelComponent = (props) => {
  const { config, updateField } = props;
  const { data } = useContext(FormContext);
  const hide = config.hidden;
  const components = config?.components || [];
  const gridWidth = config?.gridWidth || 12;
  const fontWeight = config.fontWeight || "bold";

  const MUI_COLORS = [
    "primary",
    "secondary",
    "error",
    "warning",
    "info",
    "success",
    "light",
  ];

  const boxStyles = {
    textAlign: "left",
    border: "2px solid #F4F4F4",
  };

  const theme = createTheme({
    palette: {
      dark: {
        main: "#000000",
        contrastText: "#ffffff",
      },
      light: {
        main: "#ffffff",
        contrastText: "#000000",
      },
    },
  });

  let color = config.theme;
  if (color === "danger") {
    color = "error";
  } else if (!MUI_COLORS.includes(color)) {
    color = "dark";
  }

  return (
    !hide && (
      <Grid
        item
        md={gridWidth}
        style={boxStyles}
        marginY={1}
        sx={{
          backgroundColor: "white",
        }}
      >
        <Box marginTop={-2}>
          <ThemeProvider theme={theme}>
            <AppBar
              color={color}
              position="static"
              sx={{ paddingX: 2, paddingY: 1, boxShadow: "none !important" }}
            >
              <Typography fontWeight={fontWeight}>{config.title}</Typography>
            </AppBar>
          </ThemeProvider>

          <Grid container padding={2} rowSpacing={2} columnSpacing={4}>
            {components.map((component, index) => {
              return (
                <FormComponent
                  key={index}
                  config={component}
                  data={data}
                  updateField={updateField}
                />
              );
            })}
          </Grid>
        </Box>
      </Grid>
    )
  );
};

export { PanelComponent };
