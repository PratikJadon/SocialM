import React from "react";
import { CiChat1 as InboxIcon } from "react-icons/ci";
import { GoHome as HomeIcon } from "react-icons/go";
import {
  IoPersonOutline as PersonIcon,
  IoSettingsOutline as SettingIcon,
} from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex h-full gap-2">
      <div className="h-full text-white flex flex-col justify-center p-6 gap-10 border-r-[1px] border-white border-opacity-15">
        <Link to={"/"} className="hover:bg-hoverBlue rounded-full p-2 mt-auto">
          <HomeIcon size={22} />
        </Link>
        <Link to={"/"} className="hover:bg-hoverBlue rounded-full p-2">
          <PersonIcon size={22} />
        </Link>
        <Link to={"/chat"} className="hover:bg-hoverBlue rounded-full p-2">
          <InboxIcon size={22} />
        </Link>
        <SettingIcon
          size={35}
          className="hover:bg-hoverBlue rounded-full p-2 mt-auto"
        />
      </div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
