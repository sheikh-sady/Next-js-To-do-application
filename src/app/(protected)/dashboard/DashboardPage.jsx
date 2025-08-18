"use client";
import BottomSection from "@/app/components/BottomSection";
import MiddleSection from "@/app/components/MiddleSection";
import TopSection from "@/app/components/TopSection";
import { useCategory } from "@/app/context/categoryContext";
import { useTodos } from "@/app/context/todosContext";
import {
  filterByCategory,
  filterByPriority,
  handleSearch,
} from "@/app/services/TodoService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = ({ user }) => {
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterPriority, setFilterPriority] = useState("All Priorities");
  const [searchInput, setSearchInput] = useState("");
  const [filteredBySearch, setFilteredBySearch] = useState([]);
  const { setCategories } = useCategory();
  const { todos } = useTodos();
  const router = useRouter();

 useEffect(() => {
  let result = todos;

  // Apply category filter
  result = filterByCategory(result, filterCategory);

  // Apply search filter
  result = handleSearch(searchInput, result);

  // Apply priority filter
  result = filterByPriority(result, filterPriority);

  // Finally update state once
  setFilteredTodos(result);
}, [todos, filterPriority, filterCategory, searchInput]);


  return (
    <>
      {user && (
        <div className="w-full mb-5 flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <p className="text-3xl font-bold">Task Board</p>
            <p>Manage your tasks with drag and drop</p>
          </div>

          <TopSection />

          <MiddleSection
            filteredTodos={filteredTodos}
            setFilteredTodos={setFilteredTodos}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            filterCategory={filterCategory}
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            setFilterCategory={setFilterCategory}
            setFilteredBySearch={setFilteredBySearch}
          />

          <BottomSection
            searchInput={searchInput}
            filteredTodos={filteredTodos}
            filterCategory={filterCategory}
            filteredBySearch={filteredBySearch}
            filterPriority={filterPriority}
          />
        </div>
      )}
    </>
  );
};
export default DashboardPage;
