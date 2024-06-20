"use client";

import useSWR, { SWRConfiguration } from "swr";
import { Post } from "../../model/props/posts";

export function usePost(postid: string, options?: SWRConfiguration) {
  const { data, error, isLoading } = useSWR(
    postid ? `/posts/${postid}/` : null,
    options
  );

  return {
    post: data as Post | null,
    isLoading,
    isError: error,
  };
}
