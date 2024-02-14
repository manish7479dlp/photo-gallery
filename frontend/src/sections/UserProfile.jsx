import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaUpload, FaCloudUploadAlt, FaEdit } from "react-icons/fa";
import { useRef } from "react";
import { uploadImage } from "../helper";
import { useDispatch } from "react-redux";
import { setData } from "../store/features/user/userSlice";
import { useNavigate } from "react-router-dom";


const UserProfile = ({
  coverImage,
  firstName,
  lastName,
  email,
  images,
  userName,
  avatar,
}) => {
  const isAuth = localStorage.getItem("user");

  const inputFileRef = useRef(null);
  const [uploadImg, setUploadImg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //edit profile function
  const editProfile = () => {
    navigate("/change-user-details");
  };

  //upload file function
  const uploadFile = async () => {
    try {
      if (!uploadImg) {
        toast.warning("Upload file is missing");
        return;
      }
      const response = await uploadImage(uploadImg);
      if (response.status) {
        dispatch(setData(response.data.user));
        toast.success("Image uploaded sucessfully");
        setUploadImg("");
      } else {
        toast.warning("Something went wrong");
      }
    } catch (error) {
      console.log("Error in upload file funciton", error);
    }
  };

  //change avatar img
  const changeAvatar = () => {
    if (isAuth) {
      const confirm = window.confirm("Do you really want to change avatar");
      if (confirm) {
        navigate("/change-avatar-image");
      }
    }
  };

  //change cover img
  const changeCoverImage = () => {
    const confirm = window.confirm("Do you really want to change avatar");
    if (confirm) {
      navigate("/change-cover-image");
    }
  };

  return (
    <div className="relative  bg-slate-900 rounded-md overflow-hidden">
      {/* coverImage section */}
      <div className="h-44 relative">
        <img
          src={coverImage}
          alt="cover-image"
          className="max-h-36 md:max-h-44 object-cover w-full "
        />
        <FaEdit
          className={`${
            !isAuth && "hidden"
          } absolute right-5 top-5 text-red-600 size-8 cursor-pointer hover:text-green-500 `}
          onClick={changeCoverImage}
        />
      </div>

      {/* user details section */}
      <div className="pt-8 pb-5 flex justify-between flex-col md:flex-row md:pb-0">
        {/* avatar */}
        <div
          className="absolute top-12 md:top-20 left-5"
          onClick={changeAvatar}
        >
          <img
            src={avatar}
            alt="avatar-img"
            className="w-36 h-36 object-cover rounded-full bg-white p-1 cursor-pointer"
          />
        </div>

        {/* user details */}
        <div className="pt-8 pb-6 px-5 flex flex-col gap-2 ">
          <h2 className="font-dmsans text-3xl">{firstName + " " + lastName}</h2>
          <h3 className="font-dmsans text-1xl text-slate-500 font-semibold">
            <span className="text-slate-400 font-normal"> User Name :</span>{" "}
            {userName}
          </h3>
          <h3 className="font-dmsans text-1xl text-slate-500 font-semibold">
            <span className="text-slate-400 font-normal"> Email :</span> {email}
          </h3>
          <h3 className="font-dmsans text-1xl text-slate-300 font-semibold">
            <span className="text-slate-500 font-normal">
              {" "}
              Total Image Count :
            </span>{" "}
            {images?.length}
          </h3>
          <div>
            <div className={`${!isAuth && "hidden"} flex justify-between `}>
              <button
                className="bg-slate-700 px-3 py-1 rounded-md font-dmsans hover:bg-slate-800"
                onClick={editProfile}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* upload section */}
        <div
          className={`${
            !isAuth && "hidden"
          } pt-8 px-5 flex items-center flex-col gap-3`}
        >
          <div
            className="w-32 h-32 rounded-lg border-white border flex-col flex justify-center items-center cursor-pointer"
            onClick={() => inputFileRef.current.click()}
          >
            <FaCloudUploadAlt size={100} />
            <input
              type="file"
              ref={inputFileRef}
              onChangeCapture={(e) => setUploadImg(e.target.files[0])}
              className="hidden"
            />
          </div>

          <button
            className={`${
              uploadImg ? "bg-green-700" : "bg-slate-700"
            } px-3 py-1 rounded-md font-dmsans hover:bg-green-800 `}
            onClick={uploadFile}
          >
            {uploadImg ? uploadImg?.name?.slice(0, 13) : "Upload"}{" "}
            <FaUpload className="inline ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
