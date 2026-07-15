const features = [
  {
    title: "إنشاء تحضير درس",
    description:
      "أنشئ خططًا دراسية واضحة ومناسبة لمرحلة الطالب مع أهداف تعليمية دقيقة وملحقات عملية.",
    icon: "✦",
  },
  {
    title: "إنشاء أوراق عمل",
    description:
      "حوّل الأفكار إلى تمارين متنوعة بصياغة احترافية تناسب مختلف مستويات الفهم.",
    icon: "✎",
  },
  {
    title: "إنشاء اختبارات",
    description:
      "جهّز اختبارات قصيرة أو شاملة مع أسئلة متدرجة ومفتاح إجابة جاهز.",
    icon: "✓",
  },
  {
    title: "تحليل نتائج الطلاب",
    description:
      "تابع الأداء، حدد الفجوات، وقدم رؤى عملية لتحسين التدريس والتقييم.",
    icon: "📊",
  },
];

export default function MathTeacherLanding() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.16),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.16),_transparent_30%)] text-slate-900 transition-colors dark:text-slate-50">
      <main className="mx-auto flex max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <header className="mb-10 flex items-center justify-between rounded-full border border-slate-200/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-sky-500 text-lg font-semibold text-white">
              ∑
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Math Teacher AI
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                مساعد ذكي للتدريس
              </p>
            </div>
          </div>
          <div className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300">
            AI for educators
          </div>
        </header>

        <section className="grid items-center gap-8 rounded-[2rem] border border-slate-200/70 bg-white/80 p-7 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur lg:grid-cols-[1.1fr_0.9fr] lg:p-10 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-300">
              مدعوم بالذكاء الاصطناعي • تصميم عملي ومباشر
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              Math Teacher AI
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
              مساعدك الذكي لإعداد الدروس، أوراق العمل، الاختبارات، وتحليل نتائج الطلاب.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                ابدأ الآن
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                استكشف الميزات
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 dark:border-emerald-900/60 dark:bg-emerald-950/40">
                جاهز للاستخدام الفوري
              </span>
              <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 dark:border-sky-900/60 dark:bg-sky-950/40">
                يدعم التعليم الحديث
              </span>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-inner dark:border-slate-800">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-300">لوحة العمل الذكية</p>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300">
                نشط
              </span>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-slate-300">إعداد درس: “المعادلات الخطية”</p>
                <p className="mt-2 text-lg font-semibold">تم إنشاء أهداف واضحة وملف نشاط جاهز.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-300">اختبار قصير</p>
                <p className="mt-2 text-lg font-semibold">10 أسئلة • مستوى متوسط • إجابة نموذجية مرفقة</p>
              </div>
              <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4">
                <p className="text-sm text-violet-200">تحليل سريع</p>
                <p className="mt-2 text-lg font-semibold">تم رصد 3 فجوات تعليمية ومجموعة مقترحات.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-sky-500 text-xl text-white shadow-sm">
                {feature.icon}
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                {feature.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
