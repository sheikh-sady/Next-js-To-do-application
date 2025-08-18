"use client";
import { useTodos } from "../context/todosContext";

const InfoCard = ({ title ,icon }) => {
  const { todos } = useTodos();
  console.log(todos)
  let len = 0;
  if (title === "Total") len = todos.length;
  else if (title === "To Do") {
    todos.forEach((t) => {
      if (t.is_complete === 0) len++;
    });
  } else if (title === "In Progress") {
    todos.forEach((t) => {
      if (t.is_complete === 2) len++;
    });
  } else {
    todos.forEach((t) => {
      if (t.is_complete === 1) len++;
    });
  }

  return (
    <div className="w-auto h-22  font-sans text-sm text-gray-600 bg-white shadow-lg rounded-xl flex flex-wrap justify-between items-center p-3">
      <div className="flex flex-col">
        <div className = "font-medium">{title}</div>
        <div className="font-bold text-2xl text-neutral-950">{len}</div>
      </div>
      {icon}
    </div>
  );
};
export default InfoCard;

