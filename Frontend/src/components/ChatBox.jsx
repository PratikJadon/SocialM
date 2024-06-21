import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import testAvatar from "../assets/testAvatar.png";
import { PiDotsThreeVertical as VerticalDotsIcon } from "react-icons/pi";
import SearchBar from "../shared/SearchBar";
import Message from "./Message";
import { groupMessagesByDate } from "../utils/groupMessagesByDate";
import SendBar from "../shared/SendBar";
import { getChatById, getChatMessagae, sendMessage } from "../utils/apiHandler";
import { useDispatch, useSelector } from "react-redux";
import { NEW_MESSAGE } from "../utils/socketEvents";
import { clearMessageAlert, setCurrentChatId } from "../redux/Slices/chatSlice";

const ChatBox = () => {
  const { chatId } = useParams();
  const [chatDetails, setChatDetails] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const socket = useSelector((state) => state.socket.socket);
  const messageAlert = useSelector((state) => state.chat.messageAlert);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentChatId({ chatId: chatId }));
    dispatch(clearMessageAlert({ chatId: chatId }));

    if (socket) {
      socket.on(NEW_MESSAGE, (message) => {
        if (message.chatId !== chatId) return;
        setNewMessages((prevMessage) => [...prevMessage, message]);
      });
    }

    (async () => {
      const data = await getChatById({ chatId: chatId });
      setChatDetails(data.chatDetail);
      const messages = await getChatMessagae({ page: 1, chatId: chatId });
      setMessages(messages.messages);
    })();

    return () => {
      if (socket) {
        socket.off(NEW_MESSAGE);
      }
      dispatch(setCurrentChatId({ chatId: null }));
      setMessages([]);
      setNewMessages([]);
    };
  }, [socket, chatId, dispatch]);

  const handleSubmit = async (e, value) => {
    e.preventDefault();
    const chatMessage = {
      content: value,
      chatId: chatId,
      sender_id: user.user_id,
      sender_name: user.name,
      members: chatDetails.chat.members,
      createdAt: new Date(Date.now()),
    };
    if (socket) {
      setNewMessages((prev) => [...prev, chatMessage]);
      socket.emit(NEW_MESSAGE, chatMessage);
    }
    // await sendMessage(chatMessage);
  };

  const groupedOldMessages = useMemo(
    () => groupMessagesByDate(messages),
    [messages]
  );

  const groupedNewMessages = useMemo(
    () => groupMessagesByDate(newMessages),
    [newMessages]
  );

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
        {Object.entries(groupedOldMessages).map(([date, messagesForDate]) => (
          <div key={date}>
            <div className="text-center my-2 text-gray-600">{date}</div>
            <div className="flex flex-col gap-2">
              {messagesForDate.map((message) => (
                <Message
                  // key={message.sender_id}
                  sender={message.sender_name}
                  message={message.content}
                  self={message.sender_id === user.user_id}
                />
              ))}
            </div>
          </div>
        ))}
        {Object.entries(groupedNewMessages).map(([date, messagesForDate]) => (
          <div key={date}>
            <div className="text-center my-2 text-gray-600">{date}</div>
            <div className="flex flex-col gap-2">
              {messagesForDate.map((message) => (
                <Message
                  // key={message.sender_id}
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

export default memo(ChatBox);
