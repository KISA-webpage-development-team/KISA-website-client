import React from "react";
import Link from "next/link";

import { SimplePost } from "@/types/post";
import { formatDateOrTime } from "@/utils/formats/date";

type Props = {
  isEveryKisa?: boolean;
  post: SimplePost;
  isAnnouncement?: boolean;
};

export default function MobileBoardListItem({
  isEveryKisa = false,
  post,
  isAnnouncement = false,
}: Props) {
  const { title, fullname, created, readCount, commentsCount, anonymous } =
    post;

  return (
    <li
      className={`${
        isAnnouncement && "bg-gray-100"
      } flex flex-col items-start justify-center 
    border-b border-gray-200 py-2 px-2`}
    >
      <div className="text-[15px] flex items-center">
        <Link className="w-fit" href={`/posts/${post.postid}`}>
          <span
            className={`text-overflow hover:underline flex flex-row
            ${isAnnouncement && "text-michigan-blue font-semibold"}`}
          >
            {isAnnouncement && (
              <span className="w-fit mr-1 text-michigan-dark-maize">
                <span>[공지]</span>
              </span>
            )}
            <span className="">{title}</span>
          </span>
        </Link>
        {commentsCount > 0 && (
          <div className="ml-1 text-[#ED5555]">{`[${commentsCount}]`}</div>
        )}
      </div>
      <div
        className=" flex items-center gap-2 
      text-gray-500 text-xs"
      >
        <span>{formatDateOrTime(created)}</span>
        {
          // EveryKisa에는 anonymous가 true인 글쓴이를 "익명"으로 표시한다.
          isEveryKisa ? (
            <span>{anonymous ? "익명" : fullname}</span>
          ) : (
            <span>{fullname}</span>
          )
        }
        <span>{`조회 ${readCount}`}</span>
      </div>

      {/* <div>{commentsCount}</div> */}
    </li>
  );
}
