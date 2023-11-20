/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import Card from "../../components/Card";

describe("Card component", () => {
  it("should render component with name and image", () => {
    const { getByText, getByAltText } = render(
      <Card name="example" image="image.jpg" />
    );

    const cardName = getByText(/example/i);
    const cardImage = getByAltText(/example/i);

    expect(cardName).toBeInTheDocument();
    expect(cardImage).toBeInTheDocument();
    expect(cardImage).toHaveAttribute("src", "image.jpg");
  });

  it("should render component when image not provided", () => {
    const { getByText, getByAltText } = render(<Card name="example" />);

    const cardName = getByText(/example/i);
    const cardImage = getByAltText(/example/i);

    expect(cardName).toBeInTheDocument();
    expect(cardImage).toBeInTheDocument();
    expect(cardImage).toHaveAttribute("src", "");
  });
});
