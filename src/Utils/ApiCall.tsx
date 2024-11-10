import axios, { Method } from "axios";
import Constants from "./Constants";
import fire from "./Toast";

type APICallParams = {
  Url: string;
  Method: Method;
  Data?: unknown;
  timeoutOverride?: number;
  silent?: boolean;
};

export default async function APICall({
  Url,
  Method,
  Data = null,
  timeoutOverride,
  silent = false,
}: APICallParams) {
  console.log("APICall invoked", { Url, Method, Data });

  // Retrieve token and tenantId from session storage
  const authToken = sessionStorage.getItem("token");
  const tenantId = sessionStorage.getItem("tenantId");

  // Set default headers
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
    ...(tenantId && { tenant: tenantId }),
  };

  // Merge default headers with any custom headers passed in
  const combinedHeaders = { ...defaultHeaders };

  // Create an Axios instance with custom settings
  const axiosInstance = axios.create({
    baseURL: Constants.getApiBaseUrl(),
    headers: combinedHeaders,
    withCredentials: true,
  });

  // Add response interceptor for handling authorization and errors
  axiosInstance.interceptors.response.use(
    (response) => {
      if (response?.data?.authorization) {
        sessionStorage.setItem("token", response.data.authorization);
      }
      return response;
    },
    (error) => {
      const message =
        error.response?.data?.message || "An error occurred. Please try again.";
      console.error("API Error:", error.response); // Log complete error response
      fire("error", message); // Display error message via toast
      return Promise.reject(error);
    }
  );

  const fullUrl = `${Url.trim()}`;
  console.log("Full API URL:", fullUrl);

  try {
    // Use Vite's `import.meta.env` to retrieve the timeout value
    const timeout =
      timeoutOverride ||
      parseInt(import.meta.env.VITE_REQUEST_TIMEOUT || "30000", 10);
    console.log("Making API call:", {
      method: Method,
      url: fullUrl,
      data: Data,
    });

    const response = await axiosInstance({
      method: Method,
      url: fullUrl,
      data: Data,
      timeout: timeout,
    });

    // Check response status
    if (!response.status || response.status === 0) {
      if (!silent) {
        fire(
          "error",
          "It seems you are not connected to the internet. Please check your network connection and try again."
        );
      }
      return null;
    }

    // Handle specific HTTP status codes
    if (response.status === 401) {
      sessionStorage.clear();
      window.location.href = "/";
      return null;
    }

    if (response.status >= 400 && response.status < 500) {
      const message =
        response.data?.message ||
        "Your request is invalid. Please check and try again.";
      if (!silent) fire("warning", message);
      return null;
    }

    if (response.status >= 500) {
      const message =
        response.data?.message ||
        "Your request cannot be processed at this moment. Please try again later.";
      if (!silent) fire("error", message);
      return null;
    }

    return response.data || { status: "success" };
  } catch (error) {
    if (!silent) {
      fire(
        "error",
        "Your request generated an error. Please check your network connection."
      );
      console.error(error);
    }
    return null;
  }
}
