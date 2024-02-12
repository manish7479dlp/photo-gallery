import React from "react";

const Header = () => {
  return (
    <header className="bg-slate-700 w-full fixed top-0 left-0 z-50 ">
      <nav className="container h-14 flex justify-center items-center">
        <h1 className="text-white text-4xl  font-oswald">Gallery App</h1>
      </nav>
    </header>
  );
};

export default Header;
