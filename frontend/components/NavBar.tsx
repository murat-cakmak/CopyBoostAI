"use client";

import { useEffect, useRef, useState } from "react";
import { AuthUser, clearStoredUser, getStoredUser } from "@/lib/auth";
import { useTheme } from "next-themes";

export function NavBar() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
    const onChange = () => setUser(getStoredUser());
    window.addEventListener("copyboost-auth-changed", onChange);
    return () => window.removeEventListener("copyboost-auth-changed", onChange);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials =
    (user?.name || user?.email || "")
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2) || "CB";

  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-primary text-white grid place-items-center font-semibold">
            {initials}
          </div>
          <div>
            <p className="text-lg font-semibold">CopyBoost AI</p>
            <p className="text-sm text-slate-500">E-ticaret için üretken içerik</p>
          </div>
        </div>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <a href="/" className="hover:text-primary">
            Ana sayfa
          </a>
          <a href="/dashboard" className="hover:text-primary">
            Dashboard
          </a>
          <a href="/generate" className="hover:text-primary">
            Üretici
          </a>
          <a href="/billing" className="hover:text-primary">
            Billing
          </a>
          {mounted && (
            <button
              type="button"
              onClick={() => {
                const next =
                  resolvedTheme === "dark"
                    ? "light"
                    : resolvedTheme === "light"
                      ? "dark"
                      : systemTheme === "dark"
                        ? "light"
                        : "dark";
                setTheme(next || "system");
              }}
              aria-label="Tema değiştir"
              className="flex h-9 w-9 items-center justify-center rounded-full border text-slate-700 hover:bg-slate-100"
            >
              {resolvedTheme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
                  <path d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM12 19.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V20.25a.75.75 0 01.75-.75zM4.72 4.72a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.72 5.78a.75.75 0 010-1.06zM17.16 17.16a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM19.5 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM6.78 17.16a.75.75 0 010 1.06L5.72 19.28a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM18.28 4.72a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
          )}
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border px-3 py-1 hover:border-primary"
              >
                <div className="h-7 w-7 rounded-full bg-slate-900 text-white grid place-items-center text-xs font-semibold">
                  {initials}
                </div>
                <div className="leading-tight text-left">
                  <div className="font-semibold text-slate-800 text-xs sm:text-sm">
                    {user.name || user.email}
                  </div>
                  <div className="text-[11px] text-slate-500">{user.role || "user"}</div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 text-slate-500 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white p-2 shadow-lg">
                  {user.role === "admin" && (
                    <a
                      href="/admin"
                      className="block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      Admin sayfası
                    </a>
                  )}
                  <button
                    className="w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                    onClick={() => {
                      clearStoredUser();
                      setMenuOpen(false);
                    }}
                  >
                    Çıkış yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="/auth/login" className="hover:text-primary">
              Giriş yap
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
