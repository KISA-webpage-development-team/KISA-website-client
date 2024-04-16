import Link from "next/link";
import React, { useEffect, useState } from "react";
import AnnouncementIcon from "../ui/AnnouncementIcon";
import { dateFormatter } from "../../utils/dateFormatter";

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
        <tr className="border-b border-gray-400 bg-gray-50/100 text-sm font-normal flex items-center">
          <th className="py-2 w-16">번호</th>
          <th className="grow">제목</th>
          <th className="w-36">글쓴이</th>
          <th className="w-16">조회수</th>
          <th className="w-28">날짜</th>
        </tr>
      </thead>
      <tbody className="">
        {announcementPosts
          ?.concat(normalPosts)
          .map(
            (
              { postid, title, fullname, readCount, created, isAnnouncement },
              idx
            ) => (
              <tr
                key={idx}
                className={`border-b border-gray-200 flex items-center ${
                  isAnnouncement ? "bg-gray-50/100" : "hover:bg-gray-50/100"
                }`}
              >
                <td className="text-center w-16 py-2 flex justify-center items-center">
                  {isAnnouncement ? <AnnouncementIcon /> : idx}
                </td>
                <td className="text-left grow py-2">
                  <Link href={`/posts/${postid}`} className="hover:underline">
                    {title}
                  </Link>
                </td>
                <td className="text-center w-36">{fullname}</td>
                <td className="text-center w-16">{readCount}</td>
                <td className="text-center w-28">{dateFormatter(created)}</td>
              </tr>
            )
          )}
      </tbody>
    </table>
  );
}
