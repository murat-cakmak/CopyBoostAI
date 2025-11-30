import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CopyBoost AI",
  description: "SEO odaklı ürün açıklamaları ve pazarlama içerikleri üretin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
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
