"use client";

import React, { useCallback, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Badge,
  LinkButton,
  Pagination,
  Skeleton,
  StatusView,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableMobileItem,
  TableMobileList,
  TableRow,
  ToggleGroup,
} from "@umichkisa-ds/web";

import {
  useBoardAnnouncements,
  useBoardPostNum,
  useBoardPosts,
} from "@/apis/boards/swrHooks";
import { BoardType } from "@/types/board";
import { SimplePost } from "@/types/post";
import {
  isEveryKisaBoard,
  getKoreanBoardType,
} from "@/utils/formats/boardType";
import { formatDateOrTime } from "@/utils/formats/date";
import useAdmin from "@/lib/next-auth/useAdmin";
import { useAuth } from "@/lib/auth/authContext";
import { getBoardCapability } from "@/features/bulletin-board/config/boardCapabilities";

const PAGE_SIZE_OPTIONS = ["10", "20", "30"] as const;
const SKELETON_ROW_COUNT = 8;

type Props = {
  boardType: BoardType;
  /** 1-indexed page from URL. */
  page: number;
  /** Page size from URL. */
  size: number;
};

/**
 * Shared list view for every /boards/* and /everykisa/* route.
 *
 * Layout: title + 글쓰기 CTA header → desktop Table / mobile TableMobileList →
 * page-size segmented selector + Pagination.
 *
 * Variation between routes is driven entirely by:
 *   - `isEveryKisaBoard(boardType)` for column shape (글쓴이 vs 추천)
 *   - `getBoardCapability(boardType).adminPostOnly` for CTA gating
 *
 * Never branch on `boardType` directly here.
 */
export default function BoardTemplate({ boardType, page, size }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const isEveryKisa = isEveryKisaBoard(boardType);
  const capability = getBoardCapability(boardType);

  const { isAuthenticated } = useAuth();
  const { isAdmin, status: adminStatus } = useAdmin();

  // SWR uses 0-indexed page; URL/UI uses 1-indexed.
  const apiPage = Math.max(0, page - 1);

  const {
    posts,
    isLoading: isPostsFetching,
    error: postsError,
  } = useBoardPosts(boardType, size, apiPage);
  const {
    postNum: totalPostNum,
    isLoading: isPostNumFetching,
    error: postNumError,
  } = useBoardPostNum(boardType);
  const {
    announcements,
    isLoading: isAnnouncementsFetching,
    error: announcementsError,
  } = useBoardAnnouncements(boardType);

  const buildHref = useCallback(
    (next: Partial<{ page: number; size: number }>) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.page !== undefined) params.set("page", String(next.page));
      if (next.size !== undefined) params.set("size", String(next.size));
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams],
  );

  const handlePageChange = useCallback(
    (nextPage: number) => {
      startTransition(() => {
        router.push(buildHref({ page: nextPage }));
      });
    },
    [router, buildHref],
  );

  const handleSizeChange = useCallback(
    (value: string) => {
      if (!value) return;
      // Reset to page 1 when size changes — current 1-indexed page may
      // overshoot the new totalPages.
      startTransition(() => {
        router.push(buildHref({ size: Number(value), page: 1 }));
      });
    },
    [router, buildHref],
  );

  const showCreateButton =
    adminStatus === "success" &&
    isAuthenticated &&
    (capability.adminPostOnly ? isAdmin : true);

  const totalPages = !totalPostNum
    ? 1
    : Math.max(1, Math.ceil(totalPostNum / size));

  // The starting (largest) post number for the current page, descending.
  const postStartIdx = (totalPostNum ?? 0) - size * apiPage;

  const isLoading =
    isPostsFetching || isPostNumFetching || isAnnouncementsFetching;
  const isError = Boolean(postsError || postNumError || announcementsError);

  const showAnnouncements = page === 1 ? (announcements ?? []) : [];
  const isEmpty =
    !isLoading &&
    !isError &&
    (posts?.length ?? 0) === 0 &&
    showAnnouncements.length === 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Header — title + CTA */}
      <header className="flex items-center justify-between gap-4">
        <h1 className="type-h2 text-brand-primary">
          {getKoreanBoardType(boardType)}
        </h1>
        {showCreateButton && (
          <LinkButton
            href={`/posts/create/${boardType}`}
            variant="primary"
            size="sm"
          >
            글쓰기
          </LinkButton>
        )}
      </header>

      {isLoading ? (
        <BoardSkeleton />
      ) : isError ? (
        <StatusView variant="error" title="게시글을 불러오는데 실패했습니다" />
      ) : isEmpty ? (
        <StatusView variant="not-found" title="아직 게시글이 없습니다" />
      ) : (
        <>
          {/* Desktop table */}
          <div
            className={`hidden md:block ${
              isPending ? "opacity-60 transition-opacity" : ""
            }`}
          >
            <BoardDesktopTable
              isEveryKisa={isEveryKisa}
              postStartIdx={postStartIdx}
              posts={posts ?? []}
              announcements={showAnnouncements}
            />
          </div>

          {/* Mobile list */}
          <div
            className={`block md:hidden ${
              isPending ? "opacity-60 transition-opacity" : ""
            }`}
          >
            <BoardMobileList
              isEveryKisa={isEveryKisa}
              posts={posts ?? []}
              announcements={showAnnouncements}
            />
          </div>

          {/* Pagination — centered. Size selector is desktop-only,
              anchored to the absolute left (게시판 convention). Mobile
              hides the selector entirely (defaults to 10). */}
          <div className="relative flex justify-center">
            <div className="hidden md:block md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2">
              <ToggleGroup
                type="single"
                value={String(size)}
                onValueChange={handleSizeChange}
                items={PAGE_SIZE_OPTIONS.map((option) => ({
                  value: option,
                  label: option,
                }))}
                aria-label="페이지당 게시글 수"
              />
            </div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}

// ─── Subcomponents ──────────────────────────────────────────────────────────

type ListProps = {
  isEveryKisa: boolean;
  posts: SimplePost[];
  announcements: SimplePost[];
};

function BoardDesktopTable({
  isEveryKisa,
  posts,
  announcements,
  postStartIdx,
}: ListProps & { postStartIdx: number }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16 text-center">번호</TableHead>
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
        {announcements.map((post) => (
          <BoardDesktopRow
            key={post.postid}
            post={post}
            isEveryKisa={isEveryKisa}
            isAnnouncement
          />
        ))}
        {posts.map((post, idx) => (
          <BoardDesktopRow
            key={post.postid}
            post={post}
            isEveryKisa={isEveryKisa}
            postNum={postStartIdx - idx}
          />
        ))}
      </TableBody>
    </Table>
  );
}

function BoardDesktopRow({
  post,
  isEveryKisa,
  postNum,
  isAnnouncement = false,
}: {
  post: SimplePost;
  isEveryKisa: boolean;
  postNum?: number;
  isAnnouncement?: boolean;
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
    <TableRow className={isAnnouncement ? "bg-surface-subtle" : undefined}>
      <TableCell className="text-center">
        {isAnnouncement ? (
          <Badge variant="brand" size="sm">
            공지
          </Badge>
        ) : (
          <span className="type-body-sm text-muted-foreground">{postNum}</span>
        )}
      </TableCell>
      <TableCell>
        <Link
          href={`/posts/${postid}`}
          className={`hover:underline ${
            isAnnouncement
              ? "type-body !font-semibold text-brand-primary"
              : "type-body text-foreground"
          }`}
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

function BoardMobileList({ isEveryKisa, posts, announcements }: ListProps) {
  return (
    <TableMobileList>
      {announcements.map((post) => (
        <BoardMobileRow
          key={post.postid}
          post={post}
          isEveryKisa={isEveryKisa}
          isAnnouncement
        />
      ))}
      {posts.map((post) => (
        <BoardMobileRow
          key={post.postid}
          post={post}
          isEveryKisa={isEveryKisa}
        />
      ))}
    </TableMobileList>
  );
}

function BoardMobileRow({
  post,
  isEveryKisa,
  isAnnouncement = false,
}: {
  post: SimplePost;
  isEveryKisa: boolean;
  isAnnouncement?: boolean;
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
    <TableMobileItem
      className={isAnnouncement ? "bg-surface-subtle" : undefined}
    >
      <Link href={`/posts/${postid}`} className="flex flex-col gap-1">
        <div className="flex items-baseline gap-1">
          {isAnnouncement && (
            <Badge variant="brand" size="sm">
              공지
            </Badge>
          )}
          <span
            className={
              isAnnouncement
                ? "type-body !font-semibold text-brand-primary"
                : "type-body text-foreground"
            }
          >
            {title}
          </span>
          {commentsCount > 0 && (
            <span className="type-body-sm text-error">
              {`[${commentsCount}]`}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 type-caption text-muted-foreground">
          <span>{formatDateOrTime(created)}</span>
          {!isEveryKisa && !anonymous && <span>{fullname}</span>}
          <span>조회 {readCount}</span>
          {isEveryKisa && <span>추천 {likesCount ?? 0}</span>}
        </div>
      </Link>
    </TableMobileItem>
  );
}

function BoardSkeleton() {
  const desktopColCount = 5;

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
            {Array.from({ length: SKELETON_ROW_COUNT }).map((_, rowIdx) => (
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
      <div className="block md:hidden">
        <TableMobileList>
          {Array.from({ length: SKELETON_ROW_COUNT }).map((_, idx) => (
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
