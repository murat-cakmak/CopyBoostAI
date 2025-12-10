"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import { buildLocalizedPath, stripLocaleFromPath } from "@/lib/i18n";

type LanguageMenuProps = {
  variant?: "desktop" | "mobile";
};

export function LanguageMenu({ variant = "desktop" }: LanguageMenuProps) {
  const { languages, selectedLanguage, setLanguage, loading, error } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const toggleMenu = () => setOpen((prev) => !prev);

  const updateUrlLocale = (code: string) => {
    if (typeof window === "undefined") return;
    const { pathname, search, hash } = window.location;
    const basePath = stripLocaleFromPath(pathname);
    const nextUrl = `${buildLocalizedPath(basePath, code)}${search}${hash}`;
    router.replace(nextUrl);
  };

  const handleLanguageSelect = (code: string) => {
    setLanguage(code);
    updateUrlLocale(code);
    setOpen(false);
  };

  const buttonClass =
    variant === "mobile"
      ? "flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
      : "flex h-9 items-center gap-1 rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-100 hover:text-slate-100 shadow-sm hover:border-primary hover:text-primary dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100";

  const dropdownClass =
    variant === "mobile"
      ? "absolute right-0 top-12 w-48 rounded-xl border border-slate-200 text-slate-100 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900"
      : "absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 text-slate-100 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900";

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={toggleMenu}
        className={buttonClass}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Dil seç"
      >
        <span className="text-lg" aria-hidden="true">
          {selectedLanguage?.flagIcon || "🌐"}
        </span>
        {variant === "desktop" && (
          <span className="uppercase tracking-wide">
            {selectedLanguage?.code || ""}
          </span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <div className={dropdownClass} role="listbox">
          <div className="px-3 py-1 text-[11px] uppercase text-slate-400">
            {loading ? "Diller yükleniyor..." : "Dil seç"}
          </div>
          {error && (
            <div className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-900/10 dark:text-red-300">
              {error}
            </div>
          )}
          <div className="max-h-64 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={selectedLanguage?.code === lang.code}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800 ${
                  selectedLanguage?.code === lang.code ? "bg-slate-100 font-semibold dark:bg-slate-800" : ""
                }`}
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <span className="text-lg" aria-hidden="true">
                  {lang.flagIcon || "🌐"}
                </span>
                <div className="flex flex-col">
                  <span>{lang.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
