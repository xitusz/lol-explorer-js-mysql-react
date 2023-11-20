/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../../components/Button";

describe("Button component", () => {
  it("should render the children correctly", () => {
    const { getByRole } = render(<Button>Click</Button>);

    expect(getByRole("button", { name: /click/i })).toBeInTheDocument();
  });

  it("should render a button with className 'primary'", () => {
    const { getByRole } = render(<Button className="primary">Click</Button>);

    const button = getByRole("button", { name: /click/i });

    expect(button.classList.contains("primary")).toBe(true);
  });

  it("should render a button with type 'button'", () => {
    const { getByRole } = render(<Button type={"submit"}>Click</Button>);

    const button = getByRole("button", { name: /click/i });

    expect(button.type).toBe("submit");
  });

  it("should call onClick function when clicked", () => {
    const handleClick = jest.fn();

    const { getByRole } = render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(getByRole("button", { name: /click/i }));

    expect(handleClick).toHaveBeenCalled();
  });

  it("should call default onClick function when not provided", () => {
    const { getByRole } = render(<Button>Click</Button>);

    fireEvent.click(getByRole("button", { name: /click/i }));
  });

  it("should not call onClick when button is disabled", () => {
    const handleClick = jest.fn();

    const { getByRole } = render(
      <Button onClick={handleClick} disabled>
        Click
      </Button>
    );

    fireEvent.click(getByRole("button", { name: /click/i }));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should render a button with data-testid attribute", () => {
    const { getByTestId } = render(<Button dataTestId="test">Click</Button>);

    expect(getByTestId("test")).toBeInTheDocument();
  });
});
