import React, { useRef, useState } from "react";
import { FaUpload, FaCloudUploadAlt, FaEdit } from "react-icons/fa";
import { updateCoverImage } from "../helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setData } from "../store/features/user/userSlice";
import Loading from "../components/Loading"

const ChangeCoverImage = () => {
  const inputFileRef = useRef(null);
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  //change cover image
  const changeCoverImg = async () => {
    try {
      setLoading(true)
      const response = await updateCoverImage(coverImage);
      if (response.status) {
        dispatch(setData(response.data.user));

        toast.success("Cover image updated sucessfully.");
        navigate(-1);
      }
      setLoading(false)
    } catch (error) {
      setLoading(true)
      console.log("Error in change cover image component", error);
    }
  };

  if(loading) {
    return <Loading/>
  }
  
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
            onChangeCapture={(e) => setCoverImage(e.target.files[0])}
            className="hidden"
          />
        </div>

        <button
          className={`${
            coverImage ? "bg-green-700" : "bg-slate-700"
          } px-3 py-1 rounded-md font-dmsans hover:bg-green-800 `}
          onClick={changeCoverImg}
        >
          {coverImage ? coverImage?.name?.slice(0, 13) : "Upload"}{" "}
          <FaUpload className="inline ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ChangeCoverImage;
