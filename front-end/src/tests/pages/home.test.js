/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Home from "../../pages/Home";

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    setUserToken: jest.fn(),
  }),
}));

describe("Home page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  it("should render the champion", () => {
    const championHeading = screen.getByTestId("champion-heading");
    const championImg = screen.getByTestId("champion-img");

    expect(championHeading).toBeInTheDocument();
    expect(championImg).toBeInTheDocument();
  });

  it("should render the region", () => {
    const regionHeading = screen.getByTestId("region-heading");
    const regionImg = screen.getByTestId("region-img");

    expect(regionHeading).toBeInTheDocument();
    expect(regionImg).toBeInTheDocument();
  });
});
