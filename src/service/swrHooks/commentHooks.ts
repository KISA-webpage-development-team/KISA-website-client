"use client";

import useSWR, { SWRConfiguration } from "swr";
// import { Post } from "../../model/props/posts";

export function useComment(postid: Number, options?: SWRConfiguration) {
  const { data, error, isLoading } = useSWR(
    postid ? `/comments/${postid}/` : null,
    options
  );

  return {
    comments: data,
    isLoading,
    isError: error,
  };
}
