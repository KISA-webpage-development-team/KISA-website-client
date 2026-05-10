"use client";

import Link from "next/link";

import {
  Icon,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableMobileItem,
  TableMobileList,
  TableRow,
} from "@umichkisa-ds/web";

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

function postHref(postid: number): string {
  return `/posts/${postid}`;
}

interface BoardColumnProps {
  type: BoardType;
}

function BoardHeader({ type }: { type: BoardType }) {
  return (
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
  );
}

function PreviewDesktopTable({
  type,
  posts,
}: {
  type: BoardType;
  posts: SimplePost[];
}) {
  const isEveryKisa = isEveryKisaBoard(type);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>제목</TableHead>
          {!isEveryKisa && (
            <TableHead className="w-28 text-center">글쓴이</TableHead>
          )}
          <TableHead className="w-28 text-center">작성일</TableHead>
          {isEveryKisa && (
            <TableHead className="w-16 text-center">추천</TableHead>
          )}
          <TableHead className="w-16 text-center">조회</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <PreviewDesktopRow
            key={post.postid}
            post={post}
            isEveryKisa={isEveryKisa}
          />
        ))}
      </TableBody>
    </Table>
  );
}

function PreviewDesktopRow({
  post,
  isEveryKisa,
}: {
  post: SimplePost;
  isEveryKisa: boolean;
}) {
  const {
    postid,
    title,
    fullname,
    created,
    readCount,
    commentsCount,
    anonymous,
    likesCount,
  } = post;

  return (
    <TableRow>
      <TableCell>
        <Link
          href={postHref(postid)}
          className="type-body line-clamp-1 text-foreground hover:underline"
        >
          {title}
          {commentsCount > 0 && (
            <span className="ml-1 type-body-sm text-error">
              {`[${commentsCount}]`}
            </span>
          )}
        </Link>
      </TableCell>
      {!isEveryKisa && (
        <TableCell className="text-center type-body-sm text-muted-foreground">
          {anonymous ? "" : fullname}
        </TableCell>
      )}
      <TableCell className="text-center type-body-sm text-muted-foreground">
        {formatDateOrTime(created)}
      </TableCell>
      {isEveryKisa && (
        <TableCell className="text-center type-body-sm text-muted-foreground">
          {likesCount ?? 0}
        </TableCell>
      )}
      <TableCell className="text-center type-body-sm text-muted-foreground">
        {readCount}
      </TableCell>
    </TableRow>
  );
}

function PreviewMobileList({
  type,
  posts,
}: {
  type: BoardType;
  posts: SimplePost[];
}) {
  const isEveryKisa = isEveryKisaBoard(type);

  return (
    <TableMobileList>
      {posts.map((post) => (
        <TableMobileItem key={post.postid}>
          <Link href={postHref(post.postid)} className="flex flex-col gap-1">
            <div className="flex items-baseline gap-1">
              <span className="type-body line-clamp-1 text-foreground">
                {post.title}
              </span>
              {post.commentsCount > 0 && (
                <span className="type-body-sm text-error">
                  {`[${post.commentsCount}]`}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 type-caption text-muted-foreground">
              <span>{formatDateOrTime(post.created)}</span>
              {!isEveryKisa && !post.anonymous && <span>{post.fullname}</span>}
              <span>조회 {post.readCount}</span>
              {isEveryKisa && <span>추천 {post.likesCount ?? 0}</span>}
            </div>
          </Link>
        </TableMobileItem>
      ))}
    </TableMobileList>
  );
}

function PreviewSkeleton() {
  // Both BoardsPreview variants render 4 desktop columns
  // (title + author/likes + date + reads).
  const desktopColCount = 4;

  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: desktopColCount }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-12" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: PREVIEW_LIMIT }).map((_, rowIdx) => (
              <TableRow key={rowIdx}>
                {Array.from({ length: desktopColCount }).map((_, colIdx) => (
                  <TableCell key={colIdx}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="-mx-4 block md:hidden">
        <TableMobileList>
          {Array.from({ length: PREVIEW_LIMIT }).map((_, idx) => (
            <TableMobileItem key={idx}>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </TableMobileItem>
          ))}
        </TableMobileList>
      </div>
    </>
  );
}

function BoardColumn({ type }: BoardColumnProps) {
  const { posts, isLoading } = useBoardPosts(type, PREVIEW_LIMIT, 0);
  const visible = (posts ?? []).slice(0, PREVIEW_LIMIT);
  const isEveryKisa = isEveryKisaBoard(type);

  return (
    <div className="flex flex-col gap-1">
      <BoardHeader type={type} />

      {isLoading ? (
        <PreviewSkeleton />
      ) : visible.length > 0 ? (
        <>
          <div className="hidden md:block">
            <PreviewDesktopTable type={type} posts={visible} />
          </div>
          <div className="-mx-4 block md:hidden">
            <PreviewMobileList type={type} posts={visible} />
          </div>
        </>
      ) : (
        <p className="type-body px-2 py-4 text-muted-foreground">
          아직 게시글이 없습니다.
        </p>
      )}
    </div>
  );
}

/**
 * Two-column board preview surfaced on the home page — 자유게시판 (community)
 * + 취업공고 (job-announcement). Uses the same `Table` + `TableMobileList`
 * atoms as `BoardTemplate` so the preview matches the full-board look.
 *
 * Posts are fetched client-side via SWR so the mock-mode MSW worker can
 * intercept the requests; server-side RSC fetches bypass the browser-only
 * service worker.
 */
export default function BoardsPreview() {
  return (
    <SWRProvider>
      <div className="flex flex-col gap-2">
        <header className="hidden" aria-hidden="true">
          <h2 className="type-h2 text-foreground">최근 게시글</h2>
        </header>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <BoardColumn type={BoardType.JobAnnouncement} />
          <BoardColumn type={BoardType.Community} />
        </div>
      </div>
    </SWRProvider>
  );
}
