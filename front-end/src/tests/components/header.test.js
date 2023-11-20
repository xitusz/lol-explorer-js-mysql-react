/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import Header from "../../components/Header";

describe("Header component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("when user is not logged in", () => {
    it("should render login and register buttons", () => {
      const { getByText } = render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

      const loginButton = getByText(/login/i);
      const registerButton = getByText(/cadastro/i);

      expect(loginButton).toBeInTheDocument();
      expect(registerButton).toBeInTheDocument();
    });

    it("should redirect to login page when login button is clicked", () => {
      const { getByText } = render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

      const loginButton = getByText(/login/i);
      fireEvent.click(loginButton);

      expect(window.location.pathname).toBe("/login");
    });

    it("should redirect to register page when register button is clicked", () => {
      const { getByText } = render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

      const registerButton = getByText(/cadastro/i);
      fireEvent.click(registerButton);

      expect(window.location.pathname).toBe("/register");
    });
  });

  describe("when user is logged in", () => {
    beforeEach(() => {
      localStorage.setItem("user", JSON.stringify("name"));
    });

    it("should render profile and exit buttons", () => {
      const { getByText } = render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

      const profileButton = getByText(/perfil/i);
      const exitButton = getByText(/sair/i);

      expect(profileButton).toBeInTheDocument();
      expect(exitButton).toBeInTheDocument();
    });

    it("should redirect to profile page when profile button is clicked", () => {
      const { getByText } = render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

      const profileButton = getByText(/perfil/i);
      fireEvent.click(profileButton);

      expect(window.location.pathname).toBe("/profile");
    });

    it("should clear user and isLoggedIn in localStorage and redirect to login page when exit button is clicked", () => {
      localStorage.setItem("isLoggedIn", true);

      const { getByText } = render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

      const exitButton = getByText(/sair/i);
      fireEvent.click(exitButton);

      expect(localStorage.getItem("user")).toBeNull();
      expect(localStorage.getItem("isLoggedIn")).toBeNull();
      expect(window.location.pathname).toBe("/login");
    });
  });

  describe("navigation", () => {
    it("should renders correctly", () => {
      const { getByText } = render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

      expect(getByText(/início/i)).toBeInTheDocument();
      expect(getByText(/personagens/i)).toBeInTheDocument();
    });

    it("should redirect to home page when home button is clicked", () => {
      const { getByText } = render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

      const homeButton = getByText(/início/i);
      fireEvent.click(homeButton);

      expect(window.location.pathname).toBe("/");
    });

    it("should redirect to character page when character button is clicked", () => {
      const { getByText } = render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

      const characterButton = getByText(/personagens/i);
      fireEvent.click(characterButton);

      expect(window.location.pathname).toBe("/character");
    });

    it("should render display button on small screens", () => {
      window.innerWidth = 600;

      const { getByTestId, getByText } = render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

      const navLinksButton = getByTestId("navlinks-button");
      expect(navLinksButton).toBeInTheDocument();

      fireEvent.click(navLinksButton);

      expect(getByText(/início/i)).toBeInTheDocument();
      expect(getByText(/personagens/i)).toBeInTheDocument();
    });
  });
});
