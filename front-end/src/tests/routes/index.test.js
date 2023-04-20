/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Routes from "../../routes";

describe("Routes", () => {
  it("should render Home component when route is '/'", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes />
      </MemoryRouter>
    );

    expect(getByRole("heading", { name: /home/i })).toBeInTheDocument();
  });

  it("should render Login component when route is '/login'", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes />
      </MemoryRouter>
    );

    expect(getByRole("heading", { name: /login/i })).toBeInTheDocument();
  });

  it("should render register component when route is '/register'", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/register"]}>
        <Routes />
      </MemoryRouter>
    );

    expect(getByRole("heading", { name: /registre-se/i })).toBeInTheDocument();
  });

  it("should render character component when route is '/character'", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/character"]}>
        <Routes />
      </MemoryRouter>
    );

    expect(getByRole("heading", { name: /personagens/i })).toBeInTheDocument();
  });

  it("should render region component when route is '/region'", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/region"]}>
        <Routes />
      </MemoryRouter>
    );

    expect(getByRole("heading", { name: /regiões/i })).toBeInTheDocument();
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