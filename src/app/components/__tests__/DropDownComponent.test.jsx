import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DropDownComponent from "../DropDownComponent";
import userEvent from "@testing-library/user-event";

describe("Tests for drop down component ", () => {
  it("renders the drop down menu", () => {
    render(<DropDownComponent title="Menu" items={[]} />);
    const dropDown = screen.getByRole("button", { name: "Menu" });
    expect(dropDown).toBeInTheDocument();
  });

  it("renders icon with the drop down menu", () => {
    render(
      <DropDownComponent
        title="Menu"
        items={[]}
        icon1={<span data-testid="btn-icon1"></span>}
        icon2={<span data-testid="btn-icon2"></span>}
      />
    );
    const dropDown = screen.getByRole("button", { name: "Menu" });
    const ic1 = screen.getByTestId("btn-icon1");
    const ic2 = screen.getByTestId("btn-icon2");
    expect(dropDown).toContainElement(ic1);
    expect(dropDown).toContainElement(ic2);
  });
  it("renders the menu items", async() => {
    render(
      <DropDownComponent
        title="Menu"
        items={[{ name: "Apple" }, { name: "Mango" }, { name: "Banana" }]}
      />
    );
    const dropDown = screen.getByRole("button",{name : "Menu"})
    const user = userEvent.setup({delay:500})
    await user.click(dropDown)
  });
});
