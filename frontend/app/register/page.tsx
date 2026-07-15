"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/auth-shell";
import { useAuth } from "@/lib/auth/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialty: "",
    schoolLevel: "",
    school: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        specialty: form.specialty,
        schoolLevel: form.schoolLevel,
        school: form.school,
      });
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر إنشاء الحساب.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="إنشاء حساب جديد"
      subtitle="أنشئ حسابًا جديدًا للبدء في استخدام أدوات التخطيط والتحليل والموارد التعليمية الاحترافية."
      footerText="لديك حساب بالفعل؟"
      footerHref="/login"
      footerLinkLabel="تسجيل الدخول"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          <span>الاسم الكامل</span>
          <input
            value={form.fullName}
            onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:bg-white"
            placeholder="مثال: عبدالهادي السالم"
            required
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          <span>البريد الإلكتروني</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:bg-white"
            placeholder="your@email.com"
            required
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            <span>كلمة المرور</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:bg-white"
              placeholder="••••••••"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            <span>تأكيد كلمة المرور</span>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(event) => setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:bg-white"
              placeholder="••••••••"
              required
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            <span>التخصص</span>
            <input
              value={form.specialty}
              onChange={(event) => setForm((prev) => ({ ...prev, specialty: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:bg-white"
              placeholder="الرياضيات"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            <span>المرحلة الدراسية</span>
            <input
              value={form.schoolLevel}
              onChange={(event) => setForm((prev) => ({ ...prev, schoolLevel: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:bg-white"
              placeholder="الثانوية"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            <span>المدرسة</span>
            <input
              value={form.school}
              onChange={(event) => setForm((prev) => ({ ...prev, school: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:bg-white"
              placeholder="مدرسة النجاح"
              required
            />
          </label>
        </div>

        {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "جارٍ إنشاء الحساب..." : "إنشاء الحساب"}
        </button>
      </form>
    </AuthShell>
  );
}
