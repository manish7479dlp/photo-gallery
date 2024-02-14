import React from "react";
import { useNavigate } from "react-router-dom";

const ImageContainer = ({ imgUrl }) => {

  const navigate = useNavigate()
  const arr = imgUrl.split("/");
  return (
    <div className="">
      <img
        src={imgUrl}
        alt="img"
        className="w-40 h-40 object-cover cursor-pointer rounded-md bg-white p-[1px]"
        onClick={() => navigate("/image-preview/"+ arr[arr.length-1])}
      />
    </div>
  );
};

export default ImageContainer;
