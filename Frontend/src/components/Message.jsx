import React from "react";

const Message = ({ sender, message, self }) => {
  return (
    <div
      className={` rounded-2xl px-3 py-1 max-w-[47%] min-w-32 w-fit h-fit ${
        self ? "ml-auto bg-sendMessage" : "bg-recieveMessage"
      }`}
    >
      <p className="text-[10px]">{sender}</p>
      <p className="text-sm">{message}</p>
      <p className="text-[7px] ml-auto w-fit">1:27</p>
    </div>
  );
};

export default Message;
