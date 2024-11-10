// PrivateRoute.tsx
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Layout from "./Layout";

const PrivateRoute: React.FC = () => {
  const isAuthenticated = true;

  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
