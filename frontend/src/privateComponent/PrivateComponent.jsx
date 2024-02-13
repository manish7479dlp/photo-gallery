import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {
    const isAuthenticated = localStorage.getItem("user")
    console.log(isAuthenticated)
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateComponent