import React from "react";
const errorImgURL =
  "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg";
const ImageContainer = ({ imgUrl }) => {
  return (
    <div className="">
      <img
        src={imgUrl}
        alt="img"
        className="w-40 h-40 object-cover cursor-pointer rounded-md bg-white p-[1px]"
      />
    </div>
  );
};

export default ImageContainer;
