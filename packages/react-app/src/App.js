import { Box } from "@mui/material";
import { observer } from "mobx-react";
import { PaginationTable, TableHeaders } from "standard-components";
import { UserTableBody } from "components/tables/customer";
import { getFormUrl } from "utils/urls";
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
  const apiUrl = getFormUrl("USER") + "/submissions";
  const headers = [
    "Email Address",
    "First Name",
    "Last Name",
    "Address",
    "Age",
    "Gender",
  ];

  return (
    <Box>
      <UserForm />
    </Box>
  );
};

export default observer(App);
