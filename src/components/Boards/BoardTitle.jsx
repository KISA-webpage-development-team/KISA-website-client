// boardId = url에서 /boards/{boardId}
import Link from "next/link";
import React from "react";
import { getBoardName } from "../../config/boardName";

export default function BoardTitle({ boardType }) {
  const boardLink = `/boards/${boardType}`;

  return (
    <Link href={boardLink}>
      <p
        className={`text-lg md:text-2xl font-bold text-black hover:text-gray-500 cursor-pointer`}
      >
        {getBoardName(boardType)}
      </p>
    </Link>
  );
}
