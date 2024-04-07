import React from "react";
import { ImReply } from "react-icons/im";

const ReplyIcon = ({ type = "normal" }) => {
  return (
    <ImReply
      className={`w-3 h-3 md:w-4 md:h-4 text-gray-400 transform ${
        type === "flip" ? "scale-x-[-1]" : ""
      }`}
    />
  );
};

export default ReplyIcon;
