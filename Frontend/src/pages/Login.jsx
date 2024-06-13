import React from "react";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-1/3 bg-lightBlack">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 text-black"
        >
          <input name="username" placeholder="Usnername" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit" className="text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
