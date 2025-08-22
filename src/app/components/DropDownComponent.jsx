"use client";

import { useState } from "react";

const DropDownComponent = ({
  title,
  icon1,
  icon2,
  items,
  setFilterCategory,
}) => {
  const [isSelectActive, setIsSelecActive] = useState(false);

  // Filter unique items ignoring case
  const uniqueItems = items.filter(
    (item, index, self) =>
      index ===
      self.findIndex((t) => t.name.toLowerCase() === item.name.toLowerCase())
  );

  return (
    <button
      onClick={() => setIsSelecActive((prev) => !prev)}
      onBlur={() => setIsSelecActive(false)}
      className={`h-10 min-w-35 p-2 rounded-md hover:cursor-pointer relative flex gap-2 justify-between ${
        isSelectActive
          ? "border-1 border-black outline-2 outline-offset-2 outline-black"
          : "border-1 border-gray-300"
      }`}
    >
      {icon1}
      <p className="text-sm">{title}</p>
      {icon2}

      {isSelectActive && (
        <div className="w-full max-h-40 overflow-y-auto z-10 bg-white mt-12 p-2 left-0 absolute shadow-xl rounded-lg flex flex-col gap-4">
          {uniqueItems.map((i, index) => (
            <li
              key={index}
              onClick={() => setFilterCategory(i.name)}
              className="list-none h-7 content-center text-center text-sm hover:outline-2 rounded-sm"
            >
              {i.name}
            </li>
          ))}
        </div>
      )}
    </button>
  );
};

export default DropDownComponent;
