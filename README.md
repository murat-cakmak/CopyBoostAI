# CopyBoost AI

CopyBoost AI, e-ticaret satıcıları ve pazarlama ekipleri için ürün başlığı + birkaç temel bilgi üzerinden SEO uyumlu içerik üreten mikro SaaS konseptidir. Abonelik modeline dayanan ürün, Amazon/Trendyol/Shopify gibi platformlarda satış yapan küçük işletmeler, ajanslar ve freelancerlar için hızlı içerik üretimi sağlar.

## Hedef Kitle
- Trendyol, Hepsiburada, Amazon gibi pazar yeri satıcıları
- WooCommerce / Shopify ile kendi mağazasını yöneten küçük işletmeler
- Ajanslar ve freelance pazarlama ekipleri

## MVP Özellikleri (v1.0)
- **Auth:** Email + şifre kayıt/login, Google OAuth, JWT tabanlı oturum yönetimi
- **Abonelik:** Stripe üzerinden Free (günde 5 içerik) ve Pro (sınırsız/aylık kota) planları; abonelik takibi
- **İçerik Üretimi (AI):** Ürün başlığı, kategori, hedef dil, platform ve ton girdileriyle uzun açıklama, kısa açıklama/bullet list, meta title/description ve tag/keyword çıktıları
- **Kullanım İstatistikleri:** Toplam içerik sayısı, kalan kredi/limit bilgisi, son üretilen içerikler
- **Basit Admin Panel:** Kullanıcı listesi, plan/durum bilgisi, toplam ve günlük istek metrikleri

## Sayfalar (Frontend - Next.js App Router)
- `/` Landing page: ürün tanıtımı, pricing, CTA
- `/auth/login` ve `/auth/register`: Email/şifre formu + Google ile giriş
- `/dashboard`: Son içerikler, plan/kredi bilgisi, "Yeni İçerik Oluştur" CTA
- `/generate`: Form (başlık, kategori, dil, platform, ton) + sekmeli sonuç alanı (Product Description, Short Description/Bullet Points, SEO Meta, Tags/Keywords)
- `/billing`: Mevcut plan, yükselt/düşür, Stripe müşteri portal bağlantısı
- `/settings`: Profil bilgileri, ileride API key
- `/admin/*`: `/admin/users`, `/admin/stats`

### Önemli React Bileşenleri
- `<Layout>` (header/footer/sidebar)
- `<Navbar>` (login, pricing, dashboard bağlantıları)
- `<PlanBadge>` (kullanıcı plan etiketi)
- `<UsageBar>` (günlük/aylık kullanım progress bar)
- `<ResultTabs>` (üretilen içerikleri sekmelerde gösterir)

## Backend Modülleri (NestJS)
- **AuthModule:** Login/register, Google OAuth, JWT ve refresh token
- **UserModule:** Profil ve rol/plan bilgisi
- **BillingModule:** Stripe webhooks, abonelik güncelleme
- **ContentModule:** AI içerik üretim endpoint’i, prompt hazırlama, cevap kaydı
- **UsageModule:** Günlük/aylık limit kontrolü; plan bazlı kredi politikası
- **AdminModule:** Kullanıcı listesi ve genel istatistikler

## Veri Modeli (PostgreSQL Taslağı)
- **users:** id, email (unique), password_hash (Google login’de boş olabilir), name, role (`user|admin`), stripe_customer_id, timestamps
- **subscriptions:** id, user_id, plan (`free|pro|enterprise`), status (`active|past_due|canceled|trialing`), stripe_subscription_id, current_period_start/end, timestamps
- **contents:** id, user_id, input_title/category/platform/language/tone, output_description_long/short, output_meta_title/description, output_tags (jsonb/text[]), created_at
- **usage_logs:** id, user_id, request_type (`generate|api`), tokens_used (opsiyonel), created_at

## Önemli Akışlar
### Kayıt & Login
1. `/auth/register` → email + şifre
2. NestJS `AuthController.register` → users kaydı + free subscription oluşturma
3. JWT üretimi → frontend cookie/localStorage → `Authorization: Bearer`

### İçerik Üretimi
1. `/generate` formu → `POST /content/generate`
2. `UsageService` günlük/aylık limit kontrolü; aşıldıysa 402 Payment Required
3. Prompt: başlık + kategori + dil + ton + platform
4. OpenAI API çağrısı, yanıt parse edilip `contents` tablosuna kaydedilir, JSON response döner

### Abonelik / Stripe
1. `/billing` → "Upgrade to Pro" → `POST /billing/create-checkout-session`
2. Stripe checkout URL → kullanıcı ödeme sonrası webhook `checkout.session.completed`
3. `subscriptions` tablosu güncellenir (plan: pro, status: active, period_end Stripe’tan alınır)
4. Tekrar login → dashboard’da Pro plan görünür

## Güvenlik ve Limitler
- Tüm API’ler JWT korumalı; public: `/auth/*`, `/billing/webhook`, `/health`
- Role bazlı yetki: `/admin/*` yalnızca `role=admin`
- Access token süresi 15–60 dk; refresh token opsiyonel
- Rate limiting: IP bazlı DDOS koruması + user bazlı günlük plan limitleri

## Teknoloji Yığını ve Dağıtım
- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS → Vercel
- **Backend:** NestJS + TypeScript → Railway/Render/AWS
- **Veritabanı:** PostgreSQL
- **Auth:** JWT + Google OAuth
- **Ödeme:** Stripe
- **AI:** OpenAI API (veya muadili)

## Yol Haritası
- **v1 (MVP):** Auth sistemi, ürün açıklama generator (tek dil), Free + Pro plan, Stripe entegrasyonu, basit dashboard
- **v1.1:** Çoklu dil desteği (TR/EN/DE), ton seçenekleri, platform preset’leri (Amazon/Trendyol şablonları)
- **v1.2:** Chrome extension (ör. Trendyol seller panel), API key + developer plan

## Proje yapısı
- `frontend/`: Next.js App Router, Tailwind CSS ve TypeScript ile landing, dashboard, generate, billing, settings ve auth sayfa iskeletleri
- `backend/`: NestJS tabanlı API başlangıcı (`/api` prefix), healthcheck ve karşılama endpoint’leri

## Lokal geliştirme
1. Node.js 20+ kurulu olduğundan emin olun.
2. Bağımlılıkları yüklemek için her klasörde `npm install` komutunu çalıştırın:
   - `cd frontend && npm install`
   - `cd backend && npm install`
3. Geliştirme sunucularını başlatın:
   - Frontend: `npm run dev` (varsayılan: http://localhost:3000)
   - Backend: `npm run start:dev` (varsayılan: http://localhost:3001/api)
4. `.env` dosyalarına OpenAI, Stripe ve veritabanı bağlantı bilgilerinizi ekleyin. Auth/Billing/Content modülleri eklenirken bu değişkenler kullanılacaktır.

### Backend veritabanı ayarları
`backend/.env` dosyasında PostgreSQL bağlantısı için aşağıdaki değişkenleri tanımlayın. Varsayılan değerler lokal PostgreSQL kuruluma uygundur ve ayarlanmadığında otomatik olarak kullanılır.

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=copyboost
```

Backend, TypeORM ile otomatik şema oluşturmayı (`synchronize: true`) aktif ettiği için ilk geliştirme aşamasında tablolarınız entity tanımlarından oluşturulur. Üretim ortamında migrate tabanlı yönetim tercih edilmelidir.
