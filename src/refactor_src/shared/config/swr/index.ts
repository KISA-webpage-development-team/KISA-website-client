import useSWR, { SWRConfiguration } from "swr";
import { AxiosConfig } from "..";

// util 느낌이고
const fetcherWithToken = ([url, token]) =>
  AxiosConfig.client
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

// 이건 뭐지? config? option? util?
const immutableOption = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: false,
};

// custom hook 느낌이고
function useSWRWithToken<T>(
  url: string,
  token: string | null,
  options: SWRConfiguration
): { data: T; error: Error; isLoading: boolean } {
  return useSWR(token ? [url, token] : null, fetcherWithToken, options);
}

export { fetcherWithToken, immutableOption, useSWRWithToken };
