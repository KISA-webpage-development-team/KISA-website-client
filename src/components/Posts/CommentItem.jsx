import React, { useState } from "react";
import ImageButton from "../shared/ImageButton";
import ReplyIcon from "../ui/ReplyIcon";
import PencilIcon from "../ui/PencilIcon";
import TrashcanIcon from "../ui/TrashcanIcon";
import CommentEditor from "./CommentEditor";
import { editComment, deleteComment } from "../../service/comment";

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
    <div className="flex flex-col">
      <div className="flex items-center">
        {isCommentOfComment ? (
          <div className="-translate-y-2">
            <ReplyIcon type="flip" />
          </div>
        ) : null}

        {/* Comment contents */}
        <div className="flex items-center justify-between w-full ml-2">
          <div className="flex flex-col">
            <div className="flex items-center">
              {/* need to change fullname to fullname's username */}
              <p className="text-black font-bold text-sm mr-4">{fullname}</p>
              <p className="text-gray-500 text-sm">{created}</p>
            </div>
            <div className={`${isAuthor && "text-blue-500"} pb-3`}>{text}</div>
          </div>
          {/* Right Buttons */}
          <div className="flex gap-2">
            {isAuthor && (
              <>
                <ImageButton
                  text={`${openCommentEditor ? "닫기" : "수정"}`}
                  icon={<PencilIcon color="gray" />}
                  onClick={handleOpenCommentEditor}
                />
                <ImageButton
                  icon={<TrashcanIcon color="gray" />}
                  text={"삭제"}
                  onClick={handleCommentDelete}
                />
              </>
            )}
            <ImageButton
              icon={<ReplyIcon />}
              text={`${openReplyEditor ? "닫기" : "답글"}`}
              onClick={handleOpenReplyEditor}
            />
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
          <div key={subComment.commentid} className="ml-8">
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
