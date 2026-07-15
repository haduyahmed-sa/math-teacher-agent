export type UserRole = "teacher" | "student" | "admin";

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  specialty: string;
  schoolLevel: string;
  school: string;
  avatarUrl?: string;
  role: UserRole;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  specialty: string;
  schoolLevel: string;
  school: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
};
