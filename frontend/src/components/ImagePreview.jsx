import React from "react";
import { useNavigate, useParams } from "react-router-dom";
const BASE_URL = "http://localhost:8000/";
import { FaArrowCircleLeft, FaTrash, FaTimes } from "react-icons/fa";
import { deleteImage } from "../helper";
import { toast } from "react-toastify";
import { setData } from "../store/features/user/userSlice";
import { useDispatch } from "react-redux";

const ImagePreview = () => {
  const { img } = useParams();
  const imgUrl = BASE_URL + "upload/" + img;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = localStorage.getItem("user");


  //delete image
  const deleteImg = async () => {
    try {
      const confirm = window.confirm("Do you really want to delete");
      if (confirm) {
        const response = await deleteImage(img);
        if (response) {
          dispatch(setData(response.data.user));
          toast.success("Image deleted sucessfully");
          goBack();
        } else {
          console.log(response);
        }
      }
    } catch (error) {
      console.log("Error in imagePreview component: ", error);
    }
  };

  //goBack function
  const goBack = () => {
    //back to previous page
    navigate(-1);
  };

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
