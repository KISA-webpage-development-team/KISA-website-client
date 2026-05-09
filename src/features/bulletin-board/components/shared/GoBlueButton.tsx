// GoBlueButton for post

import { usePathname } from "next/navigation";
import { Button, toast } from "@umichkisa-ds/web";

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
  const pathname = usePathname();
  const { didLike, likeCount, isLoading, like, unlike } = useLike(
    targetType,
    id,
    session,
  );

  const handleLike = async () => {
    if (!session?.token) {
      toast.error("로그인이 필요한 기능입니다.", {
        action: {
          label: "로그인",
          onClick: () => {
            window.location.href = `/signin?callbackUrl=${encodeURIComponent(
              pathname ?? "/",
            )}`;
          },
        },
      });
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
      // Post UI: prominent CTA button with text label + adjacent count chip
      return (
        <div className={`${className} flex items-center gap-2`}>
          <Button
            variant="primary"
            size="sm"
            onClick={handleLike}
            disabled={isLoading}
          >
            <LikeIcon size="small" fill={didLike} color="maize" />
            <span>{didLike ? "취소" : "GO BLUE!"}</span>
          </Button>

          {likeCount !== null && likeCount > 0 && (
            <span className="inline-flex items-center justify-center rounded-md border border-brand-primary px-4 py-2 type-body-sm text-brand-primary">
              {likeCount}
            </span>
          )}
        </div>
      );
    case "comment":
      // Comment UI: compact icon button + small count
      return (
        <div className={`${className} inline-flex items-center gap-1`}>
          <Button
            variant="tertiary"
            size="sm"
            onClick={handleLike}
            disabled={isLoading}
            aria-label={didLike ? "좋아요 취소" : "좋아요"}
            aria-pressed={didLike ?? undefined}
          >
            <LikeIcon size="small" fill={didLike} />
            {likeCount !== null && likeCount > 0 && (
              <span className="text-foreground">{likeCount}</span>
            )}
          </Button>
        </div>
      );
    default:
      return null;
  }
}
