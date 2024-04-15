import React from "react";

export default function PostTitleBar({ isAnnouncement, title }) {
  return (
    <div className="flex justify-start font-medium text-black text-xl md:text-2xl">
      {isAnnouncement ? (
        <p className="text-blue-700 font-bold">[ 공지 ]</p>
      ) : (
        <></>
      )}
      <h1 className={`${isAnnouncement && "ml-2"} `}>{title}</h1>
    </div>
  );
}
