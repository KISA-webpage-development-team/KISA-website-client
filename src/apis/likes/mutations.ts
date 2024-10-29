import client from "@/lib/axios/client";

type Token = string | undefined;
/**
 * @desc create a like on post or comment
 * @route POST /likes/{id}/
 */
export async function createLike(
  id: number,
  body: { email: string; target: "posts" | "comments" },
  token: Token
) {
  // TODO: separate body type to "types" folder
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

/**
 * @desc delete a like on post or comment
 * @route DELETE /likes/{id}/
 * @example
 */
export async function deleteLike(id: number, token: Token) {
  const url = `/likes/${id}/`;
  try {
    const response = await client.delete(url, {
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
