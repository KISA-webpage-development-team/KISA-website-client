"use client";

import React from "react";
import BoardBar from "../../../components/Boards/BoardBar";
import BoardClient from "../../../components/Boards/BoardClient";
import { useSearchParams } from "next/navigation";

export default function BuyAndSellPage() {
  const boardType = "buyandsell";

  const searchParams = useSearchParams();
  const size = searchParams.get("size") || 10;
  const page = searchParams.get("page") || 1;

  return (
    <section className="">
      {/* 게시판 search bar */}
      <BoardBar boardType={boardType} />

      {/* 게시판 table */}
      {/* API happens in BoardTable client component */}
      <div
        className=" md:mt-0 
        left-0 md:relative 
        w-screen md:w-full
      translate-x-0"
      >
        <BoardClient boardType={boardType} size={size} page={page} />
      </div>
    </section>
  );
}
