import React from "react";
import BoardBar from "../../../components/Boards/BoardBar";
import BoardClient from "../../../components/Boards/BoardClient";

export default function BuyAndSellPage() {
  const boardType = "buyandsell";
  // fetch all the page data
  // const data = await getBoardPosts("community");
  // console.log(data);

  return (
    <section className={`flex flex-col mb-10 px-0 md:px-[60px] lg:px-[75px]`}>
      {/* 게시판 search bar */}
      <div className="px-4 md:px-0">
        <BoardBar boardType={boardType} />
      </div>
      {/* 게시판 table */}
      {/* API happens in BoardTable client component */}
      <div className="w-full ">
        <BoardClient boardType={boardType} />
      </div>
    </section>
  );
}
