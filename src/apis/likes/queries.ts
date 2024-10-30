import client from "@/lib/axios/client";
import { LikeBody } from "@/types/like";

type Token = string | undefined;

/**
 * @desc Get whether the user liked the post/comment  or not
 * @route GET /likes/{id}/
 * @example
 */
export async function getLikeByUser(
  id: number,
  params: LikeBody,
  token: Token
) {
  const url = `/likes/${id}/?email=${params.email}&target=${params.target}`;

  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    //console.error(error);
    return undefined;
  }
}
