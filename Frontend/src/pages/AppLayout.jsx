import React, { useEffect } from "react";
import { CiChat1 as InboxIcon } from "react-icons/ci";
import { GoHome as HomeIcon } from "react-icons/go";
import { IoIosLogIn as LoginIcon } from "react-icons/io";
import {
  IoPersonOutline as PersonIcon,
  IoSettingsOutline as SettingIcon,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { NEW_MESSAGE_ALERT } from "../utils/socketEvents";
import { setChatLastMessage, setMessageAlert } from "../redux/Slices/chatSlice";

const AppLayout = () => {
  const name = useSelector((state) => state.auth.user.name);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket.on(NEW_MESSAGE_ALERT, (messageAlert) => {
        if (currentChatId !== messageAlert.chatId) {
          messageAlert = { ...messageAlert, db: false };
          dispatch(setMessageAlert(messageAlert));
          socket.emit(NEW_MESSAGE_ALERT, {
            currentChatId,
            messageAlert,
            clear: false,
          });
        } else {
          dispatch(
            setChatLastMessage({
              chatId: currentChatId,
              lastMessage: messageAlert.lastMessage,
            })
          );
        }
      });
    }

    return () => {
      if (socket) {
        socket.off(NEW_MESSAGE_ALERT);
      }
    };
  }, [socket, dispatch, currentChatId]);

  return (
    <div className="flex h-full gap-2">
      {name}
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
        <Link to={"/login"} className="hover:bg-hoverBlue rounded-full p-2">
          <LoginIcon size={22} />
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
