import client from "../config/axios";

export const fetcherWithToken = ([url, token]) =>
  client
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const fetcher = (url) => {
  // TEST revlaidation here
  // console.log("url: ", url);
  try {
    return client.get(url).then((res) => res.data);
  } catch (error) {
    throw error;
  }
};
