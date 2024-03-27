// boardId = url에서 /boards/{boardId}
import Link from "next/link";
import React from "react";

export default function BoardTitle({ boardType }) {
  const boardLink = `/boards/${boardType}`;

  return (
    <Link href={boardLink}>
      <p className="text-lg font-bold text-gray-800 hover:text-gray-600 cursor-pointer">
        자유게시판
      </p>
    </Link>
  );
}
