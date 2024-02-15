import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getUserByUserName } from "../helper";
import { useDispatch } from "react-redux";
import { setData } from "../store/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import Loading from "./Loading";

const SearchField = () => {
  const [search, setSearch] = useState("");
  const [loading , setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  //search user
  const findUser = async () => {
    try {
      setLoading(true)
      const response = await getUserByUserName(search);
      if (response.status) {
        dispatch(setData(response.data));
        localStorage.clear()
        navigate("/profile")
      } else {
        toast.info("Invalid userName")
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("Error in findUser component function: ", error);
    }
  };

  if(loading) {
   return <Loading />
  }
  return (
    <div className="flex items-center justify-center">
      <input
        className="px-4 py-2 rounded-l-full font-dmsans text-xl w-56 sm:w-96 font-semibold focus:outline-none text-center text-slate-700"
        type="text"
        placeholder="Search using @userName"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div className="text-3xl bg-slate-500 py-2 px-5  rounded-r-full cursor-pointer hover:bg-green-700">
        <FaSearch onClick={findUser} />
      </div>
    </div>
  );
};

export default SearchField;
