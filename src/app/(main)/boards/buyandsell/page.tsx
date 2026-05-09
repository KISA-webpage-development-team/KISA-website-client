import React from "react";
import { getBoardAnnouncements } from "@/apis/boards/queries";
import BoardTemplate from "@/features/bulletin-board/components/board/BoardTemplate";
import { BoardType } from "@/types/board";

type BuyAndSellPageProps = {
  searchParams?: {
    size?: string;
    page?: string;
  };
};

const DEFAULT_PAGE_SIZE = 10;

/**
 * Server-rendered route shell. Pinned announcements are fetched here (rarely
 * change, no client interaction) and passed into the client `BoardTemplate`,
 * which owns paginated post fetching via SWR.
 */
export default async function BuyAndSellPage({
  searchParams,
}: BuyAndSellPageProps) {
  const boardType = BoardType.BuyAndSell;
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
