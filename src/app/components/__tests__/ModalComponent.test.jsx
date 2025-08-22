import { render, screen, fireEvent } from "@testing-library/react";
import ModalComponent from "../ModalComponent";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("ModalComponent", () => {
  let onClose;

  beforeEach(() => {
    onClose = vi.fn();
    document.body.style.overflow = ""; // Reset before every test
  });

  afterEach(() => {
    document.body.style.overflow = ""; // Cleanup after tests
  });

  it("should render children when modal is open", () => {
    render(
      <ModalComponent isOpen={true} onClose={onClose}>
        <p>Modal Content</p>
      </ModalComponent>
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("should not render modal when isOpen is false", () => {
    render(
      <ModalComponent isOpen={false} onClose={onClose}>
        <p>Hidden Content</p>
      </ModalComponent>
    );

    expect(screen.queryByText("Hidden Content")).toBeNull();
  });

  it("should call onClose when clicking backdrop", () => {
    render(
      <ModalComponent isOpen={true} onClose={onClose}>
        <p>Modal</p>
      </ModalComponent>
    );

    const backdrop = screen.getByRole("region");
    fireEvent.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should NOT call onClose when clicking inside modal content", () => {
    render(
      <ModalComponent isOpen={true} onClose={onClose}>
        <div data-testid="modal-content">Inside</div>
      </ModalComponent>
    );

    const modalContent = screen.getByTestId("modal-content");
    fireEvent.click(modalContent);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("should set body overflow to hidden when modal is open", () => {
    render(
      <ModalComponent isOpen={true} onClose={onClose}>
        <p>Modal</p>
      </ModalComponent>
    );

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should reset body overflow when modal is closed", () => {
    const { rerender } = render(
      <ModalComponent isOpen={true} onClose={onClose}>
        <p>Modal</p>
      </ModalComponent>
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <ModalComponent isOpen={false} onClose={onClose}>
        <p>Modal</p>
      </ModalComponent>
    );

    expect(document.body.style.overflow).toBe("");
  });
});
