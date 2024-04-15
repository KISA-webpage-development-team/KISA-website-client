import React from "react";
import BoardTable from "../../../components/Boards/BoardTable";
import MobileBoardTable from "../../../components/Boards/MobileBoardTable";
import BoardBar from "../../../components/Boards/BoardBar";
// import { getBoardPosts } from "../../../service/board";

export default function HousingPage() {
  const boardType = "housing";
  // fetch all the page data
  // const data = await getBoardPosts("community");
  // console.log(data);

  return (
    <section className={`flex flex-col mb-10 px-0 md:px-[60px] lg:px-[75px]`}>
      {/* 게시판 이름: 자유게시판 */}
      {/* for now, boardType is not working as a parameter,
      will be fixed in later factorization */}
      {/* <div className="pt-3 pb-2 ">
        <BoardTitle boardType={boardType} />
      </div> */}
      {/* 게시판 search bar */}
      <div className="px-4 md:px-0 py-3">
        <BoardBar boardType={boardType} />
      </div>
      {/* 게시판 table */}
      {/* API happens in BoardTable client component */}
      <div className="hidden md:flex w-full ">
        <BoardTable boardType={boardType} />
      </div>
      <div className=" flex md:hidden ">
        <MobileBoardTable boardType={boardType} />
      </div>
    </section>
  );
}
