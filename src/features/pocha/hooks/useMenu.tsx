// [NOTE]
// This is to prevent the menu from being fetched multiple times when the user scrolls up and down
// 기존의 pocha 훅들과는 다르게 생겼으나, 당황하지 말고 SWR 공식문서를 참고하자
// https://swr.vercel.app/ko

import useSWR from "swr";
import { fetcherWithToken } from "@/lib/swr/fetchers";
import { MenuByCategory } from "@/types/pocha";

/**
 * @desc hook to fetch menu of pocha with SWR and existing fetcher
 *
 * Returns `{ menuList, status, error, refetch }` to match the surface of
 * `usePocha`. `refetch` is a thin wrapper over SWR's `mutate` for the
 * current key; callers can invoke it without knowing SWR cache keys.
 */
const useMenu = (pochaID: number, token: string) => {
  const {
    data: menuList,
    error,
    isLoading,
    mutate,
  } = useSWR(
    pochaID && token ? [`/pocha/menu/${pochaID}/`, token] : null,
    fetcherWithToken,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );

  return {
    menuList: menuList as MenuByCategory[],
    status: error ? "error" : isLoading ? "loading" : "success",
    error: error as Error | undefined,
    refetch: () => mutate(),
  };
};

export default useMenu;
