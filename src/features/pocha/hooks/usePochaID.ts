"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { getPochaInfo } from "@/apis/pocha/queries";
import { BACKEND_URL } from "@/constants/env";
import { PochaInfo } from "@/types/pocha";
import { HookStatus } from "./types";

/**
 * @desc Hook for fetching Pocha ID defensively.
 * 1. Tries to get pochaID from URL searchParams.
 * 2. If unavailable, fetches from the API as fallback.
 *
 * Backed by SWR with a daily-stable cache key so all callsites share one
 * fetch (dashboard page + MockAuthToggle, etc.).
 */
const usePochaID = () => {
  const searchParams = useSearchParams();
  const urlPochaID = searchParams.get("pochaid");

  // Daily-stable cache key. Using a fresh `new Date()` per render would defeat
  // SWR de-dup; bucket by day instead — the status-info endpoint is coarse
  // enough that this is fine for both dev mocks and prod.
  const dayKey = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }, []);

  // Include BACKEND_URL so a mock-mode toggle (or env switch) cannot serve a
  // stale cache entry from the previous backend.
  const swrKey = urlPochaID
    ? null
    : (["pocha-info", BACKEND_URL, dayKey] as const);

  const { data, error } = useSWR<PochaInfo | null>(
    swrKey,
    () => getPochaInfo(new Date()),
    { revalidateOnFocus: false }
  );

  if (urlPochaID) {
    return {
      pochaID: Number(urlPochaID),
      status: "success" as HookStatus,
      error: null as string | null,
      noPocha: false,
    };
  }

  // SWR: `data === null` is a real success value (204 — no ongoing pocha),
  // distinct from `data === undefined` (still loading). Treat null as success
  // and surface it via `noPocha` so callers can render an empty-state UI.
  const isNoPocha = data === null;
  const hasData = data !== undefined && data !== null;
  const status: HookStatus = hasData || isNoPocha ? "success" : error ? "error" : "loading";

  return {
    pochaID: data?.pochaID ?? null,
    status,
    error: status === "error" ? "Failed to retrieve Pocha ID" : null,
    noPocha: isNoPocha,
  };
};

export default usePochaID;
