"use client";

// SWR Configuration을 페이지들에 일괄 적용해주는 Provider
// https://swr.vercel.app/docs/global-configuration

// [NOTE] Provider는 CSR이지만, Provider를 감싼 children은 여전히 SSR로 렌더링 될 수 있다

import { SWRConfig } from "swr";
import { fetcher, fetcherWithToken } from "../config";
import { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

// @desc Global SWR Configuration Provider: useSWR without token
export function SWRProvider({ children }: ProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        // onErrorRetry: GlobalOnErrorRetry,
        // (24.07.10 ~) 불필요한 api 콜 재시도를 줄이기 위해 재시도 자체를 안하는 옵션을 사용중
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}

// @desc Global SWR Configuration Provider: useSWR with token
export function SWRTokenProvider({ children }: ProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcherWithToken,
        // onErrorRetry: GlobalOnErrorRetry,
        // (24.07.10 ~) 불필요한 api 콜 재시도를 줄이기 위해 재시도 자체를 안하는 옵션을 사용중
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
