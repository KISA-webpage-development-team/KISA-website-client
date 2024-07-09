"use client";

import { SWRConfig } from "@/refactor_src/shared/config";
// import { AxiosConfig } from "@/refactor_src/shared/config";
import { User } from "../../types";
import useSWR from "swr";

// GET

export function useUser(email: string, token: string | null) {
  // user
  // token이 존재할때만 요청 (Conditional Data Fetching)
  const { data, error, isLoading } = SWRConfig.useSWRWithToken<User>(
    `/users/${email}/`,
    token,
    SWRConfig.immutableOption
  );

  return {
    user: data,
    isLoading,
    error: error,
  };
}
