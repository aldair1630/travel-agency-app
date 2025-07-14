import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../Register";

// Mock del contexto de autenticación
jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    register: jest.fn(),
    error: null,
    successMessage: null,
  }),
}));

describe("Register Component", () => {
  test("renderiza el formulario de registro", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(screen.getByText(/Registro/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nombre/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Correo Electrónico/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Registrarse/i })
    ).toBeInTheDocument();
  });

  test("permite escribir en los campos y enviar el formulario", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Correo Electrónico/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Registrarse/i }));
    // Aquí podrías verificar que la función register fue llamada, si la mockeas correctamente
  });
});
