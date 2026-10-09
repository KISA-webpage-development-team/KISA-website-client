// axios GET API calls
// starting with "/members" endpoint

import client from "@/lib/axios/client";
import { BoardYear } from "@/types/members";

/**
 * @desc Published board years, newest first. Returns null when the request
 * fails, so the members page can show an error instead of an empty roster.
 * @route GET /members/
 */
export async function getBoardYears(): Promise<BoardYear[] | null> {
  try {
    const response = await client.get<BoardYear[]>("/members/");
    return response.data ?? [];
  } catch (error) {
    console.error("[getBoardYears] failed to load the board", error);
    return null;
  }
}
