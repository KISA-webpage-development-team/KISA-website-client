import React from "react";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";

// ui components
import BoardTitle from "@/features/bulletin-board/components/shared/BoardTitle";

// auth
import authOptions from "@/lib/next-auth/authOptions";

// types
import { BoardType } from "@/types/board";

// need to force PostEditor to be rendered on client-side
// I don't know why NextJS doesn't automatically render it on client-side
// this will remove the error "document is not defined"
const PostEditor = dynamic(
  () =>
    import("@/features/bulletin-board/components/post-create-edit/PostEditor"),
  {
    ssr: false,
  }
);

type PageProps = {
  params: {
    boardType: BoardType;
  };
};

export default async function CreatePostPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  const { boardType } = params;

  return (
    <section>
      {/* Board Title (지금 어떤 보드에 대한 게시물을 쓰는지 확인위해) */}
      <BoardTitle boardType={boardType} />

      {/* Text Editor */}
      <div className="grow w-full">
        <PostEditor session={session} boardType={boardType} mode="create" />
      </div>
    </section>
  );
}

// [NOTE on rendering method]
// This page is rendered as SSR (Server Side Rendering) dynamically.
// Client-Side Components like BoardTitle and PostEditor are rendered and
// become interactive in the browser after the initial HTML is loaded
