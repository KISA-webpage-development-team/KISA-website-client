import React from "react";
import BoardTable from "../../../components/Boards/BoardTable";
import MobileBoardTable from "../../../components/Boards/MobileBoardTable";
import BoardBar from "../../../components/Boards/BoardBar";
import BoardClient from "../../../components/Boards/BoardClient";
// import { getBoardPosts } from "../../../service/board";

export default function CommunityPage() {
  const boardType = "community";

  return (
    <section>
      {/* 게시판 search bar */}
      <BoardBar boardType={boardType} />
      {/* 게시판 table */}
      {/* API happens in BoardTable client component */}
      <BoardClient boardType={boardType} />
    </section>
  );
}
