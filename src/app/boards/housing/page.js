import React from "react";
import BoardBar from "../../../components/Boards/BoardBar";
import BoardClient from "../../../components/Boards/BoardClient";

export default function HousingPage() {
  const boardType = "housing";

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
