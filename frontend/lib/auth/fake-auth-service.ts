import type { AuthSession, AuthUser, LoginPayload, RegisterPayload } from "./types";

const STORAGE_KEY = "math-teacher-auth-session";

const seededUsers: AuthUser[] = [
  {
    id: "demo-teacher",
    fullName: "عبدالهادي السالم",
    email: "teacher@example.com",
    specialty: "الرياضيات",
    schoolLevel: "المرحلة الثانوية",
    school: "مدرسة النجاح",
    role: "teacher",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
];

function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

function writeSession(session: AuthSession | null) {
  if (typeof window === "undefined") return;
  if (session) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

function createSession(user: AuthUser): AuthSession {
  return {
    user,
    accessToken: `fake-${user.id}-${Date.now()}`,
  };
}

export async function loginWithEmailAndPassword(payload: LoginPayload): Promise<AuthSession> {
  const user = seededUsers.find((entry) => entry.email.toLowerCase() === payload.email.toLowerCase());
  if (!user) {
    throw new Error("البريد الإلكتروني غير موجود.");
  }

  const session = createSession(user);
  writeSession(session);
  return session;
}

export async function registerWithEmailAndPassword(payload: RegisterPayload): Promise<AuthSession> {
  if (payload.password !== payload.confirmPassword) {
    throw new Error("كلمتا المرور غير متطابقتين.");
  }

  const user: AuthUser = {
    id: `user-${Date.now()}`,
    fullName: payload.fullName,
    email: payload.email,
    specialty: payload.specialty,
    schoolLevel: payload.schoolLevel,
    school: payload.school,
    role: "teacher",
  };

  const session = createSession(user);
  seededUsers.push(user);
  writeSession(session);
  return session;
}

export function getStoredSession(): AuthSession | null {
  return readSession();
}

export async function logout(): Promise<void> {
  writeSession(null);
}

export async function updateProfile(updates: Partial<AuthUser>): Promise<AuthSession> {
  const currentSession = getStoredSession();
  if (!currentSession) {
    throw new Error("لا يوجد جلسة نشطة.");
  }

  const updatedUser = { ...currentSession.user, ...updates };
  const nextSession = { ...currentSession, user: updatedUser };
  writeSession(nextSession);
  return nextSession;
}
