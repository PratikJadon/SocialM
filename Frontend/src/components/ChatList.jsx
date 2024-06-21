import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../shared/SearchBar";
import { getAllChats } from "../utils/apiHandler";
import { NEW_MESSAGE_ALERT } from "../utils/socketEvents";
import ChatListItem from "./ChatListItem";
import { setMessageAlert } from "../redux/Slices/chatSlice";

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();
  const newMessageAlert = useSelector((state) => state.chat.messageAlert);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  useEffect(() => {
    if (socket) {
      socket.on(NEW_MESSAGE_ALERT, (messageAlert) => {
        if (currentChatId !== messageAlert.chatId) {
          dispatch(setMessageAlert(messageAlert));
        }
      });
    }

    (async () => {
      const data = await getAllChats();
      setChatList(data);
    })();

    return () => {
      if (socket) {
        socket.off(NEW_MESSAGE_ALERT);
      }
    };
  }, [socket, dispatch, currentChatId]);

  return (
    <div className="bg-baseBlack my-2 p-3 py-4 rounded-md w-[27%] border-r-[1px] border-opacity-10 border-white">
      <SearchBar placeholder={"Search Friends"} />
      <div className="mt-5 flex flex-col gap-5">
        {chatList &&
          chatList?.map((chat) => {
            let unreadMessage = null;
            const alert = newMessageAlert.find(
              (alert) => alert.chatId === chat._id
            );
            if (alert) {
              unreadMessage = {};
              unreadMessage["lastMessage"] = alert.lastMessage;
              unreadMessage["unreadMessageCount"] = alert.count;
            }
            return (
              <ChatListItem
                data={chat}
                key={chat._id}
                unreadMessage={unreadMessage}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ChatList;
