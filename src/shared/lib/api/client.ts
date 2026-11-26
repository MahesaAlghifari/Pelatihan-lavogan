import axios, { type AxiosInstance } from "axios";

import ENV from "@/app/config/env";

export const client: AxiosInstance = axios.create({
  baseURL: ENV.API_URL,

  timeout: ENV.API_TIMEOUT,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },

  withCredentials: false,
});

export default client;