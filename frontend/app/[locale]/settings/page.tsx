"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AuthUser, getStoredUser, saveStoredUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

type ProfileResponse = {
  user?: AuthUser & { createdAt?: string; updatedAt?: string };
  plan?: string;
  limits?: {
    dailyLimit: number | null;
    dailyUsed: number;
    dailyRemaining: number | null;
    monthlyUsage?: number;
    daysRemaining?: number | null;
  };
};

export default function SettingsPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";
  const router = useRouter();
  const { t, content } = useLanguage();
  const localizedPath = useLocalizedPath();
  const settingsCopy = (content.settings || {}) as Record<string, any>;
  const profileCopy = settingsCopy.profileCard || {};
  const passwordCopy = settingsCopy.passwordCard || {};
  const usageCopy = settingsCopy.usageCard || {};
  const securityCopy = settingsCopy.securityCard || {};
  const apiCopy = settingsCopy.apiCard || {};
  const statesCopy = settingsCopy.states || {};

  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = getStoredUser();
    setUser(currentUser);
    setReady(true);
    if (!currentUser) {
      router.replace(localizedPath("/auth/login"));
    }

    const handleAuthChange = () => {
      const nextUser = getStoredUser();
      setUser(nextUser);
      if (!nextUser) {
        router.replace(localizedPath("/auth/login"));
      }
    };

    window.addEventListener("copyboost-auth-changed", handleAuthChange);
    return () => window.removeEventListener("copyboost-auth-changed", handleAuthChange);
  }, [router, localizedPath]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchProfile = async () => {
      setLoadingProfile(true);
      setProfileError(null);
      try {
        const res = await fetch(`${apiBase}/auth/me`, {
          headers: { "x-user-id": user.id as string },
        });
        const body = await res.json().catch(() => null);
        if (!res.ok) {
          const message =
            body?.message ||
            (Array.isArray(body?.message) ? body.message.join(", ") : null) ||
            `Profil alınamadı (HTTP ${res.status}).`;
          throw new Error(message);
        }
        setProfile(body as ProfileResponse);
        setNameInput((body?.user?.name || "").trim());
      } catch (error) {
        const message = error instanceof Error ? error.message : "Profil bilgisi alınamadı.";
        setProfileError(message);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [apiBase, user]);

  const emailValue = useMemo(() => profile?.user?.email || user?.email || "", [profile, user]);
  const planLabel = profile?.plan ? profile.plan.toUpperCase() : "FREE";
  const dailyLimit = profile?.limits?.dailyLimit ?? null;
  const dailyUsed = profile?.limits?.dailyUsed ?? 0;
  const dailyRemaining = profile?.limits?.dailyRemaining ?? null;
  const monthlyUsage = profile?.limits?.monthlyUsage ?? null;

  const handleProfileSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    setProfileError(null);
    setProfileSuccess(null);

    setSavingProfile(true);
    try {
      const res = await fetch(`${apiBase}/auth/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id as string,
        },
        body: JSON.stringify({ name: nameInput.trim() || null }),
      });
      const body = await res.json().catch(() => null);

      if (!res.ok) {
        const message =
          body?.message ||
          (Array.isArray(body?.message) ? body.message.join(", ") : null) ||
          `Güncelleme başarısız (HTTP ${res.status}).`;
        throw new Error(message);
      }

      if (body?.user) {
        const updatedUser = { ...user, ...body.user };
        setUser(updatedUser);
        saveStoredUser(updatedUser);
        setProfile((prev) => ({ ...(prev || {}), user: body.user }));
      }

      setProfileSuccess(body?.message || "Profil güncellendi.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu.";
      setProfileError(message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      setPasswordError("Lütfen mevcut ve yeni şifrenizi girin.");
      return;
    }

    setSavingPassword(true);
    try {
      const res = await fetch(`${apiBase}/auth/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id as string,
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const body = await res.json().catch(() => null);

      if (!res.ok) {
        const message =
          body?.message ||
          (Array.isArray(body?.message) ? body.message.join(", ") : null) ||
          `Şifre güncelleme başarısız (HTTP ${res.status}).`;
        throw new Error(message);
      }

      setPasswordSuccess(body?.message || "Şifre güncellendi.");
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu.";
      setPasswordError(message);
    } finally {
      setSavingPassword(false);
    }
  };

  if (!ready) {
    return (
      <div className="container py-10">
        <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-slate-600">
            {statesCopy.loading || t("settings.states.loading", "Yükleniyor...")}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-10">
        <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-slate-600">
            {statesCopy.loginRequired ||
              t("settings.states.loginRequired", "Hesap ayarları için giriş yapmalısınız. Yönlendiriliyorsunuz...")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            {settingsCopy.badge || t("settings.badge", "Profil & Güvenlik")}
          </p>
          <h1 className="text-3xl font-bold text-primary">
            {settingsCopy.title || t("settings.title", "Hesap ayarları")}
          </h1>
          <p className="text-slate-600">
            {settingsCopy.description ||
              t(
                "settings.description",
                "Bilgilerinizi güncelleyin, şifrenizi değiştirin. Email adresi güvenlik için değiştirilemez.",
              )}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold shadow-sm">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
            {usageCopy.planLabel || t("settings.usageCard.planLabel", "Plan")}
          </span>
          <span className="text-primary">{planLabel}</span>
        </div>
      </div>

      {profileError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {profileError}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <form onSubmit={handleProfileSave} className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  {profileCopy.title || t("settings.profileCard.title", "Profil bilgileri")}
                </p>
                <p className="text-xs text-slate-500">
                  {profileCopy.subtitle ||
                    t("settings.profileCard.subtitle", "Ad-soyadınızı güncelleyin, email sabittir.")}
                </p>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold text-green-700">
                {settingsCopy.statusBadge || t("settings.statusBadge", "Giriş yapıldı")}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700" htmlFor="name">
                  {profileCopy.nameLabel || t("settings.profileCard.nameLabel", "Ad Soyad")}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={profileCopy.namePlaceholder || t("settings.profileCard.namePlaceholder", "Örn: Ayşe Yılmaz")}
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  disabled={savingProfile || loadingProfile}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700" htmlFor="email">
                  {profileCopy.emailLabel || t("settings.profileCard.emailLabel", "Email (değiştirilemez)")}
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-lg border bg-slate-50 px-3 py-2 text-slate-600 outline-none"
                  value={emailValue}
                  disabled
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
              disabled={savingProfile || loadingProfile}
            >
              {savingProfile
                ? t("common.saving", "Kaydediliyor...")
                : profileCopy.saveButton || t("settings.profileCard.saveButton", "Profilimi kaydet")}
            </button>
            {profileSuccess && <p className="text-sm text-green-700">{profileSuccess}</p>}
            {profileError && !loadingProfile && <p className="text-sm text-red-600">{profileError}</p>}
          </form>

          <form onSubmit={handlePasswordSave} className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-700">
                {passwordCopy.title || t("settings.passwordCard.title", "Şifre ve güvenlik")}
              </p>
              <p className="text-xs text-slate-500">
                {passwordCopy.subtitle ||
                  t(
                    "settings.passwordCard.subtitle",
                    "Güçlü bir şifre belirleyin. Şifre değişimi için mevcut şifrenizi doğruluyoruz.",
                  )}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700" htmlFor="currentPassword">
                  {passwordCopy.currentLabel || t("settings.passwordCard.currentLabel", "Mevcut şifre")}
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  disabled={savingPassword}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700" htmlFor="newPassword">
                  {passwordCopy.newLabel || t("settings.passwordCard.newLabel", "Yeni şifre")}
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                  disabled={savingPassword}
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="rounded-full bg-slate-100 px-2 py-1">
                {passwordCopy.chipLength || t("settings.passwordCard.chipLength", "Min 8 karakter")}
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-1">
                {passwordCopy.chipEmail || t("settings.passwordCard.chipEmail", "Email değişmez")}
              </span>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg border border-primary px-4 py-2 font-semibold text-primary hover:bg-slate-50 disabled:opacity-60"
              disabled={savingPassword}
            >
              {savingPassword
                ? passwordCopy.savingText || t("settings.passwordCard.savingText", "Şifre güncelleniyor...")
                : passwordCopy.saveButton || t("settings.passwordCard.saveButton", "Şifremi güncelle")}
            </button>
            {passwordSuccess && <p className="text-sm text-green-700">{passwordSuccess}</p>}
            {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
          </form>
        </div>

        <div className="space-y-4">
          <div className="space-y-3 rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-700">
              {usageCopy.title || t("settings.usageCard.title", "Paket & kullanım")}
            </p>
            <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                <span>{usageCopy.planLabel || t("settings.usageCard.planLabel", "Plan")}</span>
                <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">{planLabel}</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <span>{usageCopy.dailyLimit || t("settings.usageCard.dailyLimit", "Günlük limit")}</span>
                <span className="text-right">
                  {dailyLimit ?? usageCopy.unlimited || t("settings.usageCard.unlimited", "Sınırsız")}
                </span>
                <span>{usageCopy.dailyUsed || t("settings.usageCard.dailyUsed", "Bugün kullanılan")}</span>
                <span className="text-right">{dailyUsed}</span>
                <span>{usageCopy.remaining || t("settings.usageCard.remaining", "Kalan")}</span>
                <span className="text-right">
                  {dailyRemaining ?? usageCopy.unlimited || t("settings.usageCard.unlimited", "Sınırsız")}
                </span>
                <span>{usageCopy.monthlyUsage || t("settings.usageCard.monthlyUsage", "Aylık kullanım")}</span>
                <span className="text-right">
                  {monthlyUsage ?? usageCopy.empty || t("settings.usageCard.empty", "-")}
                </span>
              </div>
            </div>
            <div className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <p className="font-semibold">
                {securityCopy.title || t("settings.securityCard.title", "Güvenlik hatırlatması")}
              </p>
              <p className="text-amber-700">
                {securityCopy.body ||
                  t(
                    "settings.securityCard.body",
                    "Email adresi değiştirilmez ve şifre değişimi için mevcut şifre doğrulanır. Şifrenizi kimseyle paylaşmayın.",
                  )}
              </p>
            </div>
          </div>
          <div className="rounded-xl border bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-sm">
            <p className="text-sm font-semibold text-blue-100">
              {apiCopy.title || t("settings.apiCard.title", "API anahtarı")}
            </p>
            <p className="text-xs text-slate-200">
              {apiCopy.description ||
                t(
                  "settings.apiCard.description",
                  "Kişisel anahtarlar bu alanda görüntülenecek. Şu an için anahtar dağıtımı kısıtlı; talep için support@copyboost.ai.",
                )}
            </p>
            <div className="mt-4 rounded-lg border border-slate-600 bg-slate-800/60 px-4 py-3 font-mono text-xs text-slate-200">
              {apiCopy.placeholder || t("settings.apiCard.placeholder", "sk-live-*************")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
