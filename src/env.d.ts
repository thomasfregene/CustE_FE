declare namespace NodeJS {
  interface ProcessEnv {
    VITE_APP_API_BASEURL: string;
    VITE_APP_BASEURL: string;
    VITE_APP_MAP: string;
    VITE_APP_SUBFOLDER: string;
    VITE_APP_REQUEST_TIMEOUT: string;
    // Add other environment variables you are using
  }
}
