import { useState, useEffect, useCallback } from "react";
import { getLikeByUser, getPostLikesCount } from "@/apis/likes/queries";
import { createLike, deleteLike } from "@/apis/likes/mutations";
import { LikeBody, NewLikeBody, DeleteLikeParams } from "@/types/like";
import { UserSession } from "@/lib/next-auth/types";

export type UsePostLikeResult = {
  didLike: boolean | null;
  likeCount: number | null;
  isLoading: boolean;
  error: Error | null;
  like: () => Promise<void>;
  unlike: () => Promise<void>;
};

/**
 * usePostLike
 * Custom hook to manage like status and like count for a post.
 * Handles fetching, liking, and unliking logic, and exposes a standardized API.
 *
 * @param postid - The post's unique identifier
 * @param session - The current user's session (may be null/undefined)
 * @returns {UsePostLikeResult}
 */
export default function usePostLike(
  postid: number | undefined,
  session?: UserSession | null
): UsePostLikeResult {
  // --- State ---
  const [didLike, setDidLike] = useState<boolean | null>(null); // Whether the user liked the post
  const [likeCount, setLikeCount] = useState<number | null>(null); // Total like count
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state for all like actions
  const [error, setError] = useState<Error | null>(null); // Error state

  /**
   * Fetches both the user's like status and the total like count for the post.
   * Called on mount and after like/unlike actions.
   */
  const fetchLikeStatus = useCallback(async () => {
    // If no session or postid, reset state and exit
    if (!session || !postid) {
      setDidLike(null);
      setLikeCount(null);
      setIsLoading(false);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      // Prepare request body for like status
      const body: LikeBody = {
        email: session.user.email,
        target: "post",
      };
      // Fetch like status and like count in parallel
      const [likeRes, countRes] = await Promise.all([
        getLikeByUser(postid, body, session.token),
        getPostLikesCount(postid),
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
  }, [postid, session]);

  // Fetch status on mount and whenever postid/session changes
  useEffect(() => {
    fetchLikeStatus();
  }, [fetchLikeStatus]);

  /**
   * Handles the 'like' action for the post.
   * Calls the API and refreshes the like status/count.
   */
  const like = useCallback(async () => {
    if (!session || !postid) return;
    setIsLoading(true);
    setError(null);
    try {
      const likeBody: NewLikeBody = {
        email: session.user.email,
        target: "post",
      };
      await createLike(postid, likeBody, session.token);
      await fetchLikeStatus(); // Refresh after liking
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [postid, session, fetchLikeStatus]);

  /**
   * Handles the 'unlike' action for the post.
   * Calls the API and refreshes the like status/count.
   */
  const unlike = useCallback(async () => {
    if (!session || !postid) return;
    setIsLoading(true);
    setError(null);
    try {
      const likeBody: DeleteLikeParams = {
        email: session.user.email,
        target: "post",
      };
      await deleteLike(postid, likeBody, session.token);
      await fetchLikeStatus(); // Refresh after unliking
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [postid, session, fetchLikeStatus]);

  // Return a standardized object for easy consumption in UI
  return { didLike, likeCount, isLoading, error, like, unlike };
}
