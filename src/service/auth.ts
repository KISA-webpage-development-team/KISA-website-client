import client from "../config/axios";

export async function getIsAdmin(email: string, token: string) {
  const url = `/auth/isAdmin/${email}`;
  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    // console.log(error);
  }
}
