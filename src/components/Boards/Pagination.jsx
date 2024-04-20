import React from "react";
import PrevIcon from "../ui/PrevIcon";
import NextIcon from "../ui/NextIcon";
import { Pagination as PaginationBar } from "@nextui-org/react";

export default function Pagination({ totalPageNum, pageNum, setPageNum }) {
  const backToPrev = () => {
    if (pageNum === 0) return;
    setPageNum((prev) => prev - 1);
  };

  const moveToNext = () => {
    setPageNum((prev) => prev + 1);
  };

  return (
    <div className="flex items-center gap-3">
      <PaginationBar
        showControls
        total={totalPageNum}
        page={pageNum}
        onChange={setPageNum}
      />
    </div>
  );
}
