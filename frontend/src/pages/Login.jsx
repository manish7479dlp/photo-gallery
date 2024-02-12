import React from "react";

const Login = () => {
  return (
    <div className="container h-screen w-full flex justify-center items-center">
      <div className="bg-slate-700 text-white w-72 rounded-lg p-8 md:w-80">
        <h1 className="text-center text-3xl font-dmsans font-bold">Login</h1>

        <form className="flex flex-col gap-4 mt-7">
          <div>
            <label className="font-semi-bold">User Name</label>
            <input type="text" className="rounded-md px-2 py-1 mt-2 bg-slate-500 md:w-64" />
          </div>

          <div>
            <label className="font-semi-bold">Password</label>
            <input type="text" className="rounded-md px-2 py-1 mt-2 bg-slate-500 md:w-64" />
          </div>

          <div className="text-center">
            <input type="submit" value="Login" className="bg-green-700 px-4 py-2 rounded-md font-bold cursor-pointer hover:bg-green-600 "/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
