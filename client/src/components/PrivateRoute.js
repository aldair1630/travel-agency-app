import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ajusta la ruta según tu estructura

const PrivateRoute = () => {
  const { user } = useAuth(); // Asumiendo que `user` es el estado de autenticación

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
