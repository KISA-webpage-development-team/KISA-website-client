import React from "react";
import BoardBar from "../../../components/Boards/BoardBar";
import BoardClient from "../../../components/Boards/BoardClient";

export default function AcademicsPage() {
  const boardType = "academics";

  return (
    <section>
      {/* 게시판 search bar */}
      <BoardBar boardType={boardType} />
      {/* 게시판 table */}
      {/* API happens in BoardTable client component */}
      <div className="board_table_wrapper">
        <BoardClient boardType={boardType} />
      </div>
    </section>
  );
}
