// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setSuccessMessage("Inicio de sesión exitoso");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const register = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setSuccessMessage("Registro exitoso");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setSuccessMessage("Has cerrado sesión exitosamente");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, error, successMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
