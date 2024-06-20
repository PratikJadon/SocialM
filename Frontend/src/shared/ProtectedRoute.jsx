import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/Slices/authSlice";
import { reAuth } from "../utils/apiHandler";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!user && !token) {
      navigate("/login");
    } else if (!user && token) {
      (async () => {
        const { data, response } = await reAuth({ token: token });
        if (response.ok) {
          dispatch(loginSuccess(data.user));
        }
      })();
    }
  }, [user, token, navigate, dispatch]);
  return <>{user && <Outlet />}</>;
};

export default ProtectedRoute;
