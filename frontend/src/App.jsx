import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ImagePreview from "./components/ImagePreview";
const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/image-preview/:img" element={<ImagePreview />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
