import React from "react";
import BoardTemplate from "@/features/bulletin-board/components/board/BoardTemplate";
import { BoardType } from "@/types/board";

type HousingBoardPageProps = {
  searchParams?: {
    size?: string;
    page?: string;
  };
};

const DEFAULT_PAGE_SIZE = 10;

export default function HousingBoardPage({
  searchParams,
}: HousingBoardPageProps) {
  const boardType = BoardType.Housing;
  const size = searchParams?.size ? Number(searchParams.size) : DEFAULT_PAGE_SIZE;
  const page = searchParams?.page ? Number(searchParams.page) : 1;

  return (
    <section>
      <BoardTemplate boardType={boardType} size={size} page={page} />
    </section>
  );
}
