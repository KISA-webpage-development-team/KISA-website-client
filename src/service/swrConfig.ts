import axios from "axios";
import { backendUrl } from "../config/backendUrl";

export const fetcherWithToken = ([url, token]) =>
  axios
    .get(`${backendUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });

export const fetcher = (url) =>
  axios
    .get(`${backendUrl}${url}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
