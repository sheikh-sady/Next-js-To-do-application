import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BullseyeIcon from "../BullseyeIcon"; // adjust path

describe("BullseyeIcon Component", () => {
  it("renders the SVG without crashing", () => {
    render(<BullseyeIcon />);
    const svgElement = screen.getByTestId("bullseye-svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders a path element inside the SVG", () => {
    render(<BullseyeIcon />);
    const pathElement = screen.getByTestId("bullseye-path");
    expect(pathElement).toBeInTheDocument();
  });

  it("applies the className prop correctly", () => {
    render(<BullseyeIcon className="test-class" />);
    const svgElement = screen.getByTestId("bullseye-svg");
    expect(svgElement).toHaveClass("test-class");
  });
});
