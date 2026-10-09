import useSWR from "swr";

import { fetcherWithToken } from "@/lib/swr/fetchers";
import { CustomAxiosError } from "@/lib/axios/types";
import { AdminBoardYear } from "@/types/members";

export const ADMIN_BOARD_URL = "/members/admin/";

/**
 * @desc Every board year, newest first, published or not (admin)
 * @route GET /members/admin/
 */
export function useAdminBoard(token: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR<
    AdminBoardYear[],
    CustomAxiosError
  >(token ? [ADMIN_BOARD_URL, token] : null, fetcherWithToken);

  return { years: data, isLoading, error, mutate };
}
