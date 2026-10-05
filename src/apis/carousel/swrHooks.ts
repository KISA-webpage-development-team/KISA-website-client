import useSWR from "swr";

import { fetcherWithToken } from "@/lib/swr/fetchers";
import { CustomAxiosError } from "@/lib/axios/types";
import { AdminCarouselItem, AdminCarouselList } from "@/types/carousel";

export const ADMIN_CAROUSEL_URL = "/carousel/admin/";

/**
 * @desc Live and archived carousel items (admin)
 * @route GET /carousel/admin/
 */
export function useAdminCarousel(token: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR<
    AdminCarouselList,
    CustomAxiosError
  >(token ? [ADMIN_CAROUSEL_URL, token] : null, fetcherWithToken);

  return { carousel: data, isLoading, error, mutate };
}

/**
 * @desc One carousel item (admin), for the edit and use-as-template forms
 * @route GET /carousel/:carouselItemID/
 */
export function useCarouselItem(
  carouselItemID: number | null,
  token: string | undefined
) {
  const { data, error, isLoading } = useSWR<
    AdminCarouselItem,
    CustomAxiosError
  >(
    carouselItemID !== null && token
      ? [`/carousel/${carouselItemID}/`, token]
      : null,
    fetcherWithToken
  );

  return { item: data, isLoading, error };
}
