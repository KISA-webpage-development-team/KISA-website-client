"use client";

/**
 * UserActivityBoard — pill-tabs view of the user's posts and comments.
 *
 * The Tabs compound (Tabs/TabsList/TabsTrigger/TabsContent) is co-located in
 * this file per the DS rule against splitting compounds across files.
 * The actual desktop/mobile renderers (UserPostsTable / UserCommentsTable /
 * their mobile equivalents) live as siblings and are pure presentational.
 */

import {
  Skeleton,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableMobileItem,
  TableMobileList,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@umichkisa-ds/web";
import Link from "next/link";

import { useUserComments, useUserPosts } from "@/apis/users/swrHooks";
import type { UserBoardPost } from "@/types/post";
import type { Comment } from "@/types/comment";
import { formatDateOrTime, formatRelativeTime } from "@/utils/formats/date";
import { getKoreanBoardType } from "@/utils/formats/boardType";

type UserActivityBoardProps = {
  email: string;
  token: string;
};

const POSTS_HEADERS = ["제목", "게시판", "작성일", "조회"] as const;
const COMMENTS_HEADERS = ["내용", "작성일"] as const;
const SKELETON_ROW_COUNT = 4;

export default function UserActivityBoard({
  email,
  token,
}: UserActivityBoardProps) {
  // Warm both SWR caches in parallel so switching tabs is instant.
  // Children read from the same SWR keys (deduped) — no extra requests.
  useUserPosts(email, token);
  useUserComments(email, token);

  return (
    <Tabs defaultValue="posts" variant="pill">
      <TabsList variant="pill">
        <TabsTrigger value="posts" variant="pill">
          게시물
        </TabsTrigger>
        <TabsTrigger value="comments" variant="pill">
          댓글
        </TabsTrigger>
      </TabsList>

      <TabsContent value="posts">
        <PostsPanel email={email} token={token} />
      </TabsContent>

      <TabsContent value="comments">
        <CommentsPanel email={email} token={token} />
      </TabsContent>
    </Tabs>
  );
}

// --- Posts panel ----------------------------------------------------------

function PostsPanel({ email, token }: { email: string; token: string }) {
  const { posts, isLoading, error } = useUserPosts(email, token);

  if (isLoading) return <PostsTableScaffold isLoading />;

  if (error) {
    return (
      <p className="type-body-sm text-muted-foreground py-6 text-center">
        게시물을 불러오지 못했습니다.
      </p>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <p className="type-body-sm text-muted-foreground py-6 text-center">
        아직 게시물이 없습니다.
      </p>
    );
  }

  return <PostsTableScaffold rows={posts} isLoading={false} />;
}

function PostsTableScaffold({
  rows,
  isLoading,
}: {
  rows?: UserBoardPost[];
  isLoading: boolean;
}) {
  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableCaption className="sr-only">사용자 게시물 목록</TableCaption>
          <TableHeader>
            <TableRow>
              {POSTS_HEADERS.map((h) => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: SKELETON_ROW_COUNT }).map((_, rIdx) => (
                  <TableRow key={`posts-skel-${rIdx}`}>
                    {POSTS_HEADERS.map((_h, cIdx) => (
                      <TableCell key={`posts-skel-${rIdx}-${cIdx}`}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : (rows ?? []).map(
                  ({ postid, title, type, created, readCount }) => (
                    <TableRow key={postid}>
                      <TableCell>
                        <Link
                          href={`/posts/${postid}`}
                          className="text-link hover:underline"
                        >
                          {title}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {getKoreanBoardType(type)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDateOrTime(created)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {readCount}
                      </TableCell>
                    </TableRow>
                  )
                )}
          </TableBody>
        </Table>
      </div>

      <div className="block md:hidden">
        <TableMobileList>
          {isLoading
            ? Array.from({ length: SKELETON_ROW_COUNT }).map((_, rIdx) => (
                <TableMobileItem key={`posts-mskel-${rIdx}`}>
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </TableMobileItem>
              ))
            : (rows ?? []).map(
                ({ postid, title, type, created, readCount }) => (
                  <TableMobileItem key={`posts-m-${postid}`}>
                    <Link
                      href={`/posts/${postid}`}
                      className="type-body text-foreground hover:underline"
                    >
                      {title}
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="type-caption text-muted-foreground">
                        {`${getKoreanBoardType(type)} · 조회 ${readCount}`}
                      </span>
                      <span className="type-caption text-muted-foreground">
                        {formatRelativeTime(created)}
                      </span>
                    </div>
                  </TableMobileItem>
                )
              )}
        </TableMobileList>
      </div>
    </>
  );
}

// --- Comments panel -------------------------------------------------------

function CommentsPanel({ email, token }: { email: string; token: string }) {
  const { comments, isLoading, error } = useUserComments(email, token);

  if (isLoading) return <CommentsTableScaffold isLoading />;

  if (error) {
    return (
      <p className="type-body-sm text-muted-foreground py-6 text-center">
        댓글을 불러오지 못했습니다.
      </p>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <p className="type-body-sm text-muted-foreground py-6 text-center">
        아직 댓글이 없습니다.
      </p>
    );
  }

  return <CommentsTableScaffold rows={comments} isLoading={false} />;
}

function CommentsTableScaffold({
  rows,
  isLoading,
}: {
  rows?: Comment[];
  isLoading: boolean;
}) {
  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableCaption className="sr-only">사용자 댓글 목록</TableCaption>
          <TableHeader>
            <TableRow>
              {COMMENTS_HEADERS.map((h) => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: SKELETON_ROW_COUNT }).map((_, rIdx) => (
                  <TableRow key={`comments-skel-${rIdx}`}>
                    {COMMENTS_HEADERS.map((_h, cIdx) => (
                      <TableCell key={`comments-skel-${rIdx}-${cIdx}`}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : (rows ?? []).map(({ commentid, postid, text, created }) => (
                  <TableRow key={commentid}>
                    <TableCell>
                      <Link
                        href={`/posts/${postid}`}
                        className="text-link hover:underline"
                      >
                        {text}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDateOrTime(created)}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      <div className="block md:hidden">
        <TableMobileList>
          {isLoading
            ? Array.from({ length: SKELETON_ROW_COUNT }).map((_, rIdx) => (
                <TableMobileItem key={`comments-mskel-${rIdx}`}>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-1/3" />
                </TableMobileItem>
              ))
            : (rows ?? []).map(({ commentid, postid, text, created }) => (
                <TableMobileItem key={`comments-m-${commentid}`}>
                  <Link
                    href={`/posts/${postid}`}
                    className="type-body text-foreground hover:underline"
                  >
                    {text}
                  </Link>
                  <span className="type-caption text-muted-foreground">
                    {formatRelativeTime(created)}
                  </span>
                </TableMobileItem>
              ))}
        </TableMobileList>
      </div>
    </>
  );
}
