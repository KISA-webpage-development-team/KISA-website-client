import React from "react";
import BoardTitle from "../../../../components/Boards/BoardTitle";
import Editor from "../../../../components/Posts/Editor";

export default function CreatePostPage({ params }) {
  const { boardType } = params;

  return (
    <div className="flex flex-col h-full w-full">
      {/* Board Title (지금 어떤 보드에 대한 게시물을 쓰는지 확인위해) */}
      <div className="pt-1 pb-2">
        <BoardTitle boardType={boardType} />
      </div>

      {/* Text Editor */}
      <div className="grow h-full">
        <Editor boardType={boardType} />
      </div>
    </div>
  );
}
