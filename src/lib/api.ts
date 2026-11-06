import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const TOKEN_KEY = "arsalan.auth.token";
const REFRESH_KEY = "arsalan.auth.refresh";
const USER_KEY = "arsalan.auth.user";

export type Role = "CLIENT" | "ADMIN";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

export function getApiBase() {
  return (
    process.env.EXPO_PUBLIC_API_URL ||
    (Constants.expoConfig?.extra as { apiUrl?: string } | undefined)?.apiUrl ||
    "http://localhost:3000"
  );
}

export async function getToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function getRefreshToken() {
  return AsyncStorage.getItem(REFRESH_KEY);
}

export async function getStoredUser(): Promise<AuthUser | null> {
  const raw = await AsyncStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export async function setSession(
  accessToken: string,
  user: AuthUser,
  refreshToken?: string | null,
) {
  await AsyncStorage.setItem(TOKEN_KEY, accessToken);
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  if (refreshToken) {
    await AsyncStorage.setItem(REFRESH_KEY, refreshToken);
  }
}

export async function clearSession() {
  await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_KEY, USER_KEY]);
}

type TokenResponse = {
  ok?: boolean;
  error?: string;
  user?: AuthUser;
  accessToken?: string;
  refreshToken?: string;
  token?: string;
  expiresIn?: number;
};

function pickAccessToken(data: TokenResponse) {
  return data.accessToken || data.token || null;
}

let refreshInFlight: Promise<boolean> | null = null;

/** Rotate tokens via refresh endpoint. Returns false if session must clear. */
export async function refreshAccessToken(): Promise<boolean> {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) return false;

    try {
      const res = await fetch(`${getApiBase()}/api/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      const data = (await res.json().catch(() => ({}))) as TokenResponse;
      if (!res.ok) {
        await clearSession();
        return false;
      }
      const access = pickAccessToken(data);
      if (!access || !data.refreshToken || !data.user) {
        await clearSession();
        return false;
      }
      await setSession(access, data.user, data.refreshToken);
      return true;
    } catch {
      return false;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}

function isAuthPath(path: string) {
  return (
    path.startsWith("/api/auth/token") ||
    path.startsWith("/api/auth/register") ||
    path.startsWith("/api/auth/refresh") ||
    path.startsWith("/api/auth/logout")
  );
}

export async function apiFetch(path: string, init: RequestInit = {}) {
  const run = async () => {
    const token = await getToken();
    const headers = new Headers(init.headers);
    if (!headers.has("Content-Type") && init.body) {
      headers.set("Content-Type", "application/json");
    }
    if (token) headers.set("Authorization", `Bearer ${token}`);
    const res = await fetch(`${getApiBase()}${path}`, { ...init, headers });
    const data = await res.json().catch(() => ({}));
    return { res, data };
  };

  let result = await run();

  if (result.res.status === 401 && !isAuthPath(path)) {
    const ok = await refreshAccessToken();
    if (ok) result = await run();
  }

  return result;
}

export async function login(email: string, password: string) {
  const { res, data } = await apiFetch("/api/auth/token", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(data.error || "Login failed");
  const access = pickAccessToken(data);
  if (!access || !data.user) throw new Error("Login failed");
  await setSession(access, data.user, data.refreshToken);
  return data.user as AuthUser;
}

export async function register(name: string, email: string, password: string) {
  const { res, data } = await apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error(data.error || "Register failed");
  const access = pickAccessToken(data);
  if (!access || !data.user) throw new Error("Register failed");
  await setSession(access, data.user, data.refreshToken);
  return data.user as AuthUser;
}

export async function logout() {
  const refreshToken = await getRefreshToken();
  try {
    if (refreshToken) {
      await fetch(`${getApiBase()}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
    }
  } catch {
    // Local clear still proceeds
  }
  await clearSession();
}
