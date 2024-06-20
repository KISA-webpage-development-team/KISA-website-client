import React from "react";
import { dateFormatter } from "../../utils/dateFormatter";
import Link from "next/link";
import { SimplePost } from "../../model/props/posts";
import AnnouncementIcon from "../ui/AnnouncementIcon";

type Props = {
  post: SimplePost;
  postNum?: number;
  isAnnouncement?: boolean;
};

export default function BoardTableRow({
  post,
  postNum = 0,
  isAnnouncement = false,
}: Props) {
  const { postid, title, fullname, created, readCount, commentsCount } = post;

  return (
    <tr
      className={`${
        isAnnouncement && "bg-gray-100"
      } border-b border-gray-200 hover:bg-gray-100`}
    >
      {/* 번호 */}
      <td className="relative text-center py-2 pl-2">
        {isAnnouncement ? (
          <div className="flex items-center justify-center">
            <span className="absolute top-0 left-0 h-full w-1 bg-michigan-blue" />
            <AnnouncementIcon />
          </div>
        ) : (
          <span>{postNum}</span>
        )}
      </td>
      {/* 제목 */}
      <td className="py-2">
        <div className="text-left">
          <Link className="text-overflow w-fit" href={`/posts/${postid}`}>
            <span className="hover:underline">
              {title}
              {commentsCount > 0 && (
                <span className="ml-1 text-[#ED5555]">{`[${commentsCount}]`}</span>
              )}
            </span>
          </Link>
        </div>
      </td>
      <td className="text-center py-2">{fullname}</td>
      <td className="text-center py-2">{dateFormatter(created)}</td>
      <td className="text-center py-2 pr-2">{readCount}</td>
    </tr>
  );
}
