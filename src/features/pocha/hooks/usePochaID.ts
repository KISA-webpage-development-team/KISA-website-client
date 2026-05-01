"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { getPochaInfo } from "@/apis/pocha/queries";
import { BACKEND_URL } from "@/constants/env";
import { PochaInfo } from "@/types/pocha";
import { HookStatus } from "./types";

const MAX_RETRIES = 2;
const RETRY_INTERVAL_MS = 800;

/**
 * @desc Hook for fetching Pocha ID defensively.
 * 1. Tries to get pochaID from URL searchParams.
 * 2. If unavailable, fetches from the API as fallback.
 *
 * Backed by SWR so all callsites share one cache entry — no duplicate fetches
 * and no per-component "permanent error stick" if a request transiently fails
 * (e.g. MSW worker not yet controlling the page on the very first SW install).
 *
 * `status` stays `"loading"` while SWR retries are still in flight; it only
 * flips to `"error"` once retries are exhausted. This prevents transient
 * first-load failures from triggering the route-segment error boundary.
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

  const [exhausted, setExhausted] = useState(false);

  const { data, error } = useSWR<PochaInfo>(
    swrKey,
    () => getPochaInfo(new Date()),
    {
      revalidateOnFocus: false,
      onErrorRetry: (_err, _key, _config, revalidate, { retryCount }) => {
        if (retryCount >= MAX_RETRIES) {
          setExhausted(true);
          return;
        }
        setTimeout(() => revalidate({ retryCount }), RETRY_INTERVAL_MS);
      },
      onSuccess: () => {
        setExhausted(false);
      },
    }
  );

  if (urlPochaID) {
    return {
      pochaID: Number(urlPochaID),
      status: "success" as HookStatus,
      error: null as string | null,
    };
  }

  const status: HookStatus = data
    ? "success"
    : error && exhausted
      ? "error"
      : "loading";

  return {
    pochaID: data?.pochaID ?? null,
    status,
    error: status === "error" ? "Failed to retrieve Pocha ID" : null,
  };
};

export default usePochaID;
