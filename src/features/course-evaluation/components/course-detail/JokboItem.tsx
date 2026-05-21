import React from "react";
import type { JokboFile } from "@/types/course";

type JokboItemProps = {
  file: JokboFile;
};

export default function JokboItem({ file }: JokboItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-gray-800">
          {file.fileName}
        </span>
        <span className="text-xs text-gray-400">
          {file.semester} · {file.uploadedBy} · {file.uploadedAt}
        </span>
      </div>
      <button
        disabled
        className="rounded-md bg-michigan-blue px-3 py-1.5 text-xs text-white opacity-40 cursor-not-allowed"
      >
        다운로드
      </button>
    </div>
  );
}
