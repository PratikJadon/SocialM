import React from "react";

const Badge = ({ count }) => {
  return (
    <div className="flex justify-center items-center bg-hoverBlue text-xs rounded-full w-5 h-5 text-center">
      {count}
    </div>
  );
};

export default Badge;
