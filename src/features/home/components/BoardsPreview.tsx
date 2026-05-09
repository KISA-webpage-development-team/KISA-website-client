import Link from "next/link";

import { Card, CardContent, Icon } from "@umichkisa-ds/web";

import { BoardType } from "@/types/board";
import { SimplePost } from "@/types/post";
import { formatDateOrTime } from "@/utils/formats/date";
import {
  getKoreanBoardType,
  isEveryKisaBoard,
} from "@/utils/formats/boardType";

const PREVIEW_LIMIT = 6;

interface BoardsPreviewProps {
  communityPosts: SimplePost[] | undefined;
  jobPosts: SimplePost[] | undefined;
}

function boardIndexHref(type: BoardType): string {
  return isEveryKisaBoard(type) ? `/everykisa/${type}` : `/boards/${type}`;
}

function postDetailHref(post: SimplePost): string {
  const base = isEveryKisaBoard(post.type) ? "/everykisa" : "/boards";
  return `${base}/${post.type}/${post.postid}`;
}

function PostRow({ post }: { post: SimplePost }) {
  return (
    <li>
      <Link
        href={postDetailHref(post)}
        className="group flex items-center justify-between gap-3 rounded-md px-2 py-2 hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      >
        <span className="type-body line-clamp-1 flex-1 text-foreground group-hover:underline">
          {post.title}
        </span>
        <span className="type-caption flex shrink-0 items-center gap-3 text-muted-foreground">
          <span className="hidden md:inline">
            {post.anonymous ? "익명" : post.fullname}
          </span>
          <span>{formatDateOrTime(post.created)}</span>
          {post.commentsCount > 0 ? (
            <span className="inline-flex items-center gap-1">
              <Icon name="message-square" size="xs" />
              {post.commentsCount}
            </span>
          ) : null}
        </span>
      </Link>
    </li>
  );
}

interface BoardColumnProps {
  type: BoardType;
  posts: SimplePost[] | undefined;
}

function BoardColumn({ type, posts }: BoardColumnProps) {
  const visible = posts?.slice(0, PREVIEW_LIMIT) ?? [];

  return (
    <Card aria-label={getKoreanBoardType(type)}>
      <CardContent className="flex flex-col gap-3 p-5">
        <header className="flex items-baseline justify-between">
          <Link
            href={boardIndexHref(type)}
            className="group inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            <h3 className="type-h3 text-foreground group-hover:underline">
              {getKoreanBoardType(type)}
            </h3>
            <span className="text-muted-foreground">
              <Icon name="arrow-right" size="sm" />
            </span>
          </Link>
        </header>

        {visible.length > 0 ? (
          <ul className="flex flex-col">
            {visible.map((post) => (
              <PostRow key={post.postid} post={post} />
            ))}
          </ul>
        ) : (
          <p className="type-body px-2 py-4 text-muted-foreground">
            아직 게시글이 없습니다.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Two-column board preview surfaced on the home page — 자유게시판 (community)
 * + 취업공고 (job-announcement). Stacks on mobile, side-by-side on desktop.
 *
 * Posts are server-fetched in `(main)/page.tsx` and passed as props so the
 * preview is in the SSR HTML; this component is an RSC.
 */
export default function BoardsPreview({
  communityPosts,
  jobPosts,
}: BoardsPreviewProps) {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <h2 className="type-h2 text-foreground">최근 게시글</h2>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BoardColumn type={BoardType.Community} posts={communityPosts} />
        <BoardColumn
          type={BoardType.JobAnnouncement}
          posts={jobPosts}
        />
      </div>
    </div>
  );
}
