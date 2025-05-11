// GoBlueButton for post

import LikeIcon from "@/final_refactor_src/components/icon/LikeIcon";
import usePostLike from "@/features/bulletin-board/hooks/usePostLike";
import { UserSession } from "@/lib/next-auth/types";

type GoBlueButtonProps = {
  postid: number;
  session?: UserSession | null;
  className?: string;
};

export default function GoBlueButton({
  postid,
  session = null,
  className = "",
}: GoBlueButtonProps) {
  const { didLike, likeCount, isLoading, like, unlike } = usePostLike(
    postid,
    session
  );

  const handlePostLike = async () => {
    if (!session?.token) {
      window.alert("로그인이 필요한 기능입니다.");
      window.location.href = "/signin" + "?callbackUrl=" + window.location.href;
      return;
    }
    if (isLoading) return;
    if (didLike) {
      await unlike();
    } else {
      await like();
    }
  };

  return (
    <div className="flex items-center gap-2 h-8 md:h-10">
      <button
        className={`${className} 
    inline-flex items-center justify-center self-center
  px-4 gap-1 h-full
  bg-[#00274c] border border-[#00274c] 
  text-[#ffcb05] text-sm md:text-base
  hover:bg-[#00274c] hover:border-[#ffcb05]
  rounded-md
    `}
        onClick={handlePostLike}
        disabled={isLoading}
      >
        <LikeIcon size="small" fill={didLike} color="maize" />
        <span
          className=" font-bold 
        text-sm md:text-base"
        >
          {didLike ? "취소" : "GO BLUE!"}
        </span>
      </button>

      {likeCount !== null && likeCount > 0 && (
        <span
          className="[#00274c]
    inline-flex items-center justify-center self-center
  px-2 md:px-3 h-full
   border-2 border-[#00274c]
  text-[#00274c] text-sm md:text-lg
  rounded-md font-bold"
        >
          {likeCount}
        </span>
      )}
    </div>
  );
}
