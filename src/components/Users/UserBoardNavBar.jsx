import React from "react";
import ListIcon from "../ui/ListIcon";
import CommentIcon from "../ui/CommentIcon";

export default function UserBoardNavBar({ openPosts, setOpenPosts }) {
  const handleUserBoardToggle = () => {
    setOpenPosts(!openPosts);
  };

  return (
    <div className="flex py-2">
      <div
        className={`flex items-center gap-2 ${openPosts && "bg-gray-300"}`}
        onClick={handleUserBoardToggle}
      >
        <ListIcon size="medium" />
        <p className="text-xl">내 글</p>
      </div>

      <div
        className={`flex items-center gap-2 ml-5 ${
          !openPosts && "bg-gray-300"
        }`}
        onClick={handleUserBoardToggle}
      >
        <CommentIcon />
        <p className="text-xl">내 댓글</p>
      </div>
    </div>
  );
}
