import Link from "next/link";
import { cookies } from "next/headers";
import { LogoutButton } from "@/components/auth/logout-button";
import { createClient } from "@/utils/supabase/server";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const fullName = (user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || user.email || "مستخدم";
  const specialty = (user.user_metadata?.specialty as string) || "غير محدد";
  const schoolLevel = (user.user_metadata?.school_level as string) || "غير محدد";
  const school = (user.user_metadata?.school as string) || "غير محدد";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(124,58,237,0.12),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.10),_transparent_25%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-violet-700">الملف الشخصي</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950">معلومات الحساب</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              العودة إلى لوحة التحكم
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-2xl font-semibold text-white">
              {fullName.charAt(0)}
            </div>
            <h2 className="mt-5 text-xl font-semibold text-slate-950">{fullName}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{user.email}</p>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>المدرسة: {school}</p>
              <p>التخصص: {specialty}</p>
              <p>المرحلة: {schoolLevel}</p>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6">
            <p className="text-sm leading-8 text-slate-600">
              يتم عرض بيانات الحساب مباشرة من حساب Supabase الخاص بك. سيتم إضافة أدوات تعديل إضافية لاحقًا عند الحاجة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
