"use client";
import { createContext, useContext, useState, useEffect } from "react";

export const CategoryContext = createContext();

export function useCategory() {
  return useContext(CategoryContext);
}

export default function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("/api/categories", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      console.log("Response is", response);
      if (response.error) console.log("failed to fetch categories...");
      else {
        const categoryArray = [{ name: "All Categories" }];
        response.categories.forEach((element) => {
          categoryArray.push(element);
        });
        setCategories(categoryArray);
      }
    };
    getCategories();
  }, []);
  console.log("categories", categories);
  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
}
