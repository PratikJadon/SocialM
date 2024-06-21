import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/Slices/authSlice";
import { login } from "../utils/apiHandler";
import useFetch from "../hooks/useFetch";

const Login = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const fetchWrapper = useFetch();
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, response } = await fetchWrapper(login, userData);
    if (response.ok) {
      dispatch(loginSuccess(data.user));
      sessionStorage.setItem("token", data.user.token);
      navigateTo("/");
    }
  };

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-1/3 bg-lightBlack p-2 rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 text-black"
        >
          <input
            className="rounded-lg outline-none p-1"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="rounded-lg outline-none p-1"
            value={userData.password}
            onChange={(e) => handleChange(e)}
          />
          <button
            type="submit"
            className="text-white rounded-xl hover:bg-hoverBlue p-1"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
