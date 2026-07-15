const navItems = [
  { label: "لوحة التحكم", active: true, icon: "◉" },
  { label: "الدروس", active: false, icon: "▣" },
  { label: "الأوراق", active: false, icon: "◫" },
  { label: "الاختبارات", active: false, icon: "◌" },
  { label: "النتائج", active: false, icon: "◍" },
];

export default function Sidebar() {
  return (
    <aside className="rounded-[1.75rem] border border-slate-200/80 bg-slate-950 p-6 text-slate-100 shadow-[0_20px_60px_-24px_rgba(2,8,23,0.75)] lg:h-full">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-sky-500 text-lg font-semibold text-white">
          ∑
        </div>
        <div>
          <p className="text-sm font-semibold">Math Teacher AI</p>
          <p className="text-xs text-slate-400">منصة التعليم الذكية</p>
        </div>
      </div>

      <nav className="mt-8 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-right text-sm font-medium transition ${
              item.active
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span>{item.label}</span>
            <span className="text-base">{item.icon}</span>
          </button>
        ))}
      </nav>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-4">
        <p className="text-sm font-semibold">مزامنة سريعة</p>
        <p className="mt-2 text-sm leading-7 text-slate-300">
          كل ما تحتاجه من محتوى جاهز وقابل للتعديل في لحظة واحدة.
        </p>
      </div>
    </aside>
  );
}
