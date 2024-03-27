import { useContext } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

import { FormContext } from "../DynamicForm";
import createLabel from "../util/createLabel";

const DateTimeComponent = (props) => {
  const { config, updateField } = props;
  const { data, errors, showErrors } = useContext(FormContext);

  const disabled = config?.disabled || false;
  const gridWidth = config?.gridWidth || 12;
  const key = config?.key;
  const label = createLabel(config);

  const defaultValue = config?.defaultValue;
  const viewOnly = config?.viewOnly || false;

  const handleDateChange = (date) => {
    /* workaround to avoid off by 1 day errors when users select same date from different timezones
      - the date takes the value of the user's selection, converted from their local timezone to utc
      - e.g selecting 6th December 2023 in Australia/Sydney gets stored as 
        - 2023-12-05T13:00:0000Z which is 6/12/2023 12am in Sydney
        - however selecting 6th December from another timezone could result in the date being
        - 2023-12-06TXX:XX:0000Z which can cause potential issues
    */

    /* calculate offset and reverse it so all dates stored will be 12am utc regardless of user's timezone
        e.g Australia/Sydney will store the time as 2023-12-05T13:00:0000Z with +11 hour offset.
        by reversing the offset we shift the date to be 2023-12-06T00:00:0000Z

        e.g PST will store the time as 2023-12-06T08:00:0000Z with -8 hours offset.
        by reversing the offset we shift the date to be 2023-12-06T00:00:0000Z

        Note: getTimezoneOffset() adds the opposite sign to offset in minutes. 
        - So +11h offset returns -660 and -8h offset returns +480
    */
    const localDate = new Date(date);
    const offsetInMinutes = localDate.getTimezoneOffset();
    localDate.setMinutes(localDate.getMinutes() - offsetInMinutes);
    const result = dayjs(localDate);

    updateField(key, result);
  };

  let hasError = false;
  let errorMessage = "";
  if (showErrors) {
    hasError = errors[key] ? true : false;
    errorMessage = errors[key];
  }

  if (config.hidden) {
    return <></>;
  }

  if (viewOnly) {
    return (
      <Grid item xs={gridWidth}>
        {label}
        <Box sx={{ paddingTop: "10px" }}>{data[key].$d.toDateString()}</Box>
      </Grid>
    );
  }

  return (
    <Grid id={key} item xs={gridWidth}>
      {label}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disabled={disabled}
          error={true}
          format="DD/MM/YYYY"
          onChange={(newDate) => handleDateChange(newDate)}
          value={data[key]}
          defaultValue={dayjs(defaultValue)}
        />
      </LocalizationProvider>
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

export { DateTimeComponent };
