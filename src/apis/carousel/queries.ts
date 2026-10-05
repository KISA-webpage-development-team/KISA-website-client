// axios GET API calls
// starting with "/carousel" endpoint

import client from "@/lib/axios/client";
import { AdminCarouselItem, CarouselItem } from "@/types/carousel";

/**
 * @desc Live carousel items in display order. Returns [] when the request
 * fails, so the home page hides the carousel instead of erroring.
 * @route GET /carousel/
 */
export async function getCarouselItems(): Promise<CarouselItem[]> {
  try {
    const response = await client.get<CarouselItem[]>("/carousel/");
    return response.data ?? [];
  } catch (error) {
    console.error("[getCarouselItems] failed to load the carousel", error);
    return [];
  }
}

/**
 * @desc One carousel item (admin)
 * @route GET /carousel/:carouselItemID/
 */
export async function getCarouselItem(
  carouselItemID: number,
  token: string
): Promise<AdminCarouselItem> {
  const response = await client.get<AdminCarouselItem>(
    `/carousel/${carouselItemID}/`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}
