import React from "react";
import { getBoardAnnouncements } from "@/apis/boards/queries";
import BoardTemplate from "@/features/bulletin-board/components/board/BoardTemplate";
import { BoardType } from "@/types/board";

type CareerPageProps = {
  searchParams?: {
    size?: string;
    page?: string;
  };
};

const DEFAULT_PAGE_SIZE = 10;

export default async function CareerPage({ searchParams }: CareerPageProps) {
  const boardType = BoardType.Career;
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
