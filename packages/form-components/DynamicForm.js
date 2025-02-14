import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import { useOnce } from "./custom-hooks";
import {
  findFirstError,
  initializeDefaultValues,
  scrollToElementId,
  showToast,
  validateFormFields,
  validateUniqueField,
  validateMultiple,
} from "./util";
import FormComponent from "./FormComponent";
import "./forms.css";

export const FormContext = createContext();

const DynamicForm = (props) => {
  const { formJson, submission, buttonDisabled, customErrorHandler } = props;
  const { components, specialCharsWhitelist } = formJson;
  const useToasts = formJson.useToasts || false;
  const clearState = formJson.clearState || false;
  const formsUrl =
    props.formsUrl ||
    process.env.REACT_APP_FORMS_URL ||
    "http://localhost:4000";
  const token = props.token || null;
  const callbackFunction = props.callbackFunction || undefined;

  const confirmationModal = props.confirmationModal || false;
  const redirectAfterSubmission = props.redirectAfterSubmission ?? !useToasts;
  const navigate = useNavigate();

  /* "data" stores the current state of the form.
  - It will update as users fill out the form
  - Data object will be sent as a post request when form is submitted
  - Example data object below:
    - companyName is a TextField component
    - contact is a PhoneNumber component
    - employees is a DataGrid component
      - id is autogenerated with datagrids and used as the key of a row
      - name is a TextField component
      - dateStarted is a DateTime component
      - fullTime is a Checkbox component
  
  - {
      companyName: "IWS",
      contact: "0412 345 6789",
      employees: [
        {
          id: 1,
          name: "Jane Doe",
          dateStarted: "2023-10-19T13:00:00.000Z",
          fullTime: true,
        },
        {
          id: 2,
          name: "Michael Carrick",
          dateStarted: "2023-11-29T13:00:00.000Z",
          fullTime: false,
        },
      ],
    }
  */
  const [data, setData] = useState({});

  /* "errors" stores the current state for validation checks
  - key corresponds to the key of a form component
  - value will be false if the input is valid
  - value will be a message string if input is invalid
  - this string will be displayed as error message to user
  - In this example, contact field has an error while all other fields are valid
  - {
      companyName: false,
      contact: "contact must be in format of xxxx-xxx-xxx",
      employees: [
        {
          name: false,
          dateStarted: false,
          fullTime: false,
        },
        {
          name: false
          dateStarted: false,
          fullTime: false,
        },
      ]
    };
  */
  const [errors, setErrors] = useState({});

  /* red error text on fields is only displayed when showErrors is true
    - showErrors is set to true after submit button is clicked the first time 
  */
  const [showErrors, setShowErrors] = useState(false);

  /* stores the data that was submitted when submit button is clicked
    - this is used to detect any duplicate submission
    - if user tries to submit exact same data twice in a row, a confirmation modal 
        will pop up.
  */
  const [prevData, setPrevData] = useState({});

  useOnce(() => {
    initializeDefaultValues(components, submission, data, setData);
  });

  useEffect(() => {
    if (customErrorHandler) {
      customErrorHandler(errors);
    }
  }, [customErrorHandler, errors]);

  // Error state needs to update whenever data state changes.
  useEffect(() => {
    const newErrors = {};
    validateFormFields(components, data, newErrors, specialCharsWhitelist);
    setErrors(newErrors);
  }, [data, components, specialCharsWhitelist]);

  const updateField = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const updateError = (key, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [key]: value }));
  };
  const handleValidation = async (
    validationFn,
    setErrorsFn,
    components,
    data,
    token,
    formJson
  ) => {
    const validation = await validationFn(components, data, token, formJson);

    if (validation?.validationStatus) {
      const errorMsg = validation.validationErrMsg;
      const key = Object.keys(errorMsg)[0];
      setErrorsFn((prevErrors) => ({ ...prevErrors, [key]: errorMsg[key] }));
      return true;
    }

    return false;
  };

  const handleSubmit = async () => {
    setShowErrors(true);
    // Check unique validation for form elements
    const uniqueValidation = await handleValidation(
      validateUniqueField,
      setErrors,
      components,
      data,
      token,
      formJson
    );
    if (uniqueValidation) return;
    // Check multiple validation for form elements
    const multipleValidation = await handleValidation(
      validateMultiple,
      setErrors,
      components,
      data,
      token,
      formJson
    );
    if (multipleValidation) return;

    const firstErrorKey = findFirstError(errors);
    const valid = firstErrorKey === null;

    /* if toasts are used, 
      - show green popup for successful submission
      - show red popup for invalid submission
    */
    if (useToasts) {
      showToast(valid, formJson);
    }

    if (!valid) {
      scrollToElementId(firstErrorKey);
      return;
    }

    const headers = {
      "x-jwt-token": token,
    };

    let response;
    let submissionUrl =
      process.env.REACT_APP_FORMS_URL + "/form/" + formJson._id;

    /* if submission prop is provided and submission object has _id property
      - we use put request to update existing submission
      - otherwise we use post request to create new submission
    */
    if (!confirmationModal) {
      if (submission?._id) {
        submissionUrl += "/submission/" + submission._id;
        response = await axios.put(
          submissionUrl,
          { data: data },
          { headers: headers }
        );
      } else {
        response = await axios.post(
          submissionUrl,
          { data: data },
          { headers: headers }
        );
      }

      /* if redirectAfterSubmission is true,
      - redirect to the route specified by "path" in json configuration with the new id
    */
      if (redirectAfterSubmission) {
        const path = formJson.path || "/";
        const id = response.data.submission._id;
        navigate(`/${path}/${id}`);
      }
    }
    /**
     * If you need to add some actions after you submit the data from the form,
     * passing the function to this submitFunction in the frontend useForm hook submitFuntion object
     */
    if (callbackFunction) {
      callbackFunction(data);
      // console.log(prevData)
    }

    if (clearState) {
      setTimeout(() => {
        initializeDefaultValues(components, submission, data, setData);
      }, 100);
    }
  };

  return (
    <FormContext.Provider
      value={{
        errors,
        formsUrl,
        handleSubmit,
        token,
        data,
        setData,
        prevData,
        setPrevData,
        setErrors,
        showErrors,
        setShowErrors,
      }}
    >
      <ToastContainer />
      <Container data-testid="dynamic-form">
        <Grid container rowSpacing={2}>
          {components.map((component, index) => (
            <FormComponent
              key={index}
              config={component}
              updateError={updateError}
              updateField={updateField}
              buttonDisabled={buttonDisabled}
            />
          ))}
        </Grid>
      </Container>
      <DataAndErrorStates data={data} errors={errors} />
    </FormContext.Provider>
  );
};

// Component that shows the current values of the data and error states
// To be used during dev work and unit testing
const DataAndErrorStates = ({ data, errors }) => {
  return (
    <Container>
      <Box>
        Current State (shown for dev work):
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
      <Box>
        Current Error State (shown for dev work):
        <pre>{JSON.stringify(errors, null, 2)}</pre>
      </Box>
    </Container>
  );
};

export default DynamicForm;
