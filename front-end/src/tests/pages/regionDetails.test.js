/* eslint-disable no-undef */
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RegionDetails from "../../pages/RegionDetails";

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    setUserToken: jest.fn(),
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("RegionDetails page", () => {
  beforeEach(() => {
    const regionName = "Bilgewater";

    render(
      <MemoryRouter initialEntries={[`/region/${regionName}`]}>
        <Routes>
          <Route path="/region/:regionName" element={<RegionDetails />} />
        </Routes>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the region details correctly - icon, name, video, description", async () => {
    await waitFor(() => {
      const regionIcon = screen.getByTestId("region-icon");
      const regionVideo = screen.getByTestId("Águas de Sentina-video");
      const videoError = screen.getByText(
        /Seu navegador não suporta o elemento de vídeo./i
      );

      expect(regionIcon).toBeInTheDocument();
      expect(regionIcon).toHaveAttribute(
        "src",
        "https://universe.leagueoflegends.com/images/bilgewater_crest_icon.png"
      );
      expect(regionIcon).toHaveAttribute("alt", "Águas de Sentina");
      expect(
        screen.getByRole("heading", { name: /águas de sentina/i, level: 1 })
      ).toBeInTheDocument();
      expect(regionVideo).toBeInTheDocument();
      expect(regionVideo).toHaveAttribute(
        "src",
        "https://assets.contentstack.io/v3/assets/blt187521ff0727be24/blt3fc71202462d4990/60ee0bd2975ffd4ff25ec27c/bilgewater-splashvideo.webm"
      );
      expect(regionVideo).toHaveAttribute("type", "video/webm");
      expect(videoError).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /descrição/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Situada no arquipélago das Ilhas da Chama Azul, Águas de Sentina é uma cidade portuária sem igual/i
        )
      ).toBeInTheDocument();
    });
  });

  it("should render the champion details correctly - champions", async () => {
    await waitFor(() => {
      const mock = {
        Fizz: { id: "Fizz" },
        Gangplank: { id: "Gangplank" },
      };

      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ data: mock }),
        })
      );

      expect(
        screen.getByRole("heading", { name: /personagens/i })
      ).toBeInTheDocument();

      expect(screen.getByText(/Fizz/i)).toBeInTheDocument();
      expect(screen.getByText(/Gangplank/i)).toBeInTheDocument();

      global.fetch.mockRestore();
    });
  });

  it("should redirect to card details when card is clicked", async () => {
    const mock = {
      Fizz: { id: "Fizz" },
    };

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mock }),
      })
    );

    const cardFizz = screen.getByText(/fizz/i);

    fireEvent.click(cardFizz);

    expect(mockNavigate).toHaveBeenCalledWith("/champion/Fizz");

    global.fetch.mockRestore();
  });
});
