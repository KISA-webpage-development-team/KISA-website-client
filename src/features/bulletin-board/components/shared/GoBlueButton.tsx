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
            <span className="inline-flex !font-sejong-bold items-center justify-center rounded-md border border-brand-primary px-3 py-1.5 type-body-sm text-brand-primary !font-semibold">
              {likeCount}
            </span>
          )}
        </div>
      );
    case "comment":
      // Comment UI: compact 28×28 icon button + adjacent count.
      // Plain <button> (not DS Button) so it lines up with neighboring
      // icon-only action buttons in the comment action row.
      return (
        <div className={`${className} inline-flex items-center gap-1`}>
          <button
            type="button"
            onClick={handleLike}
            disabled={isLoading}
            aria-label={didLike ? "좋아요 취소" : "좋아요"}
            aria-pressed={didLike ?? undefined}
            className="inline-flex p-1 gap-1 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-michigan-blue disabled:cursor-not-allowed"
          >
            <LikeIcon size="small" fill={didLike} />
            {likeCount !== null && likeCount > 0 && (
              <span className="type-body-sm text-foreground">{likeCount}</span>
            )}
          </button>
        </div>
      );
    default:
      return null;
  }
}
