import React from "react";
import { useParams } from "react-router-dom";
import testAvatar from "../assets/testAvatar.png";
import { PiDotsThreeVertical as VerticalDotsIcon } from "react-icons/pi";
import SearchBar from "../shared/SearchBar";
import Message from "./Message";
import { groupMessagesByDate } from "../utils/groupMessagesByDate";
import SendBar from "../shared/SendBar";

const messages = [
  {
    timestamp: "Thu Jun 13 2024 17:32:36 GMT+0530 (India Standard Time)",
    message: "Hi there",
    sender_id: "1212",
    sender_name: "Check 1",
    chat_id: "0129i0192",
  },
  {
    timestamp: "Thu Jun 13 2024 17:32:36 GMT+0530 (India Standard Time)",
    message: "Yeah bro",
    sender_id: "1210",
    sender_name: "Check 2",
    chat_id: "0129i0192",
  },
  {
    timestamp: "Thu Mar 31 2011 11:14:50 GMT+0200 (CEST)",
    message: "Yeah bro Hey",
    sender_id: "1210",
    sender_name: "Check 2",
    chat_id: "0129i0192",
  },
  {
    timestamp: "Thu Jun 13 2024 17:32:36 GMT+0530 (India Standard Time)",
    message: "Hi there",
    sender_id: "1212",
    sender_name: "Check 1",
    chat_id: "0129i0192",
  },
];

const chatDetail = {
  name: "Check 1",
  chat_id: "0129i0192",
  members: [],
  groupChat: false,
  avatar: testAvatar,
};

let user_id = "1212";

const ChatBox = ({ data }) => {
  const { chatId } = useParams();
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="w-[73%] flex flex-col">
      {/* Chat Header */}
      <div className="w-full border-b-[1px] border-white border-opacity-20 p-4 flex items-center gap-7 pl-7">
        <img
          src={chatDetail.avatar}
          className="w-14 h-14 rounded-full object-cover"
        />
        {chatDetail.name}
        <SearchBar className={"w-72 ml-auto"} placeholder={"Search Messages"} />
        <VerticalDotsIcon size={25} />
      </div>

      {/* Message Area */}
      <div className="p-4">
        {Object.entries(groupedMessages).map(([date, messagesForDate]) => (
          <div key={date}>
            <div className="text-center my-2 text-gray-600">{date}</div>
            <div className="flex flex-col gap-2">
              {messagesForDate.map((message) => (
                <Message
                  key={message.sender_id}
                  sender={message.sender_name}
                  message={message.message}
                  self={message.sender_id === user_id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 mt-auto">
        <SendBar placeholder={"Enter Text"} />
      </div>
    </div>
  );
};

export default ChatBox;
