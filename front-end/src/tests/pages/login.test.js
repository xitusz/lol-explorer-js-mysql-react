/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Login from "../../pages/Login";

describe("Login page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render the form correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", { name: /conectar-se/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/email@example.com/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*********")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /cadastre-se/i })
    ).toBeInTheDocument();
  });

  it("should update the email and password fields correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/email@example.com/i);
    const passwordInput = screen.getByPlaceholderText("*********");

    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(emailInput.value).toBe("email@example.com");
    expect(passwordInput.value).toBe("password");
  });

  it("should set item in local storage with user email and password when Login button is clicked and redirect to home page", async () => {
    const user = {
      name: "name",
      email: "email@example.com",
      password: "password",
      favorites: [],
    };

    localStorage.setItem("userData", JSON.stringify([user]));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/email@example.com/i);
    const passwordInput = screen.getByPlaceholderText("*********");
    const loginButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: user.email } });
    fireEvent.change(passwordInput, { target: { value: user.password } });
    fireEvent.click(loginButton);

    expect(localStorage.getItem("isLoggedIn")).toBe("true");
    expect(JSON.parse(localStorage.getItem("user"))[0]).toEqual({
      name: user.name,
      email: user.email,
      favorites: [],
    });
    expect(JSON.parse(localStorage.getItem("user"))).not.toBe(user.password);
    expect(window.location.pathname).toBe("/");
  });

  it("should throw an error when email or password is invalid", async () => {
    const user = {
      name: "name",
      email: "email@example.com",
      password: "password",
    };

    localStorage.setItem("userData", JSON.stringify([user]));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/email@example.com/i);
    const passwordInput = screen.getByPlaceholderText("*********");
    const loginButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, {
      target: { value: "wrongemail@example.com" },
    });
    fireEvent.change(passwordInput, { target: { value: user.password } });
    fireEvent.click(loginButton);

    expect(screen.getByText("Email ou senha inválida")).toBeInTheDocument();
    expect(localStorage.getItem("isLoggedIn")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });

  it("should redirect to home page if user is already logged in", () => {
    localStorage.setItem("isLoggedIn", true);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(localStorage.getItem("isLoggedIn")).toBeTruthy();
    expect(window.location.pathname).toBe("/");
  });

  it("should redirect to register page when register button is clicked", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const registerButton = screen.getByRole("button", {
      name: /cadastre-se/i,
    });
    fireEvent.click(registerButton);

    expect(window.location.pathname).toBe("/register");
  });
});
