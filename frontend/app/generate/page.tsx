"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { addGenerationToHistory, DAILY_LIMIT, getHistory } from "@/lib/history";
import { getStoredUser } from "@/lib/auth";

type Profile = {
  limits?: {
    dailyLimit: number | null;
    dailyUsed: number;
    dailyRemaining: number | null;
  };
};

export default function GeneratePage() {
  const selectZoneRef = useRef<HTMLFormElement | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const TITLE_MAX_LENGTH = 120;
  const [form, setForm] = useState({
    title: "",
    category: "giyim",
    platform: "trendyol",
    language: "tr",
    tone: "resmi",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [dailyCount, setDailyCount] = useState(0);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [savedContents, setSavedContents] = useState<
    Array<{
      id: string;
      input: { title?: string; category?: string; platform?: string; language?: string; tone?: string };
      output: {
        longDescription?: string | null;
        shortDescription?: string | null;
        seo?: { title?: string | null; description?: string | null };
        tags?: string[];
      };
      createdAt: string;
    }>
  >([]);
  const [result, setResult] = useState<null | {
    output?: {
      longDescription?: string;
      shortDescription?: string;
      seo?: { title?: string; description?: string };
      tags?: string[];
    };
    info?: string;
  }>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

  const effectiveDailyLimit =
    profile?.limits?.dailyLimit !== null && profile?.limits?.dailyLimit !== undefined
      ? profile.limits.dailyLimit
      : DAILY_LIMIT;
  const serverRemaining =
    profile?.limits?.dailyRemaining !== null && profile?.limits?.dailyRemaining !== undefined
      ? profile.limits.dailyRemaining
      : null;
  const serverLimitReached = serverRemaining !== null && serverRemaining <= 0;
  const limitReached = serverLimitReached || dailyCount >= effectiveDailyLimit;

  const syncDailyCount = () => {
    const today = new Date().toDateString();
    const count = getHistory().filter((item) => new Date(item.createdAt).toDateString() === today).length;
    setDailyCount(count);
  };

  useEffect(() => {
    syncDailyCount();

    const handleUpdate = () => syncDailyCount();
    window.addEventListener("copyboost-history-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpenDropdown(null);
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (selectZoneRef.current && !selectZoneRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("copyboost-history-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const authUser = getStoredUser();
    if (!authUser?.id) {
      setProfile(null);
      setSavedContents([]);
      return;
    }

    const fetchProfile = async () => {
      setLoadingProfile(true);
      try {
        const res = await fetch(`${apiBase}/auth/me`, {
          headers: { "x-user-id": authUser.id as string },
        });
        const body = await res.json().catch(() => null);
        if (res.ok && body) {
          setProfile(body as Profile);
        } else {
          setProfile(null);
        }
      } catch (error) {
        setProfile(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    const fetchContents = async () => {
      try {
        const res = await fetch(`${apiBase}/content`, {
          headers: { "x-user-id": authUser.id as string },
        });
        const body = await res.json().catch(() => []);
        if (res.ok && Array.isArray(body)) {
          setSavedContents(body);
          if (body.length > 0) {
            setResult(body[0]);
          }
        }
      } catch (error) {
        // ignore
      }
    };

    fetchProfile();
    fetchContents();
  }, [apiBase]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const sanitizeTitleInput = (value: string) => value.replace(/[<>]/g, "").slice(0, TITLE_MAX_LENGTH);

  const handleTitleChange = (value: string) => {
    const sanitized = sanitizeTitleInput(value);
    const cleaned = sanitized.replace(/javascript\s*:/gi, "");
    if (sanitized !== cleaned) {
      setTitleError("Ürün başlığında JavaScript kodu kullanamazsınız.");
    } else {
      setTitleError(null);
    }
    setForm((prev) => ({ ...prev, title: cleaned }));
  };

  const handleCopy = async (key: string, value?: string | null) => {
    const text = (value || "").toString().trim();
    if (!text) return;

    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedKey(key);
        copyTimeoutRef.current = setTimeout(() => setCopiedKey(null), 1500);
      } else {
        throw new Error("Clipboard desteklenmiyor");
      }
    } catch (err) {
      setError((prev) => prev || "Kopyalama başarısız oldu.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const cleanedTitle = sanitizeTitleInput(form.title);
    const hasJsPayload = /javascript\s*:/i.test(cleanedTitle);
    if (!cleanedTitle.trim()) {
      setError("Lütfen geçerli bir ürün başlığı girin.");
      setForm((prev) => ({ ...prev, title: "" }));
      return;
    }
    if (hasJsPayload) {
      setError("Ürün başlığında JavaScript kodu kullanamazsınız.");
      setForm((prev) => ({ ...prev, title: cleanedTitle.replace(/javascript\s*:/gi, "") }));
      return;
    }
    if (cleanedTitle !== form.title) {
      setForm((prev) => ({ ...prev, title: cleanedTitle }));
    }
    if (titleError) {
      setError(titleError);
      return;
    }

    if (limitReached) {
      const message =
        serverLimitReached && serverRemaining !== null
          ? `Günlük hakkınız doldu. Kalan: 0 / ${effectiveDailyLimit}`
          : `Günlük ${effectiveDailyLimit} üretim hakkınız doldu. Yarın tekrar deneyin.`;
      setError(message);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const authUser = getStoredUser();
      const res = await fetch(`${apiBase}/content/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authUser?.id ? { "x-user-id": authUser.id } : {}),
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        let message = `API ${res.status} hatası`;
        try {
          const errorBody = await res.json();
          if (typeof errorBody?.message === "string") {
            message = errorBody.message;
          } else if (Array.isArray(errorBody?.message)) {
            message = errorBody.message.join(", ");
          }
        } catch {
          const text = await res.text();
          if (text) message = text;
        }
        throw new Error(message);
      }

      const data = await res.json();
      setResult(data);

      addGenerationToHistory({
        id:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `gen-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        createdAt: new Date().toISOString(),
        input: form,
        output: {
          longDescription: data?.output?.longDescription,
          shortDescription: data?.output?.shortDescription,
          seoTitle: data?.output?.seo?.title,
          seoDescription: data?.output?.seo?.description,
          tags: data?.output?.tags || [],
        },
        info: data?.info,
      });

      setDailyCount((prev) => prev + 1);

      // Refresh saved contents for logged-in users so UI reads from DB
      if (authUser?.id) {
        try {
          const resList = await fetch(`${apiBase}/content`, {
            headers: { "x-user-id": authUser.id as string },
          });
          const body = await resList.json().catch(() => []);
          if (resList.ok && Array.isArray(body)) {
            setSavedContents(body);
          }
        } catch (err) {
          // ignore best-effort
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Bilinmeyen hata";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const renderSelectField = (
    id: "category" | "platform" | "language" | "tone",
    label: string,
    value: string,
    options: Array<{ value: string; label: string }>
  ) => {
    const selectedLabel = options.find((opt) => opt.value === value)?.label || value;

    return (
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700" htmlFor={id}>
          {label}
        </label>
        <div className="md:hidden">
          <div className="relative">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              onClick={() => setOpenDropdown((prev) => (prev === id ? null : id))}
            >
              <span>{selectedLabel}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 text-slate-500 transition-transform ${openDropdown === id ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === id && (
              <div className="absolute left-0 right-0 z-20 mt-1 max-h-60 overflow-y-auto rounded-lg border bg-white shadow-lg">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`flex w-full items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 ${
                      value === opt.value ? "font-semibold text-primary" : ""
                    }`}
                    onClick={() => {
                      setForm((prev) => ({ ...prev, [id]: opt.value }));
                      setOpenDropdown(null);
                    }}
                  >
                    <span>{opt.label}</span>
                    {value === opt.value && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <select
          id={id}
          className="hidden w-full rounded-lg border px-3 py-2 outline-none focus:border-primary md:block"
          value={value}
          onChange={(e) => setForm((prev) => ({ ...prev, [id]: e.target.value }))}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const CopyButton = ({ copyKey, value }: { copyKey: string; value?: string | null }) => (
    <button
      type="button"
      onClick={() => handleCopy(copyKey, value)}
      disabled={!value || !value.toString().trim()}
      className="flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      title={copiedKey === copyKey ? "Kopyalandı" : "Sonucu kopyala"}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      <span>{copiedKey === copyKey ? "Kopyalandı" : "Kopyala"}</span>
    </button>
  );

  const seoTitleText = result?.output?.seo?.title || "Meta title";
  const seoDescriptionText = result?.output?.seo?.description || "Meta description placeholder.";
  const seoCopyText = [result?.output?.seo?.title, result?.output?.seo?.description].filter(Boolean).join("\n");
  const tagsList = result?.output?.tags || ["organik", "pamuk", "tişört", "sürdürülebilir"];
  const tagsCopyText = (result?.output?.tags || []).join(", ");

  return (
    <div className="container py-10 space-y-6">
      <div className="max-w-3xl space-y-2">
        <h1 className="text-3xl font-bold text-primary mt-5">Ürün detaylarını girin ve AI çıktısını alın</h1>
        <p className="text-slate-600">
          CopyBoost AI, Trendyol, Hepsiburada, Amazon, Shopify ve sosyal medya satış kanallarındaki satıcılar için saniyeler içinde SEO uyumlu ürün açıklamaları, meta başlıklar ve etiket önerileri oluşturan bir yapay zekâ aracıdır. Hız, satış artırma ve SEO avantajlarını bir arada sunar.
        </p>
        {limitReached && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Günlük {effectiveDailyLimit} üretim hakkınız doldu. Yarın tekrar deneyebilir veya plan yükseltebilirsiniz.
          </div>
        )}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-white p-6 shadow-sm" ref={selectZoneRef}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="title">
              Ürün başlığı
            </label>
            <input
              id="title"
              type="text"
              placeholder="Örn: Organik pamuk tişört"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              maxLength={TITLE_MAX_LENGTH}
            />
            <div className="flex items-center justify-between text-xs">
              {titleError ? <span className="text-red-600">{titleError}</span> : <span className="text-slate-500">JavaScript kodu kabul edilmez</span>}
              <span className="text-slate-500">
                {form.title.length}/{TITLE_MAX_LENGTH}
              </span>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {renderSelectField("category", "Kategori", form.category, [
              { value: "giyim", label: "Giyim" },
              { value: "elektronik", label: "Elektronik" },
              { value: "kozmetik", label: "Kozmetik" },
            ])}
            {renderSelectField("platform", "Platform", form.platform, [
              { value: "trendyol", label: "Trendyol" },
              { value: "hepsiburada", label: "Hepsiburada" },
              { value: "amazon", label: "Amazon" },
              { value: "shopify", label: "Shopify" },
            ])}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {renderSelectField("language", "Hedef dil", form.language, [
              { value: "tr", label: "Türkçe" },
              { value: "en", label: "İngilizce" },
            ])}
            {renderSelectField("tone", "Ton", form.tone, [
              { value: "resmi", label: "Resmi" },
              { value: "samimi", label: "Samimi" },
              { value: "eglenceli", label: "Eğlenceli" },
              { value: "teknik", label: "Teknik" },
            ])}
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
            disabled={loading || limitReached || loadingProfile}
          >
            {loading
              ? "Üretiliyor..."
              : loadingProfile
                ? "Limit kontrol ediliyor..."
                : "Generate"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <p className="text-xs text-slate-500">
            Bugünkü kullanım: {dailyCount} / {effectiveDailyLimit}{" "}
            {serverRemaining !== null ? `(sunucu kalan: ${Math.max(serverRemaining, 0)})` : ""}
          </p>
        </form>
        <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">Sonuçlar</p>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {loading ? "İstek gönderiliyor" : result ? "Hazır" : "Taslak"}
            </span>
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-slate-400">Uzun açıklama</p>
                <CopyButton copyKey="longDescription" value={result?.output?.longDescription} />
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                {result?.output?.longDescription || "Başlatmak için ürünü doldurun. API yanıtı burada görünecek."}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-slate-400">Kısa açıklama</p>
                <CopyButton copyKey="shortDescription" value={result?.output?.shortDescription} />
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                {result?.output?.shortDescription || "Öne çıkan madde ve bullet point örnekleri."}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-slate-400">SEO meta</p>
                <CopyButton copyKey="seoMeta" value={seoCopyText} />
              </div>
              <div className="rounded-lg bg-slate-50 p-3 space-y-1">
                <div className="font-semibold">{seoTitleText}</div>
                <div>{seoDescriptionText}</div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-slate-400">Tags / keywords</p>
                <CopyButton copyKey="tags" value={tagsCopyText || tagsList.join(", ")} />
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                {tagsList.join(", ")}
              </div>
            </div>
            {result?.info && (
              <div className="rounded-lg bg-blue-50 p-3 text-blue-700 text-xs">
                {result.info}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
