import React from "react";
import AnnouncementIcon from "../ui/AnnouncementIcon";

export default function PostTitleBar({ isAnnouncement, title }) {
  return (
    <div className="flex justify-start pt-2 text-xl font-semibold">
      {isAnnouncement ? (
        <p className="text-blue-500 font-bold">[ 공지 ]</p>
      ) : (
        <></>
      )}
      <h1 className={`${isAnnouncement && "ml-2"} `}>{title}</h1>
    </div>
  );
}
