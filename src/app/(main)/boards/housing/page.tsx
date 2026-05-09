import React from "react";
import { getBoardAnnouncements } from "@/apis/boards/queries";
import BoardTemplate from "@/features/bulletin-board/components/board/BoardTemplate";
import { BoardType } from "@/types/board";

type HousingBoardPageProps = {
  searchParams?: {
    size?: string;
    page?: string;
  };
};

const DEFAULT_PAGE_SIZE = 10;

export default async function HousingBoardPage({
  searchParams,
}: HousingBoardPageProps) {
  const boardType = BoardType.Housing;
  const announcements = await getBoardAnnouncements(boardType);

  const size = searchParams?.size ? Number(searchParams.size) : DEFAULT_PAGE_SIZE;
  const page = searchParams?.page ? Number(searchParams.page) : 1;

  return (
    <section>
      <BoardTemplate
        boardType={boardType}
        announcements={announcements}
        size={size}
        page={page}
      />
    </section>
  );
}
