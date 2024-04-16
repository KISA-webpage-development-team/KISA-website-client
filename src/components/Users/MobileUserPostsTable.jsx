import Link from "next/link";
import React, { useEffect, useState } from "react";
import AnnouncementIcon from "../ui/AnnouncementIcon";
import { dateFormatter } from "../../utils/dateFormatter";

export default function MobileUserPostsTable({ posts }) {
  const [announcementPosts, setAnnouncementPosts] = useState([]);
  const [normalPosts, setNormalPosts] = useState([]);

  useEffect(() => {
    setAnnouncementPosts(posts.filter((post) => post.isAnnouncement));
    setNormalPosts(posts.filter((post) => !post.isAnnouncement));
  }, [posts]);

  return (
    <table className="border border-gray-300 w-full">
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
                commentsCount,
              },
              idx
            ) => (
              <tr
                key={postid}
                className={`flex flex-col items-start justify-center
                  border-b border-gray-200 hover:bg-gray-100 py-2 px-3`}
              >
                <td className="text-left grow flex items-center">
                  <Link href={`/posts/${postid}`} className="hover:underline">
                    {commentsCount > 0 ? (
                      <span className="">
                        {title}
                        <span className="ml-1 text-red-500">{`[${commentsCount}]`}</span>
                      </span>
                    ) : (
                      <span className="">{title}</span>
                    )}
                  </Link>
                </td>

                {/* bottom: 날짜 / 글쓴이 / 조회수 */}
                <td
                  className="flex items-center gap-2
                 text-gray-500 text-xs "
                >
                  <span className="text-center ">{dateFormatter(created)}</span>
                  <span className="text-center">{fullname}</span>
                  <span className="text-center ">{readCount}</span>
                </td>
              </tr>
            )
          )}
      </tbody>
    </table>
  );
}
