"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const TodosContext = createContext(null);

export function useTodos() {
  return useContext(TodosContext);
}

export default function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/todos", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setTodos(data);
      }
    };

    fetchData()

    const channel = supabase
      .channel("todos-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todos" },
        (payload) => {
          console.log("Realtime changes", payload);
          
          if (payload.eventType === "INSERT") {
            setTodos((prev) => [ payload.new, ...prev,]);
          }
          if (payload.eventType === "UPDATE") {
            setTodos((prev) =>
              prev.map((t) => (t.id === payload.new.id ? payload.new : t))
            );
          }
          if (payload.eventType === "DELETE") {
            setTodos((prev) => prev.filter((t) => t.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
}
