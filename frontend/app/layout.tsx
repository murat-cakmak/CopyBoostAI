import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { headers } from "next/headers";
import { DEFAULT_LANGUAGE, isSupportedLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CopyBoost AI - AI SEO aracı | E-Ticaret SEO aracı | Sosyal Medya SEO aracı",
  description: "SEO odaklı E-Ticaret ve Sosyal Medyada ürün açıklamaları ve pazarlama içerikleri üretin",
  icons: {
    icon: "/copyboostai.ico",
    shortcut: "/copyboostai.ico",
    apple: "/copyboostai-logo.webp"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = headers();
  const localeFromHeader = headerList.get("x-copyboost-locale");
  const htmlLang = isSupportedLocale(localeFromHeader) ? localeFromHeader : DEFAULT_LANGUAGE;

  return (
    <html lang={htmlLang}>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-7MT2WFWK5B" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-7MT2WFWK5B');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
