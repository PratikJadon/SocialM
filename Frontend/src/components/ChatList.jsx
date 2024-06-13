import React from "react";
import SearchBar from "../shared/SearchBar";
import ChatListItem from "./ChatListItem";
import testAvatar from "../assets/testAvatar.png";

const tempChats = [
  {
    id: "0129i0192",
    avatar: testAvatar,
    name: "Check 1",
    lastMessage: "Good Morning",
    unreadMessage: true,
    undreadMessageCount: 1,
  },
  {
    id: "012912342",
    avatar: testAvatar,
    name: "Check 2",
    lastMessage: "Hello, How are you everyone, I am fine.",
    unreadMessage: false,
    undreadMessageCount: 0,
  },
];

const ChatList = () => {
  return (
    <div className="bg-baseBlack my-2 p-3 py-4 rounded-md w-[27%] border-r-[1px] border-opacity-10 border-white">
      <SearchBar placeholder={"Search Friends"} />
      <div className="mt-5 flex flex-col gap-5">
        {tempChats?.map((chat) => (
          <ChatListItem data={chat} key={chat.id} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
