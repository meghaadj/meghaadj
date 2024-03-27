import { Grid } from "@mui/material";
import * as Form from "./components";

const FormComponent = (props) => {
  const { config, buttonDisabled } = props;
  const type = config.type;
  const hide = config.hidden;
  const componentMap = {
    button: Form.ButtonComponent,
    secondarybutton: Form.SecondaryButtonComponent,
    checkbox: Form.CheckboxComponent,
    datagrid: Form.DataGridComponent,
    datetime: Form.DateTimeComponent,
    email: Form.EmailComponent,
    file: Form.FileComponent,
    hidden: Form.HiddenComponent,
    htmlelement: Form.HtmlComponent,
    select: Form.SelectComponent,
    panel: Form.PanelComponent,
    password: Form.PasswordComponent,
    phoneNumber: Form.PhoneNumberComponent,
    radio: Form.RatingComponent,
    resource: Form.ResourceComponent,
    textarea: Form.TextAreaComponent,
    textfield: Form.TextFieldComponent,
  };

  if (type === "textarea" && config.wysiwyg) {
    return <Form.TextAreaEditorComponent {...props} />;
  }

  if (type === "button" && buttonDisabled) {
    return;
  }

  if (componentMap[type]) {
    const Field = componentMap[type];
    return <Field {...props}></Field>;
  } else {
    return (
      !hide && (
        <Grid item xs={12}>
          This is a {type} component. Form Components doesn't support {type}{" "}
          yet.
        </Grid>
      )
    );
  }
};

export default FormComponent;
