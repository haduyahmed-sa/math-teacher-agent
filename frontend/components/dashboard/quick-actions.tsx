import Link from "next/link";

type QuickAction = {
  title: string;
  description: string;
  icon: string;
  buttonLabel?: string;
  href?: string;
};

type QuickActionsProps = {
  actions: QuickAction[];
};

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <section className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">إجراءات سريعة</h2>
          <p className="mt-1 text-sm text-slate-600">ابدأ مشروعًا جديدًا بلمسة واحدة</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => (
          <div
            key={action.title}
            className="flex h-full flex-col rounded-[1.35rem] border border-slate-200 bg-slate-50 p-5 text-right transition hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                {action.icon}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                سريع
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-slate-900">{action.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{action.description}</p>
            {action.href ? (
              <Link
                href={action.href}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {action.buttonLabel ?? "ابدأ"}
              </Link>
            ) : (
              <button
                type="button"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {action.buttonLabel ?? "ابدأ"}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
