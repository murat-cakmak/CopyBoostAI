const features = [
  {
    title: "SEO uyumlu açıklamalar",
    description: "Ürün başlığı ve temel bilgilerden uzun/kısa açıklamalar üretin."
  },
  {
    title: "Platform preset’leri",
    description: "Amazon, Trendyol, Shopify gibi pazaryerleri için hazır şablonlar."
  },
  {
    title: "Kullanım limitleri",
    description: "Free plan için günlük 5 üretim, Pro plan için sınırsız oluşturma hakkı."
  },
  {
    title: "Abonelik takibi",
    description: "Stripe ile ödeme, plan yükseltme ve müşteri portalı entegrasyonu."
  }
];

export default function HomePage() {
  return (
    <div className="container py-12 space-y-12">
      <section className="grid gap-6 lg:grid-cols-2 items-center">
        <div className="space-y-4">
          <p className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Mikro SaaS • GPT destekli
          </p>
          <h1 className="text-4xl font-bold text-primary">
            CopyBoost AI ile ürün açıklamalarınızı dakikalar değil saniyeler içinde hazırlayın
          </h1>
          <p className="text-lg text-slate-600">
            Trendyol, Hepsiburada, Amazon ve Shopify satıcıları için özel tasarlanmış SEO uyumlu
            açıklamalar, meta başlıklar ve etiket önerileri. Abonelik modeliyle güvenle ölçekleyin.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/auth/register"
              className="rounded-lg bg-primary px-4 py-2 text-white font-semibold hover:bg-slate-800"
            >
              Hemen ücretsiz deneyin
            </a>
            <a
              href="/generate"
              className="rounded-lg border border-primary px-4 py-2 font-semibold text-primary hover:bg-slate-50"
            >
              İçerik üret
            </a>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <div>
              <p className="font-semibold text-primary">Free plan</p>
              <p>Günde 5 içerik üretimi</p>
            </div>
            <div>
              <p className="font-semibold text-primary">Pro plan</p>
              <p>Sınırsız üretim + Google OAuth</p>
            </div>
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
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-blue-600">Özellikler</p>
          <h2 className="text-3xl font-bold text-primary">MVP yol haritasına hazır altyapı</h2>
          <p className="text-slate-600">
            Frontend, NestJS API ve Stripe entegrasyonu için başlangıç katmanları hazır. Dashboard ve
            generate akışı için sayfa iskeletleri eklendi.
          </p>
        </div>
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
