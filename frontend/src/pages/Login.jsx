import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../helper";
import {useDispatch} from "react-redux"
import { setData } from "../store/features/user/userSlice";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading"

const Login = () => {
  const ACCESS_TOKEN = 'accessToken'
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [userName , setUserName] = useState("")
  const [password , setPassword] = useState("")
  const [loading , setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const changePasswordVisibility = () => {
    setPasswordVisible((pre) => !pre)
  }

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("user")
     if(isAuthenticated) {
      navigate("/profile")
     }
  },[])

  //handle form submit
  const handleSubmit = async (e) => {
     try {
      setLoading(true)
      e.preventDefault()
     const loginData = {
      userName,
      password
     }

     const response = await login(loginData);
     if(response.status) {
      dispatch(setData(response.data.user))
      localStorage.setItem(ACCESS_TOKEN , response.data.accessToken)
        toast.success("login sucessfully")
        navigate("/profile")
     } else {
         toast.error(response.message)
     }
     setLoading(false)
     } catch (error) {
      setLoading(false)
        toast.error(response.message)
     }
  }

  if(loading) {
    return <Loading/>
  }


  return (
    <div className="container h-screen w-full flex justify-center sm:items-center mt-20 sm:mt-0">
      <div className="sm:bg-slate-700 text-white  rounded-lg sm:p-8 mt-5">
        <h1 className="text-center text-4xl font-dmsans font-bold">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-7">
          <div>
            <label className="font-semi-bold"> User Name</label>
            <br/>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              // className="rounded-md px-2 py-1 mt-2 bg-slate-500 md:w-64"
              className="rounded-md px-2 py-2 text-xl mt-2 bg-slate-500 w-72"

            />
          </div>

          <div className="relative w-full">
            <label className="font-semi-bold">Password</label>
            <br/>
            <input
              type= {isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // className="rounded-md px-2 py-1 mt-2 bg-slate-500 md:w-64"
              className="rounded-md px-2 py-2 text-xl mt-2 bg-slate-500  w-72"

            />
            <div className="absolute right-3 bottom-3">
              {isPasswordVisible ? <FaEye onClick={changePasswordVisibility}/> : <FaEyeSlash onClick={changePasswordVisibility}/> }
            </div>
          </div>

          <div className="text-center">
            <input
              type="submit"
              value="Login"
              className="bg-green-700 px-4 py-2 text-xl rounded-md font-bold cursor-pointer hover:bg-green-600 "
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
