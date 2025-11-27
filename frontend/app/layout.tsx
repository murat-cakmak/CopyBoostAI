import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CopyBoost AI",
  description: "SEO odaklı ürün açıklamaları ve pazarlama içerikleri üretin"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="border-b bg-white/80 backdrop-blur">
            <div className="container flex items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-primary text-white grid place-items-center font-semibold">
                  CB
                </div>
                <div>
                  <p className="text-lg font-semibold">CopyBoost AI</p>
                  <p className="text-sm text-slate-500">E-ticaret için üretken içerik</p>
                </div>
              </div>
              <nav className="flex items-center gap-4 text-sm text-slate-600">
                <a href="/" className="hover:text-primary">Ana sayfa</a>
                <a href="/dashboard" className="hover:text-primary">Dashboard</a>
                <a href="/generate" className="hover:text-primary">Üretici</a>
                <a href="/billing" className="hover:text-primary">Billing</a>
                <a href="/auth/login" className="hover:text-primary">Giriş yap</a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-white py-6 text-center text-sm text-slate-500">
            CopyBoost AI — SEO uyumlu ürün açıklamalarını saniyeler içinde oluşturun.
          </footer>
        </div>
      </body>
    </html>
  );
}
