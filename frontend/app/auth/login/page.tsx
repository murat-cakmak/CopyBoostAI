export default function LoginPage() {
  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold text-blue-600">Giriş yap</p>
          <h1 className="text-2xl font-bold text-primary">CopyBoost AI hesabınıza bağlanın</h1>
          <p className="text-sm text-slate-600">Email/şifre veya Google OAuth için placeholder.</p>
        </div>
        <form className="space-y-4">
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
            Giriş yap
          </button>
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
