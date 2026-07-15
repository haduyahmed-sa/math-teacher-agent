"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";

export default function ProfilePage() {
  const { user, logoutUser, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName ?? "",
    specialty: user?.specialty ?? "",
    schoolLevel: user?.schoolLevel ?? "",
    school: user?.school ?? "",
  });

  if (!user) {
    return null;
  }

  const handleSave = async () => {
    await updateUser({
      fullName: form.fullName,
      specialty: form.specialty,
      schoolLevel: form.schoolLevel,
      school: form.school,
    });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(124,58,237,0.12),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.10),_transparent_25%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-violet-700">الملف الشخصي</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950">معلومات الحساب</h1>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setEditing((value) => !value)}
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {editing ? "إلغاء" : "تعديل البيانات"}
            </button>
            <button
              type="button"
              onClick={() => logoutUser()}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-6">
            <img
              src={user.avatarUrl ?? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80"}
              alt={user.fullName}
              className="h-32 w-32 rounded-full object-cover"
            />
            <h2 className="mt-5 text-xl font-semibold text-slate-950">{user.fullName}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{user.email}</p>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>المدرسة: {user.school}</p>
              <p>التخصص: {user.specialty}</p>
              <p>المرحلة: {user.schoolLevel}</p>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6">
            {editing ? (
              <div className="space-y-4">
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  <span>الاسم</span>
                  <input
                    value={form.fullName}
                    onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:bg-white"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  <span>التخصص</span>
                  <input
                    value={form.specialty}
                    onChange={(event) => setForm((prev) => ({ ...prev, specialty: event.target.value }))}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:bg-white"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  <span>المرحلة</span>
                  <input
                    value={form.schoolLevel}
                    onChange={(event) => setForm((prev) => ({ ...prev, schoolLevel: event.target.value }))}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:bg-white"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  <span>المدرسة</span>
                  <input
                    value={form.school}
                    onChange={(event) => setForm((prev) => ({ ...prev, school: event.target.value }))}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:bg-white"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  حفظ التعديلات
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-sm leading-8 text-slate-600">
                <p>يمكنك تعديل بيانات الحساب في أي وقت من خلال زر تعديل البيانات.</p>
                <Link href="/dashboard" className="inline-flex items-center rounded-full bg-violet-100 px-4 py-2 font-semibold text-violet-700">العودة إلى لوحة التحكم</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
