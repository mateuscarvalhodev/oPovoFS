import { setAuthToken } from "@/shared/api/apiBase";

import * as authApi from "../api/auth-api";
import type { AuthSession, LoginPayload, RegisterPayload } from "../types";
import { getJson, remove, setJson } from "@/shared/lib/storage";

const AUTH_SESSION_KEY = "opovo.auth.session";

export function bootstrapAuth() {
  const session = getSession();
  setAuthToken(session?.token ?? null);
}

export function getSession(): AuthSession | null {
  return getJson<AuthSession>(AUTH_SESSION_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getSession()?.token);
}

export async function register(payload: RegisterPayload) {
  await authApi.register(payload);
}

export async function login(payload: LoginPayload): Promise<AuthSession> {
  const data = await authApi.login(payload);

  const session: AuthSession = { token: data.token, user: data.user };
  setJson(AUTH_SESSION_KEY, session);
  setAuthToken(session.token);

  return session;
}

export async function logout() {
  try {
    await authApi.logout();
  } finally {
    remove(AUTH_SESSION_KEY);
    setAuthToken(null);
  }
}
