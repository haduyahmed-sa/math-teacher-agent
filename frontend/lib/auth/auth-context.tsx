"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";
import type { AuthSession, AuthUser, LoginPayload, RegisterPayload } from "./types";

type AuthContextValue = {
  session: AuthSession | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<{ needsConfirmation: boolean }>;
  logoutUser: () => Promise<void>;
  updateUser: (updates: Partial<AuthUser>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapSupabaseUser(user: { id: string; email?: string | null; user_metadata?: Record<string, unknown> } | null): AuthUser | null {
  if (!user) return null;

  const metadata = user.user_metadata ?? {};
  return {
    id: user.id,
    fullName: (metadata.full_name as string) || (metadata.name as string) || user.email || "مستخدم",
    email: user.email || "",
    specialty: (metadata.specialty as string) || "غير محدد",
    schoolLevel: (metadata.school_level as string) || "غير محدد",
    school: (metadata.school as string) || "غير محدد",
    avatarUrl: (metadata.avatar_url as string) || undefined,
    role: "teacher",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let active = true;

    const initializeSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!active) return;

      if (data.session) {
        const authUser = mapSupabaseUser(data.session.user);
        setSession(authUser ? { user: authUser, accessToken: data.session.access_token } : null);
      } else {
        setSession(null);
      }

      if (error) {
        setSession(null);
      }

      setLoading(false);
    };

    initializeSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!active) return;
      const authUser = mapSupabaseUser(nextSession?.user ?? null);
      setSession(nextSession && authUser ? { user: authUser, accessToken: nextSession.access_token } : null);
      setLoading(false);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const login = async (payload: LoginPayload) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error) {
      const message = error.message.toLowerCase();
      if (message.includes("email") && message.includes("confirm")) {
        throw new Error("يرجى تأكيد البريد الإلكتروني قبل تسجيل الدخول.");
      }
      if (message.includes("invalid login credentials") || message.includes("invalid credentials")) {
        throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      }
      throw new Error("تعذر تسجيل الدخول. يرجى المحاولة مرة أخرى.");
    }

    const authUser = mapSupabaseUser(data.user);
    setSession(data.session && authUser ? { user: authUser, accessToken: data.session.access_token } : null);
  };

  const register = async (payload: RegisterPayload) => {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        emailRedirectTo: `${
  process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
}/auth/confirm`,
        data: {
          full_name: payload.fullName,
          specialty: payload.specialty,
          school_level: payload.schoolLevel,
          school: payload.school,
        },
      },
    });

    if (error) {
      throw new Error(error.message || "تعذر إنشاء الحساب.");
    }

    if (!data.session && data.user) {
      return { needsConfirmation: true };
    }

    const authUser = mapSupabaseUser(data.user);
    setSession(data.session && authUser ? { user: authUser, accessToken: data.session.access_token } : null);
    return { needsConfirmation: false };
  };

  const logoutUser = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const updateUser = async (updates: Partial<AuthUser>) => {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name: updates.fullName,
        specialty: updates.specialty,
        school_level: updates.schoolLevel,
        school: updates.school,
      },
    });

    if (error) {
      throw new Error("تعذر تحديث الملف الشخصي.");
    }

    const authUser = mapSupabaseUser(data.user);
    setSession(data.user && authUser ? { user: authUser, accessToken: session?.accessToken ?? "" } : null);
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
