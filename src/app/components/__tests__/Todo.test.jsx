import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Todo, { convertDate } from "../Todo";
import { useTodos } from "../../context/todosContext";
import { useCategory } from "../../context/categoryContext";
import { deleteTodo, updateTodo } from "../../services/TodoService";

// Mock contexts
vi.mock("../../context/todosContext", () => ({
  useTodos: vi.fn(),
}));

vi.mock("../../context/categoryContext", () => ({
  useCategory: vi.fn(),
}));

// Mock services
vi.mock("../../services/TodoService", () => ({
  deleteTodo: vi.fn(),
  updateTodo: vi.fn(),
}));

// Mock child components
vi.mock("../ModalComponent", () => ({
  __esModule: true,
  default: ({ children, isOpen, onClose }) =>
    isOpen ? (
      <div data-testid="modal">
        <button data-testid="modal-close" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    ) : null,
}));

vi.mock("../TodoForm", () => ({
  __esModule: true,
  default: ({ onClick, onCancel }) => (
    <div data-testid="todo-form">
      <button data-testid="save-task" onClick={onClick}>
        Save
      </button>
      <button data-testid="cancel-task" onClick={onCancel}>
        Cancel
      </button>
    </div>
  ),
}));

vi.mock("../EditIcon", () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <button data-testid="edit-icon" onClick={onClick}>
      Edit
    </button>
  ),
}));

vi.mock("../DeleteIcon", () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <button data-testid="delete-icon" onClick={onClick}>
      Delete
    </button>
  ),
}));

describe("Todo Component", () => {
  const mockSetTodos = vi.fn();
  const mockTodo = {
    id: "1",
    task: "Learn Testing",
    description: "Write tests for Todo component",
    category: "Work",
    priority: "High",
    dueDate: "2025-08-25",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    useTodos.mockReturnValue({ setTodos: mockSetTodos });
    useCategory.mockReturnValue({
      categories: [{ name: "Work", color: "blue" }],
    });
  });

  it("renders todo details correctly", () => {
    render(<Todo todo={mockTodo} status={0} filteredTodos={false} />);
    expect(screen.getByText("Learn Testing")).toBeDefined();
    expect(screen.getByText("Write tests for Todo component")).toBeDefined();
    expect(screen.getByText("High")).toBeDefined();
    expect(screen.getByText("Work")).toBeDefined();
  });

  it("opens modal on edit click", () => {
    render(<Todo todo={mockTodo} status={0} filteredTodos={false} />);
    fireEvent.click(screen.getByTestId("edit-icon"));
    expect(screen.getByTestId("modal")).toBeDefined();
    expect(screen.getByTestId("todo-form")).toBeDefined();
  });

  it("closes modal on cancel", async () => {
    render(<Todo todo={mockTodo} status={0} filteredTodos={false} />);
    fireEvent.click(screen.getByTestId("edit-icon"));
    fireEvent.click(screen.getByTestId("cancel-task"));
    await waitFor(() => {
      expect(screen.queryByTestId("modal")).toBeNull();
    });
  });

  it("deletes todo on delete click", async () => {
    deleteTodo.mockResolvedValue({ error: null });

    render(<Todo todo={mockTodo} status={0} filteredTodos={false} />);
    fireEvent.click(screen.getByTestId("delete-icon"));

    await waitFor(() => {
      expect(deleteTodo).toHaveBeenCalledWith(mockTodo.id);
      expect(mockSetTodos).toHaveBeenCalled();
    });
  });

  it("updates todo on save", async () => {
    updateTodo.mockResolvedValue({
      error: null,
      todo: { ...mockTodo, task: "Updated Task" },
    });

    render(<Todo todo={mockTodo} status={0} filteredTodos={false} />);
    fireEvent.click(screen.getByTestId("edit-icon"));
    fireEvent.click(screen.getByTestId("save-task"));

    await waitFor(() => {
      expect(updateTodo).toHaveBeenCalled();
      expect(mockSetTodos).toHaveBeenCalled();
    });
  });

  it("sets drag data correctly", () => {
    render(<Todo todo={mockTodo} status={0} filteredTodos={false} />);

    const draggableDiv = screen.getByText("Learn Testing").closest("div");
    const dataTransfer = { setData: vi.fn() };
    fireEvent.dragStart(draggableDiv, { dataTransfer });

    expect(dataTransfer.setData).toHaveBeenCalledWith("todoId", mockTodo.id);
    expect(dataTransfer.setData).toHaveBeenCalledWith("todoTask", mockTodo.task);
  });


  it("convertDate formats correctly", () => {
    const formatted = convertDate("2025-08-21");
    expect(formatted).toMatch(/Aug/);
  });
});
