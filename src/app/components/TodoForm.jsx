"use client";
import { useEffect, useState } from "react";
import { useCategory } from "../context/categoryContext";
import {
  handleSubmit,
  hasLetters,
  hasSpecialChars,
  updateTodo,
} from "../services/TodoService";
import ButtonComponent from "./ButtonComponent";
import DropDownComponent from "./DropDownComponent";
import DropDownIcon from "./DropDownIcon";
import InputField from "./InputField";

const TodoForm = ({
  caption,
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  buttonLabel,
  onClick,
  onCancel,
}) => {
  const { categories } = useCategory();
  const [buttonActive, setButtonActive] = useState(false);
  useEffect(() => {
    if (!hasLetters(title) || hasSpecialChars(title) || title === "")
      setButtonActive(false);
    else setButtonActive(true);
  }, [title]);
  return (
    <div className="flex flex-col gap-3 text-black">
      <p className="text-md font-medium">{caption}</p>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-meidum text-black">Title</p>
        <InputField
          type="text"
          value={title}
          placeholder={title ? "" : "Enter task title"}
          onChange={(e) => setTitle(e.target.value)}
        />
        {hasSpecialChars(title) ? (
          <p className="text-red-400 text-xs font-medium">
            Title cannot contain special characters
          </p>
        ) : (
          (!hasLetters(title) || title === "") && (
            <p className="text-gray-500 text-xs font-medium">
              Title should contain at least one charecter
            </p>
          )
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-meidum text-black">Description</p>
        <InputField
          type="text"
          value={description}
          placeholder={description ? "" : "Enter task description"}
          onChange={(e) => setDescription(e.target.value)}
          className="h-20 text-sm"
        />
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex-1 flex flex-col gap-1">
          <p className="text-sm font-meidum text-black">Category</p>
          <DropDownComponent
            setFilterCategory={setCategory}
            title={category ? category : "Personal"}
            icon1={<></>}
            icon2={<DropDownIcon />}
            items={categories.slice(1,categories.length)}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <p className="text-sm font-meidum text-black">Priority</p>
          <DropDownComponent
            title={priority}
            icon1={<></>}
            icon2={<DropDownIcon />}
            setFilterCategory={setPriority}
            items={[
              { name: "Low" },
              { name: "Medium" },
              { name: "High" },
            ]}
          />
        </div>
      </div>
      <div className="font-medium text-sm">
        <p>Due Date</p>
        <InputField
          value={dueDate}
          placeholder=""
          type="date"
          onChange={(e) => setDueDate(e.target.value)}
          // onBlur={() => setDueDate("")}
          className=" h-20 "
        />
      </div>

      <div className="flex justify-between gap-2 text-white">
        <ButtonComponent
          icon={<></>}
          label={buttonLabel}
          properties={`flex-1 ${
            buttonActive
              ? "bg-black"
              : "bg-gray-300 text-black pointer-events-none"
          } `}
          onClick={onClick}
        />
        <ButtonComponent
          icon={<></>}
          label="Cancel"
          properties="bg-black"
          onClick={onCancel}
        />
      </div>
    </div>
  );
};
export default TodoForm;
