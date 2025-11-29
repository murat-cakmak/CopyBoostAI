"use client";

import { FormEvent, useEffect, useState } from "react";
import { getStoredUser, saveStoredUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.email || !form.password) {
      setError("Email ve parola zorunlu.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message =
          body?.message ||
          (Array.isArray(body?.message) ? body.message.join(", ") : null) ||
          `Giriş başarısız (HTTP ${res.status}).`;
        throw new Error(message);
      }

      if (body?.user) {
        saveStoredUser(body.user);
        router.replace("/dashboard");
      }

      setSuccess("Giriş başarılı.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Beklenmeyen hata.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold text-blue-600">Giriş yap</p>
          <h1 className="text-2xl font-bold text-primary">CopyBoost AI hesabınıza bağlanın</h1>
          <p className="text-sm text-slate-600">Email/şifre ile oturum açın.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
          <input
            type="password"
            placeholder="Şifre"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Kontrol ediliyor..." : "Giriş yap"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-700">{success}</p>}
        </form>
        <button className="w-full rounded-lg border border-primary px-4 py-2 font-semibold text-primary hover:bg-slate-50">
          Google ile devam et
        </button>
        <p className="text-center text-sm text-slate-600">
          Hesabın yok mu? <a className="font-semibold text-blue-600" href="/auth/register">Kayıt ol</a>
        </p>
      </div>
    </div>
  );
}
