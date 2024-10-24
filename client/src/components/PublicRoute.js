import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ajusta la ruta según tu estructura

const PublicRoute = ({ restricted }) => {
  const { user } = useAuth();

  return user && restricted ? <Navigate to="/home" replace /> : <Outlet />;
};

export default PublicRoute;
