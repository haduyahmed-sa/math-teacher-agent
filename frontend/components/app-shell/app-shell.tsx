"use client";

import { useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { useAuth } from "@/lib/auth/auth-context";

type AppShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

const routeContent = [
  {
    pattern: /^\/dashboard\/?$/,
    title: "مرحبًا عبدالهادي 👋",
    subtitle: "إليك نظرة سريعة على نشاطك اليوم ومحتواك الجاهز للتطوير.",
  },
  {
    pattern: /^\/student-analytics\/?$/,
    title: "لوحة التحليلات",
    subtitle: "استعرض نتائج الطلاب وتوصياتك الذكية في مكان واحد.",
  },
  {
    pattern: /^\/dashboard\/lesson-planner\/?$/,
    title: "منشئ تحضير الدرس",
    subtitle: "أنشئ خططًا دراسية جاهزة بصياغة تعليمية احترافية ومناسبة لاحتياجات الصف.",
  },
  {
    pattern: /^\/dashboard\/worksheet-generator\/?$/,
    title: "مولد أوراق العمل",
    subtitle: "حوّل الموضوع إلى ورقة عمل جاهزة للطباعة مع أهداف واضحة ومفتاح إجابة.",
  },
  {
    pattern: /^\/dashboard\/quiz-generator\/?$/,
    title: "مولد الاختبارات",
    subtitle: "جهّز اختبارًا متوازنًا مع جدول مواصفات وأسئلة متنوعة.",
  },
  {
    pattern: /^\/results\/?$/,
    title: "لوحة النتائج",
    subtitle: "تابع أداء الطلاب وتعرّف على أبرز نقاط القوة والاحتياج.",
  },
  {
    pattern: /^\/question-bank\/?$/,
    title: "مكتبة الأسئلة",
    subtitle: "استعرض الأسئلة المجمعة وأعد استخدامها بسهولة داخل خططك.",
  },
  {
    pattern: /^\/files\/?$/,
    title: "الملفات والمستندات",
    subtitle: "أدر المواد التعليمية والملفات المشتركة في مكان واحد.",
  },
  {
    pattern: /^\/favorites\/?$/,
    title: "المفضلة",
    subtitle: "احتفظ بالأدوات والموارد التي تستخدمها باستمرار في متناول يدك.",
  },
  {
    pattern: /^\/settings\/?$/,
    title: "الإعدادات",
    subtitle: "ضبط التفضيلات الشخصية والتنسيقات التي تناسبك.",
  },
  {
    pattern: /^\/profile\/?$/,
    title: "الملف الشخصي",
    subtitle: "إدارة معلومات حسابك وتفضيلات العمل داخل المنصة.",
  },
];

export default function AppShell({ title, subtitle, children }: AppShellProps) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const resolvedContent = useMemo(() => {
    const match = routeContent.find((item) => item.pattern.test(pathname));

    if (match && /^\/dashboard\/?$/.test(pathname)) {
      const displayName = user?.fullName?.trim();
      return {
        title: loading ? "مرحبًا بك 👋" : displayName ? `مرحبًا ${displayName} 👋` : "مرحبًا بك 👋",
        subtitle: match.subtitle,
      };
    }

    return match ? { title: match.title, subtitle: match.subtitle } : { title, subtitle };
  }, [loading, pathname, title, subtitle, user?.fullName]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(124,58,237,0.12),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.10),_transparent_25%)] px-4 py-4 text-slate-900 sm:px-6 lg:px-8 lg:py-6">
      <div
        className={`mx-auto flex max-w-7xl flex-col gap-6 lg:gap-6 ${collapsed ? "lg:grid lg:grid-cols-[minmax(0,1fr)_88px]" : "lg:grid lg:grid-cols-[minmax(0,1fr)_280px]"}`}
      >
        <main className="space-y-6">
          <Header
            title={resolvedContent.title}
            subtitle={resolvedContent.subtitle}
            collapsed={collapsed}
            onToggle={() => setCollapsed((value) => !value)}
          />
          {children}
        </main>
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      </div>
    </div>
  );
}
