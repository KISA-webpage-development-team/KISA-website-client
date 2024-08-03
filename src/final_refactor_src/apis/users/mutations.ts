import client from "@/final_refactor_src/lib/axios/client";
import { UserEditableFields } from "@/final_refactor_src/types/user";

/**
 * @desc updateUser: update user information
 * @params email: string, data: SimpleUser, token: string | null
 * @returns
 */
export async function updateUser(
  email: string,
  data: UserEditableFields,
  token: string | null
): Promise<boolean> {
  const url = `/users/${email}/`;

  try {
    const response = await client.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
}
