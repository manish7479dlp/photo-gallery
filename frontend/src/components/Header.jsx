import React from "react";
import { useNavigate , useLocation } from "react-router-dom";
const ACCESS_TOKEN = "accessToken";

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuth = localStorage.getItem("user");


   const logout = () => {
     localStorage.removeItem(ACCESS_TOKEN)
     localStorage.removeItem("user")
     navigate("/login")
   }

  return (
    <header className={`${location.pathname == "/" ? "hidden" : "visible"}  bg-slate-700 w-full fixed top-0 left-0 z-50 `}>
      <nav className="container h-16 flex justify-between items-center">
        <h1 className="text-white text-2xl sm:text-4xl font-oswald">Gallery App</h1>
          <button onClick={logout} className={`text-white px-3 py-1 rounded-md font-dmsans font-semibold bg-yellow-500 hover:bg-green-500 ${location.pathname === "/profile" ? "visible" : "hidden"} ${!isAuth && "hidden"}`}>
            Logout
          </button>
      </nav>
    </header>
  );
};

export default Header;
