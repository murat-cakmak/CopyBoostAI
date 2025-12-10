"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function BillingPage() {
  const { content, t } = useLanguage();
  const billingCopy = (content.billing || {}) as Record<string, string>;
  const title = billingCopy.title || t("billing.title", "Aboneliklerinizi yönetin");
  const description =
    billingCopy.description ||
    t(
      "billing.description",
      "Stripe Checkout ve müşteri portalı entegrasyonu için placeholder. Plan değişiklikleri ve ödeme geçmişi burada listelenecek.",
    );
  const planTitle = billingCopy.planTitle || t("billing.planTitle", "Mevcut plan");
  const planDescription = billingCopy.planDescription || t("billing.planDescription", "Günde 5 içerik üretimi");
  const upgradeButton = billingCopy.upgradeButton || t("billing.upgradeButton", "Pro'ya yükselt");
  const billingTitle = billingCopy.billingTitle || t("billing.billingTitle", "Faturalandırma");
  const billingDescription =
    billingCopy.billingDescription ||
    t(
      "billing.billingDescription",
      "Stripe müşteri portalı linki eklendiğinde kullanıcılar kart bilgilerini güncelleyebilir ve faturalarını görüntüleyebilir.",
    );
  const portalButton = billingCopy.portalButton || t("billing.portalButton", "Stripe portalını aç");

  return (
    <div className="container py-10 space-y-6">
      <div className="max-w-2xl space-y-2">
        <h1 className="text-3xl font-bold text-primary mt-5">{title}</h1>
        <p className="text-slate-600">{description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">{planTitle}</p>
          <p className="text-2xl font-bold text-primary">Free</p>
          <p className="text-sm text-slate-500">{planDescription}</p>
          <button className="rounded-lg bg-primary px-4 py-2 text-white font-semibold hover:bg-slate-800">
            {upgradeButton}
          </button>
        </div>
        <div className="space-y-3 rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">{billingTitle}</p>
          <p className="text-sm text-slate-600">{billingDescription}</p>
          <button className="rounded-lg border border-primary px-4 py-2 font-semibold text-primary hover:bg-slate-50">
            {portalButton}
          </button>
        </div>
      </div>
    </div>
  );
}
