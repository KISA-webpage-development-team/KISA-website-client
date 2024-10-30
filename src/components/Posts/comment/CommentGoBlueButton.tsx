// GoBlueButton component for comments

import { createLike, deleteLike } from "@/apis/likes/mutations";
import LikeIcon from "@/final_refactor_src/components/icon/LikeIcon";
import { DeleteLikeParams, NewLikeBody } from "@/types/like";
import React from "react";

type GoBlueButtonProps = {
  didLike: boolean;
  commentid: number;
  email: string;
  token?: string;
  likes?: number;
  likeBtnStale: boolean;
  setLikeBtnStale: (stale: boolean) => void;
  className?: string;
};

export default function CommentGoBlueButton({
  didLike,
  commentid,
  email,
  token = "",
  likes,
  likeBtnStale,
  setLikeBtnStale,
  className = "",
}: GoBlueButtonProps) {
  const handleCommentLike = async () => {
    if (!token) {
      window.alert("로그인이 필요한 기능입니다.");
      return;
    }

    const likeBody = {
      email: email,
      target: "comment",
    };

    // if didLike is true, then unlike (delete like)
    // if didLike is false, then like (create like)
    try {
      const res = didLike
        ? await deleteLike(commentid, likeBody as DeleteLikeParams, token)
        : await createLike(commentid, likeBody as NewLikeBody, token);

      if (res) {
        // console.log("Success!");
        setLikeBtnStale(!likeBtnStale);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`${className} 
    inline-flex items-center self-center gap-1 
    rounded-md
    `}
    >
      <button onClick={handleCommentLike}>
        <LikeIcon size="small" fill={didLike} />
      </button>
      {(likes > 0 || (likes === 0 && likeBtnStale)) && (
        <span className="text-xs md:text-sm text-michigan-light-blue">
          {likeBtnStale ? likes + 1 : likes}
        </span>
      )}
    </div>
  );
}
