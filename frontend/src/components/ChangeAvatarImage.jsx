import React, { useRef, useState } from "react";
import { FaUpload, FaCloudUploadAlt, FaEdit } from "react-icons/fa";
import { updateAvatarImage, updateCoverImage } from "../helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setData } from "../store/features/user/userSlice";

const ChangeAvatarImage = () => {
  const inputFileRef = useRef(null);
  const [avatarImage, setAvatarImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  //change cover image
  const changeAvtarImg = async () => {
    try {
      const response = await updateAvatarImage(avatarImage);
      if (response.status) {
        dispatch(setData(response.data.user));

        toast.success("Avatar image updated sucessfully.");
        navigate(-1);
      }
    } catch (error) {
      console.log("Error in change avatar image component", error);
    }
  };
  return (
    <div className="container pt-20 text-white flex justify-center items-center h-screen">
      {/* upload section */}
      <div className="pt-8 px-5 flex items-center flex-col gap-3">
        <div
          className="w-32 h-32 rounded-lg border-white border flex-col flex justify-center items-center cursor-pointer"
          onClick={() => inputFileRef.current.click()}
        >
          <FaCloudUploadAlt size={100} />
          <input
            type="file"
            ref={inputFileRef}
            onChangeCapture={(e) => setAvatarImage(e.target.files[0])}
            className="hidden"
          />
        </div>

        <button
          className={`${
            avatarImage ? "bg-green-700" : "bg-slate-700"
          } px-3 py-1 rounded-md font-dmsans hover:bg-green-800 `}
          onClick={changeAvtarImg}
        >
          {avatarImage ? avatarImage?.name?.slice(0, 13) : "Upload"}{" "}
          <FaUpload className="inline ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ChangeAvatarImage;
