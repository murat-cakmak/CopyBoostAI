"use client";

import { useEffect, useState } from "react";
import { getStoredUser, type AuthUser } from "@/lib/auth";
import { DAILY_LIMIT, getHistory } from "@/lib/history";

type Profile = {
  user: AuthUser;
  plan: string;
  limits?: {
    dailyLimit: number | null;
    dailyUsed: number;
    dailyRemaining: number | null;
    monthlyUsage: number;
    daysRemaining: number | null;
  };
};

const features = [
  {
    title: "Saniyeler içinde hazır açıklama",
    description: "Ürün başlığından, platforma uygun uzun ve kısa açıklamaları saniyede alın."
  },
  {
    title: "Pazaryeri uyumu",
    description: "Trendyol, Hepsiburada, Amazon, Shopify için otomatik format ve dil tonları."
  },
  {
    title: "Sabit kalite, sabit hız",
    description: "Her üründe tutarlı SEO odaklı içerik ve hızlı teslimat."
  },
  {
    title: "Ekstra zaman kazancı",
    description: "Manuel içerik yazımına harcadığınız süreyi operasyon ve satışa ayırın."
  }
];

export default function HomePage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [localUsage, setLocalUsage] = useState({ today: 0, month: 0 });

  useEffect(() => {
    const syncLocalUsage = () => {
      const now = new Date();
      const todayKey = now.toDateString();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
      const items = getHistory();

      const today = items.filter(
        (item) => new Date(item.createdAt).toDateString() === todayKey
      ).length;
      const month = items.filter(
        (item) => new Date(item.createdAt).getTime() >= monthStart
      ).length;

      setLocalUsage({ today, month });
    };

    const loadProfile = async (userId: string) => {
      setLoadingProfile(true);
      try {
        const res = await fetch(`${apiBase}/auth/me`, {
          headers: { "x-user-id": userId },
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

    const sync = () => {
      const u = getStoredUser();
      setUser(u);
      if (u?.id) {
        loadProfile(u.id as string);
      } else {
        setProfile(null);
      }
      syncLocalUsage();
    };

    sync();
    window.addEventListener("copyboost-auth-changed", sync);
    window.addEventListener("copyboost-history-updated", syncLocalUsage);
    window.addEventListener("storage", syncLocalUsage);
    return () => {
      window.removeEventListener("copyboost-auth-changed", sync);
      window.removeEventListener("copyboost-history-updated", syncLocalUsage);
      window.removeEventListener("storage", syncLocalUsage);
    };
  }, [apiBase]);

  const planLabel = profile?.plan && profile.plan !== "free" ? profile.plan.toUpperCase() : null;
  const dailyLimit =
    profile?.limits?.dailyLimit !== null && profile?.limits?.dailyLimit !== undefined
      ? profile.limits.dailyLimit
      : DAILY_LIMIT;
  const dailyRemaining =
    profile?.limits?.dailyRemaining !== null && profile?.limits?.dailyRemaining !== undefined
      ? profile.limits.dailyRemaining
      : Math.max(dailyLimit - localUsage.today, 0);
  const dailyUsed = profile?.limits ? profile.limits.dailyUsed : localUsage.today;
  const monthlyUsage = profile?.limits ? profile.limits.monthlyUsage : localUsage.month;

  return (
    <div className="container py-12 space-y-12">
      <section className="grid gap-6 lg:grid-cols-2 items-center">
        <div className="space-y-4 p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-primary">
            CopyBoost AI ile ürün açıklamalarınızı dakikalar değil saniyeler içinde hazırlayın
          </h1>
          <p className="text-lg text-slate-600">
            Trendyol, Hepsiburada, Amazon ve Shopify satıcıları için özel tasarlanmış SEO uyumlu
            açıklamalar, meta başlıklar ve etiket önerileri. Abonelik modeliyle güvenle ölçekleyin.
          </p>
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase text-slate-400">Plan</p>
                <p className="text-lg font-semibold text-primary">
                  {planLabel ? planLabel : "FREE"}
                </p>
                <p className="text-sm text-slate-500">
                  Günlük hak:{" "}
                  {loadingProfile
                    ? "Yükleniyor..."
                    : dailyLimit !== null
                      ? dailyLimit
                      : "5"}
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {loadingProfile
                  ? "Güncelleniyor"
                  : dailyRemaining !== null
                    ? `Bugün kalan ${dailyRemaining}`
                    : "Bugün kalan 5"}
              </span>
            </div>
            <div className="mt-3 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs uppercase text-slate-400">Bugün kullanılan</p>
                <p className="font-semibold text-primary">{loadingProfile ? "—" : dailyUsed}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs uppercase text-slate-400">Bu ay</p>
                <p className="font-semibold text-primary">{loadingProfile ? "—" : monthlyUsage}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs uppercase text-slate-400">Dönem kalan</p>
                <p className="font-semibold text-primary">
                  {profile?.limits?.daysRemaining !== null && profile?.limits?.daysRemaining !== undefined
                    ? `${profile.limits.daysRemaining} gün`
                    : loadingProfile
                      ? "—"
                      : "Belirtilmedi"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={user ? "/generate" : "/auth/register"}
              className="rounded-lg bg-primary px-4 py-2 text-white font-semibold hover:bg-slate-800"
            >
              {user ? "İçerik üretmeye devam et" : "Hemen ücretsiz deneyin"}
            </a>
            <a
              href="/generate"
              className="rounded-lg border border-primary px-4 py-2 font-semibold text-primary hover:bg-slate-50 shadow-2xl"
            >
              İçerik üret
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-dashed border-blue-200 bg-white p-6 shadow-sm">
          <p className="font-semibold text-slate-700 mb-4">Örnek çıktı</p>
          <div className="space-y-4 text-sm text-slate-600">
            <div>
              <p className="text-xs uppercase text-slate-400">Ürün</p>
              <p className="font-semibold text-slate-800">Organik Pamuk Tişört</p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">Uzun açıklama</p>
              <p>
                Nefes alabilir dokusu ve minimal tasarımıyla günlük kombinlerinizin vazgeçilmezi. GOTS
                sertifikalı %100 organik pamuk kumaş, hassas ciltler için ideal.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-xs uppercase text-slate-500">Meta title</p>
                <p className="font-semibold text-slate-800">Organik Pamuk Tişört | Yazlık Rahat</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-xs uppercase text-slate-500">Meta description</p>
                <p>Yumuşak dokulu, sürdürülebilir üretim pamuk tişört. Hızlı kargo.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["organik", "pamuk tişört", "sürdürülebilir", "unisex"].map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-lg font-semibold text-primary">{feature.title}</p>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
