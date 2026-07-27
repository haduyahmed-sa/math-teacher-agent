import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AppShell from "@/components/app-shell/app-shell";
import { createClient } from "@/utils/supabase/server";
import type { ReactNode } from "react";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <AppShell
      title="مرحبًا عبدالهادي 👋"
      subtitle="إليك نظرة سريعة على نشاطك اليوم ومحتواك الجاهز للتطوير."
    >
      {children}
    </AppShell>
  );
}
