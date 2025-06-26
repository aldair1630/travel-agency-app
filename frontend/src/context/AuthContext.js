// AuthContext.js
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("AuthContext must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Error al iniciar sesión");
        setUser(null);
        return;
      }
      setUser(data.user);
      setSuccessMessage("Inicio de sesión exitoso");
      setError(null);
      localStorage.setItem("token", data.token);
    } catch (err) {
      setError("Error de red");
      setUser(null);
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Error al registrar");
        setUser(null);
        return;
      }
      setUser(data);
      setSuccessMessage("Registro exitoso");
      setError(null);
    } catch (err) {
      setError("Error de red");
      setUser(null);
    }
  };

  const logout = () => {
    setUser(null);
    setSuccessMessage("Has cerrado sesión exitosamente");
    setError(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, error, successMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
