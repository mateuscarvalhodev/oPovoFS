import { apiBase } from "@/shared/api/apiBase";
import type { LoginPayload, LoginResponse, RegisterPayload } from "../types";

export async function register(payload: RegisterPayload) {
  await apiBase.post("/register", payload);
}

export async function login(payload: LoginPayload) {
  const { data } = await apiBase.post<LoginResponse>("/login", payload);
  return data;
}

export async function logout() {
  await apiBase.post("/logout");
}
