"use client";

import { useState } from "react";

const initialForm = {
  grade: "الصف الثامن",
  section: "أ",
  lesson: "المثلثات",
  questionCount: "8",
  gradeDistribution: "20% اختيار من متعدد، 30% صح وخطأ، 20% أكمل، 30% مقالية",
  difficulty: "متوسط",
  questionType: "مختلط",
  notes: "اجعل الاختبار مناسبًا للصف مع أسئلة واضحة ومتنوعّة.",
};

type QuizResult = {
  title: string;
  instructions: string[];
  learningObjectives: string[];
  questions: Array<{ number: number; prompt: string; type: string; bloomsLevel: string; points: number }>;
  answerKey: string[];
  specificationTable: string[];
  twentyFirstCenturySkills: string[];
};

const fields = [
  { label: "الصف", name: "grade", placeholder: "مثال: الصف الثامن" },
  { label: "الفصل", name: "section", placeholder: "مثال: أ" },
  { label: "الدرس", name: "lesson", placeholder: "مثال: المثلثات" },
  { label: "عدد الأسئلة", name: "questionCount", placeholder: "مثال: 8" },
  { label: "توزيع الدرجات", name: "gradeDistribution", placeholder: "مثال: 20% اختيار من متعدد" },
  { label: "مستوى الصعوبة", name: "difficulty", placeholder: "مثال: متوسط" },
  { label: "نوع الأسئلة", name: "questionType", placeholder: "مثال: مختلط" },
];

export default function QuizGeneratorPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/quiz-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "تعذر إنشاء الاختبار.");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm">
        <p className="text-sm font-medium text-violet-700">مساعد الذكاء الاصطناعي</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-950">مولد الاختبارات</h1>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          أنشئ اختبارًا احترافيًا مع نموذج الإجابة وجدول المواصفات وأهداف التعلم.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                <span>{field.label}</span>
                <input
                  name={field.name}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:bg-white"
                />
              </label>
            ))}
          </div>

          <label className="mt-4 flex flex-col gap-2 text-sm font-medium text-slate-700">
            <span>ملاحظات إضافية</span>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              placeholder="أضف أي ملاحظات أو احتياجات خاصة..."
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:bg-white"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "جارٍ الإنشاء..." : "إنشاء الاختبار"}
          </button>
        </form>

        <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-950 p-6 text-slate-100 shadow-sm">
          {loading && (
            <div className="flex h-full min-h-[280px] items-center justify-center rounded-[1.25rem] border border-white/10 bg-white/5 text-center">
              <div>
                <p className="text-lg font-semibold">جارٍ توليد الاختبار...</p>
                <p className="mt-2 text-sm text-slate-300">قد يستغرق ذلك بضع ثوانٍ.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-[1.25rem] border border-rose-400/30 bg-rose-500/10 p-5 text-rose-200">
              <p className="font-semibold">تعذر إنشاء الاختبار</p>
              <p className="mt-2 text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && !result && (
            <div className="flex h-full min-h-[280px] items-center justify-center rounded-[1.25rem] border border-dashed border-white/15 bg-white/5 text-center">
              <div>
                <p className="text-lg font-semibold">اختبار جاهز للاستخدام</p>
                <p className="mt-2 text-sm text-slate-300">
                  ستظهر هنا الأسئلة، نموذج الإجابة، وجدول المواصفات.
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="max-h-[760px] space-y-4 overflow-y-auto pr-1">
              <div className="rounded-[1.25rem] border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-slate-300">الاختبار الناتج</p>
                <h2 className="mt-2 text-xl font-semibold text-white">{result.title}</h2>
              </div>

              <Section title="الأهداف التعليمية" items={result.learningObjectives} />
              <Section title="الأسئلة" items={result.questions.map((item) => `${item.number}. ${item.prompt} (${item.type}) • ${item.bloomsLevel} • ${item.points} نقطة`)} />
              <Section title="نموذج الإجابة" items={result.answerKey} />
              <Section title="جدول المواصفات" items={result.specificationTable} />
              <Section title="مهارات القرن 21" items={result.twentyFirstCenturySkills} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type SectionProps = {
  title: string;
  items: string[];
};

function Section({ title, items }: SectionProps) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-slate-900/60 p-4">
      <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
