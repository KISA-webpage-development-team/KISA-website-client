import React, { useEffect, useState } from "react";
import PostTitleBar from "./PostTitleBar";
import PostOwnerBar from "./PostOwnerBar";
import PostContent from "./PostContent";
import HorizontalDivider from "../shared/HorizontalDivider";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ImageButton from "../shared/ImageButton";
import PencilIcon from "../ui/PencilIcon";
import ListIcon from "../ui/ListIcon";
import CommentEditor from "./CommentEditor";
import CommentsList from "./CommentsList";
import { getCommentsByPostid } from "../../service/comment";
import { incrementReadCount } from "../../service/post";

// for view count
import cookieCutter from "@boiseitguru/cookie-cutter";

// currently, comments are not implemented
export default function PostView({ boardType, post, postid }) {
  const route = useRouter();
  const { data: session, status } = useSession();
  const [comments, setComments] = useState([]);
  const [commentsStale, setCommentsStale] = useState(true);
  const [openCommentEditor, setOpenCommentEditor] = useState(false);

  // fetch comments
  useEffect(() => {
    const getComments = async () => {
      const comments_res = await getCommentsByPostid(postid);
      setComments(comments_res);
      setCommentsStale(false);
      return;
    };

    getComments();
  }, [commentsStale, postid]);

  // view count logic
  useEffect(() => {
    const incrementRead = async () => {
      const readCount = cookieCutter.get(postid);
      const oneDayLater = new Date();
      oneDayLater.setDate(oneDayLater.getDate() + 1);
      if (readCount === undefined && status === "authenticated") {
        // console.log("incrementing read count");
        const res = await incrementReadCount(postid, session?.token);
        if (!res) return;
      }
      cookieCutter.set(postid, "true", {
        expires: oneDayLater,
        sameSite: "strict",
      });
    };
    incrementRead();
  }, [postid]);

  const OnClickBackToList = () => {
    //  need to change this to just "go back"
    route.push(`/boards/${post.type}`);
  };

  const onClickPostUpdate = () => {
    route.push(`/posts/update/${post.postid}`);
  };

  const onClickPostDelete = () => {
    const formattedTitle = post.title.replace("/", "-");

    route.push(`/posts/delete/${boardType}/${formattedTitle}/${post.postid}`);
  };

  const onClickPostComment = () => {
    setOpenCommentEditor(!openCommentEditor);
  };

  return (
    <div className="flex flex-col">
      {/* 1. Post Title Bar: title + created */}
      <div className="flex flex-col gap-2 py-2 md:py-3">
        <PostTitleBar isAnnouncement={post.isAnnouncement} title={post.title} />
        {/* 2. Post Owner bar: Owner + created + readCount (+ 추천수, 댓글수 등) */}
        <PostOwnerBar
          email={post.email}
          fullname={post.fullname}
          created={post.created}
          readCount={post.readCount}
          commentsCount={post.commentsCount}
        />
      </div>

      <HorizontalDivider />

      {/* 3. PostContent: text */}
      <PostContent text={post.text} />
      {/* 4. 수정 + 삭제 버튼 */}
      {session?.user.email === post.email && (
        <div className="flex items-center py-1 justify-end gap-2">
          <ImageButton
            icon={<PencilIcon color="gray" />}
            text="수정"
            onClick={onClickPostUpdate}
          />
          <ImageButton
            icon={<PencilIcon color="gray" />}
            text="삭제"
            onClick={onClickPostDelete}
          />
        </div>
      )}

      {/* 5. 게시판 목록으로 가는 버튼 */}
      <div
        className={`flex
        ${
          status === "authenticated" &&
          !post.isAnnouncement &&
          boardType !== "announcement"
            ? "justify-between"
            : "justify-end"
        }
      mt-5`}
      >
        {status === "authenticated" &&
          !post.isAnnouncement &&
          boardType !== "announcement" && (
            <ImageButton
              icon={<PencilIcon color="gray" />}
              text={`${openCommentEditor ? "댓글 취소" : "댓글 쓰기"}`}
              onClick={onClickPostComment}
            />
          )}

        <ImageButton
          icon={<ListIcon />}
          text="목록"
          onClick={OnClickBackToList}
        />
      </div>

      {openCommentEditor && (
        <CommentEditor
          postid={post.postid}
          setCommentsStale={setCommentsStale}
          setOpenCommentEditor={setOpenCommentEditor}
        />
      )}

      {/* 6. comments list */}
      {!commentsStale && (
        <>
          <div className="pt-6 pb-3">
            <HorizontalDivider />
          </div>
          {!post?.isAnnouncement && boardType !== "announcement" && (
            <CommentsList
              commentsCount={post.commentsCount}
              comments={comments}
              setCommentsStale={setCommentsStale}
            />
          )}
        </>
      )}

      {/* 7. 이전글 다음글 navigation buttons [NOT IMPLEMENTED] */}
    </div>
  );
}
