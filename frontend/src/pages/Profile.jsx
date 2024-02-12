import React from "react";
import UserProfile from "../sections/UserProfile";
import UserGallery from "../sections/UserGallery";

const Profile = () => {
  return (
    <div className="container overflow-hidden px-0 mt-16 text-white md:mt-20 flex flex-col gap-3 pb-3">
      <UserProfile />
      
      <UserGallery />
    </div>
  );
};

export default Profile;
