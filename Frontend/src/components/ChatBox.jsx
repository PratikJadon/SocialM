import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import testAvatar from "../assets/testAvatar.png";
import { PiDotsThreeVertical as VerticalDotsIcon } from "react-icons/pi";
import SearchBar from "../shared/SearchBar";
import Message from "./Message";
import { groupMessagesByDate } from "../utils/groupMessagesByDate";
import SendBar from "../shared/SendBar";
import { getChatById, getChatMessagae, sendMessage } from "../utils/apiHandler";
import { useSelector } from "react-redux";

const ChatBox = ({ data }) => {
  const { chatId } = useParams();
  const [chatDetails, setChatDetails] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const callApi = async () => {
      const data = await getChatById({ chatId: chatId });
      setChatDetails(data.chatMemberDetail);
      const messages = await getChatMessagae({ page: 1, chatId: chatId });
      setMessages(messages.messages);
    };
    callApi();
  }, []);

  const handleSubmit = async (e, value) => {
    e.preventDefault();
    const chatMessage = {
      content: value,
      chatId: chatId,
      sender_id: user.user_id,
    };
    await sendMessage(chatMessage);
  };

  const groupedMessages = groupMessagesByDate(messages);
  return (
    <div className="w-[73%] flex flex-col">
      {/* Chat Header */}
      <div className="w-full border-b-[1px] border-white border-opacity-20 p-4 flex items-center gap-7 pl-7">
        <img
          src={chatDetails.avatar}
          className="w-14 h-14 rounded-full object-cover"
        />
        {chatDetails.name}
        <SearchBar className={"w-72 ml-auto"} placeholder={"Search Messages"} />
        <VerticalDotsIcon size={25} />
      </div>

      {/* Message Area */}
      <div className="p-4 overflow-y-auto">
        {Object.entries(groupedMessages).map(([date, messagesForDate]) => (
          <div key={date}>
            <div className="text-center my-2 text-gray-600">{date}</div>
            <div className="flex flex-col gap-2">
              {messagesForDate.map((message) => (
                <Message
                  key={message.sender_id}
                  sender={message.sender_name}
                  message={message.content}
                  self={message.sender_id === user.user_id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 mt-auto">
        <SendBar placeholder={"Enter Text"} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ChatBox;
