import React from "react";
import PrevIcon from "../ui/PrevIcon";
import NextIcon from "../ui/NextIcon";

export default function Pagination({ pageNum, setPageNum }) {
  const backToPrev = () => {
    if (pageNum === 0) return;
    setPageNum((prev) => prev - 1);
  };

  const moveToNext = () => {
    setPageNum((prev) => prev + 1);
  };

  return (
    <div className="flex items-center gap-3">
      <button onClick={backToPrev}>
        <PrevIcon />
      </button>

      <span className="text-xl">{pageNum + 1}</span>

      <button onClick={moveToNext}>
        <NextIcon />
      </button>
    </div>
  );
}
