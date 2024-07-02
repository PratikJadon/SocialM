import React from "react";
import { CiSearch as SearchIcon } from "react-icons/ci";

const SearchBar = ({
  className = "",
  placeholder,
  inputValue,
  inputChange,
}) => {
  return (
    <div className={`flex relative items-center ${className}`}>
      <SearchIcon size={20} className="absolute translate-x-4" />
      <input
        className="outline-none bg-lightBlack rounded-3xl indent-12 w-full p-1 h-10"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => inputChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
