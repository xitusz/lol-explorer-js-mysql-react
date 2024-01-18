/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import Loading from "../../components/Loading";

describe("Loading component", () => {
  it("should render component loading", () => {
    const { getByRole } = render(<Loading />);

    const loading = getByRole("status");

    expect(loading).toBeInTheDocument();
  });
});
