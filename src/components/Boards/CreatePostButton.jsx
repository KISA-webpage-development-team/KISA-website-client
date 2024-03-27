import React from "react";
import PencilIcon from "../ui/PencilIcon";

export default function CreatePostButton({ onClick }) {
  return (
    <div className="blue_button" onClick={onClick}>
      <PencilIcon />
      <p className={`ml-2`}>글쓰기</p>
    </div>
  );
}
