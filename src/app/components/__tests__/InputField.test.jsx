import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import InputField from "../InputField";

describe("InputField Component", () => {
  it("renders with correct placeholder", () => {
    render(<InputField placeholder="Enter name" />);
    const input = screen.getByPlaceholderText("Enter name");

    // Log the DOM for visualization
    console.log("Initial render:");
    screen.debug(input);

    expect(input).toBeInTheDocument();
  });

  it("renders disabled input", () => {
    render(<InputField placeholder="Disabled" disabled />);
    const input = screen.getByPlaceholderText("Disabled");

    console.log("Disabled input:");
    screen.debug(input);

    expect(input).toBeDisabled();
  });

  it("calls onChange when typing", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup({ delay: 500 }); // Slow typing for visualization

    render(<InputField placeholder="Type here" onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Type here");

    console.log("Before typing:");
    screen.debug(input);

    // Simulate typing slowly so it’s visible in Vitest UI
    await user.type(input, "hello");

    console.log("After typing:");
    screen.debug(input);

    expect(handleChange).toHaveBeenCalled();
    expect(input.value).toBe("hello");
  });

  it("calls onBlur when losing focus", async () => {
    const handleBlur = vi.fn();
    const user = userEvent.setup({ delay: 500 });

    render(<InputField placeholder="Blur test" onBlur={handleBlur} />);
    const input = screen.getByPlaceholderText("Blur test");

    console.log("Before blur:");
    screen.debug(input);

    // Focus and then blur for visualization
    await user.click(input);
    await user.tab(); // Move focus away

    console.log("After blur:");
    screen.debug(input);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
