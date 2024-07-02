"use client";

import React from "react";
import { SWRConfig } from "swr";
import { fetcher, fetcherWithToken } from "../config/swrConfig";

export const GlobalonErrorRetry = (
  error,
  key,
  config,
  revalidate,
  { retryCount }
) => {
  // 404에서 재시도 안함
  if (error.response.status === 404) return;

  if (error.response.status === 401) return;

  // 특정 키에 대해 재시도 안함
  // if (key === '/api/user') return

  // 10번까지만 재시도함
  if (retryCount >= 10) return;

  // 5초 후에 재시도
  setTimeout(() => revalidate({ retryCount }), 5000);
};

export function SWRTokenProvider({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcherWithToken,
        onErrorRetry: GlobalonErrorRetry,
      }}
    >
      {children}
    </SWRConfig>
  );
}

export default function SWRProvider({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        onErrorRetry: GlobalonErrorRetry,
      }}
    >
      {children}
    </SWRConfig>
  );
}
