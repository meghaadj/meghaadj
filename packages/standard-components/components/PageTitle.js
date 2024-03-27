import { Box, Typography } from "@mui/material";

const PageTitle = (props) => {
  return (
    <Box sx={{ paddingY: 1 }}>
      <Typography variant="h4">{props.title}</Typography>
    </Box>
  );
};

export default PageTitle;
