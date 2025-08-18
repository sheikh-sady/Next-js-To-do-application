// "use client";
// import { useTodoForEdit } from "../(protected)/dashboard/DashboardPage";
// import { useCategory } from "../context/categoryContext";
// import { useTodos } from "../context/todosContext";
// import { updateTodo } from "../services/TodoService";
// import ButtonComponent from "./ButtonComponent";
// import DropDownComponent from "./DropDownComponent";
// import DropDownIcon from "./DropDownIcon";
// import InputField from "./InputField";
// import { useState } from "react";

// const TaskModal = ({
//   onClose,
//   id,
//   setIsModalOpen,
//   modalCaption,
//   title,
//   catego,
//   desc,
//   date,
//   buttonLabel,
// }) => {
//   const [newTodo, setNewTodo] = useState(title);
//   const [description, setDescription] = useState(desc);
//   const [category, setCategory] = useState(catego ? catego : "Personal");
//   const [priority, setPriority] = useState("High");
//   const [dueDate, setDueDate] = useState(date);
//   const { setTodos } = useTodos();
//   const { setTodoForEdit } = useTodoForEdit();
//   const { categories } = useCategory();

//   const handleUpdate = async () => {
//     const response = await updateTodo(
//       id,
//       newTodo,
//       description,
//       category,
//       priority,
//       dueDate
//     );
//     console.log(response)
//     if (response.error) {
//       console.log("Error updating task");
//       //setNewTodo("");
//       setTodoForEdit({});
//     } else {
//       console.log("Task updated successfully", description);
//       const updatedTodo = response.todo;
//       setTodos((prev) =>
//         prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
//       );
//     }
//     setTodoForEdit({});
//   };

//   return (
//     <div className=" p-4 max-w-110 w-full bg-white shadow-lg rounded-lg flex flex-col gap-4">
//       <div className="text-lg font-medium">{modalCaption}</div>
//       <div className="font-medium text-sm">
//         <p>Title</p>
//         <InputField
//           value={newTodo}
//           placeholder="Enter task title"
//           type="text"
//           onChange={(e) => setNewTodo(e.target.value)}
//           // onBlur={() => setNewTodo("")}
//           className="h-12 font-medium text-xs"
//         />
//       </div>
//       <div className="font-medium text-sm">
//         <p>Description</p>
//         <InputField
//           value={description}
//           placeholder="Enter description"
//           type="text"
//           onChange={(e) => setDescription(e.target.value)}
//           // onBlur={() => setDescription("")}
//           className=" h-20 font-medium text-sm"
//         />
//       </div>
//       <div className="flex justify-between gap-2 font-medium text-sm">
//         <div className="flex-1 flex flex-col gap-1">
//           <p>Category</p>
//           <DropDownComponent
//             setFilterCategory={setCategory}
//             title={category ? category : "Personal"}
//             icon1={<></>}
//             icon2={<DropDownIcon />}
//             items={categories}
//           />
//         </div>
//         <div className="flex-1 flex flex-col gap-1">
//           <p>Priority</p>
//           <DropDownComponent
//             title="Priority"
//             icon1={<></>}
//             icon2={<DropDownIcon />}
//             items={[
//               { name: "Created" },
//               { name: "Priority" },
//               { name: "Due Date" },
//             ]}
//           />
//         </div>
//       </div>

//       <div className="font-medium text-sm">
//         <p>Due Date</p>
//         <InputField
//           value={dueDate}
//           placeholder=""
//           type="date"
//           onChange={(e) => setDueDate(e.target.value)}
//           // onBlur={() => setDueDate("")}
//           className=" h-20 "
//         />
//       </div>
//       <div className="flex gap-4">
//         <ButtonComponent
//           icon={<></>}
//           label={buttonLabel}
//           onClick={async () => {
//             if (modalCaption === "Create New Task") {
//               const newTodoItem = await handleSubmit(
//                 newTodo,
//                 description,
//                 category,
//                 priority,
//                 dueDate
//               );
//             } else {
//               await handleUpdate();
//             }

//             setNewTodo("");
//             setDescription("");
//             setCategory("");
//             setPriority("");
//             setDueDate("");
//             setIsModalOpen(false);
//           }}
//           properties="flex-1 bg-black"
//         />
//         <ButtonComponent
//           icon={<></>}
//           label="Cancel"
//           onClick={() => {
//             onClose();
//             setNewTodo("");
//             setDescription("");
//             setCategory("");
//             setPriority("");
//             setDueDate("");
//           }}
//           properties="bg-black"
//         />
//       </div>
//     </div>
//   );
// };
// export default TaskModal;
