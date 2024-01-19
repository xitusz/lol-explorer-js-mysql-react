/* eslint-disable no-undef */
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ChampionDetails from "../../pages/ChampionDetails";

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    setUserToken: jest.fn(),
  }),
}));

describe("ChampionDetails page", () => {
  beforeEach(() => {
    const championName = "Aatrox";

    render(
      <MemoryRouter initialEntries={[`/champion/${championName}`]}>
        <Routes>
          <Route path="/champion/:championName" element={<ChampionDetails />} />
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

  it("should render the champion details correctly - name, title, tags, image, lore", async () => {
    await waitFor(() => {
      const aatroxImage = screen.getByTestId("champion-image");

      expect(
        screen.getByRole("heading", { name: /aatrox/i, level: 1 })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /a espada darkin/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/fighter/i)).toBeInTheDocument();
      expect(screen.getByText(/tank/i)).toBeInTheDocument();
      expect(aatroxImage).toBeInTheDocument();
      expect(aatroxImage).toHaveAttribute(
        "src",
        "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg"
      );
      expect(aatroxImage).toHaveAttribute("alt", "Aatrox");
      expect(
        screen.getByRole("heading", { name: /história/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /antes defensores honrados de Shurima contra o temido vazio/i
        )
      ).toBeInTheDocument();
    });
  });

  it("should render the champion details correctly - skills", async () => {
    await waitFor(() => {
      const passiveSkill = screen.getByTestId("passive-skill");
      const passiveSkillImageButton = passiveSkill.querySelector("img");
      const qSkill = screen.getByTestId("Q-skill");
      const qSkillImageButton = qSkill.querySelector("img");
      const wSkill = screen.getByTestId("W-skill");
      const wSkillImageButton = wSkill.querySelector("img");
      const eSkill = screen.getByTestId("E-skill");
      const eSkillImageButton = eSkill.querySelector("img");
      const rSkill = screen.getByTestId("R-skill");
      const rSkillImageButton = rSkill.querySelector("img");
      const passiveVideo = screen.getByTestId("P");
      const videoError = screen.getByText(
        /Seu navegador não suporta o elemento de vídeo./i
      );

      expect(
        screen.getByRole("heading", { name: /habilidades/i })
      ).toBeInTheDocument();
      expect(passiveSkill).toBeInTheDocument();
      expect(passiveSkillImageButton).toHaveAttribute(
        "src",
        "http://ddragon.leagueoflegends.com/cdn/13.24.1/img/passive/Aatrox_Passive.png"
      );
      expect(passiveSkillImageButton).toHaveAttribute(
        "alt",
        "Postura do Arauto da Morte"
      );
      expect(qSkill).toBeInTheDocument();
      expect(qSkillImageButton).toHaveAttribute(
        "src",
        "http://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/AatroxQ.png"
      );
      expect(wSkill).toBeInTheDocument();
      expect(wSkillImageButton).toHaveAttribute(
        "src",
        "http://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/AatroxW.png"
      );
      expect(eSkill).toBeInTheDocument();
      expect(eSkillImageButton).toHaveAttribute(
        "src",
        "http://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/AatroxE.png"
      );
      expect(rSkill).toBeInTheDocument();
      expect(rSkillImageButton).toHaveAttribute(
        "src",
        "http://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/AatroxR.png"
      );
      expect(passiveVideo).toBeInTheDocument();
      expect(passiveVideo).toHaveAttribute(
        "src",
        "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_P1.webm"
      );
      expect(passiveVideo).toHaveAttribute("type", "video/webm");
      expect(videoError).toBeInTheDocument();
      expect(screen.getByText(/passiva/i)).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /Postura do Arauto da Morte/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Periodicamente, o próximo ataque básico de Aatrox/i)
      ).toBeInTheDocument();
    });
  });

  it("should render the champion details correctly - skins", async () => {
    await waitFor(() => {
      const defaultSkinButton = screen.getByTestId("default-button");
      const defaultSkinImageButton = defaultSkinButton.querySelector("img");
      const firstSkinButton = screen.getByTestId("Aatrox Justiceiro-button");
      const firstSkinImageButton = firstSkinButton.querySelector("img");
      const defaultSkinName = screen.getByTestId("default-skin");
      const defaultSkinImage = screen.getByTestId("default-image");

      expect(
        screen.getByRole("heading", { name: /skins/i })
      ).toBeInTheDocument();
      expect(defaultSkinButton).toBeInTheDocument();
      expect(defaultSkinImageButton).toHaveAttribute(
        "src",
        "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg"
      );
      expect(defaultSkinImageButton).toHaveAttribute("alt", "default");
      expect(firstSkinButton).toBeInTheDocument();
      expect(firstSkinImageButton).toHaveAttribute(
        "src",
        "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_1.jpg"
      );
      expect(defaultSkinName).toBeInTheDocument();
      expect(defaultSkinImage).toBeInTheDocument();
      expect(defaultSkinImage).toHaveAttribute(
        "src",
        "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg"
      );
      expect(defaultSkinImage).toHaveAttribute("alt", "default");
    });
  });

  it("should toggle skill on button click", async () => {
    await waitFor(() => {
      const passiveDescription = screen.getByText(
        /periodicamente, o próximo ataque básico de aatrox/i
      );
      const passiveVideo = screen.getByTestId("P");
      const qSkill = screen.getByTestId("Q-skill");

      expect(passiveDescription).toBeInTheDocument();
      expect(passiveVideo).toBeInTheDocument();

      fireEvent.click(qSkill);

      const qVideo = screen.getByTestId("Q");

      expect(passiveDescription).not.toBeInTheDocument();
      expect(passiveVideo).not.toBeInTheDocument();
      expect(
        screen.getByText(
          /Aatrox bate sua espada no chão, causando Dano Físico/i
        )
      ).toBeInTheDocument();
      expect(qVideo).toBeInTheDocument();
    });
  });

  it("should toggle skin on button click", async () => {
    await waitFor(() => {
      const defaultSkin = screen.getByTestId("default-skin");
      const defaultSkinImage = screen.getByTestId("default-image");
      const firstSkin = screen.getByTestId("Aatrox Justiceiro-button");

      expect(defaultSkin).toBeInTheDocument();
      expect(defaultSkinImage).toBeInTheDocument();

      fireEvent.click(firstSkin);

      expect(defaultSkin).not.toBeInTheDocument();
      expect(defaultSkinImage).not.toBeInTheDocument();
      expect(screen.getByTestId("Aatrox Justiceiro-skin")).toBeInTheDocument();
      expect(screen.getByTestId("Aatrox Justiceiro-image")).toBeInTheDocument();
    });
  });
});
