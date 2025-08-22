import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import TodoForm from "../TodoForm";

// Mock useCategory context
vi.mock("../../context/categoryContext", () => ({
  useCategory: () => ({
    categories: [
      { name: "All" },
      { name: "Personal" },
      { name: "Work" },
      { name: "Study" },
    ],
  }),
}));

// Mock services
vi.mock("../../services/TodoService", () => ({
  hasLetters: (str) => /[a-zA-Z]/.test(str),
  hasSpecialChars: (str) => /[^a-zA-Z0-9 ]/.test(str),
  handleSubmit: vi.fn(),
  updateTodo: vi.fn(),
}));

// Mock DropDownComponent
vi.mock("../DropDownComponent", () => ({
  default: ({ title, setFilterCategory, items }) => (
    <select
      data-testid={`dropdown-${title}`}
      onChange={(e) => setFilterCategory(e.target.value)}
    >
      {items.map((item) => (
        <option key={item.name} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  ),
}));

// Mock ButtonComponent
vi.mock("../ButtonComponent", () => ({
  default: ({ label, onClick, ...props }) => (
    <button data-testid={`button-${label}`} onClick={onClick} {...props}>
      {label}
    </button>
  ),
}));

// Mock InputField
vi.mock("../InputField", () => ({
  default: ({ value, onChange, placeholder, type }) => (
    <input
      type={type}
      data-testid={`input-${placeholder || type}`}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  ),
}));

describe("TodoForm Component", () => {
  let setTitle,
    setDescription,
    setCategory,
    setPriority,
    setDueDate,
    onClick,
    onCancel;

  const renderForm = (props = {}) => {
    return render(
      <TodoForm
        caption="Add Task"
        title=""
        setTitle={setTitle}
        description=""
        setDescription={setDescription}
        category="Personal"
        setCategory={setCategory}
        priority="Low"
        setPriority={setPriority}
        dueDate=""
        setDueDate={setDueDate}
        buttonLabel="Create"
        onClick={onClick}
        onCancel={onCancel}
        {...props}
      />
    );
  };

  beforeEach(() => {
    setTitle = vi.fn();
    setDescription = vi.fn();
    setCategory = vi.fn();
    setPriority = vi.fn();
    setDueDate = vi.fn();
    onClick = vi.fn();
    onCancel = vi.fn();
  });

  it("renders form with all fields", () => {
    renderForm();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Priority")).toBeInTheDocument();
    expect(screen.getByText("Due Date")).toBeInTheDocument();
    expect(screen.getByTestId("button-Create")).toBeInTheDocument();
    expect(screen.getByTestId("button-Cancel")).toBeInTheDocument();
  });

  it("shows error when title contains special characters", () => {
    renderForm({ title: "Task@" });
    expect(
      screen.getByText("Title cannot contain special characters")
    ).toBeInTheDocument();
  });

  it("shows error when title is empty or has no letters", () => {
    renderForm({ title: "12345" });
    expect(
      screen.getByText("Title should contain at least one charecter")
    ).toBeInTheDocument();
  });

  it("enables Create button when title is valid", () => {
    renderForm({ title: "Task" });
    const createButton = screen.getByTestId("button-Create");
    expect(createButton).not.toBeDisabled();
  });

  it("updates title when typing in input", () => {
    renderForm();
    const input = screen.getByTestId("input-Enter task title");
    fireEvent.change(input, { target: { value: "New Task" } });
    expect(setTitle).toHaveBeenCalledWith("New Task");
  });

  it("updates description when typing in input", () => {
    renderForm();
    const input = screen.getByTestId("input-Enter task description");
    fireEvent.change(input, { target: { value: "Details" } });
    expect(setDescription).toHaveBeenCalledWith("Details");
  });

  it("changes category when selecting from dropdown", () => {
    renderForm();
    const dropdown = screen.getByTestId("dropdown-Personal");
    fireEvent.change(dropdown, { target: { value: "Work" } });
    expect(setCategory).toHaveBeenCalledWith("Work");
  });

  it("changes priority when selecting from dropdown", () => {
    renderForm();
    const dropdown = screen.getByTestId("dropdown-Low");
    fireEvent.change(dropdown, { target: { value: "High" } });
    expect(setPriority).toHaveBeenCalledWith("High");
  });

  it("updates due date when date is selected", () => {
    renderForm();
    const input = screen.getByTestId("input-date");
    fireEvent.change(input, { target: { value: "2025-08-21" } });
    expect(setDueDate).toHaveBeenCalledWith("2025-08-21");
  });

  it("calls onClick when Create button is clicked", () => {
    renderForm({ title: "Valid Task" });
    fireEvent.click(screen.getByTestId("button-Create"));
    expect(onClick).toHaveBeenCalled();
  });

  it("calls onCancel when Cancel button is clicked", () => {
    renderForm();
    fireEvent.click(screen.getByTestId("button-Cancel"));
    expect(onCancel).toHaveBeenCalled();
  });
});
