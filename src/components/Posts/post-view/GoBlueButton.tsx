import LikeIcon from "@/final_refactor_src/components/icon/LikeIcon";
import React from "react";

type GoBlueButtonProps = {
  didLike: boolean;
  email: string;
  target: string;
  className?: string;
};

export default function GoBlueButton({
  didLike,
  email,
  target,
  className = "",
}: GoBlueButtonProps) {
  const handleLike = () => {
    const likeBody = {
      email: email,
      target: target,
    };

    // if didLike is true, then unlike (delete like)
    if (didLike) {
      // unlike
      // [TODO]: implement unlike
    }

    // if didLike is false, then like (create like)
    else {
      // like
      // [TODO]: implement like
    }
  };
  return (
    <button
      className={`${className} 
    inline-flex items-center self-center gap-1 
    border-michigan-dark-maize border-2 px-2 py-1 rounded-md`}
      onClick={handleLike}
    >
      <LikeIcon />
      <span className="text-michigan-light-blue font-bold text-lg">
        GO BLUE!
      </span>
    </button>
  );
}
