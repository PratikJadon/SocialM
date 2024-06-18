import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/Slices/authSlice";
import { login } from "../utils/apiHandler";

const Login = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, response } = await login(userData);
    if (response.ok) {
      dispatch(loginSuccess(data.user));
      navigateTo("/");
    } else {
      navigateTo("/login");
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
      <div className="w-1/3 bg-lightBlack">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 text-black"
        >
          <input
            name="username"
            placeholder="Usnername"
            value={userData.username}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" className="text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
