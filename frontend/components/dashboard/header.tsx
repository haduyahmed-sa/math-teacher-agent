"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

type HeaderProps = {
  title: string;
  subtitle: string;
  collapsed: boolean;
  onToggle: () => void;
};

export default function Header({ title, subtitle, collapsed, onToggle }: HeaderProps) {
  const router = useRouter();
  const { user, logoutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setMenuOpen(false);
      router.replace("/login");
    } catch {
      setMenuOpen(false);
      router.replace("/login");
    }
  };

  return (
    <header className="flex flex-col gap-4 rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onToggle}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-lg text-slate-700 transition hover:border-violet-300 hover:bg-violet-50"
          aria-label={collapsed ? "توسيع الشريط الجانبي" : "تصغير الشريط الجانبي"}
        >
          {collapsed ? "☰" : "✕"}
        </button>
        <div>
          <p className="text-sm font-medium text-slate-500">لوحة التحكم</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
  <h1 className="text-2xl font-semibold text-slate-950">{title}</h1>
  <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
    نسخة تجريبية
  </span>
</div>
          <p className="mt-2 text-sm leading-7 text-slate-600">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600 sm:inline-flex">
          {collapsed ? "الوضع المضغوط" : "الوضع الكامل"}
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm text-white">
              {user?.fullName?.charAt(0) || "م"}
            </span>
            <span>{user?.fullName || "حسابي"}</span>
          </button>

          {menuOpen ? (
            <div className="absolute left-0 top-full z-20 mt-2 w-44 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                حسابي
              </Link>
              <Link
                href="/settings"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                الإعدادات
              </Link>
              <div className="my-1 border-t border-slate-200" />
              <button
                type="button"
                onClick={handleLogout}
                className="block w-full rounded-xl px-3 py-2 text-right text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
              >
                تسجيل الخروج
              </button>
            </div>
          ) : null}
        </div>
        <button className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
          + إنشاء جديد
        </button>
      </div>
    </header>
  );
}
