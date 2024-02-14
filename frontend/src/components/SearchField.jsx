import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchField = () => {
  const [search, setSearch] = useState("");

  //search user
  const findUser = () => {
    console.log(search);
  };
  return (
    <div className="flex items-center justify-center">
      <input
        className="px-4 py-2 rounded-l-full font-dmsans text-xl w-56 sm:w-96 font-semibold focus:outline-none text-center text-slate-700"
        type="text"
        placeholder="Search using @userName"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div className="text-3xl bg-red-600 py-2 px-5  rounded-r-full cursor-pointer hover:bg-red-700">
        <FaSearch onClick={findUser} />
      </div>
    </div>
  );
};

export default SearchField;
