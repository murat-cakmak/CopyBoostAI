"use client";

import { useLanguage } from "./LanguageProvider";

export function AppFooter() {
  const { content, t } = useLanguage();
  const footerCopy = (content.footer || {}) as Record<string, string>;
  const tagline =
    footerCopy.tagline || t("footer.tagline", "SEO uyumlu ürün açıklamalarını saniyeler içinde oluşturun.");
  const rights = footerCopy.rights || t("footer.rights", "Tüm hakları saklıdır.");
  const brand = footerCopy.brand || t("footer.brand", "CopyBoost AI");
  const linkLabel = footerCopy.linkLabel || t("footer.linkLabel", "Murat Çakmak");

  return (
    <footer className="border-t bg-white py-6 text-center text-sm text-slate-500 mt-5 px-5">
      {tagline} © 2025{" "}
        <a className="font-bold" href="https://muratcakmak.com/" target="_blank" rel="nofollow">
          {linkLabel}
        </a>
      . {rights.replace("{brand}", brand)}
    </footer>
  );
}
