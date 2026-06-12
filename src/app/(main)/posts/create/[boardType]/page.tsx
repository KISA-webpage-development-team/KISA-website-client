import { getServerSession } from "next-auth";

import authOptions from "@/lib/next-auth/authOptions";
import BoardTitle from "@/features/bulletin-board/components/shared/BoardTitle";
import PostEditor from "@/features/bulletin-board/components/post-create-edit/PostEditor";
import { BoardType } from "@/types/board";

type PageProps = {
  params: Promise<{
    boardType: BoardType;
  }>;
};

export default async function CreatePostPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const { boardType } = await params;

  return (
    <section className="flex flex-col gap-6">
      <BoardTitle boardType={boardType} />
      <PostEditor
        userName={session?.user?.name ?? ""}
        userEmail={session?.user?.email ?? ""}
        token={session?.token}
        boardType={boardType}
        mode="create"
      />
    </section>
  );
}
