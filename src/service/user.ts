import client from "../config/axios";
import { SimpleUser } from "../model/props/users";

// PATCH
export async function updateUser(
  email: string,
  data: SimpleUser,
  token: string | null
): Promise<boolean> {
  const url = `/users/${email}/`;

  try {
    const response = await client.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return !!response.data;
  } catch (err) {
    console.error(err);
  }
}
