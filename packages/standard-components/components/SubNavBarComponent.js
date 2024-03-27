import { Box, Stack } from "@mui/material";
import SubNavBarButtonComponent from "./SubNavBarButtonComponent";

const SubNavBarComponent = (props) => {
  const buttons = props.buttons || [];

  return (
    <Box>
      <Stack direction="row" spacing={0.5} paddingY={1}>
        {buttons.map((e) => (
          <SubNavBarButtonComponent {...e} style={props.style} />
        ))}
      </Stack>
    </Box>
  );
};
export default SubNavBarComponent;
