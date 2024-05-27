// boardId = url에서 /boards/{boardId}
import Link from "next/link";
import React from "react";
import { getBoardName } from "../../config/boardName";

export default function BoardTitle({ boardType }) {
  const boardLink = `/boards/${boardType}`;

  return (
    <Link href={boardLink} className="w-max">
      <p
        className={`cursor-pointer hover:underline
        text-xl md:text-2xl font-bold text-michigan-blue`}
      >
        {getBoardName(boardType)}
      </p>
    </Link>
  );
}
