import React, { useState } from "react";
import { RiSendPlane2Fill as SendIcon } from "react-icons/ri";
import { CgAttachment as AttachmentIcon } from "react-icons/cg";

const SendBar = ({ className, placeholder, handleSubmit }) => {
  const [input, setInput] = useState("");

  return (
    <div
      className={`flex items-center justify-between bg-lightBlack rounded-3xl w-full p-2 ${className}`}
    >
      <form className="w-full" onSubmit={(e) => handleSubmit(e, input)}>
        <div className="flex items-center gap-2 w-full">
          <AttachmentIcon className={" "} size={20} />
          <input
            className="outline-none bg-transparent focus:outline-none w-full "
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </form>
      <SendIcon className={" "} size={20} />
    </div>
  );
};

export default SendBar;
