"use client";

// BoardClient.jsx
// : rendering the board
// + pagination bar
// + fetch board data

import { useState, useEffect } from "react";
import { getBoardPosts } from "../../service/board";
import { getBoardAnnouncements } from "../../service/board";
import { heebo } from "../../utils/fonts/textFonts";

// sub-ui components
import PageSizeSelector from "./PageSizeSelector";
import Pagination from "./Pagination";
import BoardTable from "./BoardTable";
import MobileBoardTable from "./MobileBoardTable";

export default function BoardClient({ boardType }) {
  const [posts, setPosts] = useState([]); // 일반 게시물
  const [announcementPosts, setAnnouncementPosts] = useState([]); // 공지사항
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(10); // 10, 20, 30

  // fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const data = await getBoardAnnouncements(boardType);
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
      setPosts(data?.results);
    };

    fetchPosts();
  }, [pageNum, pageSize, boardType]);

  // if (!posts || !announcementPosts) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div
      className={`
    w-full
    flex flex-col gap-4  ${heebo.className}`}
    >
      <div className="flex md:hidden">
        <MobileBoardTable posts={posts} announcementPosts={announcementPosts} />
      </div>
      <div className="hidden md:flex">
        <BoardTable posts={posts} announcementPosts={announcementPosts} />
      </div>

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
