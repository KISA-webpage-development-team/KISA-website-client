import { useState } from "react";
import { useCourseReviews } from "@/apis/courses/swrHooks";
import { likeReview } from "@/apis/courses/mutations";
import type { Review } from "@/types/course";
import type { CustomAxiosError } from "@/lib/axios/types";

export interface UseReviewsReturn {
  reviews: Review[];
  isLoading: boolean;
  error: CustomAxiosError | undefined;
  handleLike: (reviewid: number) => Promise<void>;
  refreshReviews: () => Promise<void>;
}

export function useReviews(
  courseCode: string,
  token: string | undefined
): UseReviewsReturn {
  const { reviews: fetchedReviews, isLoading, error, refreshReviews } =
    useCourseReviews(courseCode);

  const [optimisticLikes, setOptimisticLikes] = useState<
    Record<number, number>
  >({});

  const reviews: Review[] = fetchedReviews.map((r) => ({
    ...r,
    likesCount:
      optimisticLikes[r.reviewid] !== undefined
        ? optimisticLikes[r.reviewid]
        : r.likesCount,
  }));

  async function handleLike(reviewid: number): Promise<void> {
    if (!token) return;
    const current = reviews.find((r) => r.reviewid === reviewid);
    if (!current) return;
    setOptimisticLikes((prev) => ({
      ...prev,
      [reviewid]: current.likesCount + 1,
    }));
    try {
      await likeReview(courseCode, reviewid, token);
      setOptimisticLikes((prev) => {
        const next = { ...prev };
        delete next[reviewid];
        return next;
      });
    } catch {
      // roll back
      setOptimisticLikes((prev) => ({
        ...prev,
        [reviewid]: current.likesCount,
      }));
    }
  }

  return { reviews, isLoading, error, handleLike, refreshReviews };
}
