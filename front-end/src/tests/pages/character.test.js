/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Character from "../../pages/Character";

describe("Character page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Character />
      </BrowserRouter>
    );
  });

  it("should render the title correctly", async () => {
    await waitFor(() => {
      const title = screen.getByRole("heading", { name: /personagens/i });

      expect(title).toBeInTheDocument();
    });
  });

  it("should render the champions correctly", async () => {
    await waitFor(() => {
      const mock = {
        Aatrox: { id: "Aatrox" },
        Ahri: { id: "Ahri" },
      };

      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ data: mock }),
        })
      );

      expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
      expect(screen.getByText(/ahri/i)).toBeInTheDocument();

      global.fetch.mockRestore();
    });
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

  it("should redirect to card details when card is clicked", async () => {
    await waitFor(() => {
      const mock = {
        Aatrox: { id: "Aatrox" },
      };

      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ data: mock }),
        })
      );

      const cardAatrox = screen.getByText(/aatrox/i);

      fireEvent.click(cardAatrox);

      expect(window.location.pathname).toBe("/character/Aatrox");

      global.fetch.mockRestore();
    });
  });

  it("should favorite when clicking on the star icon if it is unfavorited and unfavorite if it is favorited", async () => {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem(
      "user",
      JSON.stringify([
        { name: "gabriel", email: "gabriel@email.com", favorites: ["Ahri"] },
      ])
    );

    await waitFor(() => {
      const mock = {
        Aatrox: { id: "Aatrox" },
        Ahri: { id: "Ahri" },
      };

      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ data: mock }),
        })
      );

      waitFor(() => {
        const outlineStarIconAatrox = screen.getByTestId(
          "outline-star-icon-Aatrox"
        );

        const fillStarIconAatrox = screen.getByTestId("fill-star-icon-Aatrox");
        const fillStarIconAhri = screen.getByTestId("fill-star-icon-Ahri");
        const outlineStarIconAhri = screen.getByTestId(
          "outline-star-icon-Ahri"
        );

        expect(outlineStarIconAatrox).toBeInTheDocument();

        fireEvent.click(outlineStarIconAatrox);

        expect(fillStarIconAatrox).toBeInTheDocument();
        expect(fillStarIconAhri).toBeInTheDocument();

        fireEvent.click(fillStarIconAatrox);
        fireEvent.click(fillStarIconAhri);

        expect(outlineStarIconAatrox).toBeInTheDocument();
        expect(outlineStarIconAhri).toBeInTheDocument();
      });

      global.fetch.mockRestore();
    });

    localStorage.clear();
  });

  describe("Filter champions", () => {
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
            Aatrox: { id: "Aatrox" },
            Ahri: { id: "Ahri" },
          };

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const input = screen.getByRole("textbox");

          fireEvent.change(input, { target: { value: "" } });

          expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
          expect(screen.getByText(/ahri/i)).toBeInTheDocument();

          fireEvent.change(input, { target: { value: "Aa" } });

          expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
          expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();

          fireEvent.change(input, { target: { value: "Ah" } });

          expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
          expect(screen.getByText(/ahri/i)).toBeInTheDocument();

          global.fetch.mockRestore();
        });
      });

      it("should render the message 'Nenhum campeão encontrado.' correctly", async () => {
        await waitFor(() => {
          const mock = {
            Aatrox: { id: "Aatrox" },
            Ahri: { id: "Ahri" },
          };

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const input = screen.getByRole("textbox");

          fireEvent.change(input, { target: { value: "Aaa" } });

          expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
          expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
          expect(
            screen.getByText(/Nenhum campeão encontrado./i)
          ).toBeInTheDocument();

          global.fetch.mockRestore();
        });
      });
    });

    describe("Filter Button", () => {
      it("should render the buttons correctly", async () => {
        await waitFor(() => {
          const mock = {};

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const buttonAll = screen.getByTestId("button-All");
          const buttonAssassin = screen.getByTestId("button-Assassin");
          const buttonMage = screen.getByTestId("button-Mage");
          const buttonTank = screen.getByTestId("button-Tank");
          const buttonFighter = screen.getByTestId("button-Fighter");
          const buttonMarksman = screen.getByTestId("button-Marksman");
          const buttonSupport = screen.getByTestId("button-Support");
          const buttonFavorite = screen.getByTestId("button-Favorite");
          const buttonClearFavorite = screen.getByTestId(
            "button-ClearFavorite"
          );

          expect(buttonAll).toBeInTheDocument();
          expect(buttonAssassin).toBeInTheDocument();
          expect(buttonMage).toBeInTheDocument();
          expect(buttonTank).toBeInTheDocument();
          expect(buttonFighter).toBeInTheDocument();
          expect(buttonMarksman).toBeInTheDocument();
          expect(buttonSupport).toBeInTheDocument();
          expect(buttonFavorite).toBeInTheDocument();
          expect(buttonClearFavorite).toBeInTheDocument();

          global.fetch.mockRestore();
        });
      });

      it("should correctly activate the 'Todos' button and deactivate the other filter buttons", async () => {
        await waitFor(() => {
          const mock = {};

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const buttonAll = screen.getByTestId("button-All");
          const buttonAssassin = screen.getByTestId("button-Assassin");
          const buttonMage = screen.getByTestId("button-Mage");
          const buttonTank = screen.getByTestId("button-Tank");
          const buttonFighter = screen.getByTestId("button-Fighter");
          const buttonMarksman = screen.getByTestId("button-Marksman");
          const buttonSupport = screen.getByTestId("button-Support");

          fireEvent.click(buttonAssassin);
          fireEvent.click(buttonMage);
          fireEvent.click(buttonTank);
          fireEvent.click(buttonFighter);
          fireEvent.click(buttonMarksman);
          fireEvent.click(buttonSupport);

          fireEvent.click(buttonAll);

          expect(buttonAll).toHaveClass("active");
          expect(buttonAssassin).not.toHaveClass("active");
          expect(buttonMage).not.toHaveClass("active");
          expect(buttonTank).not.toHaveClass("active");
          expect(buttonFighter).not.toHaveClass("active");
          expect(buttonMarksman).not.toHaveClass("active");
          expect(buttonSupport).not.toHaveClass("active");

          global.fetch.mockRestore();
        });
      });

      it("should correctly activate all filter buttons except the 'Todos' button", async () => {
        await waitFor(() => {
          const mock = {};

          jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
              json: () => Promise.resolve({ data: mock }),
            })
          );

          const buttonAll = screen.getByTestId("button-All");
          const buttonAssassin = screen.getByTestId("button-Assassin");
          const buttonMage = screen.getByTestId("button-Mage");
          const buttonTank = screen.getByTestId("button-Tank");
          const buttonFighter = screen.getByTestId("button-Fighter");
          const buttonMarksman = screen.getByTestId("button-Marksman");
          const buttonSupport = screen.getByTestId("button-Support");

          fireEvent.click(buttonAssassin);
          fireEvent.click(buttonMage);
          fireEvent.click(buttonTank);
          fireEvent.click(buttonFighter);
          fireEvent.click(buttonMarksman);
          fireEvent.click(buttonSupport);

          expect(buttonAll).not.toHaveClass("active");
          expect(buttonAssassin).toHaveClass("active");
          expect(buttonMage).toHaveClass("active");
          expect(buttonTank).toHaveClass("active");
          expect(buttonFighter).toHaveClass("active");
          expect(buttonMarksman).toHaveClass("active");
          expect(buttonSupport).toHaveClass("active");

          global.fetch.mockRestore();
        });
      });

      describe("should render the correct card based on the selected button.", () => {
        it("button 'Assassinos'", async () => {
          await waitFor(() => {
            const mock = {
              Aatrox: { id: "Aatrox" },
              Ahri: { id: "Ahri" },
              Akali: { id: "Akali" },
              Akshan: { id: "Akshan" },
              Alistar: { id: "Alistar" },
              Amumu: { id: "Amumu" },
            };

            jest.spyOn(global, "fetch").mockImplementation(() =>
              Promise.resolve({
                json: () => Promise.resolve({ data: mock }),
              })
            );

            const buttonAssassin = screen.getByTestId("button-Assassin");

            fireEvent.click(buttonAssassin);

            waitFor(() => {
              expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
              expect(screen.getByText(/ahri/i)).toBeInTheDocument();
              expect(screen.getByText(/akali/i)).toBeInTheDocument();
              expect(screen.getByText(/akshan/i)).toBeInTheDocument();
              expect(screen.queryByText(/alistar/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/amumu/i)).not.toBeInTheDocument();
            });

            global.fetch.mockRestore();
          });
        });

        it("button 'Magos'", async () => {
          await waitFor(() => {
            const mock = {
              Aatrox: { id: "Aatrox" },
              Ahri: { id: "Ahri" },
              Akali: { id: "Akali" },
              Akshan: { id: "Akshan" },
              Alistar: { id: "Alistar" },
              Amumu: { id: "Amumu" },
            };

            jest.spyOn(global, "fetch").mockImplementation(() =>
              Promise.resolve({
                json: () => Promise.resolve({ data: mock }),
              })
            );
            const buttonMage = screen.getByTestId("button-Mage");

            fireEvent.click(buttonMage);

            waitFor(() => {
              expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
              expect(screen.getByText(/ahri/i)).toBeInTheDocument();
              expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/akshan/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/alistar/i)).not.toBeInTheDocument();
              expect(screen.getByText(/amumu/i)).toBeInTheDocument();
            });

            global.fetch.mockRestore();
          });
        });

        it("button 'Tanques'", async () => {
          await waitFor(() => {
            const mock = {
              Aatrox: { id: "Aatrox" },
              Ahri: { id: "Ahri" },
              Akali: { id: "Akali" },
              Akshan: { id: "Akshan" },
              Alistar: { id: "Alistar" },
              Amumu: { id: "Amumu" },
            };

            jest.spyOn(global, "fetch").mockImplementation(() =>
              Promise.resolve({
                json: () => Promise.resolve({ data: mock }),
              })
            );

            const buttonTank = screen.getByTestId("button-Tank");

            fireEvent.click(buttonTank);

            waitFor(() => {
              expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
              expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/akshan/i)).not.toBeInTheDocument();
              expect(screen.getByText(/alistar/i)).toBeInTheDocument();
              expect(screen.getByText(/amumu/i)).toBeInTheDocument();
            });

            global.fetch.mockRestore();
          });
        });

        it("button 'Lutadores'", async () => {
          await waitFor(() => {
            const mock = {
              Aatrox: { id: "Aatrox" },
              Ahri: { id: "Ahri" },
              Akali: { id: "Akali" },
              Akshan: { id: "Akshan" },
              Alistar: { id: "Alistar" },
              Amumu: { id: "Amumu" },
            };

            jest.spyOn(global, "fetch").mockImplementation(() =>
              Promise.resolve({
                json: () => Promise.resolve({ data: mock }),
              })
            );

            const buttonFighter = screen.getByTestId("button-Fighter");

            fireEvent.click(buttonFighter);

            waitFor(() => {
              expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
              expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/akshan/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/alistar/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/amumu/i)).not.toBeInTheDocument();
            });

            global.fetch.mockRestore();
          });
        });

        it("button 'Atiradores'", async () => {
          await waitFor(() => {
            const mock = {
              Aatrox: { id: "Aatrox" },
              Ahri: { id: "Ahri" },
              Akali: { id: "Akali" },
              Akshan: { id: "Akshan" },
              Alistar: { id: "Alistar" },
              Amumu: { id: "Amumu" },
            };

            jest.spyOn(global, "fetch").mockImplementation(() =>
              Promise.resolve({
                json: () => Promise.resolve({ data: mock }),
              })
            );

            const buttonMarksman = screen.getByTestId("button-Marksman");

            fireEvent.click(buttonMarksman);

            waitFor(() => {
              expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
              expect(screen.getByText(/akshan/i)).toBeInTheDocument();
              expect(screen.queryByText(/alistar/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/amumu/i)).not.toBeInTheDocument();
            });

            global.fetch.mockRestore();
          });
        });

        it("button 'Suportes'", async () => {
          await waitFor(() => {
            const mock = {
              Aatrox: { id: "Aatrox" },
              Ahri: { id: "Ahri" },
              Akali: { id: "Akali" },
              Akshan: { id: "Akshan" },
              Alistar: { id: "Alistar" },
              Amumu: { id: "Amumu" },
            };

            jest.spyOn(global, "fetch").mockImplementation(() =>
              Promise.resolve({
                json: () => Promise.resolve({ data: mock }),
              })
            );

            const buttonSupport = screen.getByTestId("button-Support");

            fireEvent.click(buttonSupport);

            waitFor(() => {
              expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/akshan/i)).not.toBeInTheDocument();
              expect(screen.getByText(/alistar/i)).toBeInTheDocument();
              expect(screen.queryByText(/amumu/i)).not.toBeInTheDocument();
            });

            global.fetch.mockRestore();
          });
        });

        it("button 'Todos'", async () => {
          await waitFor(() => {
            const mock = {
              Aatrox: { id: "Aatrox" },
              Ahri: { id: "Ahri" },
              Akali: { id: "Akali" },
              Akshan: { id: "Akshan" },
              Alistar: { id: "Alistar" },
              Amumu: { id: "Amumu" },
            };

            jest.spyOn(global, "fetch").mockImplementation(() =>
              Promise.resolve({
                json: () => Promise.resolve({ data: mock }),
              })
            );

            const buttonAll = screen.getByTestId("button-All");
            const buttonAssassin = screen.getByTestId("button-Assassin");
            const buttonMage = screen.getByTestId("button-Mage");
            const buttonTank = screen.getByTestId("button-Tank");
            const buttonFighter = screen.getByTestId("button-Fighter");
            const buttonMarksman = screen.getByTestId("button-Marksman");
            const buttonSupport = screen.getByTestId("button-Support");

            fireEvent.click(buttonAssassin);
            fireEvent.click(buttonMage);
            fireEvent.click(buttonTank);
            fireEvent.click(buttonFighter);
            fireEvent.click(buttonMarksman);
            fireEvent.click(buttonSupport);

            waitFor(() => {
              expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/akshan/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/alistar/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/amumu/i)).not.toBeInTheDocument();
            });

            fireEvent.click(buttonAll);

            waitFor(() => {
              expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
              expect(screen.getByText(/ahri/i)).toBeInTheDocument();
              expect(screen.getByText(/akali/i)).toBeInTheDocument();
              expect(screen.getByText(/akshan/i)).toBeInTheDocument();
              expect(screen.getByText(/alistar/i)).toBeInTheDocument();
              expect(screen.getByText(/amumu/i)).toBeInTheDocument();
            });

            global.fetch.mockRestore();
          });
        });

        it("two buttons 'Tanques' and 'Lutadores'", async () => {
          await waitFor(() => {
            const mock = {
              Aatrox: { id: "Aatrox" },
              Ahri: { id: "Ahri" },
              Akali: { id: "Akali" },
              Akshan: { id: "Akshan" },
              Alistar: { id: "Alistar" },
              Amumu: { id: "Amumu" },
            };

            jest.spyOn(global, "fetch").mockImplementation(() =>
              Promise.resolve({
                json: () => Promise.resolve({ data: mock }),
              })
            );

            const buttonTank = screen.getByTestId("button-Tank");
            const buttonFighter = screen.getByTestId("button-Fighter");

            fireEvent.click(buttonTank);
            fireEvent.click(buttonFighter);

            waitFor(() => {
              expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
              expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/akshan/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/alistar/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/amumu/i)).not.toBeInTheDocument();
            });

            global.fetch.mockRestore();
          });
        });

        it("various buttons 'Assassinos', 'Magos', 'Tanques', 'Lutadores', 'Atiradores', 'Suportes' ", async () => {
          await waitFor(() => {
            const mock = {
              Aatrox: { id: "Aatrox" },
              Ahri: { id: "Ahri" },
              Akali: { id: "Akali" },
              Akshan: { id: "Akshan" },
              Alistar: { id: "Alistar" },
              Amumu: { id: "Amumu" },
            };

            jest.spyOn(global, "fetch").mockImplementation(() =>
              Promise.resolve({
                json: () => Promise.resolve({ data: mock }),
              })
            );

            const buttonAssassin = screen.getByTestId("button-Assassin");
            const buttonMage = screen.getByTestId("button-Mage");
            const buttonTank = screen.getByTestId("button-Tank");
            const buttonFighter = screen.getByTestId("button-Fighter");
            const buttonMarksman = screen.getByTestId("button-Marksman");
            const buttonSupport = screen.getByTestId("button-Support");

            fireEvent.click(buttonAssassin);
            fireEvent.click(buttonMage);
            fireEvent.click(buttonTank);
            fireEvent.click(buttonFighter);
            fireEvent.click(buttonMarksman);
            fireEvent.click(buttonSupport);

            waitFor(() => {
              expect(screen.queryByText(/aatrox/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/akali/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/akshan/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/alistar/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/amumu/i)).not.toBeInTheDocument();
              expect(
                screen.getByText(/Nenhum campeão encontrado./i)
              ).toBeInTheDocument();
            });

            global.fetch.mockRestore();
          });
        });

        it("button 'Favoritos'", async () => {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem(
            "user",
            JSON.stringify([
              {
                name: "gabriel",
                email: "gabriel@email.com",
                favorites: [],
              },
            ])
          );

          await waitFor(() => {
            const mock = {
              Aatrox: { id: "Aatrox" },
              Ahri: { id: "Ahri" },
              Akali: { id: "Akali" },
              Akshan: { id: "Akshan" },
              Alistar: { id: "Alistar" },
              Amumu: { id: "Amumu" },
            };

            jest.spyOn(global, "fetch").mockImplementation(() =>
              Promise.resolve({
                json: () => Promise.resolve({ data: mock }),
              })
            );

            waitFor(() => {
              const outlineStarIconAatrox = screen.getByTestId(
                "outline-star-icon-Aatrox"
              );
              const outlineStarIconAkali = screen.getByTestId(
                "outline-star-icon-Akali"
              );
              const outlineStarIconAkshan = screen.getByTestId(
                "outline-star-icon-Akshan"
              );

              fireEvent.click(outlineStarIconAatrox);
              fireEvent.click(outlineStarIconAkali);
              fireEvent.click(outlineStarIconAkshan);
            });

            const buttonFavorite = screen.getByTestId("button-Favorite");

            fireEvent.click(buttonFavorite);

            waitFor(() => {
              expect(screen.getByText(/aatrox/i)).toBeInTheDocument();
              expect(screen.queryByText(/ahri/i)).not.toBeInTheDocument();
              expect(screen.getByText(/akali/i)).toBeInTheDocument();
              expect(screen.getByText(/akshan/i)).toBeInTheDocument();
              expect(screen.queryByText(/alistar/i)).not.toBeInTheDocument();
              expect(screen.queryByText(/amumu/i)).not.toBeInTheDocument();
            });

            global.fetch.mockRestore();
          });

          localStorage.clear();
        });

        it("button 'Limpar Favoritos'", async () => {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem(
            "user",
            JSON.stringify([
              {
                name: "gabriel",
                email: "gabriel@email.com",
                favorites: [],
              },
            ])
          );

          await waitFor(() => {
            const mock = {
              Aatrox: { id: "Aatrox" },
              Ahri: { id: "Ahri" },
              Akali: { id: "Akali" },
              Akshan: { id: "Akshan" },
              Alistar: { id: "Alistar" },
              Amumu: { id: "Amumu" },
            };

            jest.spyOn(global, "fetch").mockImplementation(() =>
              Promise.resolve({
                json: () => Promise.resolve({ data: mock }),
              })
            );

            waitFor(() => {
              const outlineStarIconAatrox = screen.getByTestId(
                "outline-star-icon-Aatrox"
              );
              const outlineStarIconAkali = screen.getByTestId(
                "outline-star-icon-Akali"
              );
              const outlineStarIconAkshan = screen.getByTestId(
                "outline-star-icon-Akshan"
              );

              const fillStarIconAatrox = screen.getByTestId(
                "fill-star-icon-Aatrox"
              );
              const fillStarIconAkali = screen.getByTestId(
                "fill-star-icon-Akali"
              );
              const fillStarIconAkshan = screen.getByTestId(
                "fill-star-icon-Akshan"
              );

              const buttonClearFavorite = screen.getByTestId(
                "button-ClearFavorite"
              );

              fireEvent.click(outlineStarIconAatrox);
              fireEvent.click(outlineStarIconAkali);
              fireEvent.click(outlineStarIconAkshan);

              expect(fillStarIconAatrox).toBeInTheDocument();
              expect(fillStarIconAkali).toBeInTheDocument();
              expect(fillStarIconAkshan).toBeInTheDocument();

              fireEvent.click(buttonClearFavorite);

              expect(fillStarIconAatrox).not.toBeInTheDocument();
              expect(fillStarIconAkali).not.toBeInTheDocument();
              expect(fillStarIconAkshan).not.toBeInTheDocument();
            });

            global.fetch.mockRestore();
          });

          localStorage.clear();
        });
      });
    });
  });
});
