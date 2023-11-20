/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Register from "../../pages/Register";

describe("Register page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render the form correctly", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", { name: /cadastre-se/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/email@example.com/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*********")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /cadastrar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /entrar/i,
      })
    ).toBeInTheDocument();
  });

  it("should updates the name,email and password fields correctly", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/email@example.com/i);
    const passwordInput = screen.getByPlaceholderText("*********");

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(nameInput.value).toBe("name");
    expect(emailInput.value).toBe("email@example.com");
    expect(passwordInput.value).toBe("password");
  });

  it("should set item in local storage with user name,email and password when Register button is clicked and redirect to login page", async () => {
    const user = {
      name: "name",
      email: "email@example.com",
      password: "password",
      favorites: [],
    };

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/email@example.com/i);
    const passwordInput = screen.getByPlaceholderText("*********");
    const registerButton = screen.getByRole("button", { name: /cadastrar/i });

    fireEvent.change(nameInput, {
      target: { value: user.name },
    });
    fireEvent.change(emailInput, {
      target: { value: user.email },
    });
    fireEvent.change(passwordInput, { target: { value: user.password } });
    fireEvent.click(registerButton);

    expect(localStorage.getItem("userData")).toBe(JSON.stringify([user]));
    expect(window.location.pathname).toBe("/login");
  });

  it("should throw an error when name is invalid", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/email@example.com/i);
    const passwordInput = screen.getByPlaceholderText("*********");
    const registerButton = screen.getByRole("button", { name: /cadastrar/i });

    fireEvent.change(nameInput, { target: { value: "a" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(registerButton);

    expect(
      screen.getByText("O nome deve ter pelo menos 2 caracteres")
    ).toBeInTheDocument();
  });

  it("should throw an error when email is invalid", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/email@example.com/i);
    const passwordInput = screen.getByPlaceholderText("*********");
    const registerButton = screen.getByRole("button", { name: /cadastrar/i });

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "wrongemail" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(registerButton);

    expect(screen.getByText("Insira um email válido")).toBeInTheDocument();
  });

  it("should throw an error when password is invalid", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/email@example.com/i);
    const passwordInput = screen.getByPlaceholderText("*********");
    const registerButton = screen.getByRole("button", { name: /cadastrar/i });

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    fireEvent.click(registerButton);

    expect(
      screen.getByText("A senha deve ter de 6 a 12 caracteres")
    ).toBeInTheDocument();
  });

  it("should throw an error when email is already registered", () => {
    const user = {
      name: "name",
      email: "email@example.com",
      password: "password",
    };

    localStorage.setItem("userData", JSON.stringify([user]));

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/email@example.com/i);
    const passwordInput = screen.getByPlaceholderText("*********");
    const registerButton = screen.getByRole("button", { name: /cadastrar/i });

    fireEvent.change(nameInput, { target: { value: user.name } });
    fireEvent.change(emailInput, {
      target: { value: user.email },
    });
    fireEvent.change(passwordInput, { target: { value: user.password } });
    fireEvent.click(registerButton);

    expect(screen.getByText("Email já registrado")).toBeInTheDocument();
  });

  it("should redirect to home page if user is already logged in", () => {
    localStorage.setItem("isLoggedIn", true);

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(localStorage.getItem("isLoggedIn")).toBeTruthy();
    expect(window.location.pathname).toBe("/");
  });

  it("should redirect to login page when login button is clicked", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", {
      name: /entrar/i,
    });
    fireEvent.click(loginButton);

    expect(window.location.pathname).toBe("/login");
  });
});
