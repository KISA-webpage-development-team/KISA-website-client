// Delete-confirm route — back-compat surface for inbound links.
// Mounts the same post-detail surface with the delete-confirm Dialog open
// over the post page. Cancel from the dialog returns the user to the post.

import React from "react";
import PostDetailClient from "@/features/bulletin-board/components/post-view/PostDetailClient";
import { BoardType } from "@/types/board";

type PageProps = {
  params: Promise<{
    board: BoardType;
    postid: string;
  }>;
};

export default async function DeleteConfirmPage({ params }: PageProps) {
  const { postid } = await params;
  return (
    <section>
      <PostDetailClient
        postid={Number(postid)}
        initialDeleteOpen
      />
    </section>
  );
}
