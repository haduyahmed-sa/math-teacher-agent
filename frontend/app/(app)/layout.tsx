import AppShell from "@/components/app-shell/app-shell";
import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      title="مرحبًا عبدالهادي 👋"
      subtitle="إليك نظرة سريعة على نشاطك اليوم ومحتواك الجاهز للتطوير."
    >
      {children}
    </AppShell>
  );
}
