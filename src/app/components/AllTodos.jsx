// "use client";
// import TodoList from "@/app/components/TodoList";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Button from "./Button";
// import InputField from "./InputField";
// import { useTodos } from "../context/todosContext";
// import { handleSubmit, handleSearch} from "../services/TodoService";
// import { handleLogout } from "../services/AuthService";
// export default function AllTodos({ user }) {
//   console.log(user)
//   const { todos, setTodos } = useTodos();
//   const [todo, setTodo] = useState("");
//   const [filteredTodos, setFilteredTodos] = useState([]);
//   const [searchInput, setSearchInput] = useState("");
//   const router = useRouter();

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const res = await fetch("/api/todos", {
//   //       method:"GET",
//   //       credentials: "include",
//   //     });
//   //     if (res.ok) {
//   //       const data = await res.json();
//   //       setTodos(data);
//   //     }
//   //   };
//   //   fetchData();
//   // }, []);

//   // const handleSubmit = async () => {
//   //   if (hasSpecialChars(todo) || !hasLetters(todo)) {
//   //     alert("Invalid input");
//   //     return;
//   //   }

//   //   const res = await fetch("/api/todos", {
//   //     method: "POST",
//   //     credentials: "include",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify({ todo: todo }),
//   //   });

//   //   if (!res.ok) {
//   //     console.log("Error adding task");
//   //   } else {
//   //     console.log("Task added succesfully...");
//   //     setTodos((prev) => [...prev, todo]);
//   //   }
//   //   setTodo("");
//   // };

//   // const handleSearch = (e) => {
//   //   e.preventDefault();
//   //   const search = e.target.value;
//   //   setSearchInput(search);
//   //   const filtered = [];
//   //   todos.map((todo) => {
//   //     if (todo.task.includes(search)) {
//   //       filtered.push(todo);
//   //     }
//   //   });
//   //   setFilteredTodos(filtered);
//   // };

//   // const handleLogout = async () => {
//   //   const res = await fetch("/api/logout", {
//   //     method: "POST",
//   //     credentials: "include",
//   //   });
//   //   const response = await res.json();
//   //   if (!res.ok) {
//   //     console.log("something went wrong");
//   //     console.log(response);
//   //   } else {
//   //     console.log("Logged out succesfully");
//   //     router.push("/login"); // ✅ redirect to login page
//   //     router.refresh();
//   //   }
//   // };

//   // const handleDelete = async () =>{
//   //   const res = await fetch('/api/todos',{
//   //     method : "DELETE",
//   //     credentials:"include"
//   //   })
//   //   const response = await res.json()
//   //   console.log(response)
//   // }

//   return (
//     <div>
//       <div className="flex justify-center flex-col items-center flex-wrap gap-5">
//         <p className="font-bold text-2xl">
//           {/* {user.user_metadata.name ? user.user_metadata.name :*/} {user.email}'s 
//           To-do List
//         </p>
//         <form onSubmit={() => handleSubmit(todo)}>
//           <InputField
//             value={todo}
//             placeholder="Enter a task"
//             type="text-area"
//             onChange={(e) => setTodo(e.target.value)}
//           />
//         </form>

//         <form>
//           <InputField
//             value={searchInput}
//             placeholder="Search a task"
//             type="text-area"
//             onChange={(e) => {
//               setSearchInput(e.target.value);
//               const filtered = handleSearch(e, todos );
//               setFilteredTodos(filtered);
//             }}
//           />
//         </form>
//         {searchInput && (
//           <div>
//             {filteredTodos.map((t, index) => {
//               const parts = t.task.split(new RegExp(`(${searchInput})`, "g"));
//               return (
//                 <div key={index}>
//                   {parts.map((part, i) =>
//                     part === searchInput ? (
//                       <mark key={i}>{part}</mark>
//                     ) : (
//                       <span key={i}>{part}</span>
//                     )
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         <div className="flex gap-2.5 flex-wrap">
//           <TodoList status={0} />
//           <TodoList status={1} />
//           <TodoList status={2} />
//         </div>
//         <Button
//           className="w-24 h-9 rounded-3xl bg-black text-white hover:bg-neutral-800 hover:cursor-pointer"
//           label="Logout"
//           onClick={()=> handleLogout(router)}
//         />

//         {/* <Button
//           className="w-24 h-9 rounded-3xl bg-black text-white hover:bg-neutral-800 hover:cursor-pointer"
//           label="Delete Tasks"
//           onClick={handleDelete}
//         /> */}
//       </div>
//     </div>
//   );
// }
