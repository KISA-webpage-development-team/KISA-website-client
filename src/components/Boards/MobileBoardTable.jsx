"use client";

// 게시판 보드 리스트 뷰
//  columns: id, title, author, view, created

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getBoardPosts } from "../../service/board";
import { getBoardAnnouncements } from "../../service/board";
import AnnouncementIcon from "../ui/AnnouncementIcon";
import PageSizeSelector from "./PageSizeSelector";
import Pagination from "./Pagination";

export default function MobileBoardTable({ boardType }) {
  const [posts, setPosts] = useState([]);
  const [announcementPosts, setAnnouncementPosts] = useState([]); // 공지사항: 맨위로
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(10); // 10, 20, 30

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const data = await getBoardAnnouncements(boardType);
      console.log(data);
      setAnnouncementPosts(data?.results);
    };

    fetchAnnouncements();
  }, [boardType]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getBoardPosts(boardType, pageSize, pageNum);
      console.log(data);
      setPosts(data?.results);
    };

    fetchPosts();
  }, [pageNum, pageSize, boardType]);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <table className="border border-gray-300 w-full">
        {/* <thead className="">
          <tr className="border-b border-gray-400 bg-gray-50/100 text-sm font-normal flex items-center">
            <th className="py-2 w-16">번호</th>
            <th className="grow">제목</th>
            <th className="w-36">글쓴이</th>
            <th className="w-16">조회수</th>
            <th className="w-28">날짜</th>
          </tr>
        </thead> */}
        <tbody className="">
          {announcementPosts.map(
            (
              { postid, title, commentsCount, created, fullname, readCount },
              idx
            ) => (
              <tr
                key={postid}
                className={`flex flex-col items-start justify-center
                            bg-gray-50/100
                            border-b border-gray-200  py-2 px-2`}
              >
                {/* top: 제목 [댓글수]] */}
                <div className="flex items-center gap-2">
                  <td className="">
                    <AnnouncementIcon />
                  </td>
                  <td className="text-left grow ">
                    <Link href={`/posts/${postid}`} className="hover:underline">
                      {commentsCount > 0
                        ? `${title} [${commentsCount}]`
                        : title}
                    </Link>
                  </td>
                </div>

                {/* bottom: 날짜 / 글쓴이 / 조회수 */}
                <div
                  className="flex items-center gap-3
                             text-gray-500 text-xs "
                >
                  <td className="text-center ">{created.split(" ")[0]}</td>
                  <td className="text-center">{fullname}</td>
                  <td className="text-center ">{readCount}</td>
                </div>
              </tr>
            )
          )}

          {posts.map(
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
                border-b border-gray-200 hover:bg-gray-50/100 py-2 px-2`}
              >
                {/* top: 제목 [댓글수]] */}
                <div className="flex items-center">
                  <td className="text-left grow ">
                    <Link href={`/posts/${postid}`} className="hover:underline">
                      {commentsCount > 0
                        ? `${title} [${commentsCount}]`
                        : title}
                    </Link>
                  </td>
                </div>

                {/* bottom: 날짜 / 글쓴이 / 조회수 */}
                <div
                  className="flex items-center gap-3
                 text-gray-500 text-xs "
                >
                  <td className="text-center ">{created.split(" ")[0]}</td>
                  <td className="text-center">{fullname}</td>
                  <td className="text-center ">{readCount}</td>
                </div>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* Pagination Bar */}
      <div className="flex w-full">
        <div className="flex-1">
          <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
        </div>

        <div className="grow">
          <Pagination pageNum={pageNum} setPageNum={setPageNum} />
        </div>
      </div>
    </div>
  );
}
