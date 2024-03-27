import { Grid, Typography } from "@mui/material";

const HtmlComponent = (props) => {
  const { config } = props;
  const hide = config.hidden;
  const className = config?.className || "";
  const content = config?.content || "";
  const gridWidth = config?.gridWidth || 12;
  const tag = config?.tag || "h6";
  const textAlign = config.textAlign || "";

  return (
    !hide && (
      <Grid item xs={gridWidth}>
        <Typography
          className={className}
          sx={{ textAlign: textAlign }}
          variant={tag}
        >
          {content}
        </Typography>
      </Grid>
    )
  );
};

export { HtmlComponent };
