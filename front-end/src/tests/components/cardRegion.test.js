/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import CardRegion from "../../components/CardRegion";

describe("CardRegion component", () => {
  it("should render component with name, image and icon", () => {
    const { getByText, getByAltText } = render(
      <CardRegion name="example" image="image.jpg" icon="icon.jpg" />
    );

    const cardRegionName = getByText(/example/i);
    const cardRegionImage = getByAltText("example");
    const cardRegionIcon = getByAltText("example Icon");

    expect(cardRegionName).toBeInTheDocument();
    expect(cardRegionImage).toBeInTheDocument();
    expect(cardRegionImage).toHaveAttribute("src", "image.jpg");
    expect(cardRegionIcon).toBeInTheDocument();
    expect(cardRegionIcon).toHaveAttribute("src", "icon.jpg");
  });

  it("should render component when image and icon not provided", () => {
    const { getByText, getByAltText } = render(<CardRegion name="example" />);

    const cardRegionName = getByText(/example/i);
    const cardRegionImage = getByAltText(/example/i);
    const cardRegionIcon = getByAltText(/example/i);

    expect(cardRegionName).toBeInTheDocument();
    expect(cardRegionImage).toBeInTheDocument();
    expect(cardRegionImage).toHaveAttribute("src", "");
    expect(cardRegionIcon).toBeInTheDocument();
    expect(cardRegionIcon).toHaveAttribute("src", "");
  });
});
