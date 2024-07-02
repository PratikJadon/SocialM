import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../shared/SearchBar";
import { getAllChats, searchUsers } from "../utils/apiHandler";
import ChatListItem from "./ChatListItem";
import { setMessageAlert } from "../redux/Slices/chatSlice";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";
import SearchDropDown from "../shared/SearchDropDown";

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const dispatch = useDispatch();
  const newMessageAlert = useSelector((state) => state.chat.messageAlert);
  const user = useSelector((state) => state.auth.user);
  const chatLastMessage = useSelector((state) => state.chat.chatLastMessage);
  const [searchFriend, setSearchFriend] = useState("");
  const debounceSearchFriend = useDebounce(searchFriend);
  const fetchWrapper = useFetch();
  const [searchData, setSearchData] = useState(null);

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

  useEffect(() => {
    if (debounceSearchFriend.length === 0) {
      setSearchData(null);
      return;
    }
    (async () => {
      const search = { username: debounceSearchFriend };
      setSearchData(null);
      const { data, response } = await fetchWrapper(searchUsers, search);
      if (response.ok) {
        setSearchData(data.foundUser);
      }
    })();
  }, [debounceSearchFriend]);

  return (
    <div className="bg-baseBlack my-2 p-3 py-4 rounded-md w-[27%] border-r-[1px] border-opacity-10 border-white relative">
      <SearchBar
        placeholder={"Search Friends"}
        inputValue={searchFriend}
        inputChange={setSearchFriend}
      />
      {searchFriend.length > 0 && (
        <div className="relative w-full">
          <div className="absolute w-full bg-lightBlack rounded-lg p-4 top-2">
            <SearchDropDown count={2} data={searchData} />
          </div>
        </div>
      )}
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
