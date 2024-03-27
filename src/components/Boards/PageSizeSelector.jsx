import React from "react";

const pageSizeOptions = [10, 20, 30];

export default function PageSizeSelector({ pageSize, setPageSize }) {
  return (
    <div className="flex items-center w-20 gap-1">
      {pageSizeOptions.map((pageSizeOption) => (
        <button
          key={pageSizeOption}
          className={`w-8 h-8 border border-gray-300 rounded-lg px-2 flex items-center justify-center ${
            pageSizeOption === pageSize ? "bg-blue-400 text-white" : ""
          }`}
          onClick={() => setPageSize(pageSizeOption)}
        >
          {pageSizeOption}
        </button>
      ))}
    </div>
  );
}
