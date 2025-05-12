// useComments
// : hook to fetch comments for a post

import { useEffect, useState, useCallback } from "react";

import { getCommentsByPostid } from "@/apis/comments/queries";
import { Comment } from "@/types/comment";
import { HookStatus } from "@/types/hook";

export function useComments(postid: number) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [status, setStatus] = useState<HookStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    setStatus("loading");
    try {
      const comments_res = await getCommentsByPostid(postid);
      setComments(comments_res);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setError(error.message);
    }
  }, [postid]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments, status, error, refreshComments: fetchComments };
}
