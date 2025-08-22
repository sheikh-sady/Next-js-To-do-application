import { describe, expect, vi } from "vitest";
import {
  hasLetters,
  hasSpecialChars,
  handleSearch,
  filterByCategory,
  filterByPriority,
  addTodo,
  updateTodo,
  deleteTodo
} from "../TodoService";

describe("Test for Todo services", () => {
  it("Tests the hasLetter function", () => {
    expect(hasLetters("Hello")).toBe(true);
    expect(hasLetters("1231")).not.toBe(true);
  });
  it("Tests the hasSpecialChar function", () => {
    expect(hasSpecialChars("Hello")).toBe(false);
    expect(hasSpecialChars("1231@")).toBe(true);
  });
  it("searches for a todo", () => {
    const todos = [{ task: "Buy Milk" }, { task: "Do homework" }];
    expect(handleSearch("Bu", todos)).toEqual([{ task: "Buy Milk" }]);
  });

  it("filters the todos by category", () => {
    const todos = [
      { task: "Task1", category: "Work" },
      { task: "Task2", category: "Home" },
    ];
    expect(filterByCategory(todos, "Work")).toEqual([
      { task: "Task1", category: "Work" },
    ]);
    expect(filterByCategory(todos, "All Categories")).toEqual(todos);
    expect(filterByCategory(todos, null)).toEqual(todos);
  });

  it("filterByPriority filters correctly", () => {
    const todos = [
      { task: "Task1", priority: "High" },
      { task: "Task2", priority: "Low" },
    ];
    expect(filterByPriority(todos, "High")).toEqual([
      { task: "Task1", priority: "High" },
    ]);
    expect(filterByPriority(todos, "All Priorities")).toEqual(todos);
    expect(filterByPriority(todos, null)).toEqual(todos);
  });

  it("addTodo calls fetch and returns response", async () => {
    const mockResponse = { success: true };
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockResponse) })
    );
    const result = await addTodo("Task", "desc", "Work", "High", "2025-01-01");
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalled();
  }); 

   it("updateTodo calls fetch and returns response", async () => {
    const mockResponse = { success: true };
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockResponse) })
    );
    const result = await updateTodo("1", "Task", "desc", "Work", "High", "2025-01-01");
    expect(result).toEqual(mockResponse);
  });

   it("deleteTodo calls fetch and returns response", async () => {
    const mockResponse = { success: true };
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockResponse) })
    );
    const result = await deleteTodo("1");
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith("/api/todos/1", expect.any(Object));
  });


});
