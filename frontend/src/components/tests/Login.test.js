import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";

// Mock del contexto de autenticación
jest.mock("../../context/AuthContext.js", () => ({
  useAuth: () => ({
    login: jest.fn(),
    error: null,
    successMessage: null,
  }),
}));

describe("Login Component", () => {
  test("renderiza el formulario de login", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: /Iniciar Sesión/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Correo Electrónico/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Iniciar Sesión/i })
    ).toBeInTheDocument();
  });

  test("permite escribir en los campos y enviar el formulario", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/Correo Electrónico/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));
    // Aquí podrías verificar que la función login fue llamada, si la mockeas correctamente
  });
});
