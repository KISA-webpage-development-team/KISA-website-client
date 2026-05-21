"use client";

import React from "react";

type CourseSearchBarProps = {
  query: string;
  onChange: (value: string) => void;
};

export default function CourseSearchBar({
  query,
  onChange,
}: CourseSearchBarProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="강의 코드를 입력하세요 (예: EECS 281)"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-10 text-sm shadow-sm focus:border-michigan-blue focus:outline-none focus:ring-1 focus:ring-michigan-blue"
      />
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
