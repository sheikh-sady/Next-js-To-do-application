"use client";

import SearchIcon from "./SearchIcon";

const SearchInputField = ({ value, placeholder, type, onChange, onBlur, className }) => {
  return (
      <div
        tabIndex={0}
        className={`flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus-within:border-gray-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-black ${className}`}
      >
        {/* Search Icon */}
        
        <SearchIcon/>
        {/* Input */}
        <input
          type={type}
          placeholder={placeholder}
          className="bg-transparent focus:outline-none text-base text-gray-700 placeholder:text-gray-400 w-full"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
   
  );
};

export default SearchInputField;
