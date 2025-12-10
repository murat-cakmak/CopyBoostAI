import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AppFooter } from "@/components/AppFooter";
import { isSupportedLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

type LocaleLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <LanguageProvider initialCode={locale}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-1">{children}</main>
          <AppFooter />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}
