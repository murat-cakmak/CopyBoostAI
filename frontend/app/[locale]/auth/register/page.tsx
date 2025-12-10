"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

export default function RegisterPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";
  const { t } = useLanguage();
  const localizedPath = useLocalizedPath();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.email || !form.password) {
      setError(t("authPages.register.requiredError", "Email ve parola zorunlu."));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message =
          body?.message ||
          (Array.isArray(body?.message) ? body.message.join(", ") : null) ||
          `${t("authPages.register.failed", "Kayıt başarısız")} (HTTP ${res.status}).`;
        throw new Error(message);
      }

      setSuccess(t("authPages.register.success", "Kayıt başarılı! Giriş yapabilirsiniz."));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t("authPages.register.genericError", "Beklenmeyen hata.");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold text-blue-600">{t("authPages.register.badge", "Kayıt ol")}</p>
          <h1 className="text-2xl font-bold text-primary">{t("authPages.register.heading", "Ücretsiz başlayın")}</h1>
          <p className="text-sm text-slate-600">
            {t("authPages.register.description", "Free plan ile günde 5 içerik üretin, Pro planla sınırsız.")}
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t("authPages.register.namePlaceholder", "Ad Soyad")}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
          <input
            type="email"
            placeholder={t("authPages.register.emailPlaceholder", "Email")}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
          <input
            type="password"
            placeholder={t("authPages.register.passwordPlaceholder", "Şifre (en az 8 karakter)")}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? t("authPages.register.loading", "Kaydediliyor...") : t("authPages.register.submit", "Hesap oluştur")}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-700">{success}</p>}
        </form>
        <button className="w-full rounded-lg border border-primary px-4 py-2 font-semibold text-primary hover:bg-slate-50">
          {t("authPages.register.google", "Google ile devam et")}
        </button>
        <p className="text-center text-sm text-slate-600">
          {t("authPages.register.switchText", "Zaten hesabınız var mı?")}{" "}
          <a className="font-semibold text-blue-600" href={localizedPath("/auth/login")}>
            {t("authPages.register.switchLink", "Giriş yap")}
          </a>
        </p>
      </div>
    </div>
  );
}
