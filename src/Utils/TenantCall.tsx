import axios, { Method } from "axios";
import Constants from "./Constants";
import fire from './Toast';

type APICallParams = {
  Url: string;
  Method: Method;
  Data?: unknown; 
  timeoutOverride?: number;
  silent?: boolean;
};

export default async function TenantCall({
  Url,
  Method,
  Data = null,
  timeoutOverride,
  silent = false,
}: APICallParams) {
  const authToken = sessionStorage.getItem("token");
  const tenant = sessionStorage.getItem("tenantId");

  if (authToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  }

  if (tenant) {
    axios.defaults.headers.common["tenant"] = tenant;
  }

  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.withCredentials = true;

  axios.interceptors.response.use(
    (response) => {
      if (response?.data?.authorization) {
        sessionStorage.setItem("token", response.data.authorization);
      }
      return response;
    },
    (error) => {
      return Promise.reject(error.response || error);
    }
  );

  // Call the method instead of accessing a property
  const baseUrl = Constants.getTenantUrl();

  try {
    const timeout = timeoutOverride || parseInt(process.env.REACT_APP_REQUEST_TIMEOUT || "30000", 10);

    const response = await axios({
      method: Method,
      url: `${baseUrl}${Url.trim()}`,
      data: Data,
      timeout: timeout,
    });

    if (!response.status || response.status === 0) {
      if (!silent) {
        fire("error", "It seems you are not connected to the internet. Please check your network connection and try again.");
      }
      return null;
    }

    if (response.status === 401) {
      sessionStorage.clear();
      window.location.href = "/";
      return null;
    }

    if (response.status >= 400 && response.status < 500) {
      const message = response.data?.message || "Your request is invalid. Please check and try again.";
      if (!silent) fire("warning", message);
      return null;
    }

    if (response.status >= 500) {
      const message = response.data?.message || "Your request cannot be processed at this moment. Please try again later.";
      if (!silent) fire("error", message);
      return null;
    }

    return response.data || { status: "success" };
  } catch (error) {
    if (!silent) {
      fire("error", "Your request generated an error. Please check your network connection.");
      console.error(error);
    }
    return null;
  }
}
