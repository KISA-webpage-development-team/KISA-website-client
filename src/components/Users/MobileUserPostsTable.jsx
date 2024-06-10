import Link from "next/link";
import React, { useEffect, useState } from "react";
import AnnouncementIcon from "../ui/AnnouncementIcon";
import { dateFormatter, timeForToday } from "../../utils/dateFormatter";
import { getBoardName } from "../../config/boardName";

export default function MobileUserPostsTable({ posts }) {
  const [announcementPosts, setAnnouncementPosts] = useState([]);
  const [normalPosts, setNormalPosts] = useState([]);

  useEffect(() => {
    setAnnouncementPosts(posts.filter((post) => post.isAnnouncement));
    setNormalPosts(posts.filter((post) => !post.isAnnouncement));
  }, [posts]);

  return (
    <table className="border border-gray-300 w-full">
      <thead className="">
        <tr
          className="px-2 py-1 border-b border-gray-400 bg-gray-50/100 
        flex items-center"
        >
          <th className="flex-1 text-center text-sm font-medium">내용</th>
          <th className="min-w-16 text-sm font-medium">작성일</th>
        </tr>
      </thead>
      <tbody className="">
        {announcementPosts
          ?.concat(normalPosts)
          .map(
            (
              {
                postid,
                title,
                fullname,
                readCount,
                created,
                isAnnouncement,
                type,
                commentsCount,
              },
              idx
            ) => (
              <tr
                key={postid}
                className={`flex flex-row items-center
                  border-b border-gray-200 hover:bg-gray-100 py-2 px-2`}
              >
                <td
                  className="text-base text-left flex-1 flex flex-col items-start justify-center 
                pr-1"
                >
                  <Link href={`/posts/${postid}`} className="hover:underline">
                    {commentsCount > 0 ? (
                      <span className="text-overflow">
                        {title}
                        <span className="ml-1 text-red-500">{`[${commentsCount}]`}</span>
                      </span>
                    ) : (
                      <p className="text-overflow">{title}</p>
                    )}
                  </Link>

                  {/* bottom: 날짜 / 글쓴이 / 조회수 */}
                  <div
                    className="flex items-center gap-2
                 text-gray-500 text-xs "
                  >
                    <span className="text-center">{getBoardName(type)}</span>
                    <span className="text-center">{fullname}</span>
                    <span className="text-center ">{`조회: ${readCount}`}</span>
                  </div>
                </td>

                <td className="min-w-16 text-center text-sm">
                  {timeForToday(created)}
                </td>
              </tr>
            )
          )}
      </tbody>
    </table>
  );
}
