// GoBlueButton for post

import { createLike, deleteLike } from "@/apis/likes/mutations";
import LikeIcon from "@/final_refactor_src/components/icon/LikeIcon";
import { DeleteLikeParams, NewLikeBody } from "@/types/like";
import React from "react";

type GoBlueButtonProps = {
  didLike: boolean;
  postid: number;
  email: string;
  token?: string;
  likes?: number;
  className?: string;
};

export default function GoBlueButton({
  didLike,
  postid,
  email,
  token = "",
  likes = 3,
  className = "",
}: GoBlueButtonProps) {
  const handlePostLike = async () => {
    const likeBody = {
      email: email,
      target: "post",
    };

    // if didLike is true, then unlike (delete like)
    // if didLike is false, then like (create like)
    try {
      const res = didLike
        ? await deleteLike(postid, likeBody as DeleteLikeParams, token)
        : await createLike(postid, likeBody as NewLikeBody, token);

      if (res) {
        console.log("Success!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className={`${className} 
    inline-flex items-center self-center gap-1 
      border-michigan-dark-maize border-2 px-2 py-1 rounded-md
      hover:bg-michigan-maize
    `}
        onClick={handlePostLike}
      >
        <LikeIcon size="small" fill={didLike} />
        <span
          className="text-michigan-light-blue font-bold 
        text-sm md:text-lg"
        >
          {didLike ? "NO BLUE!" : "GO BLUE!"}
        </span>
      </button>

      {likes > 0 && (
        <span
          className="inline-flex items-center justify-center self-center
    px-2 py-1 border-2 rounded-md
    bg-michigan-maize border-michigan-maize
    text-michigan-blue text-sm md:text-lg font-bold"
        >
          {likes}
        </span>
      )}
    </div>
  );
}
