import React from "react";
import BoardTitle from "../../../../components/Boards/BoardTitle";

import dynamic from "next/dynamic";

// need to force EditorClient to be rendered on client-side
// I don't know why NextJS doesn't automatically render it on client-side
// this will remove the error "document is not defined"
const EditorClient = dynamic(
  () => import("../../../../components/Posts/post-edit/EditorClient"),
  {
    ssr: false,
  }
);

export default function CreatePostPage({ params }) {
  const { boardType } = params;

  return (
    <section>
      {/* Board Title (지금 어떤 보드에 대한 게시물을 쓰는지 확인위해) */}
      <div className="w-full">
        <BoardTitle boardType={boardType} />
      </div>

      {/* Text Editor */}
      <div className="grow w-full">
        <EditorClient boardType={boardType} mode="create" />
      </div>
    </section>
  );
}

// [NOTE on rendering method]
// This page is rendered as SSR (Server Side Rendering) dynamically.
// Client-Side Components like BoardTitle and Editor are rendered and
// become interactive in the browser after the initial HTML is loaded
