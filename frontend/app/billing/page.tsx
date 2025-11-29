export default function BillingPage() {
  return (
    <div className="container py-10 space-y-6">
      <div className="max-w-2xl space-y-2">
        <h1 className="text-3xl font-bold text-primary mt-5">Aboneliklerinizi yönetin</h1>
        <p className="text-slate-600">
          Stripe Checkout ve müşteri portalı entegrasyonu için placeholder. Plan değişiklikleri ve ödeme
          geçmişi burada listelenecek.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Mevcut plan</p>
          <p className="text-2xl font-bold text-primary">Free</p>
          <p className="text-sm text-slate-500">Günde 5 içerik üretimi</p>
          <button className="rounded-lg bg-primary px-4 py-2 text-white font-semibold hover:bg-slate-800">
            Pro'ya yükselt
          </button>
        </div>
        <div className="space-y-3 rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Faturalandırma</p>
          <p className="text-sm text-slate-600">
            Stripe müşteri portalı linki eklendiğinde kullanıcılar kart bilgilerini güncelleyebilir ve
            faturalarını görüntüleyebilir.
          </p>
          <button className="rounded-lg border border-primary px-4 py-2 font-semibold text-primary hover:bg-slate-50">
            Stripe portalını aç
          </button>
        </div>
      </div>
    </div>
  );
}
