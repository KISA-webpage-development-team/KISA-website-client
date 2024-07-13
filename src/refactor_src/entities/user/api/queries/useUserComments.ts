"use client";

import useSWR from "swr";
import { immutableOption } from "@/refactor_src/shared/swr";

// types
import { CustomAxiosError } from "@/refactor_src/shared/axios/types";

// @desc   Fetch comments of a user
// @route  GET /users/:email/comments/
export function useUserComments(email: string, token: string | null) {
  // token이 존재할때만 요청 (Conditional Data Fetching)
  // [NOTE] immutableOption을 추가하므로써 자주 바뀌지 않는 user 데이터의 특성상
  // revalidation을 페이지 새로고침을 제외하고 하지 않도록 설정
  const { data, error, isLoading } = useSWR(
    token ? [`/users/${email}/comments/`, token] : null,
    immutableOption
  );

  return {
    comments: data,
    isLoading,
    error,
  };
}
