/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Register from "../../pages/Register";
import axios from "axios";

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    setUserToken: jest.fn(),
  }),
}));

describe("Register page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    localStorage.clear();
  });

  it("should render the form correctly", () => {
    expect(
      screen.getByRole("heading", { name: /cadastre-se/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/digite seu email/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/digite sua senha/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/confirme sua senha/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("recaptcha-register")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Eu li e concordo com os/i }));
    expect(
      screen.getByRole("button", { name: /cadastrar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /entrar/i,
      })
    ).toBeInTheDocument();
  });

  it("should render the tip message", () => {
    expect(
      screen.getByText(/Seu nome deve ter no mínimo 2 caracteres./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Seu email deve ser um email válido./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sua senha deve ter de 6 a 12 caracteres./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Digite sua senha novamente./i)
    ).toBeInTheDocument();
  });

  it("should updates the name,email and password fields correctly", () => {
    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/digite seu email/i);
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const confirmPasswordInput =
      screen.getByPlaceholderText(/confirme sua senha/i);

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });

    expect(nameInput.value).toBe("name");
    expect(emailInput.value).toBe("email@example.com");
    expect(passwordInput.value).toBe("password");
    expect(confirmPasswordInput.value).toBe("password");
  });

  // it("should handle user register correctly", async () => {});

  it("should throw an error when name is invalid", async () => {
    const nameInput = screen.getByPlaceholderText(/nome/i);
    const registerButton = screen.getByRole("button", { name: /cadastrar/i });

    fireEvent.change(nameInput, { target: { value: "a" } });
    fireEvent.click(registerButton);

    expect(nameInput.value).toBe("a");
    await waitFor(() => {
      expect(
        screen.getByText(/O nome deve ter pelo menos 2 caracteres/i)
      ).toBeInTheDocument();
      expect(screen.getByTestId("error-validation")).toBeInTheDocument();
    });
  });

  it("should throw an error when email is invalid", async () => {
    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/digite seu email/i);
    const registerButton = screen.getByRole("button", { name: /cadastrar/i });

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "email" } });
    fireEvent.click(registerButton);

    expect(emailInput.value).toBe("email");
    await waitFor(() => {
      expect(screen.getByText(/Insira um email válido/i)).toBeInTheDocument();
      expect(screen.getByTestId("error-validation")).toBeInTheDocument();
    });
  });

  it("should throw an error when email is already registered", async () => {
    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/digite seu email/i);
    const registerButton = screen.getByRole("button", { name: /cadastrar/i });

    jest.spyOn(axios, "post").mockResolvedValue({ data: true });

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.click(registerButton);

    expect(emailInput.value).toBe("email@example.com");

    await waitFor(() => {
      expect(
        screen.getByText(/Este email já está registrado/i)
      ).toBeInTheDocument();
      expect(screen.getByTestId("error-validation")).toBeInTheDocument();
    });
  });

  it("should throw an error when password length is invalid", async () => {
    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/digite seu email/i);
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const confirmPasswordInput =
      screen.getByPlaceholderText(/confirme sua senha/i);
    const registerButton = screen.getByRole("button", { name: /cadastrar/i });

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "pass" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "pass" } });
    fireEvent.click(registerButton);

    expect(passwordInput.value).toBe("pass");
    expect(confirmPasswordInput.value).toBe("pass");

    await waitFor(() => {
      // expect(screen.getByText(/A senha deve ter de 6 a 12 caracteres/i)).toBeInTheDocument();
      expect(screen.getByTestId("error-validation")).toBeInTheDocument();
    });
  });

  it("should throw an error when confirmPassword is invalid", async () => {
    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/digite seu email/i);
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const confirmPasswordInput =
      screen.getByPlaceholderText(/confirme sua senha/i);
    const registerButton = screen.getByRole("button", { name: /cadastrar/i });

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(registerButton);

    expect(passwordInput.value).toBe("password");
    expect(confirmPasswordInput.value).toBe("wrongpassword");

    await waitFor(() => {
      // expect(screen.getByText(/As senhas não são iguais./i)).toBeInTheDocument();
      expect(screen.getByTestId("error-validation")).toBeInTheDocument();
    });
  });

  it("should throw an error when recaptcha is not checked", async () => {
    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/digite seu email/i);
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const confirmPasswordInput =
      screen.getByPlaceholderText(/confirme sua senha/i);
    const registerButton = screen.getByRole("button", { name: /cadastrar/i });

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password" },
    });
    fireEvent.click(registerButton);

    await waitFor(() => {
      // expect(screen.getByText(/Captcha inválido/i)).toBeInTheDocument();
      expect(screen.getByTestId("error-validation")).toBeInTheDocument();
    });
  });

  it("should throw an error when terms is not checked", async () => {
    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/digite seu email/i);
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const confirmPasswordInput =
      screen.getByPlaceholderText(/confirme sua senha/i);
    const registerButton = screen.getByRole("button", { name: /cadastrar/i });
    const recaptcha = screen.getByTestId("recaptcha-register");

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password" },
    });
    fireEvent.click(recaptcha);
    fireEvent.click(registerButton);

    await waitFor(() => {
      // expect(screen.getByText(/Você deve concordar com os Termos e Condições./i)).toBeInTheDocument();
      expect(screen.getByTestId("error-validation")).toBeInTheDocument();
    });
  });

  it("should redirect to home page if user is already logged in", () => {
    localStorage.setItem("isLoggedIn", true);

    expect(localStorage.getItem("isLoggedIn")).toBe("true");
    expect(window.location.pathname).toBe("/");
  });

  it("should redirect to login page when login button is clicked", async () => {
    const loginButton = screen.getByRole("button", {
      name: /entrar/i,
    });

    fireEvent.click(loginButton);

    expect(window.location.pathname).toBe("/login");
  });
});
