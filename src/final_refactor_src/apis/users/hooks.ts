"use client";
// <Users Hooks>
// SWR hooks to make GET API calls
// starting with "/users" endpoint

// [NOTE] GET API Calls are done with SWR library for future extension options
// ---------------------------------------------------------------------------
import useSWR from "swr";
import { immutableOption } from "@/final_refactor_src/lib/swr/options";

// Types
import { User } from "@/final_refactor_src/types/user";
import { CustomAxiosError } from "@/final_refactor_src/lib/axios/types";

// @desc   Fetch user data
// @route  GET /users/:email/
export function useUser(email: string, token: string | null) {
  // [NOTE]
  // - By adding immutableOption,
  // revalidation is disabled for user data that doesn't change frequently,
  // except when the page is refreshed.
  // - token is required for the request

  const { data, error, isLoading } = useSWR<User, CustomAxiosError>(
    token ? [`/users/${email}/`, token] : null,
    immutableOption
  );

  return {
    user: data,
    isLoading,
    error,
  };
}
