import TodoList from "./TodoList";

const BottomSection = ({
  searchInput,
  filteredTodos,
  filteredBySearch,
  filterCategory,
  filterPriority
}) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-5">
      {/* <div className="flex flex-col gap-5 min-w-65 ">
            <div className="p-5 text-2xl font-bold shadow-2xl bg-gray-100 rounded-md">
              Todo
            </div>
            <div className="flex flex-col border-2 border-gray-300 rounded-lg border-dashed min-h-120 bg-gray-100 text-gray-500 text-center justify-center ">
              No tasks in to do Drag tasks here or create new ones
            </div>
            
          </div> */}
      <TodoList
        searchInput={searchInput}
        filteredTodos={filteredTodos}
        filterCategory={filterCategory}
        filteredBySearch={filteredBySearch}
        filterPriority={filterPriority}
        status={0}
        color="bg-gray-100"
      />
      {/* <div className="flex flex-col gap-5 min-w-75 min-h-140 ">
            <div className="p-5 bg-blue-100 text-2xl font-bold shadow-2xl rounded-md">
              In Progress
            </div>
            <div className="flex flex-col justify-center border-2 border-gray-300 rounded-lg border-dashed min-h-120 bg-blue-100 text-gray-500 text-center">
              No tasks here, add some
            </div>
          </div> */}
      <TodoList
        searchInput={searchInput}
        filteredTodos={filteredTodos}
        filterCategory={filterCategory}
        filteredBySearch={filteredBySearch}
        filterPriority={filterPriority}
        status={2}
        color="bg-blue-100"
      />
      {/* <div className="flex flex-col gap-5 min-w-75 min-h-140 ">
            <div className="p-5 bg-green-100 text-2xl font-bold shadow-2xl rounded-md">
              Completed
            </div>
            <div className="flex flex-col justify-center border-2 border-gray-300 rounded-lg border-dashed min-h-120 bg-green-100 text-gray-500 text-center">
              No tasks here, add some
            </div>
          </div> */}
      <TodoList
        searchInput={searchInput}
        filteredTodos={filteredTodos}
        filterCategory={filterCategory}
        filteredBySearch={filteredBySearch}
        filterPriority={filterPriority}
        status={1}
        color="bg-green-100"
      />
    </div>
  );
};
export default BottomSection;
