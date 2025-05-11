import React from "react";
import Link from "next/link";

import {
  getKoreanBoardType,
  isEveryKisaBoard,
} from "@/utils/formats/boardType";
import { BoardType } from "@/types/board";

type BoardTitleProps = {
  boardType: BoardType;
  size?: "normal" | "small";
};

export default function BoardTitle({
  boardType,
  size = "normal",
}: BoardTitleProps) {
  const boardLink = isEveryKisaBoard(boardType)
    ? `/everykisa/${boardType}`
    : `/boards/${boardType}`;

  const commonStyle = "cursor-pointer hover:underline text-michigan-blue";
  // boardLabel is used for accessibility (title, aria-label)
  const boardLabel = `Go to ${getKoreanBoardType(boardType)}`;

  switch (size) {
    case "normal":
      return (
        <Link
          href={boardLink}
          className="w-max self-stretch"
          title={boardLabel}
          aria-label={boardLabel}
        >
          <h2
            className={`${commonStyle}
        text-lg sm:text-xl md:text-2xl font-bold`}
          >
            {getKoreanBoardType(boardType)}
          </h2>
        </Link>
      );
    case "small":
      return (
        <Link
          href={boardLink}
          className="w-max self-stretch"
          title={boardLabel}
          aria-label={boardLabel}
        >
          <h3
            className={`${commonStyle}
          text-xs sm:text-sm font-semibold`}
          >
            {`${getKoreanBoardType(boardType)} >`}
          </h3>
        </Link>
      );
    default:
      return null;
  }
}
