"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  collapsed?: boolean;
  onToggle?: () => void;
};

const navItems = [
  { label: "لوحة التحكم", href: "/dashboard", icon: "◉", caption: "نظرة عامة" },
  { label: "التحليلات", href: "/student-analytics", icon: "📊", caption: "تحليل الطلاب" },
  { label: "تحضير الدروس", href: "/dashboard/lesson-planner", icon: "▣", caption: "خطط جاهزة" },
  { label: "أوراق العمل", href: "/dashboard/worksheet-generator", icon: "◫", caption: "تمارين مخصصة" },
  { label: "الاختبارات", href: "/dashboard/quiz-generator", icon: "◌", caption: "تقييمات ذكية" },
  { label: "النتائج", href: "/results", icon: "◍", caption: "تحليلات الأداء" },
  { label: "بنك الأسئلة", href: "/question-bank", icon: "⬢", caption: "مكتبة مرنة" },
  { label: "الملفات", href: "/files", icon: "⬡", caption: "محتوى مشترك" },
  { label: "المفضلة", href: "/favorites", icon: "★", caption: "موارد مفضلة" },
  { label: "الإعدادات", href: "/settings", icon: "⚙", caption: "التفضيلات" },
  { label: "الملف الشخصي", href: "/profile", icon: "◔", caption: "الحساب" },
];

export default function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/dashboard/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="rounded-[1.75rem] border border-slate-200/80 bg-slate-950 p-4 text-slate-100 shadow-[0_20px_60px_-24px_rgba(2,8,23,0.75)] lg:h-full lg:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-sky-500 text-lg font-semibold text-white">
            ∑
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold">Math Teacher AI</p>
              <p className="text-xs text-slate-400">منصة التعليم الذكية</p>
            </div>
          )}
        </div>
        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-sm text-slate-200 transition hover:bg-white/15"
            aria-label={collapsed ? "توسيع الشريط الجانبي" : "تصغير الشريط الجانبي"}
          >
            {collapsed ? "›" : "‹"}
          </button>
        )}
      </div>

      <nav className="mt-8 space-y-2">
        {navItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex w-full items-center rounded-2xl px-3 py-3 text-right text-sm font-medium transition ${
                active
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              } ${collapsed ? "justify-center" : "justify-between"}`}
            >
              <span className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
                <span className="text-base">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </span>
              {!collapsed && <span className="text-xs text-slate-400">{item.caption}</span>}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-4">
          <p className="text-sm font-semibold">مزامنة سريعة</p>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            كل ما تحتاجه من محتوى جاهز وقابل للتعديل في لحظة واحدة.
          </p>
        </div>
      )}
    </aside>
  );
}
