/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Region from "../../pages/Region";

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    setUserToken: jest.fn(),
  }),
}));

describe("Region page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Region />
      </BrowserRouter>
    );
  });

  it("should render the title correctly", async () => {
    await waitFor(() => {
      const title = screen.getByRole("heading", { name: /regiões/i });

      expect(title).toBeInTheDocument();
    });
  });

  it("should render the Regions correctly", async () => {
    await waitFor(() => {
      const mock = {
        Bilgewater: { name: "Bilgewater", nameBR: "Águas de Sentina" },
        BandleCity: { name: "Bandle City", nameBR: "Bandópolis" },
      };

      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ data: mock }),
        })
      );

      expect(screen.getByText(/Águas de Sentina/i)).toBeInTheDocument();
      expect(screen.getByText(/Bandópolis/i)).toBeInTheDocument();

      global.fetch.mockRestore();
    });
  });

  it("should redirect to region details when region is clicked", async () => {
    await waitFor(() => {
      const mock = {
        Bilgewater: {
          name: "Bilgewater",
          nameBR: "Águas de Sentina",
        },
      };

      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ data: mock }),
        })
      );

      const cardBilgewater = screen.getByText(/Águas de Sentina/i);

      fireEvent.click(cardBilgewater);

      expect(window.location.pathname).toBe("/region/Bilgewater");

      global.fetch.mockRestore();
    });
  });

  describe("Filter Regions", () => {
    describe("Input search", () => {
      it("should render the input search correctly", async () => {
        await waitFor(() => {
          const mock = {};

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const input = screen.getByRole("textbox");

          expect(input).toBeInTheDocument();

          global.fetch.mockRestore();
        });
      });

      it("should filter according to the text in the input", async () => {
        await waitFor(() => {
          const mock = {
            Bilgewater: { name: "Bilgewater", nameBR: "Águas de Sentina" },
            BandleCity: { name: "Bandle City", nameBR: "Bandópolis" },
          };

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const input = screen.getByRole("textbox");

          fireEvent.change(input, { target: { value: "" } });

          expect(screen.getByText(/Águas de Sentina/i)).toBeInTheDocument();
          expect(screen.getByText(/Bandópolis/i)).toBeInTheDocument();

          fireEvent.change(input, { target: { value: "ag" } });

          expect(screen.getByText(/Águas de Sentina/i)).toBeInTheDocument();
          expect(screen.queryByText(/Bandópolis/i)).not.toBeInTheDocument();

          fireEvent.change(input, { target: { value: "b" } });

          expect(
            screen.queryByText(/Águas de Sentina/i)
          ).not.toBeInTheDocument();
          expect(screen.getByText(/Bandópolis/i)).toBeInTheDocument();

          global.fetch.mockRestore();
        });
      });

      it("should render the message 'Nenhuma região encontrada.' correctly", async () => {
        await waitFor(() => {
          const mock = {
            Bilgewater: { name: "Bilgewater", nameBR: "Águas de Sentina" },
            BandleCity: { name: "Bandle City", nameBR: "Bandópolis" },
          };

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const input = screen.getByRole("textbox");

          fireEvent.change(input, { target: { value: "Aa" } });

          expect(
            screen.queryByText(/Águas de Sentina/i)
          ).not.toBeInTheDocument();
          expect(screen.queryByText(/Bandópolis/i)).not.toBeInTheDocument();
          expect(
            screen.getByText(/Nenhuma região encontrada./i)
          ).toBeInTheDocument();

          global.fetch.mockRestore();
        });
      });
    });
  });
});
