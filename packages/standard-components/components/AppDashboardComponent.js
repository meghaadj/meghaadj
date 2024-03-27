import AppButton from "./AppButtonComponent";
import { Box } from "@mui/material";

const canva = {
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20%",
  width: "100%",
};

const AppDashboardComponent = (props) => {
  const apps = props.apps || [];
  if (apps.length === 0)
    apps.push({
      title: "Unable to Load Applications",
      onClick: () => alert("Error: Unable to load applications"),
    });
  return (
    <Box sx={canva}>
      {apps.map((e, i) => (
        <AppButton
          title={e.title}
          onClick={e.onClick}
          iconName={e.iconName}
          key={e.title + i}
        />
      ))}
    </Box>
  );
};

export default AppDashboardComponent;
