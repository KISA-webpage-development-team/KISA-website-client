import { useState, useEffect, useCallback } from "react";
import {
  getLikeByUser,
  getPostLikesCount,
  getCommentLikesCount,
} from "@/apis/likes/queries";
import { createLike, deleteLike } from "@/apis/likes/mutations";
import { LikeBody, NewLikeBody, DeleteLikeParams } from "@/types/like";
import { UserSession } from "@/lib/next-auth/types";

export type LikeTargetType = "post" | "comment";

export type UseLikeResult = {
  didLike: boolean | null;
  likeCount: number | null;
  isLoading: boolean;
  error: Error | null;
  like: () => Promise<void>;
  unlike: () => Promise<void>;
};

/**
 * useLike
 * Generic hook to manage like status and like count for a post or comment.
 * Handles fetching, liking, and unliking logic, and exposes a standardized API.
 *
 * @param targetType - "post" or "comment"
 * @param id - The post or comment's unique identifier
 * @param session - The current user's session (may be null/undefined)
 * @returns {UseLikeResult}
 */
export default function useLike(
  targetType: LikeTargetType,
  id: number | undefined,
  session?: UserSession | null
): UseLikeResult {
  const [didLike, setDidLike] = useState<boolean | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch like status and like count
  const fetchStatus = useCallback(async () => {
    if (!session || !id) {
      setDidLike(null);
      setLikeCount(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const body: LikeBody = {
        email: session.user.email,
        target: targetType,
      };

      // Fetch like status and like count in parallel
      const [likeRes, countRes] = await Promise.all([
        getLikeByUser(id, body, session.token),
        targetType === "post"
          ? getPostLikesCount(id)
          : getCommentLikesCount(id),
      ]);

      setDidLike(likeRes?.liked ?? null);
      setLikeCount(countRes?.likesCount ?? null);
    } catch (err) {
      setError(err as Error);
      setDidLike(null);
      setLikeCount(null);
    } finally {
      setIsLoading(false);
    }
  }, [id, session, targetType]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Like action
  const like = useCallback(async () => {
    if (!session || !id) return;
    setIsLoading(true);
    setError(null);

    try {
      const likeBody: NewLikeBody = {
        email: session.user.email,
        target: targetType,
      };

      await createLike(id, likeBody, session.token);
      await fetchStatus();
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [id, session, targetType, fetchStatus]);

  // Unlike action
  const unlike = useCallback(async () => {
    if (!session || !id) return;
    setIsLoading(true);
    setError(null);
    try {
      const likeBody: DeleteLikeParams = {
        email: session.user.email,
        target: targetType,
      };

      await deleteLike(id, likeBody, session.token);
      await fetchStatus();
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [id, session, targetType, fetchStatus]);

  return { didLike, likeCount, isLoading, error, like, unlike };
}
