"use client";

import React from "react";
import BoardBar from "../../../components/Boards/BoardBar";
import BoardClient from "../../../components/Boards/BoardClient";
import { useSearchParams } from "next/navigation";
// import { getBoardPosts } from "../../../service/board";

export default function CommunityPage() {
  const boardType = "community";

  // query on url [size, p]
  const searchParams = useSearchParams();
  const size = searchParams.get("size") || 10;
  const page = searchParams.get("page") || 1;

  console.log("");

  if (!size || !page) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      {/* 게시판 search bar */}
      <BoardBar boardType={boardType} />
      {/* 게시판 table */}
      {/* API happens in BoardTable client component */}
      <div className="board_table_wrapper">
        <BoardClient boardType={boardType} size={size} page={page} />
      </div>
    </section>
  );
}
