import { useEffect } from "react";

import appConfig from "appConfig";

// Component that only exists to redirect to IDP
// Ensure IDP_URl is defined in each app's env variables and appConfig.js
const LoginRedirect = () => {
  const IDP_URL = appConfig.IDP_URL;
  useEffect(() => {
    window.location.href = IDP_URL;
  }, [IDP_URL]);

  return <></>;
};

export default LoginRedirect;
