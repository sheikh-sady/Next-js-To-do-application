// import { useState } from "react";
// import { useTodos } from "../context/todosContext";

// const DropDown = ({ todo, optionsArray }) => {
//   const {setTodos} = useTodos()
//   const [newStatus, setNewStatus] = useState("");
//   const handleChange = (e) => {
//     const selected = e.target.value;
//     setNewStatus(selected);
//     const updateStatus = async () => {
//       let statusInNum;
//       if (selected === "incomplete") statusInNum = 0;
//       else if (selected === "completed") statusInNum = 1;
//       else statusInNum = 2;

//       const res = await fetch(`/api/todos/${todo.id}`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ task: todo.task, is_complete: statusInNum }),
//       });
//       const result = await res.json()
//       if (!res.ok) console.log("Error updating status");
//       else {
//         console.log("status updated succesfully");
//         setTodos(prev=> prev.map(t=> t.id === todo.id ? result.todo : t))
//       }
//     };
//     updateStatus();
//   };
//   return (
//     <>
//       <select onChange={(e) => handleChange(e)}>
//         <option value={newStatus} hidden selected>
//           Select status
//         </option>
//         {optionsArray.map((option, index) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </>
//   );
// };
// export default DropDown;
