import React from "react";

type PostTitleBarProps = {
  isAnnouncement: boolean;
  title: string;
};

export default function PostTitleBar({
  isAnnouncement,
  title,
}: PostTitleBarProps) {
  return (
    <h2
      className="flex justify-start font-medium text-black
    text-lg sm:text-xl md:text-2xl"
    >
      {isAnnouncement ? (
        <span className="text-blue-700 font-bold">{`[공지] `}</span>
      ) : (
        <></>
      )}
      {title}
    </h2>
  );
}
