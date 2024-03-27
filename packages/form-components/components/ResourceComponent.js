/* eslint-disable no-eval, no-unused-vars */
import { useState, useEffect, useContext } from "react";
import {
  Autocomplete,
  Chip,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

import { useDebouncedValue } from "../custom-hooks";
import { FormContext } from "../DynamicForm";
import { createLabel } from "../util";

const ResourceComponent = (props) => {
  const { config, updateField } = props;
  const { data, errors, formsUrl, showErrors, token } = useContext(FormContext);

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  let defaultValue = config?.multiple ? [] : null;
  defaultValue = data[config.key] ? data[config.key] : defaultValue;

  const [value, setValue] = useState(defaultValue);

  const debouncedSearch = useDebouncedValue(input, 1000);

  const disabled = config?.disabled || false;
  const multiple = config?.multiple || false;
  const label = createLabel(config);
  const key = config?.key;
  const gridWidth = config?.gridWidth || 12;
  const placeholder = config?.placeholder || "";
  const viewOnly = config?.viewOnly || false;

  let hasError = false;
  let errorMessage = "";
  if (showErrors) {
    hasError = errors[key] ? true : false;
    errorMessage = errors[key];
  }

  useEffect(() => {
    if (disabled) return;
    const fetchResource = async () => {
      try {
        setLoading(true);

        const resource = config.resource;
        const url = formsUrl + "/form/" + resource + "/submissions";
        const headers = {
          "x-jwt-token": token,
        };
        const queryParams = {
          limit: config.limit || 50,
          selectFields: config.selectFields || null,
          searchField: config.searchField || null,
          searchValue: debouncedSearch,
        };

        const response = await axios.get(url, {
          headers: headers,
          params: queryParams,
        });

        const submissions = response.data.submissions;
        setOptions(submissions);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching resource", error);
      }
    };
    fetchResource();
  }, [config, debouncedSearch, disabled, formsUrl, open, token]);

  const handleAutocompleteChange = (event, newValue) => {
    setValue(newValue);
    updateField(key, newValue);
  };

  if (config.hidden) {
    return <></>;
  }

  if (viewOnly) {
    return (
      <Grid item xs={gridWidth}>
        {label}
        {multiple ? (
          value?.length &&
          value?.map((sel, i) => {
            const label = getOptionLabel(sel, config, data);
            return <Chip label={label} />;
          })
        ) : (
          <Box>{value && getOptionLabel(value, config, data)}</Box>
        )}
      </Grid>
    );
  }

  return (
    <Grid item xs={gridWidth}>
      {label}
      <Autocomplete
        multiple={multiple}
        id={key}
        disabled={disabled}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        options={options}
        loading={loading}
        inputValue={input}
        isOptionEqualToValue={(option, item) => option._id === item._id}
        onInputChange={(_event, newInputValue) => {
          setInput(newInputValue);
        }}
        value={value}
        onChange={handleAutocompleteChange}
        getOptionLabel={(item) => getOptionLabel(item, config, data)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={placeholder}
            InputProps={{
              style: { height: !multiple ? "40px" : "unset", padding: 0 },
              ...params.InputProps,
              endAdornment: <>{params.InputProps.endAdornment}</>,
            }}
          />
        )}
      />
      {hasError && (
        <Grid item xs={12}>
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

const getOptionLabel = (item, config, data) => {
  let option = item?._id || "(Object undefined)";

  if (config.optionTemplate) {
    eval(config.optionTemplate);
  }

  return option;
};

export { ResourceComponent };
