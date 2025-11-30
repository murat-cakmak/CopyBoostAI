"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DAILY_LIMIT, GenerationHistoryItem, getHistory } from "@/lib/history";
import { AuthUser, getStoredUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

type Profile = {
  plan: string;
  limits?: {
    dailyLimit: number | null;
    dailyUsed: number;
    dailyRemaining: number | null;
  };
};

export default function DashboardPage() {
  const router = useRouter();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);
  const [loadingRemote, setLoadingRemote] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [selected, setSelected] = useState<GenerationHistoryItem | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refreshHistory = () => {
    setHistory(getHistory());
  };

  useEffect(() => {
    const currentUser = getStoredUser();
    setUser(currentUser);
    setReady(true);
    if (!currentUser) {
      router.replace("/auth/login");
    }

    const handleAuthChange = () => {
      const nextUser = getStoredUser();
      setUser(nextUser);
      if (!nextUser) {
        router.replace("/auth/login");
      }
    };

    refreshHistory();

    const handleUpdate = () => refreshHistory();

    window.addEventListener("copyboost-auth-changed", handleAuthChange);
    window.addEventListener("copyboost-history-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("copyboost-auth-changed", handleAuthChange);
      window.removeEventListener("copyboost-history-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [router]);

  useEffect(() => {
    const fetchRemoteHistory = async (userId: string) => {
      setLoadingRemote(true);
      try {
        const res = await fetch(`${apiBase}/content`, {
          headers: { "x-user-id": userId },
        });
        const body = await res.json().catch(() => []);
        if (res.ok && Array.isArray(body)) {
          const mapped: GenerationHistoryItem[] = body.map((item: any) => ({
            id: item.id || `remote-${Math.random().toString(16).slice(2)}`,
            createdAt: item.createdAt,
            input: {
              title: item.input?.title || item.inputTitle || "",
              category: item.input?.category || "",
              platform: item.input?.platform || "",
              language: item.input?.language || "tr",
              tone: item.input?.tone || "",
            },
            output: {
              longDescription: item.output?.longDescription,
              shortDescription: item.output?.shortDescription,
              seoTitle: item.output?.seo?.title,
              seoDescription: item.output?.seo?.description,
              tags: item.output?.tags || [],
            },
            info: undefined,
          }));
          setHistory(mapped);
        }
      } catch (error) {
        // ignore, fallback to local history
      } finally {
        setLoadingRemote(false);
      }
    };

    if (user?.id) {
      const fetchProfile = async () => {
        setLoadingProfile(true);
        try {
          const res = await fetch(`${apiBase}/auth/me`, {
            headers: { "x-user-id": user.id as string },
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

      fetchProfile();
      fetchRemoteHistory(user.id as string);
    }
  }, [apiBase, user]);

  const todayCount = useMemo(() => {
    const today = new Date().toDateString();
    return history.filter((item) => new Date(item.createdAt).toDateString() === today).length;
  }, [history]);

  const effectiveDailyLimit =
    profile?.limits?.dailyLimit !== null && profile?.limits?.dailyLimit !== undefined
      ? profile.limits.dailyLimit
      : DAILY_LIMIT;
  const displayDailyUsed = profile?.limits?.dailyUsed ?? todayCount;
  const displayDailyRemaining = profile?.limits?.dailyRemaining ?? Math.max(effectiveDailyLimit - todayCount, 0);
  const usagePercent = Math.min(
    100,
    Math.round((displayDailyUsed / (effectiveDailyLimit || 1)) * 100)
  );
  const recentItems = history.slice(0, 6);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleCopy = async (key: string, value?: string | null) => {
    const text = (value || "").toString().trim();
    if (!text) return;

    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedKey(key);
        copyTimeoutRef.current = setTimeout(() => setCopiedKey(null), 1500);
      }
    } catch (error) {
      // best-effort copy; failures are silent
      console.error("Copy failed", error);
    }
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

  if (!ready) {
    return (
      <div className="container py-10">
        <div className="rounded-xl border bg-white p-6 shadow-sm text-center">
          <p className="text-sm text-slate-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-10">
        <div className="rounded-xl border bg-white p-6 shadow-sm text-center">
          <p className="text-sm text-slate-600">Yönlendiriliyorsunuz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-primary mt-5">Kullanım özetiniz</h1>
        <p className="text-slate-600">
          Yapılan aramalar ve yanıtlar kaydedildi. Üretim akışının güncel verilerini buradan takip edin.
        </p>
        {loadingRemote && (
          <p className="text-xs text-slate-500">Sunucudan geçmiş içerikler alınıyor...</p>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Plan</p>
          <p className="text-xl font-bold text-primary">
            {profile?.plan && profile.plan !== "free" ? profile.plan.toUpperCase() : "FREE"}
          </p>
          <p className="text-xs text-slate-500">
            Günlük hak:{" "}
            {loadingProfile
              ? "Yükleniyor..."
              : effectiveDailyLimit !== null && effectiveDailyLimit !== undefined
                ? effectiveDailyLimit
                : DAILY_LIMIT}
          </p>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Bugünkü kullanım</p>
          <p className="text-xl font-bold text-primary">
            {displayDailyUsed} / {effectiveDailyLimit}
          </p>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${usagePercent}%` }} />
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Toplam içerik</p>
          <p className="text-xl font-bold text-primary">{history.length}</p>
          <p className="text-xs text-slate-500">
            {loadingRemote ? "Sunucudan alınıyor" : "Kaydedilen içerik sayısı"}
          </p>
        </div>
      </div>
      <div className="space-y-3 rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-primary">Son aramalar ve yanıtlar</p>
          <a href="/generate" className="text-sm font-semibold text-blue-600">
            Yeni içerik oluştur
          </a>
        </div>
        {recentItems.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-600">
            Henüz kayıtlı bir arama yok. Yeni bir ürün girerek sonuçları burada görebilirsiniz.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentItems.map((item) => {
              const preview =
                item.output.shortDescription ||
                item.output.longDescription ||
                item.output.seoDescription ||
                "Yanıt içeriği kaydedilemedi";

              const formattedDate = new Date(item.createdAt).toLocaleString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "short",
              });

              return (
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  key={item.id}
                  className="flex w-full flex-col gap-2 py-3 text-left text-sm text-slate-700 md:flex-row md:items-center md:justify-between hover:bg-slate-50"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-primary">{item.input.title || "Başlık belirtilmedi"}</p>
                    <p className="text-xs text-slate-500">
                      {item.input.platform} • {item.input.language.toUpperCase()} • {item.input.tone}
                    </p>
                    <p className="text-slate-600 w-full break-words md:w-[500px]">
                      {preview}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 text-right text-xs text-slate-500 md:items-end">
                    <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
                      {formattedDate}
                    </span>
                    {item.output.tags && item.output.tags.length > 0 && (
                      <div className="flex flex-wrap justify-end gap-2">
                        {item.output.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-6 sm:items-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase text-slate-400">Başlık</p>
                <h3 className="text-xl font-bold text-primary">{selected.input.title || "Başlık belirtilmedi"}</h3>
                <p className="text-xs text-slate-500">
                  {selected.input.platform} • {selected.input.language.toUpperCase()} • {selected.input.tone}
                </p>
              </div>
              <button
                className="rounded-full border px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase text-slate-400">Uzun açıklama</p>
                  <CopyButton copyKey="modal-long" value={selected.output.longDescription || ""} />
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  {selected.output.longDescription || "—"}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase text-slate-400">Kısa açıklama</p>
                  <CopyButton copyKey="modal-short" value={selected.output.shortDescription || ""} />
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  {selected.output.shortDescription || "—"}
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase text-slate-400">SEO Title</p>
                    <CopyButton copyKey="modal-seo-title" value={selected.output.seoTitle || ""} />
                  </div>
                  <p className="font-semibold">{selected.output.seoTitle || "—"}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase text-slate-400">SEO Description</p>
                    <CopyButton copyKey="modal-seo-description" value={selected.output.seoDescription || ""} />
                  </div>
                  <p>{selected.output.seoDescription || "—"}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase text-slate-400">Tags</p>
                  <CopyButton copyKey="modal-tags" value={(selected.output.tags || []).join(", ")} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {(selected.output.tags || []).length > 0
                    ? (selected.output.tags || []).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700"
                        >
                          #{tag}
                        </span>
                      ))
                    : "—"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
