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
import { dateFormatter } from "../../utils/dateFormatter";

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

  if (!posts || !announcementPosts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <table
        className="border-t border-b border-michigan-blue w-full 
      text-base text-black "
      >
        <tbody className="">
          {announcementPosts?.map(
            (
              { postid, title, commentsCount, created, fullname, readCount },
              idx
            ) => (
              <tr
                key={postid}
                className={`flex flex-col items-start justify-center
                            bg-gray-100
                            border-b border-gray-200 py-2 px-3`}
              >
                {/* top: 제목 [댓글수]] */}
                <div className="flex items-center gap-2">
                  <td className="">
                    <AnnouncementIcon />
                  </td>
                  <td className="text-left grow ">
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
                </div>
              </tr>
            )
          )}

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
                <div className="flex items-center">
                  <td className="text-left grow ">
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
                </div>

                {/* bottom: 날짜 / 글쓴이 / 조회수 */}
                <div
                  className="flex items-center gap-2
                 text-gray-500 text-xs "
                >
                  <td className="text-center ">{dateFormatter(created)}</td>
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
