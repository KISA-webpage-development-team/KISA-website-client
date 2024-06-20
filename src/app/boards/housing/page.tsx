import React from "react";
import BoardBar from "../../../components/Boards/BoardBar";
import BoardClient from "../../../components/Boards/BoardClient";
import { getBoardAnnouncements } from "../../../service/board";

export default async function HousingPage({
  searchParams,
}: {
  searchParams?: {
    size?: number;
    page?: number;
  };
}) {
  const { size, page } = searchParams;

  const boardType = "housing";
  // 공지사항은 Server Side이기 때문에 완전한 실시간 데이터가 아니다.
  // 공지사항 게시글의 특성상 실시간으로 완전한 싱크 (지속적인 api call)이 필요하지 않다.
  const annoucements = await getBoardAnnouncements(boardType);

  // test
  if (!annoucements) {
    return <></>;
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
        <BoardClient
          boardType={boardType}
          announcements={annoucements}
          size={size ? Number(size) : 10}
          page={page ? Number(page) : 1}
        />
      </article>
    </section>
  );
}
