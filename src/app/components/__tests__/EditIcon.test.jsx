import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EditIcon from "../EditIcon"; // adjust path

describe("EditIcon Component", () => {
  it("renders the SVG with correct width and height", () => {
    render(<EditIcon width="24px" height="24px" />);
    const svg = screen.getByTestId("edit-icon-svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "24px");
    expect(svg).toHaveAttribute("height", "24px");
  });

  it("calls onClick handler when clicked", () => {
    const onClickMock = vi.fn();
    render(<EditIcon width="20px" height="20px" onClick={onClickMock} />);
    const svg = screen.getByTestId("edit-icon-svg");
    fireEvent.click(svg);
    expect(onClickMock).toHaveBeenCalled();
  });
});
