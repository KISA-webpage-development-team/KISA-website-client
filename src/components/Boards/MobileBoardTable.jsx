"use client";

// 게시판 보드 리스트 뷰
//  columns: id, title, author, view, created

import Link from "next/link";
import AnnouncementIcon from "../ui/AnnouncementIcon";
import { dateFormatter } from "../../utils/dateFormatter";

export default function MobileBoardTable({ posts, announcementPosts }) {
  return (
    <table
      className="border-t border-b border-michigan-blue w-full
      text-base text-black "
    >
      <tbody className="">
        {announcementPosts?.map(({ postid, title, commentsCount }, idx) => (
          <tr
            key={postid}
            className={`flex flex-col items-start justify-center
                            bg-gray-100
                            border-b border-gray-200 py-2 px-3`}
          >
            {/* top: 제목 [댓글수]] */}
            <td className="flex items-center gap-2 text-left grow">
              <AnnouncementIcon />
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
          </tr>
        ))}

        {posts?.map(
          (
            { postid, title, fullname, readCount, created, commentsCount },
            idx
          ) => (
            <tr
              key={postid}
              className={`flex flex-col items-start justify-center
                border-b border-gray-200 hover:bg-gray-100 py-2 px-3`}
            >
              {/* top: 제목 [댓글수]] */}
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
