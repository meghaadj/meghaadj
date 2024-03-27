import { Box, Typography } from "@mui/material";

const createLabel = (config) => {
  if (config.hideLabel) {
    return <Box></Box>;
  }

  const label = config?.label || "";
  const required = config?.validate?.required || false;
  const requiredAsterisk = (
    <Typography color="error" component="span" sx={{ display: "inline" }}>
      *
    </Typography>
  );

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold" }}>
        {label}&nbsp;{required && requiredAsterisk}
      </Typography>
    </Box>
  );
};

export default createLabel;
