import { useSyncExternalStore } from "react";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

export const AUTH_SESSION_KEY = "opovo.auth.session";

function safeParse(raw: string | null): AuthSession | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<AuthSession>;

    if (!parsed.token || !parsed.user) return null;
    if (
      parsed.user.id === undefined ||
      !parsed.user.name ||
      !parsed.user.email
    ) {
      return null;
    }

    return {
      token: String(parsed.token),
      user: {
        id: Number(parsed.user.id),
        name: String(parsed.user.name),
        email: String(parsed.user.email),
      },
    };
  } catch {
    return null;
  }
}

let cachedRaw: string | null = null;
let cachedSession: AuthSession | null = null;

function readAuthSessionCached(): AuthSession | null {
  const raw = localStorage.getItem(AUTH_SESSION_KEY);

  if (raw === cachedRaw) return cachedSession;

  cachedRaw = raw;
  cachedSession = safeParse(raw);
  return cachedSession;
}

export function readAuthSession(): AuthSession | null {
  return readAuthSessionCached();
}

export function writeAuthSession(session: AuthSession) {
  const raw = JSON.stringify(session);
  localStorage.setItem(AUTH_SESSION_KEY, raw);

  cachedRaw = raw;
  cachedSession = session;

  window.dispatchEvent(new Event("auth:changed"));
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_SESSION_KEY);

  cachedRaw = null;
  cachedSession = null;

  window.dispatchEvent(new Event("auth:changed"));
}

function subscribe(onStoreChange: () => void) {
  const onAuthChanged = () => onStoreChange();

  const onStorage = (e: StorageEvent) => {
    if (e.key === AUTH_SESSION_KEY) onStoreChange();
  };

  window.addEventListener("auth:changed", onAuthChanged);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener("auth:changed", onAuthChanged);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  return readAuthSessionCached();
}

function getServerSnapshot() {
  return null;
}

export function useAuthSession() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
