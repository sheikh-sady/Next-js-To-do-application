import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonComponent from "../ButtonComponent";

describe("Test for ButtonComponent", () => {
  it("renders the button", () => {
    render(<ButtonComponent label="renderTest" />);
    const btn = screen.getByText("renderTest");
    expect(btn).toBeInTheDocument();
  });

  it("renders an icon with the button", () => {
    render(
      <ButtonComponent
        icon={<span data-testid="btn-icon"></span>}
        label="iconTest"
      />
    );
    const btn = screen.getByRole("button", { name: "iconTest" });
    const icn = screen.getByTestId('btn-icon')
    expect(btn).toContainElement(icn)
  });

  it("clicks the button", async () => {
    const user = userEvent.setup({ delay: 500 });
    const handleClick = vi.fn();
    render(<ButtonComponent label="clickTest" onClick={handleClick} />);
    const btn = screen.getByText("clickTest");
    await user.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("sets the type of the button", () => {
    render(<ButtonComponent label="typeTest" type="submit" />);
    const btn = screen.getByRole("button", { name: "typeTest" });
    expect(btn).toHaveAttribute("type", "submit");
  });
  it("has the default type as button", () => {
    render(<ButtonComponent label="defaultTypeTest" />);
    const btn = screen.getByRole("button", { name: "defaultTypeTest" });
    expect(btn).toHaveAttribute("type", "button");
  });
});
