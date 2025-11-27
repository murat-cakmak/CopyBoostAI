export default function SettingsPage() {
  return (
    <div className="container py-10 space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-blue-600">Profil & API</p>
        <h1 className="text-3xl font-bold text-primary">Hesap ayarları</h1>
        <p className="text-slate-600">Profil bilgileri, şifre yenileme ve API key yönetimi için alan.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <form className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="name">
              Ad Soyad
            </label>
            <input
              id="name"
              type="text"
              placeholder="Örn: Ayşe Yılmaz"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="ornek@mail.com"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
            />
          </div>
          <button className="rounded-lg bg-primary px-4 py-2 text-white font-semibold hover:bg-slate-800">
            Kaydet
          </button>
        </form>
        <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-700">API anahtarı</p>
          <p className="text-sm text-slate-600">
            Developer modu açıldığında kullanıcıya özel token burada görüntülenecek.
          </p>
          <div className="rounded-lg border bg-slate-50 px-4 py-3 text-xs font-mono text-slate-600">
            sk-******-demo-key
          </div>
        </div>
      </div>
    </div>
  );
}
