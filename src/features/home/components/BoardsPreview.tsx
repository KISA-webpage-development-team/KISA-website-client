"use client";

import Link from "next/link";

import { Card, CardContent, Icon, Skeleton } from "@umichkisa-ds/web";

import { SWRProvider } from "@/lib/swr/providers";
import { useBoardPosts } from "@/apis/boards/swrHooks";
import { BoardType } from "@/types/board";
import { SimplePost } from "@/types/post";
import { formatDateOrTime } from "@/utils/formats/date";
import {
  getKoreanBoardType,
  isEveryKisaBoard,
} from "@/utils/formats/boardType";

const PREVIEW_LIMIT = 6;

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

function BoardColumn({ type }: { type: BoardType }) {
  const { posts, isLoading } = useBoardPosts(type, PREVIEW_LIMIT, 0);

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

        {isLoading ? (
          <ul className="flex flex-col gap-2">
            {Array.from({ length: PREVIEW_LIMIT }).map((_, i) => (
              <li key={i} className="px-2 py-2">
                <Skeleton className="h-5 w-full" />
              </li>
            ))}
          </ul>
        ) : posts && posts.length > 0 ? (
          <ul className="flex flex-col">
            {posts.slice(0, PREVIEW_LIMIT).map((post) => (
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
 * Posts are fetched client-side via SWR so the mock-mode MSW worker can
 * intercept the requests; server-side RSC fetches bypass the browser-only
 * service worker.
 */
export default function BoardsPreview() {
  return (
    <SWRProvider>
      <div className="flex flex-col gap-4">
        <header className="flex flex-col gap-1">
          <h2 className="type-h2 text-foreground">최근 게시글</h2>
        </header>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <BoardColumn type={BoardType.Community} />
          <BoardColumn type={BoardType.JobAnnouncement} />
        </div>
      </div>
    </SWRProvider>
  );
}
