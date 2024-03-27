import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import { authStore } from "stores";
import appConfig from "appConfig";

const HandleRedirect = (props) => {
  const IDP_URL = appConfig.IDP_URL;
  const location = useLocation();
  const allowedRoles = props.allowedRoles || [];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token") ?? Cookies.get("token-iws");

    if (!token) {
      window.location.href = IDP_URL;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      Cookies.remove("token-iws");

      // token expired
      if (decodedToken.exp < currentTime) {
        window.location.href = IDP_URL;
      }

      // user doesn't have a role with permission to access current app
      if (!decodedToken.roles.some((role) => allowedRoles.includes(role))) {
        window.location.href = IDP_URL;
      }

      // No expiry time argument provided means the cookie lasts until session ends
      Cookies.set("token-iws", token);
      delete decodedToken.data.password;
      authStore.setUser(decodedToken);
      authStore.setToken(token);
    } catch (error) {
      console.log("Token error", error);
      window.location.href = IDP_URL;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default HandleRedirect;
