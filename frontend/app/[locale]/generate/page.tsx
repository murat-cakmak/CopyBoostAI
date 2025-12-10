"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { addGenerationToHistory, DAILY_LIMIT, getHistory } from "@/lib/history";
import { getStoredUser } from "@/lib/auth";
import { useLanguage } from "@/components/LanguageProvider";

type Profile = {
  limits?: {
    dailyLimit: number | null;
    dailyUsed: number;
    dailyRemaining: number | null;
  };
};

export default function GeneratePage() {
  const { t, content, languages, selectedLanguage } = useLanguage();
  const generateCopy = (content.generate || {}) as Record<string, any>;
  const selectZoneRef = useRef<HTMLFormElement | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const TITLE_MAX_LENGTH = 120;
  const errorsCopy = (generateCopy.errors || {}) as Record<string, string>;
  const buttonCopy = (generateCopy.button || {}) as Record<string, string>;
  const fieldsCopy = (generateCopy.fields || {}) as Record<string, string>;
  const placeholdersCopy = (generateCopy.placeholders || {}) as Record<string, string>;
  const usageLabelTemplate = generateCopy.usageLabel || "Bugünkü kullanım: {{count}} / {{limit}}";
  const usageServerTemplate = generateCopy.usageServerLabel || "(sunucu kalan: {{remaining}})";
  const copyTooltip = generateCopy.copyTooltip || t("common.copyTooltip", "Sonucu kopyala");
  const missingTitleMessage =
    errorsCopy.missingTitle || t("generate.errors.missingTitle", "Lütfen geçerli bir ürün başlığı girin.");
  const noJsMessage =
    errorsCopy.noJavascript ||
    t("generate.errors.noJavascript", "Ürün başlığında JavaScript kodu kullanamazsınız.");
  const clipboardUnsupportedMessage =
    errorsCopy.clipboardUnsupported || t("generate.errors.clipboardUnsupported", "Clipboard desteklenmiyor");
  const copyFailedMessage =
    errorsCopy.copyFailed || t("generate.errors.copyFailed", "Kopyalama başarısız oldu.");
  const unknownErrorMessage = errorsCopy.unknown || t("generate.errors.unknown", "Bilinmeyen hata");
  const heroTitle = generateCopy.heroTitle || t("generate.heroTitle", "Ürün detaylarını girin ve AI çıktısını alın");
  const heroDescription =
    generateCopy.heroDescription ||
    t(
      "generate.heroDescription",
      "CopyBoost AI, Trendyol, Hepsiburada, Amazon, Shopify ve sosyal medya satış kanallarındaki satıcılar için saniyeler içinde SEO uyumlu ürün açıklamaları, meta başlıklar ve etiket önerileri oluşturan bir yapay zekâ aracıdır. Hız, satış artırma ve SEO avantajlarını bir arada sunar.",
    );
  const [form, setForm] = useState(() => ({
    title: "",
    category: "giyim",
    platform: "trendyol",
    language: selectedLanguage?.code || "tr",
    tone: "resmi",
  }));
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
  const categoryOptions = [
    { value: "giyim", label: generateCopy.categories?.giyim || "👕 Giyim & Moda" },
    { value: "elektronik", label: generateCopy.categories?.elektronik || "🔌 Elektronik" },
    { value: "kozmetik", label: generateCopy.categories?.kozmetik || "💄 Kozmetik & Bakım" },
    { value: "ev-yasam", label: generateCopy.categories?.["ev-yasam"] || "🏠 Ev & Yaşam" },
    { value: "spor-outdoor", label: generateCopy.categories?.["spor-outdoor"] || "🏃‍♂️ Spor & Outdoor" },
    { value: "anne-bebek", label: generateCopy.categories?.["anne-bebek"] || "🍼 Anne & Bebek" },
    { value: "pet", label: generateCopy.categories?.pet || "🐾 Evcil Hayvan" },
    { value: "market", label: generateCopy.categories?.market || "🛒 Market & Gıda" },
    { value: "oto-aksesuar", label: generateCopy.categories?.["oto-aksesuar"] || "🚗 Otomotiv & Aksesuar" },
    { value: "hobi-sanat", label: generateCopy.categories?.["hobi-sanat"] || "🎨 Hobi & Sanat" },
  ];
  const platformOptions = [
    { value: "trendyol", label: generateCopy.platforms?.trendyol || "🧡 Trendyol" },
    { value: "hepsiburada", label: generateCopy.platforms?.hepsiburada || "🟠 Hepsiburada" },
    { value: "amazon", label: generateCopy.platforms?.amazon || "🛒 Amazon" },
    { value: "shopify", label: generateCopy.platforms?.shopify || "🛍️ Shopify" },
    { value: "etsy", label: generateCopy.platforms?.etsy || "🧵 Etsy" },
    { value: "aliexpress", label: generateCopy.platforms?.aliexpress || "🌏 AliExpress" },
    { value: "instagram", label: generateCopy.platforms?.instagram || "📸 Instagram" },
    { value: "tiktok", label: generateCopy.platforms?.tiktok || "🎵 TikTok" },
    { value: "facebook", label: generateCopy.platforms?.facebook || "📘 Facebook" },
    { value: "youtube", label: generateCopy.platforms?.youtube || "▶️ YouTube" },
    { value: "pinterest", label: generateCopy.platforms?.pinterest || "📌 Pinterest" },
  ];
  const languageLabels = (generateCopy.languages || {}) as Record<string, string>;
  const languageOptions =
    languages.map((lang) => {
      const localizedLabel = languageLabels[lang.code];
      const fallbackLabel =
        localizedLabel ||
        [lang.flagIcon, lang.name].filter(Boolean).join(" ").trim() ||
        lang.code.toUpperCase();
      return {
        value: lang.code,
        label: fallbackLabel,
      };
    }) || [];
  const toneOptions = [
    { value: "resmi", label: generateCopy.tones?.resmi || "🏛️ Resmi" },
    { value: "samimi", label: generateCopy.tones?.samimi || "🤗 Samimi" },
    { value: "eglenceli", label: generateCopy.tones?.eglenceli || "🎉 Eğlenceli" },
    { value: "teknik", label: generateCopy.tones?.teknik || "🧠 Teknik" },
    { value: "ikna-edici", label: generateCopy.tones?.["ikna-edici"] || "🧲 İkna Edici" },
    { value: "hikaye", label: generateCopy.tones?.hikaye || "📖 Hikaye Anlatımı" },
    { value: "minimal", label: generateCopy.tones?.minimal || "🌿 Minimal" },
    { value: "premium", label: generateCopy.tones?.premium || "💎 Premium" },
    { value: "dinamik", label: generateCopy.tones?.dinamik || "⚡ Dinamik" },
    { value: "acil-kampanya", label: generateCopy.tones?.["acil-kampanya"] || "⏱️ Acil / FOMO" },
  ];

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
  const getLimitMessage = () => {
    const template =
      serverLimitReached && serverRemaining !== null
        ? generateCopy.limitReachedServer || "Günlük hakkınız doldu. Kalan: 0 / {{limit}}"
        : generateCopy.limitReached || "Günlük {{limit}} üretim hakkınız doldu. Yarın tekrar deneyin.";
    return template.replace("{{limit}}", String(effectiveDailyLimit));
  };

  const syncDailyCount = () => {
    const today = new Date().toDateString();
    const count = getHistory().filter((item) => new Date(item.createdAt).toDateString() === today).length;
    setDailyCount(count);
  };

  useEffect(() => {
    if (!selectedLanguage?.code) return;
    setForm((prev) => {
      if (prev.language === selectedLanguage.code) return prev;
      return { ...prev, language: selectedLanguage.code };
    });
  }, [selectedLanguage?.code]);

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
      setTitleError(noJsMessage);
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
        throw new Error(clipboardUnsupportedMessage);
      }
    } catch (err) {
      setError((prev) => prev || copyFailedMessage);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const cleanedTitle = sanitizeTitleInput(form.title);
    const hasJsPayload = /javascript\s*:/i.test(cleanedTitle);
    if (!cleanedTitle.trim()) {
      setError(missingTitleMessage);
      setForm((prev) => ({ ...prev, title: "" }));
      return;
    }
    if (hasJsPayload) {
      setError(noJsMessage);
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
      setError(getLimitMessage());
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
        let message = `${errorsCopy.apiErrorPrefix || t("generate.errors.apiErrorPrefix", "API hatası")} ${res.status}`;
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
      const message = err instanceof Error ? err.message : unknownErrorMessage;
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
      title={copiedKey === copyKey ? t("common.copied", "Kopyalandı") : copyTooltip}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      <span>{copiedKey === copyKey ? t("common.copied", "Kopyalandı") : t("common.copy", "Kopyala")}</span>
    </button>
  );

  const seoTitleText = result?.output?.seo?.title || placeholdersCopy.seoTitle || "Meta title";
  const seoDescriptionText =
    result?.output?.seo?.description || placeholdersCopy.seoDescription || "Meta description placeholder.";
  const seoCopyText = [result?.output?.seo?.title, result?.output?.seo?.description].filter(Boolean).join("\n");
  const tagsList = result?.output?.tags || ["organik", "pamuk", "tişört", "sürdürülebilir"];
  const tagsCopyText = (result?.output?.tags || []).join(", ");

  return (
    <div className="container py-10 space-y-6">
      <div className="max-w-3xl space-y-2">
        <h1 className="text-3xl font-bold text-primary mt-5">{heroTitle}</h1>
        <p className="text-slate-600">{heroDescription}</p>
        {limitReached && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {getLimitMessage()}
          </div>
        )}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-white p-6 shadow-sm" ref={selectZoneRef}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="title">
              {generateCopy.titleLabel || t("generate.titleLabel", "Ürün başlığı")}
            </label>
            <input
              id="title"
              type="text"
              placeholder={generateCopy.titlePlaceholder || t("generate.titlePlaceholder", "Örn: Organik pamuk tişört")}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              maxLength={TITLE_MAX_LENGTH}
            />
            <div className="flex items-center justify-between text-xs">
              {titleError ? (
                <span className="text-red-600">{titleError}</span>
              ) : (
                <span className="text-slate-500">
                  {generateCopy.titleHint || t("generate.titleHint", "JavaScript kodu kabul edilmez")}
                </span>
              )}
              <span className="text-slate-500">
                {form.title.length}/{TITLE_MAX_LENGTH}
              </span>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {renderSelectField("category", generateCopy.categoryLabel || t("generate.categoryLabel", "Kategori"), form.category, categoryOptions)}
            {renderSelectField("platform", generateCopy.platformLabel || t("generate.platformLabel", "Platform"), form.platform, platformOptions)}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {renderSelectField("language", generateCopy.languageLabel || t("generate.languageLabel", "Hedef dil"), form.language, languageOptions)}
            {renderSelectField("tone", generateCopy.toneLabel || t("generate.toneLabel", "Ton"), form.tone, toneOptions)}
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
            disabled={loading || limitReached || loadingProfile}
          >
            {loading
              ? buttonCopy.loading || t("generate.button.loading", "Üretiliyor...")
              : loadingProfile
                ? buttonCopy.checking || t("generate.button.checking", "Limit kontrol ediliyor...")
                : buttonCopy.default || t("generate.button.default", "Üret")}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <p className="text-xs text-slate-500">
            {usageLabelTemplate
              .replace("{{count}}", String(dailyCount))
              .replace("{{limit}}", String(effectiveDailyLimit))}{" "}
            {serverRemaining !== null
              ? usageServerTemplate.replace("{{remaining}}", String(Math.max(serverRemaining, 0)))
              : ""}
          </p>
        </form>
        <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">
              {generateCopy.resultsTitle || t("generate.resultsTitle", "Sonuçlar")}
            </p>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {loading
                ? generateCopy.resultStatus?.sending || t("generate.resultStatus.sending", "İstek gönderiliyor")
                : result
                  ? generateCopy.resultStatus?.ready || t("generate.resultStatus.ready", "Hazır")
                  : generateCopy.resultStatus?.draft || t("generate.resultStatus.draft", "Taslak")}
            </span>
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-slate-400">
                  {fieldsCopy.long || t("generate.fields.long", "Uzun açıklama")}
                </p>
                <CopyButton copyKey="longDescription" value={result?.output?.longDescription} />
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                {result?.output?.longDescription ||
                  placeholdersCopy.long ||
                  t("generate.placeholders.long", "Başlatmak için ürünü doldurun. API yanıtı burada görünecek.")}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-slate-400">
                  {fieldsCopy.short || t("generate.fields.short", "Kısa açıklama")}
                </p>
                <CopyButton copyKey="shortDescription" value={result?.output?.shortDescription} />
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                {result?.output?.shortDescription ||
                  placeholdersCopy.short ||
                  t("generate.placeholders.short", "Öne çıkan madde ve bullet point örnekleri.")}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-slate-400">
                  {fieldsCopy.seoMeta || t("generate.fields.seoMeta", "SEO meta")}
                </p>
                <CopyButton copyKey="seoMeta" value={seoCopyText} />
              </div>
              <div className="rounded-lg bg-slate-50 p-3 space-y-1">
                <div className="font-semibold">{seoTitleText}</div>
                <div>{seoDescriptionText}</div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-slate-400">
                  {fieldsCopy.tags || t("generate.fields.tags", "Tags / keywords")}
                </p>
                <CopyButton copyKey="tags" value={tagsCopyText || tagsList.join(", ")} />
              </div>
              <div className="rounded-lg bg-slate-50 p-3">{tagsList.join(", ")}</div>
            </div>
            {result?.info && (
              <div className="rounded-lg bg-blue-50 p-3 text-blue-700 text-xs">{result.info}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
