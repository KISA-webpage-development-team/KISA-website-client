import React from "react";
import { dateFormatter } from "../../../utils/dateFormatter";
import Link from "next/link";
import { SimplePost } from "../../../model/props/posts";
import AnnouncementIcon from "../../ui/AnnouncementIcon";

type Props = {
  post: SimplePost;
  postNum?: number;
  isAnnouncement?: boolean;
};

export default function TestBoardTableRow({
  post,
  postNum = 0,
  isAnnouncement = false,
}: Props) {
  const { postid, title, fullname, created, readCount, commentsCount } = post;

  return (
    <tr className={`${isAnnouncement && "bg-gray-100"}`}>
      {/* 번호 */}
      <td className="relative">
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
      <td>
        <div className="text-left">
          <Link className="text-overflow w-fit" href={`/posts/${postid}`}>
            <span className="hover:underline">
              {title}
              {commentsCount > 0 && (
                <span className="ml-1 text-red-500">{`[${commentsCount}]`}</span>
              )}
            </span>
          </Link>
        </div>
      </td>
      <td>{fullname}</td>
      <td>{dateFormatter(created)}</td>
      <td>{readCount}</td>
    </tr>
  );
}
