import React, { useEffect, useState } from "react";
import SearchBar from "../shared/SearchBar";
import { getAllChats } from "../utils/apiHandler";
import ChatListItem from "./ChatListItem";

// const tempChats = [
//   {
//     id: "0129i0192",
//     avatar: testAvatar,
//     name: "Check 1",
//     lastMessage: "Good Morning",
//     unreadMessage: true,
//     undreadMessageCount: 1,
//   },
//   {
//     id: "012912342",
//     avatar: testAvatar,
//     name: "Check 2",
//     lastMessage: "Hello, How are you everyone, I am fine.",
//     unreadMessage: false,
//     undreadMessageCount: 0,
//   },
// ];

const ChatList = () => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllChats();
      console.log(data);
      setChatList(data);
    };
    getData();
  }, []);

  return (
    <div className="bg-baseBlack my-2 p-3 py-4 rounded-md w-[27%] border-r-[1px] border-opacity-10 border-white">
      <SearchBar placeholder={"Search Friends"} />
      <div className="mt-5 flex flex-col gap-5">
        {chatList &&
          chatList?.map((chat) => <ChatListItem data={chat} key={chat._id} />)}
      </div>
    </div>
  );
};

export default ChatList;
