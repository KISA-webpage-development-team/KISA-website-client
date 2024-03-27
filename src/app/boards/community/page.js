import React from "react";
import BoardTitle from "../../../components/Boards/BoardTitle";
import BoardTable from "../../../components/Boards/BoardTable";
import BoardBar from "../../../components/Boards/BoardBar";
// import { getBoardPosts } from "../../../service/board";

export default async function CommunityPage() {
  const boardType = "community";
  // fetch all the page data
  // const data = await getBoardPosts("community");
  // console.log(data);

  return (
    <section className="flex flex-col mb-10">
      {/* 게시판 이름: 자유게시판 */}
      {/* for now, boardType is not working as a parameter,
      will be fixed in later factorization */}
      <div className="pt-3 pb-2 ">
        <BoardTitle boardType={boardType} />
      </div>

      {/* 게시판 search bar */}
      <div className="py-3">
        <BoardBar boardType={boardType} />
      </div>

      {/* 게시판 table */}
      {/* API happens in BoardTable client component */}

      <BoardTable boardType={boardType} />
    </section>
  );
}
