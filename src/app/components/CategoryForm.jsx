import { useState,useEffect } from "react";
import InputField from "./InputField";
import { hasLetters, hasSpecialChars } from "../services/TodoService";
import ButtonComponent from "./ButtonComponent";

const CategoryForm = ({
  caption,
  name,setName,
  color,setColor,
  icon,setIcon,
  buttonLabel,
  onClick,
  onCancel,
}) => {
 
  const [buttonActive, setButtonActive] = useState(false);
  useEffect(() => {
    if (!hasLetters(name) || hasSpecialChars(name) || name === "")
      setButtonActive(false);
    else setButtonActive(true);
  }, [name]);
  return (
    <div className="flex flex-col gap-4">
      <p>{caption}</p>
      <p>Name </p>
      <InputField
        value={name}
        placeholder={name ? "" : "Enter category name"}
        type="text"
        onChange={(e) => setName(e.target.value)}
        // onBlur={() => setNewTodo("")}
        className="h-12 font-medium text-xs"
      />
      {hasSpecialChars(name) ? (
        <p className="text-red-400 text-xs font-medium">
          Category name cannot contain special characters
        </p>
      ) : (
        (!hasLetters(name) || name === "") && (
          <p className="text-gray-500 text-xs font-medium">
            Category name should contain at least one charecter
          </p>
        )
      )}

      <p>color</p>
      <InputField
        value={color}
        placeholder={color ? "" : "Enter color name"}
        type="text"
        onChange={(e) => setColor(e.target.value)}
        // onBlur={() => setNewTodo("")}
        className="h-12 font-medium text-xs"
      />
      <p>Icon</p>
      <InputField
        value={icon}
        placeholder={icon ? "" : "Enter icon name"}
        type="text"
        onChange={(e) => setIcon(e.target.value)}
        // onBlur={() => setNewTodo("")}
        className="h-12 font-medium text-xs"
      />
      <div className="flex justify-between gap-4">
        <ButtonComponent
          icon={<></>}
          label={buttonLabel}
          onClick={onClick}
          properties={`flex-1 ${
            buttonActive
              ? "bg-black"
              : "bg-gray-300 text-black pointer-events-none"
          } `}
        />
        <ButtonComponent
          icon={<></>}
          label="Cancel"
          onClick={onCancel}
          properties="bg-black text-white"
        />
      </div>
    </div>
  );
};
export default CategoryForm;
