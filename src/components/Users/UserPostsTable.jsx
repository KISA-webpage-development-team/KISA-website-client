import Link from "next/link";
import React, { useEffect, useState } from "react";
import AnnouncementIcon from "../ui/AnnouncementIcon";
import { dateFormatter } from "../../utils/dateFormatter";
import { getBoardName } from "../../config/boardName";

export default function UserPostsTable({ posts }) {
  const [announcementPosts, setAnnouncementPosts] = useState([]);
  const [normalPosts, setNormalPosts] = useState([]);

  useEffect(() => {
    setAnnouncementPosts(posts.filter((post) => post.isAnnouncement));
    setNormalPosts(posts.filter((post) => !post.isAnnouncement));
  }, [posts]);

  return (
    <table className="border border-gray-300 w-full">
      <thead className="">
        <tr className="border-b border-gray-400 bg-gray-50/100 text-sm font-normal flex items-center py-2">
          <th className="basis-1/12 min-w-16">번호</th>
          <th className="flex-1">제목</th>
          <th className="basis-[10%] min-w-24 text-center">게시판</th>
          <th className="basis-[10%] min-w-24">작성일</th>
          <th className="w-16">조회수</th>
        </tr>
      </thead>
      <tbody className="">
        {announcementPosts
          ?.concat(normalPosts)
          .map(
            (
              { postid, title, type, readCount, created, isAnnouncement },
              idx
            ) => (
              <tr
                key={idx}
                className={`border-b border-gray-200 flex items-center py-2 ${
                  isAnnouncement ? "bg-gray-50/100" : "hover:bg-gray-50/100"
                }`}
              >
                <td className=" text-center flex justify-center basis-1/12 min-w-16 ">
                  {isAnnouncement ? (
                    <AnnouncementIcon />
                  ) : (
                    announcementPosts.length + normalPosts.length - idx
                  )}
                </td>
                <td className="text-left flex-1">
                  <Link href={`/posts/${postid}`} className="hover:underline">
                    <span className="text-overflow">{title}</span>
                  </Link>
                </td>
                <td className="text-center basis-[10%] min-w-24">
                  {getBoardName(type)}
                </td>
                <td className="text-center basis-[10%] min-w-24">
                  {dateFormatter(created)}
                </td>
                <td className="text-center w-16">{readCount}</td>
              </tr>
            )
          )}
      </tbody>
    </table>
  );
}
