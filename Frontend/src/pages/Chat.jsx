import React from "react";
import { Outlet } from "react-router-dom";
import ChatList from "../components/ChatList";

const Chat = () => {
  return (
    <div className="flex w-full h-full">
      <ChatList />
      <Outlet />
    </div>
  );
};

export default Chat;
