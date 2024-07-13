"use client";

import useSWR from "swr";
import { immutableOption } from "@/refactor_src/shared/swr";

// types
import { CustomAxiosError } from "@/refactor_src/shared/axios/types";
import { Post } from "@/refactor_src/entities/post/types";

// @desc   Fetch posts of a user
// @route  GET /users/:email/posts/
export function useUserPosts(email: string, token: string | null) {
  // token이 존재할때만 요청 (Conditional Data Fetching)
  // [NOTE] immutableOption을 추가하므로써 자주 바뀌지 않는 user 데이터의 특성상
  // revalidation을 페이지 새로고침을 제외하고 하지 않도록 설정
  const { data, error, isLoading } = useSWR<any, CustomAxiosError>(
    token ? [`/users/${email}/posts/`, token] : null,
    immutableOption
  );

  return {
    posts: data.posts as Post[],
    isLoading,
    error,
  };
}
