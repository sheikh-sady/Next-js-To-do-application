import { render, screen } from "@testing-library/react";
import UploadIcon from "../UploadIcon"; 
import { describe, it, expect } from "vitest";

describe("UploadIcon Component", () => {
  it("renders the SVG without crashing", () => {
    render(<UploadIcon />);
    const svgElement = screen.getByTestId("upload-icon-svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders the correct number of path elements", () => {
    render(<UploadIcon />);
    const paths = screen.getAllByTestId("upload-icon-path");
    expect(paths.length).toBe(2);
  });
});
