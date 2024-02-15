import React, { useEffect, useState } from "react";
import { getAllImage } from "../helper";
import { useNavigate } from "react-router-dom";
import SearchField from "../components/SearchField";
import Loading from "../components/Loading";

const Landing = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllImage()
      .then((response) => {
        setImages(response.data.allImages);
      })
      .then((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="h-screen w-full overflow-hidden">
        <div className=" text-white grid grid-cols-3 md:grid-cols-6 md:skew-y-6  md:scale-125 opacity-15 sm:opacity-25">
          {images.length === 0 && <h1>No image found</h1>}

          {images?.map((image, idx) => (
            <ImageContainer imgLink={image} key={idx} />
          ))}
        </div>
        <div className="absolute top-0 left-0 h-screen w-full text-white flex justify-center sm:items-center">
          {/* header */}
          <div className="absolute top-0 pl-10 sm:pl-20 bg-green-600 sm:bg-transparent rounded-sm w-full">
            <h1 className=" sm:left-24 py-3 text-3xl md:text-5xl font-oswald">
              <span className="text-yellow-500">Gallery </span>
              App
            </h1>
          </div>

          <div className="container flex gap-5 flex-col  mt-20 sm:mt-0">
            <h1 className="text-white text-5xl md:text-6xl font-dmsans font-extrabold">
              Welcome to{" "}
              <span className="text-green-500 text-6xl"> Gallery </span> App
            </h1>

            <p className="text-slate-400 font-dmsans text-lg text-start tracking-wider">
              A simple app that shows our pictures and allows us to
              add/remove/update them without much trouble. Some galleries have
              extra frills like highlight reels added in, but our gallery are
              straightforward...
            </p>

            <SearchField />

            <div className="font-dmsans flex gap-8 justify-center">
              <button
                className="px-4 py-1 rounded-md bg-green-500 text-xl font-bold cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="px-4 py-1 rounded-md bg-yellow-500 text-xl font-bold cursor-pointer "
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
      <Loading />
    </>
  );
};

const ImageContainer = ({ imgLink }) => {
  return <img src={imgLink} alt="img" className="max-h-44 object-center" />;
};

export default Landing;
