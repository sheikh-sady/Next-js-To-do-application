import { hasLetters, hasSpecialChars } from "./TodoService";

export async function addCategory(name, color, icon) {
  if (!hasLetters(name) || hasSpecialChars(name) || name === undefined)
    return alert("Invalid input");
  const res = await fetch("/api/categories", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, color: color, icon: icon }),
  });
  const response = await res.json();

  return response;
}

export async function deleteCategory(id) {
  const res = await fetch(`/api/categories/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  return response;
}

export async function updateCategory(id, newName, newColor, newIcon) {
  if (!hasLetters(newName) || hasSpecialChars(newName) || newName === undefined)
    return alert("Invalid input");
  const res = await fetch(`/api/categories/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName, icon: newIcon, color: newColor }),
  });
  const response = await res.json();
  return response;
}
