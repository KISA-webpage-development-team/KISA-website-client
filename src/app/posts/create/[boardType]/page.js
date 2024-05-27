import React from "react";
import BoardTitle from "../../../../components/Boards/BoardTitle";
import EditorClient from "../../../../components/Posts/post-edit/EditorClient";

export default function CreatePostPage({ params }) {
  const { boardType } = params;

  return (
    <section>
      {/* Board Title (지금 어떤 보드에 대한 게시물을 쓰는지 확인위해) */}
      <BoardTitle boardType={boardType} />

      {/* Text Editor */}
      <div className="grow">
        <EditorClient boardType={boardType} mode="create" />
      </div>
    </section>
  );
}

// [NOTE on rendering method]
// This page is rendered as SSR (Server Side Rendering) dynamically.
// Client-Side Components like BoardTitle and Editor are rendered and
// become interactive in the browser after the initial HTML is loaded
