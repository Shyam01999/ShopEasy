import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectRoute() {
  const isLoggedIn = useSelector((state)=>state.loginEmailReducer)
  // const isLoggedIn = sessionStorage.getItem("userData");
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectRoute;
