import axios from "axios";

export const apiBase = axios.create({
  baseURL: import.meta.env.BASE_URL,
});
