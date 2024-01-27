/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchInput from "../../components/SearchInput";

describe("SearchInput component", () => {
  it("should render component with iconSize, placeholder, value and onChange", () => {
    const handleChange = jest.fn();

    const { getByPlaceholderText } = render(
      <SearchInput
        iconSize={30}
        placeholder="example"
        value="example"
        onChange={handleChange}
      />
    );

    const searchInput = getByPlaceholderText("example");
    const icon = searchInput.previousSibling;

    fireEvent.change(searchInput, { target: { value: "" } });

    expect(searchInput).toBeInTheDocument();
    expect(icon.firstChild).toHaveAttribute("height", "30");
    expect(icon.firstChild).toHaveAttribute("width", "30");
    expect(searchInput).toHaveValue("example");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should render component when iconSize not provided", () => {
    const handleChange = jest.fn();

    const { getByPlaceholderText } = render(
      <SearchInput
        placeholder="example"
        value="example"
        onChange={handleChange}
      />
    );

    const searchInput = getByPlaceholderText("example");
    const icon = searchInput.previousSibling;

    fireEvent.change(searchInput, { target: { value: "" } });

    expect(searchInput).toBeInTheDocument();
    expect(icon.firstChild).toHaveAttribute("height", "23");
    expect(icon.firstChild).toHaveAttribute("width", "23");
    expect(searchInput).toHaveValue("example");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
