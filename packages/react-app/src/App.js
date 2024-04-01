import { Box } from "@mui/material";
import { observer } from "mobx-react";
import { PageTitle } from "standard-components";
import UserForm from "components/forms/UserForm";

const App = () => {
  return (
    <Box>
      <PageTitle title="Users" />
      <UserTable />
    </Box>
  );
};

const UserTable = () => {
  return (
    <Box>
      <UserForm />
    </Box>
  );
};

export default observer(App);
