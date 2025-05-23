import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";

// ui components
import BoardTitle from "@/features/bulletin-board/components/shared/BoardTitle";

// auth
import authOptions from "@/lib/next-auth/authOptions";

// types
import { BoardType } from "@/types/board";

type PageProps = {
  params: {
    postid: string;
  };
  searchParams: {
    board_type: BoardType;
  };
};

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

export default async function PostUpdatePage({
  params,
  searchParams,
}: PageProps) {
  const session = await getServerSession(authOptions);
  const { board_type } = searchParams;
  const { postid } = params;

  if (!board_type) {
    return <>존재하지 않는 페이지입니다</>;
  }

  return (
    <section>
      {/* Board Title */}
      <BoardTitle boardType={board_type} />

      {/* Text Editor */}

      <div className="grow w-full">
        <PostEditor
          session={session}
          boardType={board_type}
          curPostId={postid}
          mode="update"
        />
      </div>
    </section>
  );
}
// [NOTE on rendering method]
// This page is rendered as SSR (Server Side Rendering) dynamically.
// * current post data is fetched with useEffect to keep it updated
// Client-Side Components like BoardTitle and Editor are rendered and
// become interactive in the browser after the initial HTML is loaded
