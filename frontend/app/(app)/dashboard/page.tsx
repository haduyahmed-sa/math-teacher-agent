import Link from "next/link";
import DashboardCard from "@/components/dashboard/dashboard-card";
import QuickActions from "@/components/dashboard/quick-actions";

const quickActions = [
  {
    title: "إنشاء تحضير درس",
    description: "أعد خطة درس احترافية بصياغة جاهزة ومناسبة لاحتياجات الصف.",
    icon: "✦",
    buttonLabel: "إنشاء",
    href: "/dashboard/lesson-planner",
  },
  {
    title: "إنشاء ورقة عمل",
    description: "حوّل الموضوع إلى تمارين منظمة ومناسبة للمستوى المطلوب.",
    icon: "✎",
    buttonLabel: "إنشاء",
    href: "/dashboard/worksheet-generator",
  },
  {
    title: "إنشاء اختبار",
    description: "جهّز أسئلة متنوعة مع مفتاح إجابة وملف تقييم سريع.",
    icon: "✓",
    buttonLabel: "إنشاء",
    href: "/dashboard/quiz-generator",
  },
  {
    title: "تحليل نتائج الطلاب",
    description: "تابع الأداء وحدد النقاط التي تحتاج إلى دعم إضافي.",
    icon: "📊",
    buttonLabel: "تحليل",
    href: "/student-analytics",
  },
  {
    title: "الملف الشخصي",
    description: "تحديث بياناتك الشخصية والمهنية بسهولة.",
    icon: "👤",
    buttonLabel: "عرض",
    href: "/profile",
  },
];

export default function DashboardPage() {
  return (
    <>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="عدد التحاضير"
          value="12"
          description="تحضير جاهز ومُراجع للاستخدام اليومي."
          accent="bg-violet-100 text-violet-700"
        />
        <DashboardCard
          title="أوراق العمل"
          value="8"
          description="أوراق عمل معدة بصياغة متدرجة ومناسبة للصف."
          accent="bg-sky-100 text-sky-700"
        />
        <DashboardCard
          title="الاختبارات"
          value="5"
          description="اختبارات متنوعة مع إجابات نموذجية جاهزة."
          accent="bg-emerald-100 text-emerald-700"
        />
        <DashboardCard
          title="تحليلات الطلاب"
          value="24"
          description="تحليلات حديثة تساعدك على تتبع التقدم والتحديات."
          accent="bg-amber-100 text-amber-700"
        />
      </section>

      <QuickActions actions={quickActions} />

      <section className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">الوصول السريع</h2>
            <p className="mt-1 text-sm text-slate-600">ابدأ من أي مكان في المنصة بسهولة.</p>
          </div>
          <Link href="/student-analytics" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
            فتح التحليلات
          </Link>
        </div>
      </section>
    </>
  );
}
