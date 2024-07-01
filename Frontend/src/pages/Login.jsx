import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/Slices/authSlice";
import { login, signup } from "../utils/apiHandler";
import useFetch from "../hooks/useFetch";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import GlowInput from "../shared/GlowInput";
import { signupForm } from "../form/login";
import ImageUpload from "../shared/ImageUpload";

const Login = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const fetchWrapper = useFetch();
  const user = useSelector((state) => state.auth.user);
  const [selectedTab, setSelectedTab] = useState("login");

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    avatar: "",
  });

  const tabs = [
    {
      viewValue: "Login",
      id: "login",
    },
    {
      viewValue: "Signup",
      id: "signup",
    },
  ];

  const changeTab = (id) => {
    setSelectedTab(id);
    setUserData({
      username: "",
      password: "",
      name: "",
      email: "",
      avatar: "",
    });
  };

  const tabVariant = {
    active: {
      width: "55%",
      transition: {
        type: "spring",
        duration: 0.4,
      },
    },
    inactive: {
      width: "15%",
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { data, response } = await fetchWrapper(login, userData);
    if (response.ok) {
      dispatch(loginSuccess(data.user));
      sessionStorage.setItem("token", data.user.token);
      navigateTo("/");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setUserData({ ...userData, [e.target.name]: e.target.files[0] });
      return;
    }
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (key === "avatar") key = "image";
      formData.append(key, value);
    });

    const { data, response } = await fetchWrapper(signup, formData);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-full flex justify-center items-center">
        <div className="h-fit w-2/5 flex flex-col items-center gap-11 rounded-xl p-4">
          <div className="w-3/4">
            <ul className="w-full list-none text-lg flex gap-14 justify-center">
              {tabs.map((tab) => (
                <motion.li
                  key={tab.id}
                  variants={tabVariant}
                  animate={selectedTab === tab.id ? "active" : "inactive"}
                  onClick={() => changeTab(tab.id)}
                  className={`rounded-lg p-1 cursor-pointer ${
                    tab.id === selectedTab
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  {tab.viewValue}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="w-full flex justify-center">
            <form
              onSubmit={
                selectedTab === "login" ? handleLoginSubmit : handleSignupSubmit
              }
              className="flex flex-col items-center w-3/4 gap-4 text-white"
            >
              {selectedTab === "login" && (
                <>
                  <GlowInput
                    inputName={"username"}
                    inputPlaceholder={"Username"}
                    inputValue={userData.username}
                    inputOnChange={handleChange}
                  />
                  <GlowInput
                    inputName={"password"}
                    inputValue={userData.password}
                    inputPlaceholder={"Password"}
                    inputOnChange={handleChange}
                    inputType={"password"}
                  />
                  <button
                    type="submit"
                    className="text-white rounded-xl hover:bg-hoverBlue p-2 w-4/5 font-bold  transition-all duration-300"
                  >
                    Login
                  </button>
                </>
              )}
              {selectedTab !== "login" && (
                <>
                  {signupForm.map((ele) =>
                    ele.type !== "file" ? (
                      <GlowInput
                        key={ele.id}
                        inputName={ele.name}
                        inputType={ele.type}
                        inputPlaceholder={ele.placeholder}
                        inputValue={userData[`${ele.name}`]}
                        inputOnChange={handleChange}
                      />
                    ) : (
                      <ImageUpload
                        key={ele.id}
                        onUpload={handleChange}
                        fileValue={userData.avatar}
                      />
                    )
                  )}
                  <button
                    type="submit"
                    className="text-white rounded-xl hover:bg-hoverBlue p-2 w-4/5 font-bold  transition-all duration-300"
                  >
                    SignUp
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
