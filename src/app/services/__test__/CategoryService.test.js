import { describe, expect, vi } from "vitest";
import {
  addCategory,
  updateCategory,
  deleteCategory,
} from "../CategoryService";
describe("Test for category services", () => {
  it("adds a category", async () => {
    const mockResponse = { success: true };
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockResponse) })
    );
    const result = await addCategory("Category", "Color", "Icon");
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalled();
  });

  it("updates a category", async () => {
    const mockResponse = { success: true };
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockResponse) })
    );
    const result = await updateCategory("1", "Cat", "Col", "Ic");
    expect(result).toEqual(mockResponse);
  });

  it("deletes a category", async () => {
    const mockResponse = { success: true };
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockResponse) })
    );
    const result = await deleteCategory("1");
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith("/api/categories/1", expect.any(Object));
  });
});
