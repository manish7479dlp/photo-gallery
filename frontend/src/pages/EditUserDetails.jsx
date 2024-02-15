import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updateUserDetails } from "../helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../store/features/user/userSlice";
import Loading from "../components/Loading"

const EditUserDetails = () => {
  const data = useSelector((state) => state?.user?.data);

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [firstName, setFirstName] = useState(data?.firstName);
  const [lastName, setLastName] = useState(data?.lastName);
  const [userName, setUserName] = useState(data?.userName);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(data?.email);
  const [avatar, setAvatar] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changePasswordVisibility = () => {
    setPasswordVisible((pre) => !pre);
  };

  //handle form submit
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (confirmPassword !== password) {
        toast.warning("Password or Confirm password not Match");
        return;
      }
      const UserDetails = {
        firstName,
        lastName,
        userName,
        password,
        email,
        avatar,
        coverImage,
      };

      const response = await updateUserDetails(UserDetails);
      if (response.status) {
        dispatch(setData(response.data));
        navigate(-1);
        toast.success("User updated sucessfully");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error in editUserDetails component: ", error);
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    return <Loading/>
  }

  return (
    <div className="container h-screen w-full flex justify-center items-center mt-44 sm:mt-40 md:mt-0">
      <div className="md:bg-slate-600 text-white  rounded-lg p-8 mt-200 md:mt-10">
        <h1 className="text-center text-3xl  font-dmsans font-bold mb-3">
          Edit User Details
        </h1>
        <form
          onSubmit={handleSubmit}
          className=" flex md:justify-center flex-wrap gap-5 md:gap-8  md:mt-7"
        >
          <div>
            <label className="font-semi-bold"> First Name</label>
            <br />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-md px-2 py-2 mt-2 bg-slate-500 w-64  md:w-72"
            />
          </div>

          <div>
            <label className="font-semi-bold"> Last Name</label>
            <br />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-md px-2 py-2 mt-2 bg-slate-500 w-64 md:w-72"
            />
          </div>

          <div>
            <label className="font-semi-bold">Email</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md px-2 py-2 mt-2 bg-slate-500 w-64 md:w-72"
            />
          </div>

          <div>
            <label className="font-semi-bold"> User Name</label>
            <br />
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="rounded-md px-2 py-2 mt-2 bg-slate-500 w-64 md:w-72"
            />
          </div>

          <div className="relative">
            <label className="font-semi-bold">Password</label>
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
            <label className="font-semi-bold">Confirm Password</label>
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

          <div className=" sm:w-72">
            <input
              type="submit"
              value="Update"
              className="bg-green-700 px-4 py-2 rounded-md font-bold cursor-pointer hover:bg-green-600 md:w-72"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;
