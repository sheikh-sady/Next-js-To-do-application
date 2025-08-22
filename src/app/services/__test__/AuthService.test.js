import { describe, it, expect, vi, beforeEach } from "vitest";
import { signUpUser, signInuser, handleLogout } from "../AuthService";

describe("Auth Service Tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("signUpUser should call fetch and return response", async () => {
    const mockResponse = { success: true, message: "User signed up!" };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await signUpUser("John", "john@example.com", "password123");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John",
        email: "john@example.com",
        password: "password123",
      }),
    });
    expect(result).toEqual(mockResponse);
  });

  it("signInuser should call fetch and return response", async () => {
    const mockResponse = { success: true, token: "fake-token" };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await signInuser("john@example.com", "password123");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "john@example.com",
        password: "password123",
      }),
    });
    expect(result).toEqual(mockResponse);
  });

  it("handleLogout should redirect when successful", async () => {
    const mockResponse = { success: true };
    const mockRouter = { push: vi.fn(), refresh: vi.fn() };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    await handleLogout(mockRouter);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("/api/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    expect(mockRouter.push).toHaveBeenCalledWith("/login");
    expect(mockRouter.refresh).toHaveBeenCalled();
  });

  it("handleLogout should log an error when API fails", async () => {
    const mockResponse = { success: false, message: "Logout failed" };
    const mockRouter = { push: vi.fn(), refresh: vi.fn() };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(mockResponse),
      })
    );
  });
});
