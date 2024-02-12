import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUser } from "../helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const navigate = useNavigate();

  const changePasswordVisibility = () => {
    setPasswordVisible((pre) => !pre);
  };

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check all mendatory field data are getting or not
    if (
      [firstName, lastName, userName, password, confirmPassword, email].some(
        (field) => field.trim() === ""
      )
    ) {
      toast.warning("All Fields are required");
      return;
    }

    if (confirmPassword !== password) {
      toast.warning("Password or Confirm password not Match");
      return;
    }
    const signUpDetails = {
      firstName,
      lastName,
      userName,
      password,
      email,
      avatar,
      coverImage,
    };

    console.log(signUpDetails);
    const response = await createUser(signUpDetails);
    if (response.status) {
      navigate("/login");
      toast.success("User created sucessfully")
    } else {
      toast.error(response.message)
    }
  };

  return (
    <div className="container h-screen w-full flex justify-center items-center ">
      <div className="md:bg-slate-600 text-white  rounded-lg p-8 mt-200 md:mt-10">
        <h1 className="text-center text-3xl font-dmsans font-bold">Signup</h1>
        <form
          onSubmit={handleSubmit}
          className=" flex md:justify-center flex-wrap gap-4 md:gap-8  md:mt-7"
        >
          <div>
            <label className="font-semi-bold">
              {" "}
              First Name <span className="text-red-500 text-2xl">*</span>
            </label>
            <br />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-md px-2 py-2 mt-2 bg-slate-500 w-64  md:w-72"
            />
          </div>

          <div>
            <label className="font-semi-bold">
              {" "}
              Last Name <span className="text-red-500 text-2xl">*</span>
            </label>
            <br />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-md px-2 py-2 mt-2 bg-slate-500 w-64 md:w-72"
            />
          </div>

          <div>
            <label className="font-semi-bold">
              Email <span className="text-red-500 text-2xl">*</span>
            </label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md px-2 py-2 mt-2 bg-slate-500 w-64 md:w-72"
            />
          </div>

          <div>
            <label className="font-semi-bold">
              {" "}
              User Name <span className="text-red-500 text-2xl">*</span>
            </label>
            <br />
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="rounded-md px-2 py-2 mt-2 bg-slate-500 w-64 md:w-72"
            />
          </div>

          <div className="relative">
            <label className="font-semi-bold">
              Password <span className="text-red-500 text-2xl">*</span>
            </label>
            <br />
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md px-2 py-2 mt-2 bg-slate-500 w-64 md:w-72"
            />
            <div className="absolute right-3 bottom-2">
              {isPasswordVisible ? (
                <FaEye onClick={changePasswordVisibility} />
              ) : (
                <FaEyeSlash onClick={changePasswordVisibility} />
              )}
            </div>
          </div>

          <div className="relative">
            <label className="font-semi-bold">
              Confirm Password <span className="text-red-500 text-2xl">*</span>
            </label>
            <br />
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-md px-2 py-2 mt-2 bg-slate-500 w-64 md:w-72"
            />
            <div className="absolute right-3 bottom-2">
              {isPasswordVisible ? (
                <FaEye onClick={changePasswordVisibility} />
              ) : (
                <FaEyeSlash onClick={changePasswordVisibility} />
              )}
            </div>
          </div>

          <div>
            <label className="font-semi-bold">Avatar Image</label>
            <br />
            <input
              type="file"
              name="avatar"
              onChange={(e) => setAvatar(e.target?.files)}
              className="rounded-md px-2 py-2 mt-2 bg-slate-500 w-64 md:w-72"
            />
          </div>

          <div>
            <label className="font-semi-bold">Cover Image</label>
            <br />
            <input
              type="file"
              name="coverImage"
              onChange={(e) => setCoverImage(e.target?.files)}
              className="rounded-md px-2 py-2 mt-2 bg-slate-500 w-64 md:w-72"
            />
          </div>

          <div className="">
            <input
              type="submit"
              value="Signup"
              className="bg-green-700 px-4 py-2 rounded-md font-bold cursor-pointer hover:bg-green-600 md:w-72"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
