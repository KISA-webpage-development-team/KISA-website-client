// boardId = url에서 /boards/{boardId}
import Link from "next/link";
import React from "react";
import { getBoardName } from "../../config/boardName";

export default function BoardTitle({ boardType, size = "normal" }) {
  const boardLink = `/boards/${boardType}`;

  if (size === "normal") {
    return (
      <Link href={boardLink} className="w-max self-stretch">
        <p
          className={`cursor-pointer hover:underline
        text-lg sm:text-xl md:text-2xl font-bold text-michigan-blue`}
        >
          {getBoardName(boardType)}
        </p>
      </Link>
    );
  }

  return (
    <Link href={boardLink} className="w-max self-stretch">
      <p
        className={`cursor-pointer hover:underline
        text-xs sm:text-sm font-semibold text-michigan-blue`}
      >
        {`${getBoardName(boardType)} >`}
      </p>
    </Link>
  );
}
