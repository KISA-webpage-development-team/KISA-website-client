// [NOTE]
// This is to prevent the menu from being fetched multiple times when the user scrolls up and down
// 기존의 pocha 훅들과는 다르게 생겼으나, 당황하지 말고 SWR 공식문서를 참고하자
// https://swr.vercel.app/ko

import useSWR from "swr";
import { fetcherWithToken } from "@/lib/swr/fetchers";
import { changeStock } from "@/apis/pocha/mutations";
import { MenuByCategory } from "@/types/pocha";

/**
 * @desc hook to fetch menu of pocha with SWR and existing fetcher
 *
 * Returns `{ menuList, status, error, refetch, updateMenuStock }`. `refetch`
 * is a thin wrapper over SWR's `mutate`. `updateMenuStock` performs an
 * optimistic write of a single row's stock without triggering a
 * round-trip refetch on success; on failure it reconciles via `refetch()`.
 */
const useMenu = (pochaID: number, token: string) => {
  const {
    data: menuList,
    error,
    isLoading,
    mutate,
  } = useSWR<MenuByCategory[]>(
    pochaID && token ? [`/pocha/menu/${pochaID}/`, token] : null,
    fetcherWithToken,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );

  /**
   * Optimistically patch the row's `stock` in the nested
   * `MenuByCategory[]` cache, then issue the mutation. Returns
   * `true` on success, `false` on failure (and reconciles via
   * `refetch()` so the cache returns to server truth).
   */
  const updateMenuStock = async (
    menuID: number,
    quantity: number
  ): Promise<boolean> => {
    const patch = (current: MenuByCategory[] | undefined) => {
      if (!current) return current;
      return current.map((category) => ({
        ...category,
        menusList: category.menusList.map((menu) =>
          menu.menuID === menuID ? { ...menu, stock: quantity } : menu
        ),
      }));
    };

    // Optimistic write — do not revalidate on every keystroke commit.
    await mutate(patch, { revalidate: false });

    try {
      const res = await changeStock({ menuID, quantity });
      if (!res) {
        // Reconcile to server truth on silent failure.
        await mutate();
        return false;
      }
      return true;
    } catch {
      await mutate();
      return false;
    }
  };

  return {
    menuList: menuList as MenuByCategory[],
    status: error ? "error" : isLoading ? "loading" : "success",
    error: error as Error | undefined,
    refetch: () => mutate(),
    updateMenuStock,
  };
};

export default useMenu;
