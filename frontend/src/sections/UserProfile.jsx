import React from "react";
import { toast } from "react-toastify";

// const coverImg =
//   "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg";

// const avtartImg =
//   "https://i.pinimg.com/550x/75/06/5d/75065da93d181c15f8266289313231c6.jpg";

// const coverImg = "https://media.licdn.com/dms/image/D4D16AQGQdenIsg22dQ/profile-displaybackgroundimage-shrink_350_1400/0/1685336018409?e=1713398400&v=beta&t=qKhbMnvgbtZgf8xwj5fZZdPSxgPBuPIf55qSR85BwtU"

const UserProfile = ({coverImage , firstName , lastName , email , images , userName, avatar}) => {
  const BASE_URL = "http://localhost:8000/"

  const avatarImgURL = BASE_URL + avatar
  const coverImageURL = BASE_URL + coverImage
  const editProfile = () => {
    toast.warning("Edit feature is not implemented yet.");
  };
  return (
    <div className="relative  bg-slate-900 rounded-md overflow-hidden">
      {/* coverImage section */}
      <div className="h-44">
        <img
          src={coverImageURL}
          alt="cover-image"
          className="max-h-36 md:max-h-44 object-cover w-full "
        />
      </div>

      {/* user details section */}
      <div className="pt-8 ">
        {/* avatar */}
        <div className="absolute top-12 md:top-20 left-5">
          <img
            src={avatarImgURL}
            alt="avatar-img"
            className="w-36 h-36 object-cover rounded-full bg-white p-1 cursor-pointer"
          />
        </div>

        {/* user details */}
        <div className="pt-8 pb-6 px-5 flex flex-col gap-2 ">
          <h2 className="font-dmsans text-3xl">{firstName + " " + lastName}</h2>
          <h3 className="font-dmsans text-1xl text-slate-500 font-semibold">
            <span className="text-slate-400 font-normal"> User Name :</span>{" "}
           {userName}
          </h3>
          <h3 className="font-dmsans text-1xl text-slate-500 font-semibold">
            <span className="text-slate-400 font-normal"> Email :</span>{" "}
            {email}
          </h3>
          <h3 className="font-dmsans text-1xl text-slate-300 font-semibold">
            <span className="text-slate-500 font-normal">
              {" "}
              Total Image Count :
            </span>{" "}
            { images?.length}
          </h3>
          <div>
            <button
              className="bg-slate-700 px-3 py-1 rounded-md font-dmsans hover:bg-slate-800"
              onClick={editProfile}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
