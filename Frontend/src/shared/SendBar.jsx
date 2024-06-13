import React from "react";
import { RiSendPlane2Fill as SendIcon } from "react-icons/ri";
import { CgAttachment as AttachmentIcon } from "react-icons/cg";

const SendBar = ({ className, placeholder }) => {
  return (
    <div className={`flex items-center relative ${className}`}>
      <AttachmentIcon className={"absolute translate-x-4"} size={20} />
      <SendIcon className={"absolute right-4 transform rotate-180"} size={20} />
      <input
        className="outline-none bg-lightBlack rounded-3xl indent-12 w-full p-1 py-5 h-10"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SendBar;
