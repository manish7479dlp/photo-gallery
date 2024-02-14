import React, { useEffect } from "react";
import UserProfile from "../sections/UserProfile";
import UserGallery from "../sections/UserGallery";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserByUserName } from "../helper";
import { toast } from "react-toastify";
import { setData } from "../store/features/user/publicUserSlice";

const Profile = () => {
  let userData = useSelector((state) => state.user.data);
  const { userName } = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
     if(userName) {
         getUserByUserName(userName).then((response) => {
             console.log(response)
             localStorage.clear()
             dispatch(setData(response.data))
         }).catch((error) => {
          console.log("Error: ",error)
         })
     }
     console.log(userName)
  },[])


  if (userData.length == 0) {
    userData = useSelector((state) => state.publicUser.data);
  }
  console.log(userData);
  if (userData?.length == 0) {
    return (
      <h1 className="pt-20 text-center text-white font-bold h-screen flex items-center justify-center text-2xl">
        Invalid credentials
      </h1>
    );
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
