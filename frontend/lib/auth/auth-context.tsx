"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getStoredSession, loginWithEmailAndPassword, logout, registerWithEmailAndPassword, updateProfile } from "./fake-auth-service";
import type { AuthSession, AuthUser, LoginPayload, RegisterPayload } from "./types";

type AuthContextValue = {
  session: AuthSession | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logoutUser: () => Promise<void>;
  updateUser: (updates: Partial<AuthUser>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = getStoredSession();
    setSession(currentSession);
    setLoading(false);
  }, []);

  const login = async (payload: LoginPayload) => {
    const nextSession = await loginWithEmailAndPassword(payload);
    setSession(nextSession);
  };

  const register = async (payload: RegisterPayload) => {
    const nextSession = await registerWithEmailAndPassword(payload);
    setSession(nextSession);
  };

  const logoutUser = async () => {
    await logout();
    setSession(null);
  };

  const updateUser = async (updates: Partial<AuthUser>) => {
    const nextSession = await updateProfile(updates);
    setSession(nextSession);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      isAuthenticated: Boolean(session),
      loading,
      login,
      register,
      logoutUser,
      updateUser,
    }),
    [loading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
