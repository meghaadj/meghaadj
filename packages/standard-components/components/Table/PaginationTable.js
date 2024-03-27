import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import {
  Box,
  Icon,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableContainer,
  Typography,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import { axios } from "standard-components/services";
import { downloadcsv } from "standard-components/utils/downloadcsv.js";
import { authStore } from "stores";
import LinkButton from "./LinkButton";

const PaginationTable = (props) => {
  const {
    apiUrl,
    createNewBtn,
    download = {},
    tableHeadersRenderer,
    tableBodyRenderer,
    title = "",
    titleIcon = <Icon />,
    pagination = true,
    queryParams,
    styles
  } = props;
  const bgColor = styles?.backgroundColor || '#2a72ba';
  const border = styles?.border || 'none';
  const color = styles?.color || '#ffffff';
  const linkColor = styles?.linkColor || '#0000EE';

  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [page, setPage] = useState(1);
  const numPages = Math.ceil(dataLength / 10);

  useEffect(() => {
    if (!authStore.token) return;

    const fetchData = async () => {
      try {
        const params = { ...queryParams };
        params.page = page;
        params.limit = queryParams?.limit || 10;
        params.sort = queryParams?.sort || {};

        const response = await axios.get(apiUrl, {
          params: params,
        });
        const { count, submissions } = response.data;
        setData(submissions);
        setDataLength(count);
      } catch (error) {
        console.log("Error fetching reports:", error);
      }
    };

    fetchData();
  }, [apiUrl, page, queryParams]);

  const handlePageChange = (_event, value) => {
    setPage(value);
  };

  const tableHeaders = tableHeadersRenderer(data);
  const tableBody = tableBodyRenderer(data);

  const tableStyle = {
    // Applies to odd table rows
    "& tbody tr:nth-of-type(odd)": {
      backgroundColor: "#f9f9f9",
    },

    // Applies to all table cells
    "& .MuiTableCell-root": { paddingY: 1 },

    // Applies to all Links from react-router
    "& a": {
      color: linkColor,
    },
  };

  const handleExport = async () => {
    const { name, url, formId } = download;
    return downloadcsv(url, formId, name, queryParams, authStore.token);
  };

  return (
    <Box sx={{
      border: border,
    }}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: bgColor,
          color: color,
          padding: 2,
          fontSize: 15,
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: "100%",
            fontSize:"1.1rem",
          }}
        >
          {titleIcon}
          {title}
          {download?.option && (
            <IconButton
              onClick={handleExport}
              sx={{ fontSize: "15px", color: "#ffffff", marginLeft: "auto" }}
            >
              <CloudDownloadIcon />{" "}
              <Typography sx={{ marginLeft: "8px" }}>Export CSV</Typography>
            </IconButton>
          )}
        </Stack>
      </Box>

      <TableContainer component={Paper}>
        <Box sx={{ padding: 1 }}>
          <Table sx={tableStyle}>
            {tableHeaders}
            {tableBody}
          </Table>
        </Box>

        {pagination && data.length > 0 && (
          <Pagination
            color="primary"
            count={numPages}
            page={page}
            onChange={handlePageChange}
            siblingCount={5}
            sx={{ marginY: 2 }}
          />
        )}
        {createNewBtn && (
          <LinkButton
            text={createNewBtn.label}
            linkTo={createNewBtn.to}
            handleClick={createNewBtn.handleClick}
            style={{ margin: "1rem", paddingY: 1, backgroundColor: "#2a72ba" }}
          />
        )}
      </TableContainer>
    </Box>
  );
};

export default observer(PaginationTable);
