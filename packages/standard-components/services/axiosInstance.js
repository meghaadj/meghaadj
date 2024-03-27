import axios from "axios";

import { authStore } from "stores";
import appConfig from "appConfig";

const IDP_URL = appConfig.IDP_URL;

const axiosInstance = axios.create({});

// adds authStore.token in header of every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authStore.token || "";
    config.headers["x-jwt-token"] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Redirects to IDP if receiving any 401 unauthorized response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    window.location.href = IDP_URL;
  },
);

export default axiosInstance;
