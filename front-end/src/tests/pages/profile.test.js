/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "../../pages/Profile";

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    setUserToken: jest.fn(),
  }),
}));

describe("Profile page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
  });

  it("should render the title correctly", () => {
    expect(
      screen.getByRole("heading", { name: /perfil/i })
    ).toBeInTheDocument();
  });

  it("should render the card correctly", () => {
    const settingIcon = screen.getByTestId("setting-icon");

    expect(
      screen.getByRole("heading", { name: /Bem Vindo,/i })
    ).toBeInTheDocument();
    expect(settingIcon.closest("a")).toHaveAttribute("href", "/profile/edit");
    expect(screen.getByTestId("email-icon")).toBeInTheDocument();
  });

  // it("should render the user info in card correctly", () => {});

  it("should render the favorites button", () => {
    const hideFavoritesButton = screen.getByRole("button", {
      name: /Ocultar Favoritos/i,
    });

    expect(hideFavoritesButton).toBeInTheDocument();
    expect(
      screen.getByText(/Nenhum favorito encontrado./i)
    ).toBeInTheDocument();

    fireEvent.click(hideFavoritesButton);

    const showFavoritesButton = screen.getByRole("button", {
      name: /Mostrar Favoritos/i,
    });

    expect(showFavoritesButton).toBeInTheDocument();
  });

  // it("should render the favorites card when the 'Show Favorites' button is active", () => {});

  // it("should hide the favorites card when the 'Hide Favorites' button is active", () => {});

  // it("should redirect to profile edit page when setting icon is clicked", () => {});
});
