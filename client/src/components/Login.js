import React, { /*useContext*/ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { AuthContext } from "../context/AuthContext";

function Login() {
  // const { login, error, successMessage } = useContext(AuthContext);
  const { login, error, successMessage } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (!error) {
      navigate("/home"); // Redirigir después del inicio de sesión
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl mb-4 text-center">Iniciar Sesión</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
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
          Iniciar Sesión
        </button>
      </form>
      <div className="flex justify-evenly w-full mt-4">
        <p>
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-600">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
