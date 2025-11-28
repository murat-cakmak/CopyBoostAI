"use client";

import { FormEvent, useEffect, useState } from "react";
import { addGenerationToHistory, DAILY_LIMIT, getHistory } from "@/lib/history";

export default function GeneratePage() {
  const [form, setForm] = useState({
    title: "",
    category: "giyim",
    platform: "trendyol",
    language: "tr",
    tone: "resmi",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dailyCount, setDailyCount] = useState(0);
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

  const limitReached = dailyCount >= DAILY_LIMIT;

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

    return () => {
      window.removeEventListener("copyboost-history-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (limitReached) {
      setError(`Günlük ${DAILY_LIMIT} üretim hakkınız doldu. Yarın tekrar deneyin.`);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${apiBase}/content/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `API ${res.status} hatası`);
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
    } catch (err) {
      const message = err instanceof Error ? err.message : "Bilinmeyen hata";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10 space-y-6">
      <div className="max-w-3xl space-y-2">
        <p className="text-sm font-semibold text-blue-600">İçerik üretimi</p>
        <h1 className="text-3xl font-bold text-primary">Ürün detaylarını girin ve AI çıktısını alın</h1>
        <p className="text-slate-600">
          Form alanları ve prompt varyasyonları için temel iskelet. Backend API bağlandığında gerçek zamanlı
          yanıtları gösterecek.
        </p>
        {limitReached && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Günlük {DAILY_LIMIT} üretim hakkınız doldu. Yarın tekrar deneyebilir veya plan yükseltebilirsiniz.
          </div>
        )}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
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
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700" htmlFor="category">
                Kategori
              </label>
              <select
                id="category"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              >
                <option value="giyim">Giyim</option>
                <option value="elektronik">Elektronik</option>
                <option value="kozmetik">Kozmetik</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700" htmlFor="platform">
                Platform
              </label>
              <select
                id="platform"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
                value={form.platform}
                onChange={(e) => setForm((prev) => ({ ...prev, platform: e.target.value }))}
              >
                <option value="trendyol">Trendyol</option>
                <option value="hepsiburada">Hepsiburada</option>
                <option value="amazon">Amazon</option>
                <option value="shopify">Shopify</option>
              </select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700" htmlFor="language">
                Hedef dil
              </label>
              <select
                id="language"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
                value={form.language}
                onChange={(e) => setForm((prev) => ({ ...prev, language: e.target.value }))}
              >
                <option value="tr">Türkçe</option>
                <option value="en">İngilizce</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700" htmlFor="tone">
                Ton
              </label>
              <select
                id="tone"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
                value={form.tone}
                onChange={(e) => setForm((prev) => ({ ...prev, tone: e.target.value }))}
              >
                <option value="resmi">Resmi</option>
                <option value="samimi">Samimi</option>
                <option value="eglenceli">Eğlenceli</option>
                <option value="teknik">Teknik</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
            disabled={loading || limitReached}
          >
            {loading ? "Üretiliyor..." : "Generate"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <p className="text-xs text-slate-500">
            Bugünkü kullanım: {dailyCount} / {DAILY_LIMIT}
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
              <p className="text-xs uppercase text-slate-400">Uzun açıklama</p>
              <div className="rounded-lg bg-slate-50 p-3">
                {result?.output?.longDescription || "Başlatmak için ürünü doldurun. API yanıtı burada görünecek."}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">Kısa açıklama</p>
              <div className="rounded-lg bg-slate-50 p-3">
                {result?.output?.shortDescription || "Öne çıkan madde ve bullet point örnekleri."}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">SEO meta</p>
              <div className="rounded-lg bg-slate-50 p-3 space-y-1">
                <div className="font-semibold">{result?.output?.seo?.title || "Meta title"}</div>
                <div>{result?.output?.seo?.description || "Meta description placeholder."}</div>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">Tags / keywords</p>
              <div className="rounded-lg bg-slate-50 p-3">
                {(result?.output?.tags || ["organik", "pamuk", "tişört", "sürdürülebilir"]).join(", ")}
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
