"use client";

import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";
import { useState } from "react";
import InputField from "./InputField";
import { useTodos } from "../context/todosContext";
import DropDown from "./Dropdown";
import { useCategory } from "../context/categoryContext";
import { deleteTodo, updateTodo } from "../services/TodoService";
import ModalComponent from "./ModalComponent";
import TodoForm from "./TodoForm";

export function convertDate(dateString) {
  const date = dateString ? new Date(dateString) : new Date();

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

const Todo = ({ todo, status, filteredTodos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(todo.task);
  const [description, setDescription] = useState(todo.description);
  const [category, setCategory] = useState(todo.category);
  const [priority, setPriority] = useState(todo.priority);
  const [dueDate, setDueDate] = useState(todo.dueDate);
  const { categories } = useCategory();
  const colorMap = new Map();
  categories.forEach((c) => colorMap.set(c.name, `bg-${c.color}-400`));

  const { setTodos } = useTodos();
  // const { todoForEdit, setTodoForEdit } = useTodoForEdit();
  // const [editStatus, setEditStatus] = useState(0);
  // const [newTodo, setNewTodo] = useState(todo.task);

  let changeStatus = [];
  if (status === 0) {
    changeStatus.push("completed");
    changeStatus.push("in progress");
  } else if (status === 1) {
    changeStatus.push("incomplete");
    changeStatus.push("in progress");
  }
  if (status === 2) {
    changeStatus.push("completed");
    changeStatus.push("incomplete");
  }

  const handleDragStart = (e) => {
    e.dataTransfer.setData("todoId", todo.id); // pass the todo ID
    e.dataTransfer.setData("todoTask", todo.task);
    e.currentTarget.style.opacity = "0.7"; // optional: visual feedback
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
  };

  const handleDelete = async () => {
    const response = await deleteTodo(todo.id);
    if (response.error) console.log("Error deleting todo");
    else {
      console.log("Todo deleted succesfully");
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    }
  };

  const handleUpdate = async () => {
    const response = await updateTodo(
      todo.id,
      title,
      description,
      category,
      priority,
      dueDate
    );
    console.log(response);
    if (response.error) {
      console.log("Error updating task");
      //setNewTodo("");
    } else {
      console.log("Task updated successfully", description);
      const updatedTodo = response.todo;
      setTodos((prev) =>
        prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
      );
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <ModalComponent
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setTitle(todo.task);
            setDescription(todo.description);
            setCategory(todo.category);
            setPriority(todo.priority);
            setDueDate(todo.dueDate);
          }}
        >
          <TodoForm
            caption="Edit Task"
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
            priority={priority}
            setPriority={setPriority}
            dueDate={dueDate}
            setDueDate={setDueDate}
            buttonLabel="Save Task"
            onClick={() => handleUpdate()}
            onCancel={() => {
              setIsOpen(false);
              setTitle(todo.task);
              setDescription(todo.description);
              setCategory(todo.category);
              setPriority(todo.priority);
              setDueDate(todo.dueDate);
            }}
          />
        </ModalComponent>
      )}
      <div
        // draggable={`${filteredTodos ? "false" : "true"}`}
        draggable="true"
        onDragStart={(e) => handleDragStart(e)}
        onDragEnd={(e) => handleDragEnd(e)}
        className="p-2 h-30 flex flex-col gap-4 bg-white shadow-xl rounded-lg text-sm font-medium text-black hover:cursor-move hover:scale-103 duration-220"
      >
        <div className="flex justify-between">
          <p>{todo.task}</p>
          <div className="flex gap-2">
            <EditIcon
              onClick={() => setIsOpen(true)}
              width="18px"
              height="18px"
            />
            <DeleteIcon
              width="18px"
              height="18px"
              onClick={() => handleDelete()}
            />
          </div>
        </div>

        <div className="text-gray-400 text-xs self-start">
          {todo.description ? todo.description : "No description"}
        </div>

        <div className="flex justify-start gap-2 text-xs text-white">
          <div className="content-center text-center w-20 h-6 bg-red-400 rounded-xl">
            {todo.priority}
          </div>
          <div
            className={`content-center text-center w-20 h-6 ${colorMap.get(
              todo.category
            )} rounded-xl`}
          >
            {todo.category}
          </div>
          <div className="content-center text-center w-20 h-6 bg-gray-100 text-black font-md rounded-xl">
            {convertDate(todo.due_date)}
          </div>
        </div>
      </div>
    </>
  );
};
export default Todo;
