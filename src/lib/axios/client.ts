import { BACKEND_URL } from "@/constants/env";
import axios, { Axios } from "axios";

console.log(`Setting up to use ${BACKEND_URL} backend`);

const client: Axios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
