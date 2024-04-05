import React from "react";
import { ImReply } from "react-icons/im";

const ReplyIcon = ({ type = "normal" }) => {
  return (
    <ImReply
      className={`w-3 h-3 md:w-5 md:h-5 transform ${
        type === "flip" ? "scale-x-[-1]" : ""
      }`}
    />
  );
};

export default ReplyIcon;
