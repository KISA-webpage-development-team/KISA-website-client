// boardId = url에서 /boards/{boardId}
import Link from "next/link";
import React from "react";

export default function BoardTitle({ boardType }) {
  const boardLink = `/boards/${boardType}`;

  return (
    <Link href={boardLink}>
      <p
        className={`text-lg sm:text-xl md:text-2xl font-bold text-black hover:text-gray-500 cursor-pointer`}
      >
        자유게시판
      </p>
    </Link>
  );
}
