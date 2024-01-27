/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("should redirect to champion page when image is clicked", () => {
    const championImg = screen.getByTestId("champion-img");

    expect(championImg).toBeInTheDocument();

    fireEvent.click(championImg);

    expect(window.location.pathname).toBe("/champion");
  });

  it("should redirect to region page when image is clicked", () => {
    const regionImg = screen.getByTestId("region-img");

    expect(regionImg).toBeInTheDocument();

    fireEvent.click(regionImg);

    expect(window.location.pathname).toBe("/region");
  });

  it("should redirect to champion page when heading is clicked", () => {
    const championHeading = screen.getByTestId("champion-heading");

    expect(championHeading).toBeInTheDocument();

    fireEvent.click(championHeading);

    expect(window.location.pathname).toBe("/champion");
  });

  it("should redirect to region page when heading is clicked", () => {
    const regionHeading = screen.getByTestId("region-heading");

    expect(regionHeading).toBeInTheDocument();

    fireEvent.click(regionHeading);

    expect(window.location.pathname).toBe("/region");
  });
});
