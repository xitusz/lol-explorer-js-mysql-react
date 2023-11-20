/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

describe("Footer component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  });

  describe("back to the top icon", () => {
    it("should render the back to the top icon", () => {
      const icon = screen.getByTestId("arrow-icon");

      expect(icon).toBeInTheDocument();
    });

    it("should scroll to the top when the arrow icon is clicked.", () => {
      window.scrollTo = jest.fn();

      const icon = screen.getByTestId("arrow-icon");

      fireEvent.click(icon);

      expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
  });

  describe("contact icons", () => {
    it("should render the LinkedIn icon", () => {
      const icon = screen.getByTestId("linkedin-icon");

      expect(icon).toBeInTheDocument();
    });

    it("should render the LinkedIn link", () => {
      const link = screen.getByTestId("linkedin-link");

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute(
        "href",
        "https://www.linkedin.com/in/gabrielalves1/"
      );
    });

    it("should render the Gmail icon", () => {
      const icon = screen.getByTestId("gmail-icon");

      expect(icon).toBeInTheDocument();
    });

    it("should render the Gmail link", () => {
      const link = screen.getByTestId("gmail-link");

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "mailto:2kgabrielalves@gmail.com");
    });

    it("should render the Github icon", () => {
      const icon = screen.getByTestId("github-icon");

      expect(icon).toBeInTheDocument();
    });

    it("should render the Github link", () => {
      const link = screen.getByTestId("github-link");

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://github.com/xitusz");
    });
  });

  describe("copyright message", () => {
    it("should render the copyright message", () => {
      const message = screen.getByText(/All Rights Reserved/);

      expect(message).toBeInTheDocument();
    });

    it("should render 'gabriel alves' with a link to the GitHub profile", () => {
      const link = screen.getByRole("link", { name: /gabriel alves/i });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://github.com/xitusz");
    });
  });
});
