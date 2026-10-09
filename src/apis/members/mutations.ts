// axios POST, PUT, DELETE API calls
// starting with "/members" endpoint
//
// These throw on failure so callers can tell a stale order save (409) from
// other errors.

import client from "@/lib/axios/client";
import {
  AdminBoardEntry,
  AdminBoardYear,
  BoardEntryFields,
  CreateBoardYearBody,
} from "@/types/members";

const auth = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

/**
 * @desc Create an unpublished board year, empty or copied from another year.
 * 409 when the year already exists.
 * @route POST /members/years/
 */
export async function createBoardYear(
  body: CreateBoardYearBody,
  token: string
): Promise<AdminBoardYear> {
  const response = await client.post("/members/years/", body, auth(token));
  return response.data;
}

/**
 * @desc Show a board year on the public page
 * @route POST /members/years/:startYear/publish/
 */
export async function publishBoardYear(
  startYear: number,
  token: string
): Promise<AdminBoardYear> {
  const response = await client.post(
    `/members/years/${startYear}/publish/`,
    {},
    auth(token)
  );
  return response.data;
}

/**
 * @desc Hide a board year from the public page
 * @route POST /members/years/:startYear/unpublish/
 */
export async function unpublishBoardYear(
  startYear: number,
  token: string
): Promise<AdminBoardYear> {
  const response = await client.post(
    `/members/years/${startYear}/unpublish/`,
    {},
    auth(token)
  );
  return response.data;
}

/**
 * @desc Delete an unpublished board year and its entries
 * @route DELETE /members/years/:startYear/
 */
export async function deleteBoardYear(
  startYear: number,
  token: string
): Promise<void> {
  await client.delete(`/members/years/${startYear}/`, auth(token));
}

/**
 * @desc Save the order of a board year's entries. 409 when the year's
 * entries changed since they were loaded.
 * @route PUT /members/years/:startYear/order/
 */
export async function saveBoardOrder(
  startYear: number,
  order: number[],
  token: string
): Promise<AdminBoardYear> {
  const response = await client.put(
    `/members/years/${startYear}/order/`,
    { order },
    auth(token)
  );
  return response.data;
}

/**
 * @desc Add an entry at the end of its tier
 * @route POST /members/years/:startYear/entries/
 */
export async function createBoardEntry(
  startYear: number,
  body: BoardEntryFields,
  token: string
): Promise<AdminBoardEntry> {
  const response = await client.post(
    `/members/years/${startYear}/entries/`,
    body,
    auth(token)
  );
  return response.data;
}

/**
 * @desc Update an entry; a tier change moves it to the end of the new tier
 * @route PUT /members/entries/:boardMemberID/
 */
export async function updateBoardEntry(
  boardMemberID: number,
  body: BoardEntryFields,
  token: string
): Promise<AdminBoardEntry> {
  const response = await client.put(
    `/members/entries/${boardMemberID}/`,
    body,
    auth(token)
  );
  return response.data;
}

/**
 * @desc Delete an entry
 * @route DELETE /members/entries/:boardMemberID/
 */
export async function deleteBoardEntry(
  boardMemberID: number,
  token: string
): Promise<void> {
  await client.delete(`/members/entries/${boardMemberID}/`, auth(token));
}
