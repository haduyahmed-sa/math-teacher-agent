"use client";

type HeaderProps = {
  title: string;
  subtitle: string;
  collapsed: boolean;
  onToggle: () => void;
};

export default function Header({ title, subtitle, collapsed, onToggle }: HeaderProps) {
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
          <h1 className="mt-1 text-2xl font-semibold text-slate-950">{title}</h1>
          <p className="mt-2 text-sm leading-7 text-slate-600">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600 sm:inline-flex">
          {collapsed ? "الوضع المضغوط" : "الوضع الكامل"}
        </div>
        <button className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
          + إنشاء جديد
        </button>
      </div>
    </header>
  );
}
