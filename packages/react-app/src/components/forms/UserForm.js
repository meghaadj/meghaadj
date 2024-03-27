import { useForm } from "form-components";
import { Box } from "@mui/material";
import { observer } from "mobx-react";
import { authStore, modalStore } from "stores";
import { getFormUrl } from "utils/urls";
import appConfig from "appConfig";

const UserForm = (props) => {
  const redirectAfterSubmission = props.redirectAfterSubmission;
  const submission = props.submission || null;
  const viewOnly = props.viewOnly || false;
  const userFormUrl = getFormUrl("USER");

  const form = useForm(
    userFormUrl,
    {
      formsUrl: appConfig.FORMS_URL,
      redirectAfterSubmission: redirectAfterSubmission,
      submission: submission,
      viewOnly: viewOnly,
      callbackFunction: (data) => {
        modalStore.closeUserCreationModal();
        openUserServicesModal(data);
      },
    },
    authStore.token
  );

  return <Box data-testid="user-form">{form}</Box>;
};

export default observer(UserForm);
