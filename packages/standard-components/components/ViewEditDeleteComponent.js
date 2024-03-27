import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useForm } from "form-components";
import { axios } from "../services";

import { authStore } from "stores";
import ConfirmButton from "./ConfirmButtonComponent";

const ViewEditDeleteComponent = (props) => {
  const initialValue = props.initialValue || "view";
  const [value, setValue] = useState(initialValue);
  const [submission, setSubmission] = useState();
  const navigator = useNavigate();
  const { formUrl, id, token } = props;

  const parentUrl = props.parentUrl || "/";
  const label = props.label || "";

  const noEdit = props.noEdit || false;
  const noDelete = props.noDelete || false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${formUrl}/submission/${id}`);
        setSubmission(result.data.submission);
      } catch (error) {
        console.log(error)
        navigator(parentUrl);
      }
    };

    fetchData();
    return () => {
      setSubmission();
    };
  }, [id, formUrl, navigator, parentUrl, value]);

  const form = useForm(
    formUrl,
    {
      submission: submission,
      viewOnly: value === "view" ? true : false,
    },
    authStore.token,
  );

  const handleChange = (_event, value) => {
    setValue(value);
  };

  const handleDelete = async () => {
    const headers = {
      "x-jwt-token": token,
    };

    try {
      const response = await axios.delete(`${formUrl}/submission/${id}`, {
        headers: headers,
      });
      if (response.status === 200) navigator(parentUrl);
    } catch (error) {
      console.error("Failed to delete");
    }
  };

  const checkNo = (type) => {
    if (type === "edit" && noEdit) return true;
    if (type === "delete" && noDelete) return true;
    if (label === "Payroll Report" || label === "Bookkeeping Report") {
      if (submission?.data?.published) return true;
    }
    return false;
  };

  return (
    <Box sx={{ marginBottom: "20px" }}>
      <Typography fontSize={30}>{label}</Typography>
      <Tabs
        indicatorColor="primary"
        onChange={handleChange}
        textColor="primary"
        value={value}
      >
        <Tab label="View" value="view" />
        {!checkNo("edit") && <Tab label="Edit" value="edit" />}
        {!checkNo("delete") && <Tab label="Delete" value="delete" />}
      </Tabs>

      <Divider />
      {submission && value !== "delete" && form}
      {value === "delete" && (
        <Box sx={{ margin: "20px" }}>
          <Box sx={{ marginBottom: "10px" }}>
            Are you sure you want to delete this {label}?
          </Box>
          <ConfirmButton handleClick={handleDelete}>Delete</ConfirmButton>
        </Box>
      )}
    </Box>
  );
};

export default observer(ViewEditDeleteComponent);
