export function hasSpecialChars(str) {
  return /[^a-zA-Z0-9 ]/.test(str);
}
export function hasLetters(str) {
  return /[a-zA-Z]/.test(str);
}
export async function addTodo(todo, description, category, priority, dueDate) {
  if (hasSpecialChars(todo) || !hasLetters(todo) || todo === undefined) {
    alert("Invalid input");
    return;
  }
  try {
    const res = await fetch("/api/todos", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: todo,
        description: description,
        category: category,
        priority: priority,
        dueDate: dueDate ? dueDate : new Date().toISOString(),
      }),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.log("Error adding task");
  }
}

export function handleSearch(search, todos) {
  if(search === '')
    return todos;
  
  const filtered = [];
  todos.map((todo) => {
    if (todo.task.includes(search)) {
      filtered.push(todo);
    }
  });
  return filtered;
}

export async function deleteTodo(id) {
  const res = await fetch(`/api/todos/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();
  return response;
}

export async function updateTodo(
  id,
  newTodo,
  description,
  category,
  priority,
  dueDate
) {
  if (hasSpecialChars(newTodo) || !hasLetters(newTodo)) {
    alert("Invalid input");
    return;
  }
  const res = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      task: newTodo,
      description: description,
      category: category,
      priority: priority,
      dueDate: dueDate,
    }),
  });
  const response = await res.json();
  return response;
}

export function filterByCategory(todos, category) {
  if (!category || category === "All Categories") {
    return todos;
  }
  console.log(todos.map((t) => t.category));

  return todos.filter((todo) => todo.category === category);
}

export function filterByPriority(todos, priority) {
  if (!priority || priority === "All Priorities") return todos;
  return todos.filter((todo) => todo.priority === priority);
}
