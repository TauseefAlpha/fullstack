import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes: React.FC = () => {
  return !localStorage.getItem("accessToken") ? (
    <Outlet />
  ) : (
    <Navigate to="/home" replace />
  );
};

export default PublicRoutes;
