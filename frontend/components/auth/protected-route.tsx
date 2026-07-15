"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

const publicRoutes = ["/login", "/register", "/"];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm font-semibold text-white">
        جارٍ التحميل...
      </div>
    );
  }

  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    return null;
  }

  return children;
}
