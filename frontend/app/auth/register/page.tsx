export default function RegisterPage() {
  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold text-blue-600">Kayıt ol</p>
          <h1 className="text-2xl font-bold text-primary">Ücretsiz başlayın</h1>
          <p className="text-sm text-slate-600">Free plan ile günde 5 içerik üretin, Pro planla sınırsız.</p>
        </div>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Ad Soyad"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
          />
          <input
            type="password"
            placeholder="Şifre"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary"
          />
          <button className="w-full rounded-lg bg-primary px-4 py-2 text-white font-semibold hover:bg-slate-800">
            Hesap oluştur
          </button>
        </form>
        <button className="w-full rounded-lg border border-primary px-4 py-2 font-semibold text-primary hover:bg-slate-50">
          Google ile devam et
        </button>
        <p className="text-center text-sm text-slate-600">
          Zaten hesabınız var mı? <a className="font-semibold text-blue-600" href="/auth/login">Giriş yap</a>
        </p>
      </div>
    </div>
  );
}
