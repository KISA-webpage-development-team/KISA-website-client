import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { deleteComment } from "@/apis/comments/mutations";

// sub-ui components
import CommentEditor from "./CommentEditor";

import ImageButton from "../../shared/ImageButton";
import PencilIcon from "../../ui/PencilIcon";
import TrashcanIcon from "../../ui/TrashcanIcon";
import CommentIcon from "../../ui/CommentIcon";
import ReplyIcon from "../../ui/ReplyIcon";
import { UserSession } from "@/lib/next-auth/types";
import { Comment } from "@/types/comment";
import { formatRelativeTime } from "@/utils/formats/date";
import GoBlueButton from "../post-view/GoBlueButton";
import CommentGoBlueButton from "./CommentGoBlueButton";
import { LikeBody } from "@/types/like";
import { getLikeByUser } from "@/apis/likes/queries";

type CommentItemProps = {
  isEveryKisa?: boolean;
  session: UserSession;
  comment: Comment;
  parentCommentid?: number;
  setCommentsStale: (stale: boolean) => void;
  postAuthorEmail: string;
  commentAuthorMap: Map<string, number>;
};

export default function CommentItem({
  isEveryKisa = false,
  session,
  comment,
  parentCommentid = 0,
  setCommentsStale,
  postAuthorEmail,
  commentAuthorMap,
}: CommentItemProps) {
  // TODO: add "didLike" state
  const {
    commentid,
    email,
    postid,
    fullname,
    created,
    text,
    childComments,
    isCommentOfComment,
    anonymous,
    likesCount,
  } = comment;
  // constants for comment item
  const isAuthor = session?.user?.email === email;
  const isPostAuthor = postAuthorEmail === email;
  const token = session?.token;

  // states for reply editor
  const [openReplyEditor, setOpenReplyEditor] = useState(false);
  const [openCommentEditor, setOpenCommentEditor] = useState(false);
  // states for delete comment
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  // states for like
  const [didLike, setDidLike] = useState<boolean | null>(null);
  // stale state for like button to prevent multiple clicks and re-renders
  const [likeBtnStale, setLikeBtnStale] = useState<boolean>(false);

  const handleOpenReplyEditor = () => {
    // session이 존재하지 않으면, 로그인 필수 모달을 띄워야 함
    if (!session) {
      window.alert("로그인이 필요한 기능입니다.");
      return;
    }

    setOpenReplyEditor(!openReplyEditor);
  };

  const handleOpenCommentEditor = () => {
    setOpenCommentEditor(!openCommentEditor);
  };

  const handleCommentDelete = async () => {
    setIsDeleteLoading(true);
    const res = await deleteComment(commentid, token);
    if (res?.success) {
      // modify states after comment has been deleted
      setCommentsStale(true);
      setIsDeleteLoading(false);
    } else {
      // error handling
      console.log("comment deletion failed");
    }
  };

  // fetch like status
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const body = {
          email: session?.user.email,
          target: "comment",
        };

        const res = await getLikeByUser(
          commentid,
          body as LikeBody,
          session?.token
        );
        if (!res) {
          console.log("Failed to fetch like status");
        } else {
          setDidLike(res.liked);
        }
      } catch (error) {
        console.error("Error fetching like status: ", error);
      }
    };

    if (session) {
      fetchLikeStatus();
    }
  }, [postid, session, commentid, likeBtnStale]);

  /**
   * @desc Renders the author of the comment following anonymous logic
   *
   */
  const renderCommentAuthor = () => {
    if (isAuthor || !anonymous) {
      return (
        <Link href={`/users/${email}`}>
          <span className="font-semibold hover:underline">{fullname}</span>
        </Link>
      );
    }

    if (isPostAuthor) {
      return (
        <span className="font-semibold">{`익명${commentAuthorMap.get(
          email
        )}(글쓴이)`}</span>
      );
    }

    return (
      <span className="font-semibold">{`익명${commentAuthorMap.get(
        email
      )}`}</span>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        {isCommentOfComment ? (
          <ReplyIcon type="flip" customClassName="-translate-y-2" />
        ) : null}

        {/* Comment contents */}
        <div
          className={`flex flex-col w-full gap-1 md:gap-0
          ${isCommentOfComment && "pl-2"}`}
        >
          <div className="flex items-center justify-between">
            {/* 1. Name + Time */}
            <div
              className="flex items-center gap-1 md:gap-2
            text-sm md:text-base"
            >
              {renderCommentAuthor()}
              <p className="text-gray-500">{formatRelativeTime(created)}</p>
            </div>

            {/* 2. Buttons */}
            <div className="flex gap-3">
              {didLike !== null && isEveryKisa && (
                <CommentGoBlueButton
                  didLike={didLike}
                  commentid={commentid}
                  email={session?.user?.email}
                  likes={likesCount}
                  token={session?.token}
                  likeBtnStale={likeBtnStale}
                  setLikeBtnStale={setLikeBtnStale}
                />
              )}
              {isAuthor && (
                <>
                  <ImageButton
                    background="none"
                    text={`${openCommentEditor ? "취소" : "수정"}`}
                    icon={<PencilIcon color="gray" noResize />}
                    onClick={handleOpenCommentEditor}
                  />
                  <ImageButton
                    background="none"
                    icon={<TrashcanIcon color="gray" noResize />}
                    text={"삭제"}
                    onClick={handleCommentDelete}
                  />
                </>
              )}

              <ImageButton
                background="none"
                icon={<CommentIcon color="gray" noResize />}
                text={`${openReplyEditor ? "닫기" : "답글"}`}
                onClick={handleOpenReplyEditor}
              />
            </div>
          </div>
          {/* 3. Text */}
          <div
            className={`${
              isAuthor && "text-blue-500"
            } pt-1 pb-3 text-sm md:text-base
            text-wrap `}
          >
            <span className="">{text}</span>
          </div>
        </div>
      </div>
      {/* Comment Editor from buttons */}
      {/* - Edit Reply */}
      {openCommentEditor && session && (
        <div className="mb-4">
          <CommentEditor
            mode="update"
            session={session}
            commentid={commentid}
            postid={postid}
            curCommentId={commentid}
            placeholder={text}
            setCommentsStale={setCommentsStale}
            setOpenCommentEditor={setOpenCommentEditor}
          />
        </div>
      )}
      {openReplyEditor && session && (
        <div className="ml-8 mb-4 flex items-center gap-4">
          <ReplyIcon type="flip" />
          <CommentEditor
            isEveryKisa={isEveryKisa}
            mode="reply"
            session={session}
            commentid={commentid}
            postid={postid}
            curCommentId={commentid}
            setCommentsStale={setCommentsStale}
            setOpenCommentEditor={setOpenReplyEditor}
          />
        </div>
      )}
      {/* 대댓글 */}
      {childComments &&
        childComments.length > 0 &&
        childComments.map((subComment, idx) => (
          <div
            key={`subComment-${subComment.commentid}`}
            className="ml-3 md:ml-4"
          >
            <CommentItem
              isEveryKisa={isEveryKisa}
              comment={subComment}
              session={session}
              parentCommentid={commentid}
              setCommentsStale={setCommentsStale}
              postAuthorEmail={postAuthorEmail}
              commentAuthorMap={commentAuthorMap}
            />
          </div>
        ))}
    </div>
  );
}
