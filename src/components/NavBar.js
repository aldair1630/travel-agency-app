// NavBar.js
import React, { useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importar el contexto de autenticación

const NavBar = () => {
  const { user, logout } = useAuth(); // Obtener el usuario y la función de logout
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/home">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="mr-[2px]"
              style={{
                height: "50px",
                width: "auto",
                marginRight: "10px",
              }}
            />
            <div className="text-white text-2xl font-bold">Travels CAAL</div>
          </div>
        </Link>

        {/* Icono de menú */}
        <div className="md:hidden" onClick={toggleMenu}>
          <div className="text-white cursor-pointer">
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </div>

        <ul
          className={`flex-row justify-end text-center absolute md:static bg-blue-600 md:flex md:space-x-4 transition-all duration-300 ease-in-out ${
            isOpen ? "top-16 -ml-4 w-full" : "top-[-200px]"
          } md:top-0`}
        >
          <li>
            <Link to="/home" className="text-white hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/destinations" className="text-white hover:text-gray-200">
              Destinations
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-gray-200">
              About
            </Link>
          </li>
          {user ? ( // Verificar si hay un usuario autenticado
            <>
              <li>
                <span className="text-white">
                  Hola, {user.displayName || user.email}
                </span>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-white hover:text-gray-200"
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="text-white hover:text-gray-200">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
