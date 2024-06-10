import React from "react";
import ListIcon from "../ui/ListIcon";
import CommentIcon, { UserPageCommentIcon } from "../ui/CommentIcon";

export default function UserBoardNavBar({ openPosts, setOpenPosts }) {
  const handleUserBoardToggle = () => {
    setOpenPosts(!openPosts);
  };

  const seletcedStyle = "font-bold text-michigan-blue !border-michigan-maize";
  const defaultContainerStyle =
    "flex items-center gap-2 p-2 border-t-2 border-transparent hover:underline cursor-pointer";

  return (
    <div className="flex text-sm md:text-lg mt-1">
      <div
        className={`${defaultContainerStyle} ${openPosts && seletcedStyle}`}
        onClick={handleUserBoardToggle}
      >
        <ListIcon size="medium" />
        <p className="">내 글</p>
      </div>

      <div
        className={`${defaultContainerStyle} ${!openPosts && seletcedStyle}`}
        onClick={handleUserBoardToggle}
      >
        <UserPageCommentIcon size="medium" />
        <p className="">내 댓글</p>
      </div>
    </div>
  );
}
