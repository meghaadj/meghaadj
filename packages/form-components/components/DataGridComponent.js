/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useContext } from "react";
import {
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add as AddIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { FormContext } from "../DynamicForm";
import { setDefaultValue } from "../util";
import FormComponent from "../FormComponent";

const DataGridComponent = (props) => {
  const { config, updateField } = props;
  const { data, errors } = useContext(FormContext);
  const hide = config.hidden;
  const columns = config?.components;
  const gridWidth = config?.gridWidth || 12;
  const key = config?.key;
  const label = config?.label || "";

  const [rowIndexCounter, setRowIndexCounter] = useState(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let tempRow = data[key];
    setRows(tempRow);
    updateField(key, tempRow);
  }, []);

  const updateRow = (key, value, indexId) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) =>
        row.indexId === indexId ? { ...row, [key]: value } : row,
      );
      return updatedRows;
    });
  };

  const addRow = () => {
    const newRow = {
      indexId: rowIndexCounter + 1,
    };

    setRowIndexCounter((prev) => {
      return prev + 1;
    });

    for (const column of columns) {
      setDefaultValue(column, data, newRow);
    }

    setRows((prevRows) => {
      return [...prevRows, newRow];
    });
  };

  const deleteRow = (indexId) => {
    const updatedRows = rows.filter((row) => row.indexId !== indexId);
    setRows(updatedRows);
  };

  return (
    !hide && (
      <Grid item xs={gridWidth}>
        <Typography variant="h6">{label}</Typography>
        <Table id={key} sx={{ marginY: "10px", border: "3px solid #ccc" }}>
          <DataGridHeaders columns={columns} />
          <TableBody>
            <DataGridRows
              columns={columns}
              data={data}
              deleteRow={deleteRow}
              errors={errors}
              rows={rows}
              updateRow={updateRow}
            />
            <AddAnotherButton addRow={addRow} columnLength={columns.length} />
          </TableBody>
        </Table>
      </Grid>
    )
  );
};

const DataGridHeaders = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.key}>
            <Typography fontWeight="bold">{column.label}</Typography>
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

const DataGridRows = (props) => {
  const { columns, data, deleteRow, errors, rows, updateRow } = props;
  const content = [];

  if (rows.length === 0) {
    return <></>;
  }

  for (const row of rows) {
    content.push(
      <TableRow key={row.indexId}>
        {columns.map((column) => {
          return (
            <TableCell
              width={column.width}
              key={column.key + row.indexId}
              sx={{ padding: 1, verticalAlign: "top" }}
            >
              <FormComponent
                config={column}
                data={data}
                errors={errors}
                hideLabel={true}
                updateField={(key, value) => updateRow(key, value, row.indexId)}
                valueRef={row[column.key]}
              />
            </TableCell>
          );
        })}
        <DeleteRowButton deleteRow={deleteRow} index={row.indexId} />
      </TableRow>,
    );
  }
  return <>{content}</>;
};

const AddAnotherButton = ({ columnLength, addRow }) => {
  return (
    <TableRow>
      <TableCell colSpan={columnLength + 1}>
        <Button variant="contained" onClick={addRow}>
          <AddIcon />
          Add Another
        </Button>
      </TableCell>
    </TableRow>
  );
};

const DeleteRowButton = ({ deleteRow, index }) => {
  return (
    <TableCell width="5%" sx={{ padding: 0 }}>
      <IconButton onClick={() => deleteRow(index)} size="large">
        <CancelIcon fontSize="large" />
      </IconButton>
    </TableCell>
  );
};

export { DataGridComponent };
