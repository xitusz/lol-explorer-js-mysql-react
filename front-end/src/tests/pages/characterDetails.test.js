/* eslint-disable no-undef */
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CharacterDetails from "../../pages/CharacterDetails";

describe("CharacterDetails page", () => {
  beforeEach(() => {
    const championName = "Aatrox";

    render(
      <MemoryRouter initialEntries={[`/character/${championName}`]}>
        <Routes>
          <Route
            path="/character/:championName"
            element={<CharacterDetails />}
          />
        </Routes>
      </MemoryRouter>
    );
  });

  it("should render the loading message correctly", () => {
    const mock = {};

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mock }),
      })
    );

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  it("should render the champion details correctly", async () => {
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /aatrox/i, level: 1 })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /a espada darkin/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/fighter/i)).toBeInTheDocument();
      expect(screen.getByText(/tank/i)).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /história/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /antes defensores honrados de Shurima contra o temido vazio/i
        )
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /habilidades/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /skins/i })
      ).toBeInTheDocument();
    });
  });

  it("should toggle skill on button click", async () => {
    await waitFor(() => {
      const passiveDescription = screen.getByText(
        /periodicamente, o próximo ataque básico de aatrox/i
      );

      const skillButton = screen.getByTestId("Q-skill");

      expect(passiveDescription).toBeInTheDocument();

      fireEvent.click(skillButton);

      expect(passiveDescription).not.toBeInTheDocument();

      expect(
        screen.getByText(
          /Aatrox bate sua espada no chão, causando Dano Físico/i
        )
      ).toBeInTheDocument();
    });
  });

  it("should toggle skin on button click", async () => {
    await waitFor(() => {
      const skinDefault = screen.getByTestId("default-skin");

      const skin = screen.getByTestId("Aatrox Justiceiro-button");

      expect(skinDefault).toBeInTheDocument();

      fireEvent.click(skin);

      expect(skinDefault).not.toBeInTheDocument();

      expect(screen.getByTestId("Aatrox Justiceiro-skin")).toBeInTheDocument();
    });
  });
});
