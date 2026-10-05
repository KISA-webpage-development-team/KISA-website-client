// axios POST, PUT, DELETE API calls
// starting with "/carousel" endpoint
//
// These throw on failure (unlike most mutations here) so callers can tell a
// stale order save (409) from other errors.

import client from "@/lib/axios/client";
import {
  AdminCarouselItem,
  CreateCarouselItemBody,
  UpdateCarouselItemBody,
} from "@/types/carousel";

const auth = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

/**
 * @desc Create a live carousel item, placed by the end-date rule
 * @route POST /carousel/
 */
export async function createCarouselItem(
  body: CreateCarouselItemBody,
  token: string
): Promise<AdminCarouselItem> {
  const response = await client.post("/carousel/", body, auth(token));
  return response.data;
}

/**
 * @desc Update a carousel item; imageTempPublicID replaces its image
 * @route PUT /carousel/:carouselItemID/
 */
export async function updateCarouselItem(
  carouselItemID: number,
  body: UpdateCarouselItemBody,
  token: string
): Promise<AdminCarouselItem> {
  const response = await client.put(
    `/carousel/${carouselItemID}/`,
    body,
    auth(token)
  );
  return response.data;
}

/**
 * @desc Archive a live carousel item
 * @route POST /carousel/:carouselItemID/archive/
 */
export async function archiveCarouselItem(
  carouselItemID: number,
  token: string
): Promise<AdminCarouselItem> {
  const response = await client.post(
    `/carousel/${carouselItemID}/archive/`,
    {},
    auth(token)
  );
  return response.data;
}

/**
 * @desc Restore an archived carousel item with a new end date (or none)
 * @route POST /carousel/:carouselItemID/restore/
 */
export async function restoreCarouselItem(
  carouselItemID: number,
  endDate: string | null,
  token: string
): Promise<AdminCarouselItem> {
  const response = await client.post(
    `/carousel/${carouselItemID}/restore/`,
    { endDate },
    auth(token)
  );
  return response.data;
}

/**
 * @desc Remove a carousel item and its image for good
 * @route DELETE /carousel/:carouselItemID/
 */
export async function deleteCarouselItem(
  carouselItemID: number,
  token: string
): Promise<void> {
  await client.delete(`/carousel/${carouselItemID}/`, auth(token));
}

/**
 * @desc Save the order of the live items. 409 when the live set changed
 * since it was loaded.
 * @route PUT /carousel/order/
 */
export async function saveCarouselOrder(
  order: number[],
  token: string
): Promise<AdminCarouselItem[]> {
  const response = await client.put("/carousel/order/", { order }, auth(token));
  return response.data;
}
