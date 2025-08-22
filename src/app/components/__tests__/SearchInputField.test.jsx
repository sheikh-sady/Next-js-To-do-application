import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInputField from "../SearchInputField";

describe("Tests for SearchInput", () => {
  it("renders the search input", () => {
    render(<SearchInputField placeholder="Type something" />);
    const searchInput = screen.getByPlaceholderText("Type something");
    expect(searchInput).toBeInTheDocument();
  });
  it("calls onChange when typing ", async () => {
    const handleChange = vi.fn();
    render(
      <SearchInputField placeholder="search here" onChange={handleChange} />
    );
    const searchInput = screen.getByPlaceholderText("search here");
    const user = userEvent.setup({ delay: 500 });
    await user.type(searchInput, "searching");
    expect(handleChange).toHaveBeenCalledTimes(9);
    expect(searchInput.value).toBe("searching");
  }, 10000);
  it("renders with the given placeholder", () => {
    render(<SearchInputField placeholder="Search a task" />);
    const searchInput = screen.getByPlaceholderText("Search a task");
    expect(searchInput).toBeInTheDocument();
  });

  it("blurs the search field", async () => {
    const handleBlur = vi.fn();
    const handleChange = vi.fn();
    render(
      <SearchInputField
        placeholder="Blur test"
        onBlur={handleBlur}
        onChange={handleChange}
      />
    );
    const searchInput = screen.getByPlaceholderText("Blur test");
    const user = userEvent.setup({ delay: 500 });
    await user.type(searchInput, "Hello World");
    expect(handleChange).toHaveBeenCalledTimes(11);
    expect(searchInput.value).toBe("Hello World");
    await user.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  }, 15000);
});
