"use client";

import { useEffect, useMemo, useState } from "react";
import { DAILY_LIMIT, GenerationHistoryItem, getHistory } from "@/lib/history";

export default function DashboardPage() {
  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);

  const refreshHistory = () => {
    setHistory(getHistory());
  };

  useEffect(() => {
    refreshHistory();

    const handleUpdate = () => refreshHistory();

    window.addEventListener("copyboost-history-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("copyboost-history-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const todayCount = useMemo(() => {
    const today = new Date().toDateString();
    return history.filter((item) => new Date(item.createdAt).toDateString() === today).length;
  }, [history]);

  const usagePercent = Math.min(100, Math.round((todayCount / DAILY_LIMIT) * 100));
  const recentItems = history.slice(0, 6);

  return (
    <div className="container py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-blue-600">Dashboard</p>
        <h1 className="text-3xl font-bold text-primary">Kullanım özetiniz</h1>
        <p className="text-slate-600">
          Yapılan aramalar ve yanıtlar kaydedildi. Üretim akışının güncel verilerini buradan takip edin.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Plan</p>
          <p className="text-xl font-bold text-primary">Free</p>
          <p className="text-xs text-slate-500">Günde {DAILY_LIMIT} üretim hakkı</p>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Bugünkü kullanım</p>
          <p className="text-xl font-bold text-primary">
            {todayCount} / {DAILY_LIMIT}
          </p>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${usagePercent}%` }} />
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Toplam içerik</p>
          <p className="text-xl font-bold text-primary">{history.length}</p>
          <p className="text-xs text-slate-500">Local kayıtlardan hesaplandı</p>
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
                <div
                  key={item.id}
                  className="flex flex-col gap-2 py-3 text-sm text-slate-700 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-primary">{item.input.title || "Başlık belirtilmedi"}</p>
                    <p className="text-xs text-slate-500">
                      {item.input.platform} • {item.input.language.toUpperCase()} • {item.input.tone}
                    </p>
                    <p className="text-slate-600 w-[500px]">{preview}</p>
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
