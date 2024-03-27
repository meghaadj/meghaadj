import { TableCell, TableHead, TableRow, Typography } from "@mui/material";

const TableHeaders = (props) => {
  const headers = props.headers || [];

  return (
    <TableHead>
      <TableRow>
        {headers?.map((header) => (
          <TableCell key={header}>
            <Typography fontWeight="bold">{header}</Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaders;
