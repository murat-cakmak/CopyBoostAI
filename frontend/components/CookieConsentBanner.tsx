"use client";

import { useEffect, useState } from "react";
import { defaultCookiePolicy, type CookiePolicyCopy } from "./CookiePolicyContent";
import { useLanguage } from "./LanguageProvider";

const STORAGE_KEY = "copyboost-cookie-consent";
const COOKIE_NAME = "copyboost-cookie-consent";
const ACCEPT_VALUE = "accepted";
const ONE_YEAR = 60 * 60 * 24 * 365;

export function CookieConsentBanner() {
  const { content, t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setVisible(!stored);
  }, []);

  if (!visible) {
    return null;
  }

  const cookiePolicy = ((content.legal ?? {}) as { cookiePolicy?: CookiePolicyCopy }).cookiePolicy ?? {};
  const title = cookiePolicy.title || t("legal.cookiePolicy.title", defaultCookiePolicy.title);
  const paragraphs =
    Array.isArray(cookiePolicy.paragraphs) && cookiePolicy.paragraphs.length > 0
      ? cookiePolicy.paragraphs
      : defaultCookiePolicy.paragraphs;

  const acceptLabel = t("legal.cookiePolicy.acceptButton", "Kabul Et");

  const handleAccept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, ACCEPT_VALUE);
      document.cookie = `${COOKIE_NAME}=${ACCEPT_VALUE}; path=/; max-age=${ONE_YEAR}`;
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 max-w-sm rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-2xl"
    >
      <div className="space-y-2">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <button
        type="button"
        onClick={handleAccept}
        className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {acceptLabel}
      </button>
    </div>
  );
}
