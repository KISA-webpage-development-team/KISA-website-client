import React, { useState } from "react";
import ImageButton from "../shared/ImageButton";
import ReplyIcon from "../ui/ReplyIcon";
import PencilIcon from "../ui/PencilIcon";
import TrashcanIcon from "../ui/TrashcanIcon";
import CommentEditor from "./CommentEditor";
import { editComment, deleteComment } from "../../service/comment";

import { timeForToday } from "../../utils/dateFormatter";
import HorizontalDivider from "../shared/HorizontalDivider";

export default function CommentItem({
  commentid,
  postid,
  isAuthor,
  fullname,
  created,
  text,
  childComments,
  isCommentOfComment,
  parentCommentid = 0,
  useremail,
  setCommentsStale,
}) {
  const [openReplyEditor, setOpenReplyEditor] = useState(false);
  const [openCommentEditor, setOpenCommentEditor] = useState(false);

  const handleOpenReplyEditor = () => {
    setOpenReplyEditor(!openReplyEditor);
  };

  const handleOpenCommentEditor = () => {
    setOpenCommentEditor(!openCommentEditor);
  };

  const handleCommentDelete = async () => {
    console.log("Comment delete has been clicked");
    const res = await deleteComment(commentid);
    if (res) {
      // modify states after comment has been deleted
      setCommentsStale(true);
    } else {
      // error handling
      console.log("comment deletion failed");
    }
  };

  return (
    <div className="flex flex-col pt-2">
      <div className="flex items-center">
        {isCommentOfComment ? (
          <div className="-translate-y-2 mr-4">
            <ReplyIcon type="flip" />
          </div>
        ) : null}

        {/* Comment contents */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col w-full gap-1 md:gap-0">
            <div className="flex items-center justify-between">
              {/* need to change fullname to fullname's username */}
              <div
                className="flex items-center gap-1 md:gap-2
              text-xs md:text-base"
              >
                <p className="text-black font-semibold">{fullname}</p>
                <p className="text-gray-500">{timeForToday(created)}</p>
              </div>

              <div className="flex gap-3">
                {isAuthor && (
                  <>
                    <ImageButton
                      background="none"
                      text={`${openCommentEditor ? "닫기" : "수정"}`}
                      icon={<PencilIcon color="gray" />}
                      onClick={handleOpenCommentEditor}
                    />
                    <ImageButton
                      background="none"
                      icon={<TrashcanIcon color="gray" />}
                      text={"삭제"}
                      onClick={handleCommentDelete}
                    />
                  </>
                )}
                <ImageButton
                  background="none"
                  icon={<ReplyIcon />}
                  text={`${openReplyEditor ? "닫기" : "답글"}`}
                  onClick={handleOpenReplyEditor}
                />
              </div>
            </div>
            <div
              className={`${
                isAuthor && "text-blue-500"
              } pb-3 text-xs md:text-base`}
            >
              {text}
            </div>
          </div>
        </div>
      </div>
      {openCommentEditor && (
        <div className="mb-4">
          <CommentEditor
            positd={postid}
            curComment={commentid}
            mode="update"
            setCommentsStale={setCommentsStale}
            setOpenCommentEditor={setOpenCommentEditor}
            commentid={commentid}
            placeholder={text}
          />
        </div>
      )}
      {openReplyEditor && (
        <div className="ml-8 mb-4 flex items-center gap-4">
          <ReplyIcon type="flip" />
          <CommentEditor
            postid={postid}
            curComment={commentid}
            mode="reply"
            setCommentsStale={setCommentsStale}
            commentid={commentid}
            setOpenCommentEditor={setOpenReplyEditor}
          />
        </div>
      )}
      {childComments &&
        childComments.length > 0 &&
        childComments.map((subComment, idx) => (
          <div key={subComment.commentid} className="ml-4">
            <CommentItem
              commentid={subComment.commentid}
              postid={subComment.postid}
              isAuthor={useremail === subComment.email}
              fullname={subComment.fullname}
              created={subComment.created}
              text={subComment.text}
              childComments={subComment.childComments}
              useremail={useremail}
              isCommentOfComment={subComment.isCommentOfComment}
              parentCommentid={commentid}
              setCommentsStale={setCommentsStale}
            />
          </div>
        ))}
    </div>
  );
}
