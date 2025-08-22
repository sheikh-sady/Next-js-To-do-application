import EditIcon from "./EditIcon";
import TagIcon from "./TagIcon";
import DeleteIcon from "./DeleteIcon";
import PaintIcon from "./PaintIcon";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import ButtonComponent from "./ButtonComponent";
import { hasLetters, hasSpecialChars } from "../services/TodoService";
import { deleteCategory, updateCategory } from "../services/CategoryService";
import CategoryForm from "./CategoryForm";

const CategoryCard = ({ setCategories, category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState(category.name);
  const [newIcon, setNewIcon] = useState(category.icon);
  const [newColor, setNewColor] = useState(category.color);
  const [buttonActive, setButtonActive] = useState(false);
  useEffect(() => {
    if (!hasLetters(newName) || hasSpecialChars(newName) || newName === "")
      setButtonActive(false);
    else setButtonActive(true);
  }, [newName]);

  // const updateCategory = async (id,newName,newIcon,newColor) => {
  //   if(!hasLetters(newName) || hasSpecialChars(newName) || newName === undefined)
  //         return alert("Invalid input")
  //   const res = await fetch(`/api/categories/${id}`, {
  //     method: "PATCH",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name: newName, icon: newIcon, color: newColor }),
  //   });
  //   const response = await res.json();
  //   if (response.error) console.log(response.error);
  //   else {
  //     const updatedCategory = response.category;
  //     setCategories((prev) =>
  //       prev.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
  //     );
  //     // setNewColor(updatedCategory.color)
  //     // setNewIcon(updatedCategory.icon)
  //     // setNewName(updatedCategory.name)
  //   }

  //   setIsOpen(false);
  // };

  // const deleteCategory = async (id) => {
  //   const res = await fetch(`/api/categories/${id}`, {
  //     method: "DELETE",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const response = await res.json();
  //   if (response.error) console.log(response.error);
  //   else {
  //     setCategories((prev) => prev.filter((c) => c.id !== category.id));
  //   }
  //   // setNewColor('')
  //   // setNewIcon('')
  //   // setNewName('')
  // };

  const handleUpdate = async () => {
    const response = await updateCategory(
      category.id,
      newName,
      newColor,
      newIcon
    );
    if (response.error) console.log(response.error);
    else {
      const updatedCategory = response.category;
      setCategories((prev) =>
        prev.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
      );
      // setNewColor(updatedCategory.color)
      // setNewIcon(updatedCategory.icon)
      // setNewName(updatedCategory.name)
    }

    setIsOpen(false);
  };

  const handleDelete = async () => {
    const response = await deleteCategory(category.id);
    if (response.error) console.log(response.error);
    else {
      setCategories((prev) => prev.filter((c) => c.id !== category.id));
    }
    // setNewColor('')
    // setNewIcon('')
    // setNewName('')
  };
  return (
    <div className="p-4 flex flex-col gap-5 bg-white rounded-md shadow-xl h-30 text-black text-md">
      <div className="flex justify-around">
        <TagIcon color={category.color} width="30px" height="30px" />

        <div className="flex flex-col">
          <p className="text-lg text-black/80 font-bold">{category.name}</p>
          <p className="text-sm text-gray-600 font-medium">Category</p>
        </div>

        <div className={`flex justify-between gap-2 ${category.name === 'Personal' ? 'text-gray-400 pointer-events-none':''}`}>
          <EditIcon
            width="20px"
            height="20px"
            onClick={() => setIsOpen(true)}
          />
          <DeleteIcon
            width="20px"
            height="20px"
            onClick={() => handleDelete()}
            color={category.name ==="Personal"?"":"text-red-500"}
          />
        </div>
      </div>

      <div className="flex gap-4 text-gray-600 font-medium">
        <PaintIcon />
        <p className="text-sm">{category.color}</p>
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setNewName(category.name);
            setNewColor(category.color);
            setNewIcon(category.icon);
          }}
        >
          <CategoryForm
            caption="Edit Category"
            name={newName}
            setName={setNewName}
            color={newColor}
            setColor={setNewColor}
            icon={newIcon}
            setIcon={setNewIcon}
            buttonLabel="Save Changes"
            onClick={() => handleUpdate()}
            onCancel={() => {
              setIsOpen(false);
              setNewName(category.name);
              setNewColor(category.color);
              setNewIcon(category.icon);
            }}
          />
        </Modal>
      )}
    </div>
  );
};
export default CategoryCard;
