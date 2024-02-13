import React from "react";
import UserProfile from "../sections/UserProfile";
import UserGallery from "../sections/UserGallery";
import {useSelector} from "react-redux"

const Profile = () => {
  const userData = useSelector((state) => state.user.data)
  return (
    <div className="container overflow-hidden px-0 mt-16 text-white md:mt-20 flex flex-col gap-3 pb-3">
      <UserProfile {...userData}/>
      
      <UserGallery images = {userData.images}/>
    </div>
  );
};

export default Profile;
