"use client";

// User Page의 모든 api call은 token이 필요하므로, fetcherWithToken을 사용하도록 설정

import { SWRConfig } from "swr";
import { fetcherWithToken } from "../../service/swrConfig";

export default function UserLayout({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcherWithToken,
      }}
    >
      {children}
    </SWRConfig>
  );
}
