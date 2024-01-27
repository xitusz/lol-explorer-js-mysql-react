/* eslint-disable no-undef */
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Routes from "../../routes";

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    setUserToken: jest.fn(),
  }),
}));

describe("Routes", () => {
  it("should render Home component when route is '/'", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes />
      </MemoryRouter>
    );

    expect(getByRole("heading", { name: /personagens/i })).toBeInTheDocument();
    expect(getByRole("heading", { name: /regiões/i })).toBeInTheDocument();
  });

  it("should render Login component when route is '/login'", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes />
      </MemoryRouter>
    );

    expect(getByRole("heading", { name: /conectar-se/i })).toBeInTheDocument();
  });

  it("should render register component when route is '/register'", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/register"]}>
        <Routes />
      </MemoryRouter>
    );

    expect(getByRole("heading", { name: /cadastre-se/i })).toBeInTheDocument();
  });

  it("should render champion component when route is '/champion'", async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/champion"]}>
        <Routes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        getByRole("heading", { name: /personagens/i })
      ).toBeInTheDocument();
    });
  });

  it("should render championDetails component when route is '/champion/:championName'", async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/champion/Aatrox"]}>
        <Routes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        getByRole("heading", { name: /aatrox/i, level: 1 })
      ).toBeInTheDocument();
    });
  });

  it("should render profile component when route is '/profile'", () => {
    localStorage.setItem("isLoggedIn", true);

    const { getByRole } = render(
      <MemoryRouter initialEntries={["/profile"]}>
        <Routes />
      </MemoryRouter>
    );

    expect(getByRole("heading", { name: /perfil/i })).toBeInTheDocument();

    localStorage.clear();
  });

  it("should render profileEdit component when route is '/profile/edit'", () => {
    localStorage.setItem("isLoggedIn", true);

    const { getByRole } = render(
      <MemoryRouter initialEntries={["/profile/edit"]}>
        <Routes />
      </MemoryRouter>
    );

    expect(getByRole("heading", { name: /meus dados/i })).toBeInTheDocument();

    localStorage.clear();
  });

  it("should render region component when route is '/region'", async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/region"]}>
        <Routes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByRole("heading", { name: /regiões/i })).toBeInTheDocument();
    });
  });

  it("should render regionDetails component when route is '/region/:regionName'", async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/region/Bilgewater"]}>
        <Routes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        getByRole("heading", { name: /águas de sentina/i, level: 1 })
      ).toBeInTheDocument();
    });
  });
});
