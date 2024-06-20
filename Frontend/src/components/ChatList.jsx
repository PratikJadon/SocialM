import React, { useEffect, useState } from "react";
import SearchBar from "../shared/SearchBar";
import { getAllChats } from "../utils/apiHandler";
import ChatListItem from "./ChatListItem";

const ChatList = () => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllChats();
      setChatList(data);
    })();
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
