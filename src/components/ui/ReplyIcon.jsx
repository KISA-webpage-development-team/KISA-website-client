import React from "react";
import { ImReply } from "react-icons/im";

const ReplyIcon = ({ type = "normal" }) => {
  return (
    <ImReply className={`transform ${type === "flip" ? "scale-x-[-1]" : ""}`} />
  );
};

export default ReplyIcon;
