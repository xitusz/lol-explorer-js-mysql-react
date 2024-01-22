/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Login from "../../pages/Login";

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    setUserToken: jest.fn(),
  }),
}));

describe("Login page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should render the form correctly", () => {
    expect(
      screen.getByRole("heading", { name: /conectar-se/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/email@example.com/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*********")).toBeInTheDocument();
    expect(screen.getByTestId("recaptcha-login")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /cadastre-se/i })
    ).toBeInTheDocument();
  });

  it("should update the email and password fields correctly", () => {
    const emailInput = screen.getByPlaceholderText(/email@example.com/i);
    const passwordInput = screen.getByPlaceholderText("*********");

    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(emailInput.value).toBe("email@example.com");
    expect(passwordInput.value).toBe("password");
  });

  // it("should handle user login correctly", () => {});

  // it("should throw an error when email or password is invalid", () => {});

  it("should throw an error when recaptcha is not checked", () => {
    const emailInput = screen.getByPlaceholderText(/email@example.com/i);
    const passwordInput = screen.getByPlaceholderText("*********");
    const loginButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(loginButton);

    expect(screen.getByText("Captcha inválido")).toBeInTheDocument();
    expect(localStorage.getItem("isLoggedIn")).toBeNull();
  });

  it("should redirect to home page if user is already logged in", () => {
    localStorage.setItem("isLoggedIn", true);

    expect(localStorage.getItem("isLoggedIn")).toBe("true");
    expect(window.location.pathname).toBe("/");
  });

  it("should redirect to register page when register button is clicked", async () => {
    const registerButton = screen.getByRole("button", {
      name: /cadastre-se/i,
    });

    fireEvent.click(registerButton);

    expect(window.location.pathname).toBe("/register");
  });
});
