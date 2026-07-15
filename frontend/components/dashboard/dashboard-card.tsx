type DashboardCardProps = {
  title: string;
  value: string;
  description: string;
  accent: string;
};

export default function DashboardCard({
  title,
  value,
  description,
  accent,
}: DashboardCardProps) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${accent}`}>
        {title}
      </div>
      <p className="mt-4 text-3xl font-semibold text-slate-950">{value}</p>
      <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}
