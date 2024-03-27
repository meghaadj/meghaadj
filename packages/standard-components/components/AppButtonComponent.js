import * as icons from "@mui/icons-material";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const IconStyle = { color: "#2a73ba", fontSize: 60 };
const StyledContainer = styled(Box)({
  padding: "20px",
  fontSize: "24px",
  width: "150px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "gray",
  },
});

const StyledIcon = styled(Box)({
  homeItemsIcon: {
    paddingBottom: "10px",
  },
});

const AppButton = (props) => {
  const Icon = icons[props.iconName] || icons.CropSquare;
  return (
    <StyledContainer onClick={props.onClick}>
      <StyledIcon>
        <Icon sx={IconStyle} />
      </StyledIcon>
      <Box>{props.title}</Box>
    </StyledContainer>
  );
};

export default AppButton;
