export default function GeneratePage() {
  return (
    <div className="container py-10 space-y-6">
      <div className="max-w-3xl space-y-2">
        <p className="text-sm font-semibold text-blue-600">İçerik üretimi</p>
        <h1 className="text-3xl font-bold text-primary">Ürün detaylarını girin ve AI çıktısını alın</h1>
        <p className="text-slate-600">
          Form alanları ve prompt varyasyonları için temel iskelet. Backend API bağlandığında gerçek zamanlı
          yanıtları gösterecek.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <form className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="title">
              Ürün başlığı
            </label>
            <input
              id="title"
              type="text"
              placeholder="Örn: Organik pamuk tişört"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
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
                defaultValue="giyim"
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
                defaultValue="trendyol"
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
                defaultValue="tr"
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
                defaultValue="resmi"
              >
                <option value="resmi">Resmi</option>
                <option value="samimi">Samimi</option>
                <option value="eglenceli">Eğlenceli</option>
                <option value="teknik">Teknik</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            className="w-full rounded-lg bg-primary px-4 py-2 text-white font-semibold hover:bg-slate-800"
          >
            Generate
          </button>
        </form>
        <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">Sonuçlar</p>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Taslak
            </span>
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <div>
              <p className="text-xs uppercase text-slate-400">Uzun açıklama</p>
              <div className="rounded-lg bg-slate-50 p-3">
                Başlatmak için ürünü doldurun. API bağlandığında bu alanda AI yanıtı gösterilecek.
              </div>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">Kısa açıklama</p>
              <div className="rounded-lg bg-slate-50 p-3">Öne çıkan madde ve bullet point örnekleri.</div>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">SEO meta</p>
              <div className="rounded-lg bg-slate-50 p-3">Meta title + description placeholder.</div>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">Tags / keywords</p>
              <div className="rounded-lg bg-slate-50 p-3">organik, pamuk, tişört, sürdürülebilir</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
