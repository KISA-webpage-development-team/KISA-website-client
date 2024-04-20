import React from "react";

const pageSizeOptions = [10, 20, 30];

export default function PageSizeSelector({
  pageNum,
  totalPostNum,
  pageSize,
  setPageSize,
}) {
  return (
    <div className="flex items-center w-20 gap-1">
      {pageSizeOptions
        .filter((pageSizeOption) => pageNum * pageSizeOption <= totalPostNum)
        .map((pageSizeOption) => (
          <button
            key={pageSizeOption}
            className={`w-8 h-8 border border-gray-300 rounded-lg px-2 flex items-center justify-center ${
              pageSizeOption === pageSize
                ? "bg-michigan-blue text-michigan-maize"
                : ""
            }`}
            onClick={() => setPageSize(pageSizeOption)}
          >
            {pageSizeOption}
          </button>
        ))}
    </div>
  );
}
