"use client";
import ButtonComponent from "./ButtonComponent";
import DropDownComponent from "./DropDownComponent";
import DropDownIcon from "./DropDownIcon";
import FunnelIcon from "./FunnelIcon";
import InputField from "./InputField";
import PlusIcon from "./PlusIcon";
import PriorityIcon from "./PriorityIcon";
import { useState } from "react";
import { addTodo, handleSearch } from "../services/TodoService";
import { useTodos } from "../context/todosContext";
import SearchInputField from "./SearchInputField";
import { useCategory } from "../context/categoryContext";
import ModalComponent from "./ModalComponent";
import TodoForm from "./TodoForm";

const MiddleSection = ({
  searchInput,
  setSearchInput,
  filterCategory,
  setFilterCategory,
  setFilteredBySearch,
  filterPriority,
  setFilterPriority
}) => {
  const { todos, setTodos } = useTodos();
  const { categories } = useCategory();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("High");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async () => {
    const response = await addTodo(
      title,
      description,
      category,
      priority,
      dueDate
    );
    console.log(response);
    if (response.error) console.log("Error adding todo");
    // else
    //   setTodos(prev=> [...prev, response.todo])

    setTitle("");
    setDescription("");
    setCategory("Personal");
    setPriority("High");
    setDueDate("");
    setIsOpen(false);
  };
  // const [filterCategory,setFilterCategory] = useState('All Categories')
  return (
    <div className="w-full text-sm p-5 min-h-22 h-auto flex flex-col justify-between lg:flex-row shadow-lg gap-5 rounded-lg">
      <SearchInputField
        type="text"
        value={searchInput}
        className="h-10 flex-1"
        placeholder="Search a task"
        onChange={(e) => {
          e.preventDefault();
          setSearchInput(e.target.value);
          // const filtered = handleSearch(e.target.value, todos);
          // setFilteredBySearch(filtered);
        }}
        onBlur={() => {}}
      />
      <div className="flex flex-col gap-6 sm:flex-row">
        <DropDownComponent
          setFilterCategory={setFilterCategory}
          title={filterCategory}
          icon1={<FunnelIcon />}
          icon2={<DropDownIcon />}
          items={categories}
        />
        <DropDownComponent
          title={filterPriority}
          setFilterCategory={setFilterPriority}
          icon1={<PriorityIcon />}
          icon2={<DropDownIcon />}
          items={[
            { name: "All Priorities" },
            { name: "Low" },
            { name: "Medium" },
            { name: "High" }
          ]}
        />
        <ButtonComponent
          icon={<PlusIcon />}
          label="Add Task"
          onClick={() => setIsOpen(true)}
          properties="bg-gradient-to-r from-violet-500 to-cyan-600"
        />
        {isOpen && (
          <ModalComponent
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
              setTitle("");
              setDescription("");
              setCategory("Personal");
              setPriority("High");
              setDueDate("");
            }}
          >
            <TodoForm
              caption="Create New Task"
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
              buttonLabel="Create Task"
              onClick={() => handleSubmit()}
              onCancel={() => setIsOpen(false)}
            />
          </ModalComponent>
        )}
      </div>
    </div>
  );
};
export default MiddleSection;
