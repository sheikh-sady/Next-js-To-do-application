"use client";
import { Suspense, useEffect, useState } from "react";
import { useTodos } from "../context/todosContext";
import Todo from "./Todo";
import Spinner from "./Spinner";
const TodoList = ({
  setIsModalOpen,
  status,
  color,
  searchInput,
  filteredTodos,
  filteredBySearch,
  filterPriority,
  filterCategory,
}) => {
  const { todos, setTodos } = useTodos();
  const [numberOfTodos, setNumberOfTodos] = useState(0);
  let caption = "To Do";
  if (status === 1) caption = "Completed";
  else if (status === 2) caption = "In Progress";

  useEffect(() => {
    const countTodos = () =>
      todos.filter((t) => t.is_complete === status).length;
    setNumberOfTodos(countTodos);
  }, [todos]);

  useEffect(() => {
    const countTodos = () =>
      filteredTodos.filter((t) => t.is_complete === status).length;
    setNumberOfTodos(countTodos);
  }, [filteredTodos]);

  // useEffect(() => {
  //   const countTodos = () =>
  //     filteredBySearch.filter((t) => t.is_complete === status).length;
  //   setNumberOfTodos(countTodos);
  // }, [filteredBySearch]);

  const handleDrop = async (e) => {
    e.preventDefault();
    const todoId = e.dataTransfer.getData("todoId");
    const todoTask = e.dataTransfer.getData("todoTask");

    if (!todoId || !todoTask) return;

    // Find the dragged todo
    const draggedTodo = todos.find((t) => t.id == todoId);
    if (!draggedTodo || draggedTodo.is_complete === status) return;

    // Send PATCH request to update status
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ task: todoTask, is_complete: status }),
    });

    if (res.ok) {
      const result = await res.json();
      const updatedTodo = result.todo;

      setTodos((prev) =>
        prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
      );
    } else {
      console.log("Failed to update todo status");
    }

    //e.currentTarget.style.backgroundColor = ""; // reset drop styling if any
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.opacity = "1"; // reset opacity
  };
  console.log('filteredTodos : ',filteredTodos)

  return (
    <div
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e)}
      className="w-full flex-1 flex flex-col gap-5 h-140"
      // className="flex flex-col justify-center items-center gap-3 w-80 h-100 border-2  light:border-black dark:border-white rounded-2xl overflow-auto"
    >
      <div
        className={`flex justify-between p-5 text-2xl font-bold shadow-2xl ${color} rounded-md`}
      >
        <div>{caption}</div>
        <div className="bg-white w-8 h-6 rounded-xl content-center text-center text-black text-xs">
          {/* {filterCategory === 'All Categories' ? numberOfTodos : ''} */}
          {numberOfTodos}
        </div>
      </div>
      <Suspense fallback={<Spinner />}>
        <div
          className={`p-2 grid grid-cols-1 gap-3 content-start border-2 border-gray-300 rounded-lg border-dashed  ${color} text-gray-500 justify-center`}
        >
          {(searchInput || filterCategory || filterPriority) ? filteredTodos.map(
                (todo, index) =>
                  todo.is_complete === status && (
                    <Todo key={index} status={status} todo={todo} />
                  )
              )
            : todos.map(
                (t) =>
                  t.is_complete === status && (
                    <Todo
                      key={t.id}
                      todo={t}
                      status={status}
                      //filteredTodos={filteredTodos}
                    />
                  )
              )}
          {/* {searchInput
            ? todos.map(
                (t) =>
                  t.task.includes(searchInput) &&
                  t.is_complete === status && (
                    <Todo
                      key={t.id}
                      todo={t}
                      status={status}
                      filteredTodos={filteredTodos}
                    />
                  )
              )
            : filterCategory !== "All Categories"
            ? todos.map(
                (t) =>
                  t.category === filterCategory &&
                  t.is_complete === status && (
                    <Todo
                      key={t.id}
                      todo={t}
                      status={status}
                      filteredTodos={filteredTodos}
                    />
                  )
              )
            : todos.map(
                (todo, index) =>
                  todo.is_complete === status && (
                    <Todo
                      key={index}
                      todo={todo}
                      status={status}
                    />
                  )
              )} */}
        </div>
      </Suspense>
    </div>
  );
};
export default TodoList;
