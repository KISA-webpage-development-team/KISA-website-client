// GoBlueButton for post

import LikeIcon from "@/components/ui/icon/LikeIcon";
import useLike, {
  LikeTargetType,
} from "@/features/bulletin-board/hooks/useLike";
import { UserSession } from "@/lib/next-auth/types";

interface GoBlueButtonProps {
  targetType: LikeTargetType;
  id: number;
  session?: UserSession | null;
  className?: string;
}

export default function GoBlueButton({
  targetType,
  id,
  session = null,
  className = "",
}: GoBlueButtonProps) {
  const { didLike, likeCount, isLoading, like, unlike } = useLike(
    targetType,
    id,
    session
  );

  const handleLike = async () => {
    if (!session?.token) {
      window.alert("로그인이 필요한 기능입니다.");
      if (targetType === "post") {
        window.location.href =
          "/signin" + "?callbackUrl=" + window.location.href;
      }
      return;
    }
    if (isLoading) return;

    if (didLike) {
      await unlike();
    } else {
      await like();
    }
  };

  switch (targetType) {
    case "post":
      // Post UI: large button with text and count
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
            onClick={handleLike}
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
    case "comment":
      // Comment UI: compact icon button and count
      return (
        <div
          className={`${className} 
      inline-flex items-center self-center gap-1 
      rounded-md
      `}
        >
          <button
            onClick={handleLike}
            className={`disabled:cursor-not-allowed`}
            disabled={isLoading}
          >
            <LikeIcon size="small" fill={didLike} />
          </button>
          {likeCount !== null && likeCount > 0 && (
            <span className="text-xs md:text-sm text-michigan-light-blue">
              {likeCount}
            </span>
          )}
        </div>
      );
    default:
      return null;
  }
}
