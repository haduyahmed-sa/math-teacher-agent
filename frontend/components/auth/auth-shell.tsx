"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerHref: string;
  footerLinkLabel: string;
};

export default function AuthShell({ title, subtitle, children, footerText, footerHref, footerLinkLabel }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(124,58,237,0.12),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.10),_transparent_25%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex-1 rounded-[2rem] border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur lg:p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-sky-500 text-xl font-semibold text-white">
              ∑
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Math Teacher AI</p>
              <p className="text-sm text-slate-600">منصة تعليمية ذكية</p>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="text-3xl font-semibold text-slate-950">{title}</h1>
            <p className="mt-3 text-sm leading-8 text-slate-600">{subtitle}</p>
          </div>

          <div className="mt-8">{children}</div>

          <p className="mt-6 text-sm text-slate-600">
            {footerText}{" "}
            <Link href={footerHref} className="font-semibold text-violet-700 transition hover:text-violet-800">
              {footerLinkLabel}
            </Link>
          </p>
        </div>
        <div className="flex-1 rounded-[2rem] border border-slate-200/80 bg-slate-950 p-8 text-slate-100 shadow-[0_20px_60px_-24px_rgba(2,8,23,0.75)] lg:p-12">
          <p className="text-sm font-medium text-violet-300">إدارة تعليمية ذكية</p>
          <h2 className="mt-3 text-2xl font-semibold">شغّل العمل التعليمي بدون تعقيد.</h2>
          <p className="mt-4 text-sm leading-8 text-slate-300">
            سجّل الدخول أو أنشئ حسابًا جديدًا للوصول إلى أدوات التخطيط، التحليل، والملفات التعليمية بكل سهولة.
          </p>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
            <p className="text-sm font-semibold">ماذا ستحصل عليه؟</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>• خطط دروس جاهزة ومخصصة</li>
              <li>• تقارير تحليلية دقيقة للطلاب</li>
              <li>• أدوات تعليمية احترافية في مكان واحد</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
