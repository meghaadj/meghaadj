import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { TableBody, TableCell, TableRow } from "@mui/material";

const UserTableBody = (props) => {
  const { data = [] } = props;

  return (
    <TableBody>
      {data.map((user) => (
        <TableRow key={user._id}>
          <TableCell>
            <Link to={`/user/${user._id}`}>{user.data.email}</Link>
          </TableCell>
          <TableCell>{user.data.firstName}</TableCell>
          <TableCell>{user.data.lastName}</TableCell>
          <TableCell>{user.data.address}</TableCell>
          <TableCell>{user.data.age}</TableCell>
          <TableCell>{user.data.gender}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default observer(UserTableBody);
