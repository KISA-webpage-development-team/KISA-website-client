import React from "react";
import type { JokboFile } from "@/types/course";
import JokboItem from "./JokboItem";

type JokboListProps = {
  files: JokboFile[];
};

export default function JokboList({ files }: JokboListProps) {
  const isEmpty = files.length === 0;

  const emptyContent = (
    <div className="flex flex-col items-center gap-2 py-12 text-gray-400">
      <p className="text-sm">등록된 족보가 없습니다. 첫 번째 족보를 올려보세요!</p>
    </div>
  );

  if (isEmpty) return emptyContent;

  return (
    <div className="flex flex-col gap-2">
      {files.map((file) => (
        <JokboItem key={file.fileid} file={file} />
      ))}
    </div>
  );
}
