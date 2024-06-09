// user api testing with swr

import axios from "axios";
import { backendUrl } from "../../config/backendUrl";
import { User } from "next-auth";
import useSWR from "swr";

type UserData = User | null;

const userInfoFetcher = ([url, token]): Promise<UserData> =>
  axios
    .get(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });

export function useUser(email: string, token: string | null) {
  // token이 주어지지 않았다면 fetch를 하지 않는다
  const { data, error, isLoading } = useSWR(
    token ? [`${backendUrl}/users/${email}/`, token] : null,
    {
      fetcher: userInfoFetcher,
    }
  );
  console.log("data: ", data);
  return {
    user: data,
    isLoading,
    isError: error,
  };
}
