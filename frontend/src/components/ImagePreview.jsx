import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowCircleLeft, FaTrash, FaTimes } from "react-icons/fa";
import { deleteImage } from "../helper";
import { toast } from "react-toastify";
import { setData } from "../store/features/user/userSlice";
import { useDispatch } from "react-redux";
import Loading from "../components/Loading"

const ImagePreview = () => {
  const { img } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isAuth = localStorage.getItem("user");
  const imgBaseURL = "http://res.cloudinary.com/ddyo9iiz9/image/upload/v1707922147/Gallery-Images/"
  const imgUrl = imgBaseURL + img;

  //delete image
  const deleteImg = async () => {
    try {
      setLoading(true)
      const confirm = window.confirm("Do you really want to delete");
      if (confirm) {
        const response = await deleteImage(img.split(".")[0]);
        if (response) {
          dispatch(setData(response.data.user));
          toast.success("Image deleted sucessfully");
          goBack();
        } else {
          console.log(response);
        }
      }
      setLoading(false)
    } catch (error) {
      setLoading(true)
      console.log("Error in imagePreview component: ", error);
    }
  };

  //goBack function
  const goBack = () => {
    //back to previous page
    navigate(-1);
  };

  if(loading) {
    return <Loading/>
  }

  return (
    <div className="container pt-20 text-white h-screen">
      <div className="bg-slate-600 w-full h-12 text-3xl flex items-center justify-between px-3">
        <FaArrowCircleLeft
          className="cursor-pointer hover:text-green-500"
          onClick={goBack}
        />
        <div className={`${!isAuth && "hidden"} flex gap-4`}>
          <FaTrash
            className="cursor-pointer hover:text-green-500"
            onClick={deleteImg}
          />
        </div>
      </div>
      <img src={imgUrl} alt="img" className="object-contain" />
    </div>
  );
};

export default ImagePreview;
