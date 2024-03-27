import { toast } from "react-toastify";

const showToast = (valid, formJson) => {
  const successMessage = formJson.toastSuccessMessage || "Success";
  const errorMessage = formJson.toastErrorMessage || "Invalid";
  const toastDuration = formJson.toastDuration || 4000;

  const toastTheme = {
    autoClose: toastDuration,
    theme: "colored",
  };

  if (!valid) {
    toast.error(errorMessage, toastTheme);
    return;
  }

  toast.success(successMessage, toastTheme);
};

export default showToast;
