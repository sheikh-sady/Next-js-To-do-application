import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../Modal";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("Modal Component", () => {
  let onClose;

  beforeEach(() => {
    onClose = vi.fn();
    document.body.style.overflow = ""; // Reset before each test
  });

  afterEach(() => {
    document.body.style.overflow = ""; // Clean up after each test
  });

  it("should not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <p>Hidden Content</p>
      </Modal>
    );

    expect(screen.queryByText("Hidden Content")).toBeNull();
  });

  it("should render children when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Visible Content</p>
      </Modal>
    );

    expect(screen.getByText("Visible Content")).toBeInTheDocument();
  });

  it("should call onClose when clicking backdrop", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Modal</p>
      </Modal>
    );

    const backdrop = screen.getByRole("dialog");
    fireEvent.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should NOT call onClose when clicking inside modal content", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div data-testid="modal-content">Inside Modal</div>
      </Modal>
    );

    const modalContent = screen.getByTestId("modal-content");
    fireEvent.click(modalContent);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("should lock body scroll when modal opens", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Modal</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should reset body scroll when modal closes", () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Modal</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Modal isOpen={false} onClose={onClose}>
        <p>Modal</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("");
  });
});
