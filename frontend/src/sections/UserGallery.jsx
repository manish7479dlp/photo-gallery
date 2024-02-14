import React from "react";
import ImageContainer from "../components/ImageContainer";

const UserGallery = ({ images }) => {

  const imagesCollection = [...images];
  imagesCollection.reverse();

  return (
    <>
      <div className="pl-2">
        <h1 className="text-3xl font-oswald pt-3">Our Collections</h1>
        <div className="border-b-2 border-yellow-600 w-40"></div>
      </div>
      <div className="py-3 px-1 md:px-0 bg-slate-900 flex flex-wrap gap-2 justify-center rounded-md">
        {imagesCollection?.length === 0 && <h1>No Image found</h1>}

        {imagesCollection?.map((image, idx) => {
          return <ImageContainer key={idx} imgUrl={image} />;
        })}
      </div>
    </>
  );
};

export default UserGallery;
