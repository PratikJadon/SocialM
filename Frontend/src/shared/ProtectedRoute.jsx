import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  let user = useSelector((state) => state.auth.user);
  if (!user) {
    const token = sessionStorage.getItem("token");
  }

  return user ? (
    <>
      <Outlet />
    </>
  ) : (
    navigate("/login")
  );
};

export default ProtectedRoute;
