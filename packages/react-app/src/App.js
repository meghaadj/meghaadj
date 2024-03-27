import {
  Box,
  Grid,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react";
import { PaginationTable, TableHeaders } from "standard-components";
import { UserTableBody } from "components/tables/customer";
import { getFormUrl } from "utils/urls";
import { PageTitle } from "standard-components";

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
    <PaginationTable
      apiUrl={apiUrl}
      queryParams={{}}
      tableHeadersRenderer={() => <TableHeaders headers={headers} />}
      tableBodyRenderer={(data) => <UserTableBody data={data} />}
      title="Users"
    />
  );
};

export default observer(App);
