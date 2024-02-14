import React from "react";
import UserProfile from "../sections/UserProfile";
import UserGallery from "../sections/UserGallery";
import { useSelector } from "react-redux";

const Profile = () => {
  let userData = useSelector((state) => state.user.data);
  if (userData.length == 0) {
    userData = useSelector((state) => state.publicUser.data);
  }
  console.log(userData)
    if(userData?.length == 0) {
    return  <h1 className="pt-20 text-center text-white font-bold h-screen flex items-center justify-center text-2xl">Invalid credentials</h1>
  }

  return (
    <>
      
      <div className="container overflow-hidden px-0 mt-16 text-white md:mt-20 flex flex-col gap-3 pb-3">
        <UserProfile {...userData} />

        <UserGallery images={userData?.images} />
      </div>
    </>
  );
};

export default Profile;
