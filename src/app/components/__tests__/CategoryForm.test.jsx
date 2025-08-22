import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import CategoryForm from "../CategoryForm";

// Mock services
vi.mock("../../services/TodoService", () => ({
  hasLetters: (str) => /[a-zA-Z]/.test(str),
  hasSpecialChars: (str) => /[^a-zA-Z0-9 ]/.test(str),
}));

describe("Tests for CategoryForm Component", () => {
  let setName, setColor, setIcon, onClick, onCancel;

  beforeEach(() => {
    setName = vi.fn();
    setColor = vi.fn();
    setIcon = vi.fn();
    onClick = vi.fn();
    onCancel = vi.fn();
  });

  const renderForm = (props = {}) => {
    return render(
      <CategoryForm
        caption="Add Category"
        name=""
        setName={setName}
        color=""
        setColor={setColor}
        icon=""
        setIcon={setIcon}
        buttonLabel="Create"
        onClick={onClick}
        onCancel={onCancel}
        {...props}
      />
    );
  };

  it("renders the form with correct fields", () => {
    renderForm();
    expect(screen.getByText("Add Category")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter category name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter color name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter icon name")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("disables the Create button when name is empty", () => {
    renderForm();
    const createButton = screen.getByRole("button",{name : "Create"});
    expect(createButton).toHaveClass("pointer-events-none");
  });

  it("shows validation message for empty name", () => {
    renderForm();
    expect(
      screen.getByText("Category name should contain at least one charecter")
    ).toBeInTheDocument();
  });

  it("shows error when name contains special characters", () => {
    renderForm({ name: "Work@" });
    expect(
      screen.getByText("Category name cannot contain special characters")
    ).toBeInTheDocument();
  });

  it("enables Create button when name is valid", () => {
    renderForm({ name: "Work" });
    const createButton = screen.getByText("Create");
    expect(createButton).not.toHaveClass("pointer-events-none");
  });

  it("calls setName when typing into name input", () => {
    renderForm();
    const input = screen.getByPlaceholderText("Enter category name");
    fireEvent.change(input, { target: { value: "New Category" } });
    expect(setName).toHaveBeenCalledWith("New Category");
  });

  it("calls setColor when typing into color input", () => {
    renderForm();
    const input = screen.getByPlaceholderText("Enter color name");
    fireEvent.change(input, { target: { value: "Red" } });
    expect(setColor).toHaveBeenCalledWith("Red");
  });

  it("calls setIcon when typing into icon input", () => {
    renderForm();
    const input = screen.getByPlaceholderText("Enter icon name");
    fireEvent.change(input, { target: { value: "icon" } });
    expect(setIcon).toHaveBeenCalledWith("icon");
  });

  it("triggers onClick when Create button is clicked", () => {
    renderForm({ name: "Work" });
    fireEvent.click(screen.getByText("Create"));
    expect(onClick).toHaveBeenCalled();
  });

  it("triggers onCancel when Cancel button is clicked", () => {
    renderForm();
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalled();
  });
});
