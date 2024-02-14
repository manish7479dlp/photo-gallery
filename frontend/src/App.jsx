import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImagePreview from "./components/ImagePreview";
import ChangeCoverImage from "./components/ChangeCoverImage";
import ChangeAvatarImage from "./components/ChangeAvatarImage";
import EditUserDetails from "./pages/EditUserDetails";
import PrivateComponent from "./privateComponent/PrivateComponent";
const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="colored"
      />
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* private router */}

        <Route path="/profile" element={<Profile />} />
        <Route element={<PrivateComponent />}>
          <Route path="/image-preview/:img" element={<ImagePreview />} />
          <Route path="/change-cover-image" element={<ChangeCoverImage />} />
          <Route path="/change-avatar-image" element={<ChangeAvatarImage />} />
          <Route path="/change-user-details" element={<EditUserDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
