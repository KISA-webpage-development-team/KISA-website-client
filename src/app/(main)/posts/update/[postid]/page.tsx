import { getServerSession } from "next-auth";
import { StatusView } from "@umichkisa-ds/web";

import authOptions from "@/lib/next-auth/authOptions";
import BoardTitle from "@/features/bulletin-board/components/shared/BoardTitle";
import PostEditor from "@/features/bulletin-board/components/post-create-edit/PostEditor";
import { BoardType } from "@/types/board";

type PageProps = {
  params: {
    postid: string;
  };
  searchParams: {
    board_type: BoardType;
  };
};

export default async function PostUpdatePage({
  params,
  searchParams,
}: PageProps) {
  const session = await getServerSession(authOptions);
  const { board_type } = searchParams;
  const { postid } = params;

  if (!board_type) {
    return (
      <section>
        <StatusView
          variant="not-found"
          title="존재하지 않는 페이지입니다"
        />
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <BoardTitle boardType={board_type} />
      <PostEditor
        userName={session?.user?.name ?? ""}
        userEmail={session?.user?.email ?? ""}
        token={session?.token}
        boardType={board_type}
        curPostId={postid}
        mode="update"
      />
    </section>
  );
}
