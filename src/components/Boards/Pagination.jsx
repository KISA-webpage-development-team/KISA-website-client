import React from "react";
import { Pagination as PaginationBar } from "@nextui-org/react";

export default function Pagination({ totalPageNum, pageNum, setPageNum }) {
  return (
    <div className="flex items-center gap-3">
      <PaginationBar
        variant="light"
        showControls
        total={totalPageNum}
        page={pageNum}
        onChange={setPageNum}
        color="#0070f3"
      />
    </div>
  );
}
