import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  AuthUser,
  getStoredUser,
  getToken,
  login as apiLogin,
  loginWithGoogleIdToken as apiLoginGoogle,
  logout as apiLogout,
  register as apiRegister,
} from "./api";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  isAdmin: boolean;
  isSubAdmin: boolean;
  isStaff: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const token = await getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    const stored = await getStoredUser();
    setUser(stored);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isAdmin: user?.role === "ADMIN",
      isSubAdmin: user?.role === "SUB_ADMIN",
      isStaff: user?.role === "ADMIN" || user?.role === "SUB_ADMIN",
      async login(email, password) {
        const u = await apiLogin(email, password);
        setUser(u);
      },
      async register(name, email, password) {
        const u = await apiRegister(name, email, password);
        setUser(u);
      },
      async loginWithGoogle(idToken) {
        const u = await apiLoginGoogle(idToken);
        setUser(u);
      },
      async logout() {
        await apiLogout();
        setUser(null);
      },
      refresh,
    }),
    [user, loading, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
