/* eslint-disable no-undef */
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Routes from "../../routes";

describe("Routes", () => {
  it("should render Home component when route is '/'", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes />
      </MemoryRouter>
    );

    expect(getByRole("heading", { name: /início/i })).toBeInTheDocument();
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

  it("should render character component when route is '/character'", async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/character"]}>
        <Routes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        getByRole("heading", { name: /personagens/i })
      ).toBeInTheDocument();
    });
  });

  it("should render characterDetails component when route is '/character/:championName'", async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/character/Aatrox"]}>
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
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/profile"]}>
        <Routes />
      </MemoryRouter>
    );

    expect(getByRole("heading", { name: /perfil/i })).toBeInTheDocument();
  });
});
