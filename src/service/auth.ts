// import useSWR, { SWRConfiguration } from "swr";
// import { fetcherWithToken } from "./swrConfig";
import client from "../config/axios";

// export function useAdmin(
//   email: string,
//   token: string | null,
//   options?: SWRConfiguration
// ) {
//   // email과 token이 모두 null이 아닐때만
//   const { data, error, isLoading } = useSWR(
//     email && token ? [`/auth/isAdmin/${email}`, token] : null,
//     fetcherWithToken,
//     options
//   );

//   console.log("error: ", error);

//   return {
//     isAdmin: !!data as boolean,
//     isLoading,
//     isError: error?.response.status === 401 ? null : error,
//   };
// }

export async function getIsAdmin(email: string, token: string) {
  const url = `/auth/isAdmin/${email}`;
  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.log(error);
  }
}
