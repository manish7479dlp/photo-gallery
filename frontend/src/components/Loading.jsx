import React from "react";
import loadingUrl from "../assets/loading.gif";

const Loading = () => {
  return (
    <>
      <div className="h-screen w-full absolute top-0 left-0 bg-slate-800 opacity-60"></div>
      <img src={loadingUrl} alt="loading" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
    </>
  );
};

export default Loading;
