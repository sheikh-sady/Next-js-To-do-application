"use client";
import ButtonComponent from "@/app/components/ButtonComponent";
import InputField from "@/app/components/InputField";
import PlusIcon from "@/app/components/PlusIcon";
import { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import CategoryCard from "@/app/components/CategoryCard";
import { hasLetters, hasSpecialChars } from "@/app/services/TodoService";
import { useCategory } from "@/app/context/categoryContext";
import { addCategory } from "@/app/services/CategoryService";
import CategoryForm from "@/app/components/CategoryForm";
const CategoryPage = () => {
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState("");
  const { categories, setCategories } = useCategory();
  const [buttonActive, setButtonActive] = useState(false);
  useEffect(() => {
    if (!hasLetters(name) || hasSpecialChars(name) || name === "")
      setButtonActive(false);
    else setButtonActive(true);
  }, [name]);

  const addCategory = async () => {
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
    if (response.error) console.log("Couldnot add category");
    else console.log("Category added");

    setCategoryFormOpen(false);
    setCategories((prev) => [...prev, response.category]);
    setColor("");
    setIcon("");
    setName("");
  };
  const handleSubmit = async () => {
    const response = await addCategory(name, color, icon);
    if (response.error) console.log("Error adding new category");
    else {
      console.log("Category added");
    }

    setCategoryFormOpen(false);
    setCategories((prev) => [...prev, response.category]);
    setColor("");
    setIcon("");
    setName("");
  };
  return (
    <div className="bg-gradient-to-r from-violet-50 to-cyan-50 p-4 flex flex-col gap-6 font-sans">
      <div className="p-2 flex justify-between text-black">
        <div className=" flex flex-col gap-5">
          <p className="text-3xl font-bold">Categories</p>
          <p className="text-md text-gray-500">
            Organize your tasks with custom categories
          </p>
        </div>
        <ButtonComponent
          icon={<PlusIcon />}
          label="Add Categories"
          onClick={() => setCategoryFormOpen(true)}
          properties="bg-gradient-to-r from-violet-600 to-cyan-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {categories.map(
          (c) =>
            c.name !== "All Categories" && (
              <CategoryCard
                key={c.id}
                setCategories={setCategories}
                category={c}
              />
            )
        )}
      </div>

      {categoryFormOpen && (
        <Modal
          isOpen={categoryFormOpen}
          onClose={() => {
            setCategoryFormOpen(false)
            setName('')
            setColor('')
            setIcon('')
          }}
        >
          <CategoryForm
            caption="Create New Category"
            name={name}
            setName={setName}
            color={color}
            setColor={setColor}
            icon={icon}
            setIcon={setIcon}
            buttonLabel="Create Category"
            onClick={() => handleSubmit()}
            onClose={() => setCategoryFormOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};
export default CategoryPage;
