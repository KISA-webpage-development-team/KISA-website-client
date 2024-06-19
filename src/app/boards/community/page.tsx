import React from "react";
import BoardBar from "../../../components/Boards/BoardBar";
import BoardClient from "../../../components/Boards/BoardClient";
import { getBoardAnnouncements } from "../../../service/board";
import TestBoardClient from "../../../components/Boards/Test/TestBoardClient";

export default async function CommunityPage({
  searchParams,
}: {
  searchParams?: {
    size?: number;
    page?: number;
  };
}) {
  const { size, page } = searchParams;

  const boardType = "community";
  const annoucements = await getBoardAnnouncements(boardType);

  // test
  if (!annoucements) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      {/* 게시판 search bar */}
      <header className="w-full">
        <BoardBar boardType={boardType} />
      </header>
      {/* 게시판 table */}
      {/* API happens in BoardTable client component */}
      <article className="board_table_wrapper">
        {/* <BoardClient
          boardType={boardType}
          size={Number(size)}
          page={Number(page)}
        /> */}
        <TestBoardClient
          boardType={boardType}
          announcements={annoucements}
          size={size ? size : 10}
          page={page ? page - 1 : 0}
        />
      </article>
    </section>
  );
}

// [NOTE on rendering method]
// This page is rendered as SSR (Server Side Rendering) dynamically.
// "announcementPosts" are fetched from the server
// (공지사항은 자주 바뀌지 않는다 + 일반 유저의 인터렉션이 존재하지 않는다)
// "posts" are fetched from the client side using useSWR hooks
// and then the page is rendered with the fetched data.
// BoardBar is a client component that interacts with user
