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

export default function BoardTable({ boardType }) {
  const [posts, setPosts] = useState([]);
  const [announcementPosts, setAnnouncementPosts] = useState([]); // 공지사항: 맨위로
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(10); // 10, 20, 30

  // fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const data = await getBoardAnnouncements(boardType);
      console.log("announcenments: ", data.results);
      setAnnouncementPosts(data?.results);
    };

    if (boardType !== "announcement") {
      fetchAnnouncements();
    }
  }, [boardType]);

  // fetch non-announcements
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getBoardPosts(boardType, pageSize, pageNum);
      console.log(data.results);
      setPosts(data?.results);
    };

    fetchPosts();
  }, [pageNum, pageSize, boardType]);

  // if (!posts && !announcementPosts) {
  //   return null;
  // }

  return (
    <div className="flex flex-col gap-4 w-full">
      <table
        className="border border-gray-300 w-full 
      text-base text-black "
      >
        <thead className="">
          <tr
            className="border-b border-gray-500 bg-white
           flex items-center py-2"
          >
            <th className="basis-1/12 min-w-16">번호</th>
            <th className="grow">제목</th>
            <th className="basis-1/12 min-w-16">글쓴이</th>
            <th className="basis-[10%] min-w-16">작성일</th>
            <th className="w-16">조회수</th>
          </tr>
        </thead>
        <tbody className="">
          {announcementPosts?.map(
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
              // 번호 | 제목 | 글쓴이 | 작성일 | 조회수
              <tr
                key={postid}
                className={`relative border-b border-gray-200 flex items-center py-2 ${
                  isAnnouncement ? "bg-gray-100" : "hover:bg-gray-100"
                }`}
              >
                <td
                  className={` ${
                    isAnnouncement && ""
                  } text-center basis-1/12 flex justify-center min-w-16 `}
                >
                  {isAnnouncement ? (
                    <>
                      <AnnouncementIcon />
                      <td className="absolute top-0 left-0 h-full w-1 bg-michigan-blue" />
                    </>
                  ) : (
                    postid
                  )}
                  {/* {isAnnouncement && (
                      <div className="absolute left-0 h-full border-4 border-michigan-blue" />
                    )} */}
                </td>
                <td className="text-left grow">
                  <Link href={`/posts/${postid}`} className="hover:underline">
                    {commentsCount > 0 ? (
                      <span className={``}>
                        {title}
                        <span className="ml-1 text-red-500 font-normal">{`[${commentsCount}]`}</span>
                      </span>
                    ) : (
                      <span className="">{title}</span>
                    )}
                  </Link>
                </td>

                <td className="text-center basis-1/12 min-w-16">{fullname}</td>
                <td className="text-center basis-[10%] min-w-16">
                  {dateFormatter(created)}
                </td>
                <td className="text-center w-16">{readCount}</td>
              </tr>
            )
          )}
          {posts?.map(
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
              // 번호 | 제목 | 글쓴이 | 작성일 | 조회수
              <tr
                key={postid}
                className={`relative border-b border-gray-200 flex items-center py-2 ${
                  isAnnouncement ? "bg-gray-100" : "hover:bg-gray-100"
                }`}
              >
                <td
                  className={` ${
                    isAnnouncement && ""
                  } text-center basis-1/12 flex justify-center min-w-16 `}
                >
                  {isAnnouncement ? (
                    <>
                      <AnnouncementIcon />
                      <td className="absolute top-0 left-0 h-full w-1 bg-michigan-blue" />
                    </>
                  ) : (
                    postid
                  )}
                  {/* {isAnnouncement && (
                      <div className="absolute left-0 h-full border-4 border-michigan-blue" />
                    )} */}
                </td>
                <td className="text-left grow">
                  <Link href={`/posts/${postid}`} className="hover:underline">
                    {commentsCount > 0 ? (
                      <span className={``}>
                        {title}
                        <span className="ml-1 text-red-500 font-normal">{`[${commentsCount}]`}</span>
                      </span>
                    ) : (
                      <span className="">{title}</span>
                    )}
                  </Link>
                </td>

                <td className="text-center basis-1/12 min-w-16">{fullname}</td>
                <td className="text-center basis-[10%] min-w-16">
                  {dateFormatter(created)}
                </td>
                <td className="text-center w-16">{readCount}</td>
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
          {/* TODO: improve pagination */}
          <Pagination pageNum={pageNum} setPageNum={setPageNum} />
        </div>
      </div>
    </div>
  );
}
