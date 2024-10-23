// Login.js
import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl mb-4 text-center">Iniciar Sesión</h2>
      <form className="bg-white p-6 rounded shadow-md">
        <input
          type="email"
          placeholder="Correo Electrónico"
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 mb-4 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-500"
        >
          Iniciar Sesión
        </button>
      </form>
      <p className="mt-4">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="text-blue-600">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}

export default Login;
