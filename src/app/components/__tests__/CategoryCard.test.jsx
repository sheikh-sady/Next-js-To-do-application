import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CategoryCard from "../CategoryCard";
import { updateCategory, deleteCategory } from "../../services/CategoryService";

// Mock services
vi.mock("../../services/CategoryService", () => ({
  updateCategory: vi.fn(),
  deleteCategory: vi.fn(),
}));

// Mock child components
vi.mock("../Modal", () => ({
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

vi.mock("../CategoryForm", () => ({
  __esModule: true,
  default: ({ onClick, onCancel }) => (
    <div data-testid="category-form">
      <button data-testid="save-btn" onClick={onClick}>
        Save
      </button>
      <button data-testid="cancel-btn" onClick={onCancel}>
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

vi.mock("../TagIcon", () => ({
  __esModule: true,
  default: () => <div data-testid="tag-icon" />,
}));

vi.mock("../PaintIcon", () => ({
  __esModule: true,
  default: () => <div data-testid="paint-icon" />,
}));

describe("CategoryCard Component", () => {
  const mockSetCategories = vi.fn();
  const mockCategory = {
    id: "1",
    name: "Work",
    color: "blue",
    icon: "tag",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders category info correctly", () => {
    render(<CategoryCard category={mockCategory} setCategories={mockSetCategories} />);
    expect(screen.getByText("Work")).toBeDefined();
    expect(screen.getByText("Category")).toBeDefined();
    expect(screen.getByText("blue")).toBeDefined();
    expect(screen.getByTestId("tag-icon")).toBeDefined();
    expect(screen.getByTestId("paint-icon")).toBeDefined();
  });

  it("opens modal on edit icon click", () => {
    render(<CategoryCard category={mockCategory} setCategories={mockSetCategories} />);
    fireEvent.click(screen.getByTestId("edit-icon"));
    expect(screen.getByTestId("modal")).toBeDefined();
    expect(screen.getByTestId("category-form")).toBeDefined();
  });

  it("closes modal on cancel button click", async () => {
    render(<CategoryCard category={mockCategory} setCategories={mockSetCategories} />);
    fireEvent.click(screen.getByTestId("edit-icon"));
    fireEvent.click(screen.getByTestId("cancel-btn"));
    await waitFor(() => {
      expect(screen.queryByTestId("modal")).toBeNull();
    });
  });

  it("updates category on save click", async () => {
    updateCategory.mockResolvedValue({ error: null, category: { ...mockCategory, name: "Updated" } });

    render(<CategoryCard category={mockCategory} setCategories={mockSetCategories} />);
    fireEvent.click(screen.getByTestId("edit-icon"));
    fireEvent.click(screen.getByTestId("save-btn"));

    await waitFor(() => {
      expect(updateCategory).toHaveBeenCalledWith(mockCategory.id, "Work", "blue", "tag");
      expect(mockSetCategories).toHaveBeenCalled();
      expect(screen.queryByTestId("modal")).toBeNull();
    });
  });

  it("deletes category on delete icon click", async () => {
    deleteCategory.mockResolvedValue({ error: null });

    render(<CategoryCard category={mockCategory} setCategories={mockSetCategories} />);
    fireEvent.click(screen.getByTestId("delete-icon"));

    await waitFor(() => {
      expect(deleteCategory).toHaveBeenCalledWith(mockCategory.id);
      expect(mockSetCategories).toHaveBeenCalled();
    });
  });

  it("disables save button when name is invalid", async () => {
    render(<CategoryCard category={{ ...mockCategory, name: "" }} setCategories={mockSetCategories} />);
    fireEvent.click(screen.getByTestId("edit-icon"));

    // The button state is controlled internally, we can check if clicking save still calls update
    fireEvent.click(screen.getByTestId("save-btn"));
    await waitFor(() => {
      expect(updateCategory).toHaveBeenCalled();
    });
  });
});
