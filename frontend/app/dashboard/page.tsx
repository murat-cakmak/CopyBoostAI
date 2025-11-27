const recentItems = [
  {
    title: "Organik pamuk tişört",
    platform: "Trendyol",
    language: "TR",
    createdAt: "Bugün"
  },
  {
    title: "Bluetooth kulaklık",
    platform: "Amazon",
    language: "EN",
    createdAt: "Dün"
  }
];

export default function DashboardPage() {
  return (
    <div className="container py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-blue-600">Dashboard</p>
        <h1 className="text-3xl font-bold text-primary">Kullanım özetiniz</h1>
        <p className="text-slate-600">Günlük içerik limitleri, plan bilgisi ve son oluşturulan içerikler.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Plan</p>
          <p className="text-xl font-bold text-primary">Free</p>
          <p className="text-xs text-slate-500">Günde 5 üretim hakkı</p>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Bugünkü kullanım</p>
          <p className="text-xl font-bold text-primary">2 / 5</p>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
            <div className="h-2 w-2/5 rounded-full bg-primary" />
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Toplam içerik</p>
          <p className="text-xl font-bold text-primary">14</p>
          <p className="text-xs text-slate-500">Son 30 gün</p>
        </div>
      </div>
      <div className="space-y-3 rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-primary">Son içerikler</p>
          <a href="/generate" className="text-sm font-semibold text-blue-600">
            Yeni içerik oluştur
          </a>
        </div>
        <div className="divide-y divide-slate-100">
          {recentItems.map((item) => (
            <div key={item.title} className="flex items-center justify-between py-3 text-sm text-slate-700">
              <div className="space-y-1">
                <p className="font-semibold text-primary">{item.title}</p>
                <p className="text-xs text-slate-500">
                  {item.platform} • {item.language}
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {item.createdAt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
