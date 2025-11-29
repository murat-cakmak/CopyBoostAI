import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1">{children}</main>
            <footer className="border-t bg-white py-6 text-center text-sm text-slate-500 mt-5">
              SEO uyumlu ürün açıklamalarını saniyeler içinde oluşturun. © 2025{" "}
              <a className="font-bold" href="http://muratcakmak.com/" target="_blank" rel="nofollow">
                CopyBoost AI
              </a>
              . Tüm hakları saklıdır.
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
