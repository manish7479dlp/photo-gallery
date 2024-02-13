import React from "react";
import { useNavigate } from "react-router-dom";
const ACCESS_TOKEN = "accessToken";

const Header = () => {
  const navigate = useNavigate()

   const logout = () => {
     localStorage.removeItem(ACCESS_TOKEN)
     localStorage.removeItem("user")
     navigate("/login")
   }

  return (
    <header className="bg-slate-700 w-full fixed top-0 left-0 z-50 ">
      <nav className="container h-16 flex justify-between items-center">
        <h1 className="text-white text-4xl  font-oswald">Gallery App</h1>
          <button onClick={logout} className="text-white px-3 py-1 rounded-md font-dmsans font-semibold bg-yellow-500 hover:bg-green-500">
            Logout
          </button>
      </nav>
    </header>
  );
};

export default Header;
