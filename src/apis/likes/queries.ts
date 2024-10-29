import client from "@/lib/axios/client";

type Token = string | undefined;

/**
 * @desc Get whether the user liked the post/comment  or not
 * @route POST /likes/{id}/
 * @example
 */
export async function getLikeByUser(
  id: number,
  body: { email: string; target: "post" | "comment" },
  token: Token
) {
  const url = `/likes/${id}/`;
  try {
    const response = await client.post(url, body, {
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
