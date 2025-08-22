import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import AuthPage from "../../pages/AuthPage";
import { signInuser, signUpUser } from "../../services/AuthService";
import { useRouter } from "next/navigation";

vi.mock("../../services/AuthService", () => ({
  signInuser: vi.fn(),
  signUpUser: vi.fn(),
}));

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("AuthPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("successful sign-up redirects to /dashboard", async () => {
    signUpUser.mockResolvedValueOnce({ error: null });

    render(<AuthPage />);

    fireEvent.click(screen.getByText("Sign Up"));

    fireEvent.change(screen.getByPlaceholderText("Enter your full name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter a password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm your password"), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("failed sign-up shows alert", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    signUpUser.mockResolvedValueOnce({ error: "Sign-up failed" });

    render(<AuthPage />);

    fireEvent.click(screen.getByText("Sign Up"));

    fireEvent.change(screen.getByPlaceholderText("Enter your full name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter a password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm your password"), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Error signing up...");
    });

    alertMock.mockRestore();
  });

  test("sign-up with mismatched passwords shows alert", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<AuthPage />);

    fireEvent.click(screen.getByText("Sign Up"));

    fireEvent.change(screen.getByPlaceholderText("Enter your full name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter a password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm your password"), {
      target: { value: "differentPass" },
    });

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Passwords  doesnot match...");
    });

    alertMock.mockRestore();
  });
});
