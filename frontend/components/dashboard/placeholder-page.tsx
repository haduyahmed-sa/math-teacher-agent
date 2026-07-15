import Link from "next/link";

type PlaceholderPageProps = {
  title: string;
  description: string;
  badge: string;
  actionLabel: string;
  href: string;
};

export default function PlaceholderPage({
  title,
  description,
  badge,
  actionLabel,
  href,
}: PlaceholderPageProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-8 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">
          {badge}
        </span>
        <span className="text-sm text-slate-500">قريبًا</span>
      </div>

      <div className="mt-6 max-w-2xl">
        <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-3 text-sm leading-8 text-slate-600">{description}</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {actionLabel}
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          العودة إلى لوحة التحكم
        </Link>
      </div>
    </section>
  );
}
