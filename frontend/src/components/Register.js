// Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register, error, successMessage } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
    if (!error) {
      navigate("/login"); // Redirigir después del registro
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl mb-4">Registro</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 mb-4 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          className="border p-2 mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 mb-4 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-500"
        >
          Registrarse
        </button>
      </form>
      <p className="mt-4">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="text-blue-600">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}

export default Register;
