import axios from "axios";

export const apiBase = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export function setAuthToken(token: string | null) {
  if (token) {
    apiBase.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiBase.defaults.headers.common.Authorization;
  }
}
