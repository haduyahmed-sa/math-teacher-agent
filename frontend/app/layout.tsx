import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth/auth-context";
import ProtectedRoute from "@/components/auth/protected-route";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Math Teacher AI",
  description: "Landing page for Math Teacher AI, an intelligent assistant for lesson planning, worksheets, tests, and student insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body  className="min-h-full bg-slate-50 text-slate-900 dark...">
  <AuthProvider>
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <ProtectedRoute>{children}</ProtectedRoute>
      </main>

      <footer
        dir="rtl"
        className="w-full py-5 px-4 text-center text-sm text-slate-500 border-t border-slate-200"
      >
        <p>Math Teacher AI © ٢٠٢٦</p>
        <p className="mt-1">
          تطوير وتصميم عبدالهادي الحجي — جميع الحقوق محفوظة
        </p>
      </footer>
    </div>
  </AuthProvider>
</body>
    </html>
  );
}
