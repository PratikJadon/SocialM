import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../shared/SearchBar";
import { getAllChats } from "../utils/apiHandler";
import ChatListItem from "./ChatListItem";
import { setMessageAlert } from "../redux/Slices/chatSlice";

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const dispatch = useDispatch();
  const newMessageAlert = useSelector((state) => state.chat.messageAlert);
  const user = useSelector((state) => state.auth.user);
  const chatLastMessage = useSelector((state) => state.chat.chatLastMessage);

  useEffect(() => {
    (async () => {
      const data = await getAllChats();
      setChatList(data);
      if (data) {
        data.forEach((chat) => {
          chat.unreadMessageCount.forEach((unreadMessage) => {
            if (unreadMessage.membersId === user.user_id) {
              dispatch(
                setMessageAlert({
                  chatId: chat._id,
                  lastMessage: chat.lastMessage,
                  count: unreadMessage.count,
                  db: true,
                })
              );
            }
          });
        });
      }
    })();
  }, []);

  return (
    <div className="bg-baseBlack my-2 p-3 py-4 rounded-md w-[27%] border-r-[1px] border-opacity-10 border-white">
      <SearchBar placeholder={"Search Friends"} />
      <div className="mt-5 flex flex-col gap-5">
        {chatList &&
          chatList?.map((chat) => {
            let unreadMessage = {
              lastMessage: chat.lastMessage,
            };
            const alert = newMessageAlert.find(
              (alert) => alert.chatId === chat._id
            );
            if (alert) {
              unreadMessage["lastMessage"] = alert.lastMessage;
              unreadMessage["unreadMessageCount"] = alert.count;
            } else {
              const currChatLastMessage = chatLastMessage.find(
                (message) => message.chatId === chat._id
              );
              if (currChatLastMessage) {
                unreadMessage.lastMessage = currChatLastMessage.lastMessage;
              }
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
