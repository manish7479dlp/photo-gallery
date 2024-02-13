import React from "react";
import { useNavigate, useParams } from "react-router-dom";
const BASE_URL = "http://localhost:8000/";
import { FaArrowCircleLeft, FaTrash, FaTimes } from "react-icons/fa";

const ImagePreview = () => {
  const { img } = useParams();
  const imgUrl = BASE_URL + "upload/" + img;
  const navigate = useNavigate()

  //delete image
 const deleteImg = () => {
  alert("click on delete btn")
 }

 //goBack function
 const goBack = () => {
  //back to previous page
  navigate(-1)
 }

  return (
    <div className="container pt-20 text-white h-screen">
      <div className="bg-slate-600 w-full h-12 text-3xl flex items-center justify-between px-3">
        <FaArrowCircleLeft className="cursor-pointer hover:text-green-500" onClick={goBack}/>
        <div className="flex gap-4">
          <FaTrash className="cursor-pointer hover:text-green-500" onClick={deleteImg}/>
        </div>
      </div>
      <img src={imgUrl} alt="img" className="object-contain" />
    </div>
  );
};

export default ImagePreview;
