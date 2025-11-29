"use client";

import { useEffect, useMemo, useState } from "react";
import { AuthUser, getStoredUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

type AdminUser = {
  id?: string;
  email: string;
  name?: string | null;
  role?: string;
  createdAt?: string;
  limits?: {
    dailyLimit: number | null;
    dailyUsed: number;
    dailyRemaining: number | null;
    monthlyUsage: number;
    daysRemaining: number | null;
  };
  subscription?: {
    id?: string;
    status?: string;
    plan?: string;
    currentPeriodEnd?: string | null;
  } | null;
};

type AdminSubscription = {
  id?: string;
  plan: string;
  status: string;
  currentPeriodStart?: string | null;
  currentPeriodEnd?: string | null;
  user?: AdminUser | null;
  createdAt?: string;
};

export default function AdminPage() {
  const router = useRouter();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [subs, setSubs] = useState<AdminSubscription[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [limitEdits, setLimitEdits] = useState<Record<string, string>>({});
  const [subCreating, setSubCreating] = useState<string | null>(null);
  const authUser = getStoredUser();

  const isAdmin = user?.role === "admin";

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, subsRes] = await Promise.all([
        fetch(`${apiBase}/admin/users`, {
          headers: authUser?.id ? { "x-user-id": authUser.id as string } : {},
        }),
        fetch(`${apiBase}/admin/subscriptions`, {
          headers: authUser?.id ? { "x-user-id": authUser.id as string } : {},
        }),
      ]);

      const usersBody = await usersRes.json().catch(() => []);
      const subsBody = await subsRes.json().catch(() => []);

      if (!usersRes.ok) {
        throw new Error(
          Array.isArray(usersBody?.message)
            ? usersBody.message.join(", ")
            : usersBody?.message || `Kullanıcılar alınamadı (HTTP ${usersRes.status}).`,
        );
      }
      if (!subsRes.ok) {
        throw new Error(
          Array.isArray(subsBody?.message)
            ? subsBody.message.join(", ")
            : subsBody?.message || `Abonelikler alınamadı (HTTP ${subsRes.status}).`,
        );
      }

      setUsers(usersBody || []);
      setSubs(subsBody || []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Bilinmeyen hata";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentUser = getStoredUser();
    setUser(currentUser);
    setReady(true);
    if (!currentUser || currentUser.role !== "admin") {
      router.replace("/auth/login");
      return;
    }
    fetchData();

    const handleAuthChange = () => {
      const nextUser = getStoredUser();
      setUser(nextUser);
      if (!nextUser || nextUser.role !== "admin") {
        router.replace("/auth/login");
      }
    };

    window.addEventListener("copyboost-auth-changed", handleAuthChange);
    return () => window.removeEventListener("copyboost-auth-changed", handleAuthChange);
  }, [router]);

  const activeSubs = useMemo(() => subs.filter((s) => s.status === "active"), [subs]);

  const handleUpdateLimit = async (userId: string) => {
    const value = limitEdits[userId];
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) {
      setError("Geçerli bir günlük limit girin.");
      return;
    }
    setUpdatingUserId(userId);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/admin/users/${userId}/daily-limit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(authUser?.id ? { "x-user-id": authUser.id as string } : {}),
        },
        body: JSON.stringify({ dailyRequestLimit: parsed }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          Array.isArray(body?.message) ? body.message.join(", ") : body?.message || `Limit güncellenemedi (${res.status})`;
        throw new Error(msg);
      }
      await fetchData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Bilinmeyen hata";
      setError(msg);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleSubscriptionAction = async (userId: string, isActive: boolean) => {
    setSubCreating(userId);
    setError(null);
    try {
      const url = isActive
        ? `${apiBase}/admin/users/${userId}/subscription/cancel`
        : `${apiBase}/admin/users/${userId}/subscription`;
      const res = await fetch(url, {
        method: "POST",
        headers: authUser?.id ? { "x-user-id": authUser.id as string } : {},
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          Array.isArray(body?.message) ? body.message.join(", ") : body?.message || `İşlem başarısız (${res.status})`;
        throw new Error(msg);
      }
      await fetchData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Bilinmeyen hata";
      setError(msg);
    } finally {
      setSubCreating(null);
    }
  };

  if (!ready) {
    return (
      <div className="container py-10">
        <div className="rounded-xl border bg-white p-6 shadow-sm text-center">
          <p className="text-sm text-slate-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container py-10">
        <div className="rounded-xl border bg-white p-6 shadow-sm text-center">
          <p className="text-sm text-slate-600">Yetkiniz yok. Giriş yapın.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-primary mt-5">Kullanıcı ve abonelik listesi</h1>
          <p className="text-sm text-slate-600">Tüm kullanıcıları ve abonelik durumlarını görüntüleyin.</p>
        </div>
        <button
          onClick={fetchData}
          className="rounded-lg border px-4 py-2 text-sm font-semibold text-primary hover:bg-slate-50 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Yükleniyor..." : "Yenile"}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Toplam kullanıcı</p>
              <p className="text-xl font-bold text-primary">{users.length}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Aktif abonelik</p>
              <p className="text-xl font-bold text-primary">{activeSubs.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-primary">Kullanıcılar</p>
          <span className="text-xs text-slate-500">Son eklenen en üstte</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="p-2">Email</th>
                <th className="p-2">Ad</th>
                <th className="p-2">Rol</th>
                <th className="p-2">Limit</th>
                <th className="p-2">Kullanım</th>
                <th className="p-2">Dönem</th>
                <th className="p-2">Oluşturulma</th>
                <th className="p-2">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id || u.email}>
                  <td className="p-2 font-semibold text-slate-800">{u.email}</td>
                  <td className="p-2">{u.name || "-"}</td>
                  <td className="p-2 uppercase text-xs font-semibold">{u.role || "user"}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        className="w-20 rounded border px-2 py-1 text-sm"
                        value={limitEdits[u.id || ""] ?? (u.limits?.dailyLimit ?? "")}
                        onChange={(e) =>
                          setLimitEdits((prev) => ({ ...prev, [u.id || ""]: e.target.value }))
                        }
                      />
                      <button
                        className="rounded border px-2 py-1 text-xs font-semibold text-primary hover:bg-slate-50 disabled:opacity-60"
                        onClick={() => handleUpdateLimit(u.id || "")}
                        disabled={updatingUserId === (u.id || "")}
                      >
                        {updatingUserId === (u.id || "") ? "Kaydediliyor..." : "Kaydet"}
                      </button>
                    </div>
                  </td>
                  <td className="p-2 text-xs text-slate-600">
                    <div>Bugün: {u.limits?.dailyUsed ?? 0}</div>
                    <div>
                      Kalan:{" "}
                      {u.limits?.dailyRemaining !== null && u.limits?.dailyRemaining !== undefined
                        ? u.limits.dailyRemaining
                        : "-"}
                    </div>
                    <div>Ay: {u.limits?.monthlyUsage ?? 0}</div>
                  </td>
                  <td className="p-2 text-xs text-slate-600">
                    {u.limits?.daysRemaining !== null && u.limits?.daysRemaining !== undefined
                      ? `${u.limits.daysRemaining} gün`
                      : "-"}
                  </td>
                  <td className="p-2 text-slate-500">{u.createdAt ? new Date(u.createdAt).toLocaleString("tr-TR") : "-"}</td>
                  <td className="p-2">
                    <button
                      className={`rounded px-3 py-1 text-xs font-semibold disabled:opacity-60 ${
                        u.subscription?.status === "active"
                          ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                          : "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                      }`}
                      onClick={() =>
                        handleSubscriptionAction(u.id || "", u.subscription?.status === "active")
                      }
                      disabled={subCreating === (u.id || "")}
                    >
                      {subCreating === (u.id || "")
                        ? "İşleniyor..."
                        : u.subscription?.status === "active"
                          ? "Abonelikten çıkar"
                          : "Abonelik ver"}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td className="p-3 text-slate-500" colSpan={8}>
                    Kullanıcı bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3 rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-primary">Abonelikler</p>
          <span className="text-xs text-slate-500">En yeni en üstte</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="p-2">Plan</th>
                <th className="p-2">Durum</th>
                <th className="p-2">Kullanıcı</th>
                <th className="p-2">Dönem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subs.map((s) => (
                <tr key={s.id}>
                  <td className="p-2 font-semibold text-slate-800">{s.plan}</td>
                  <td className="p-2 capitalize">{s.status}</td>
                  <td className="p-2">{s.user?.email || "-"}</td>
                  <td className="p-2 text-slate-500">
                    {s.currentPeriodStart
                      ? `${new Date(s.currentPeriodStart).toLocaleDateString("tr-TR")} - ${
                          s.currentPeriodEnd ? new Date(s.currentPeriodEnd).toLocaleDateString("tr-TR") : "?"
                        }`
                      : "-"}
                  </td>
                </tr>
              ))}
              {subs.length === 0 && (
                <tr>
                  <td className="p-3 text-slate-500" colSpan={4}>
                    Abonelik bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
