import React, { memo } from "react";
import { Link } from "react-router-dom";
import Badge from "../shared/Badge";

const ChatListItem = ({ data, unreadMessage }) => {
  return (
    <Link to={`${data._id}`}>
      <div className="w-full flex gap-5 items-center hover:bg-lightBlack p-2 rounded-2xl cursor-pointer">
        <img
          src={data.profileImage}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p>{data.name}</p>
          <p className="text-gray-400 text-sm">{unreadMessage.lastMessage}</p>
        </div>
        {unreadMessage.unreadMessageCount && (
          <div className="ml-auto">
            <Badge count={unreadMessage.unreadMessageCount} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default memo(ChatListItem);
