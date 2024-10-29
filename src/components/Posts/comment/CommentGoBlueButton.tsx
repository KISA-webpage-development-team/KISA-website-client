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
  className?: string;
};

export default function CommentGoBlueButton({
  didLike,
  commentid,
  email,
  token = "",
  likes = 3,
  className = "",
}: GoBlueButtonProps) {
  const handleCommentLike = async () => {
    const likeBody = {
      email: email,
      target: "post",
    };

    // if didLike is true, then unlike (delete like)
    // if didLike is false, then like (create like)
    try {
      const res = didLike
        ? await deleteLike(commentid, likeBody as DeleteLikeParams, token)
        : await createLike(commentid, likeBody as NewLikeBody, token);

      if (res) {
        console.log("Success!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className={`${className} 
    inline-flex items-center self-center gap-1 
    rounded-md
    `}
      onClick={handleCommentLike}
    >
      <LikeIcon size="small" fill={didLike} />
      {likes > 0 && (
        <span className="text-xs md:text-sm text-michigan-light-blue">
          {likes}
        </span>
      )}
    </button>
  );
}
