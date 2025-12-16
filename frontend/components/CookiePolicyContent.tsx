"use client";

import { useLanguage } from "./LanguageProvider";

export type CookiePolicyCopy = {
  title?: string;
  paragraphs?: string[];
};

export const defaultCookiePolicy: Required<CookiePolicyCopy> = {
  title: "Çerez Politikası",
  paragraphs: [
    "Web sitesi trafiğini analiz etmek ve web sitesi deneyiminizi optimize etmek amacıyla çerezler kullanıyoruz.",
    "Çerez kullanımımızı kabul ettiğinizde, verileriniz tüm diğer kullanıcı verileriyle birlikte derlenir.",
  ],
};

export function CookiePolicyContent() {
  const { content, t } = useLanguage();
  const cookiePolicy = ((content.legal ?? {}) as { cookiePolicy?: CookiePolicyCopy }).cookiePolicy ?? {};
  const mergedPolicy: Required<CookiePolicyCopy> = {
    title: cookiePolicy.title || t("legal.cookiePolicy.title", defaultCookiePolicy.title),
    paragraphs:
      Array.isArray(cookiePolicy.paragraphs) && cookiePolicy.paragraphs.length > 0
        ? cookiePolicy.paragraphs
        : defaultCookiePolicy.paragraphs,
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {t("legal.cookiePolicy.badge", "CopyBoost AI")}
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{mergedPolicy.title}</h1>
      </div>
      <div className="space-y-4 text-slate-700 leading-relaxed">
        {mergedPolicy.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
