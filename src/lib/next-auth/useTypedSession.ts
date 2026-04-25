"use client";

import { useSession } from "next-auth/react";
import { UserSession } from "./types";

/**
 * Typed wrapper around next-auth's useSession that asserts our app-level
 * session shape (UserSession). Centralizes the type assertion so it lives
 * in exactly one place; if next-auth changes signatures, only this file
 * needs updating.
 */
export function useTypedSession() {
  return useSession() as {
    data: UserSession | undefined;
    status: "authenticated" | "unauthenticated" | "loading";
  };
}
