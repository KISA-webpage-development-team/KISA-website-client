import React from "react";
import BoardTemplate from "@/features/bulletin-board/components/board/BoardTemplate";
import { BoardType } from "@/types/board";

type AnnouncementPageProps = {
  searchParams?: {
    size?: string;
    page?: string;
  };
};

const DEFAULT_PAGE_SIZE = 10;

export default function AnnouncementPage({
  searchParams,
}: AnnouncementPageProps) {
  const boardType = BoardType.Announcement;
  const size = searchParams?.size ? Number(searchParams.size) : DEFAULT_PAGE_SIZE;
  const page = searchParams?.page ? Number(searchParams.page) : 1;

  return (
    <section>
      <BoardTemplate boardType={boardType} size={size} page={page} />
    </section>
  );
}
