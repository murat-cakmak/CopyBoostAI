export type TranslationContent = Record<string, any>;

type LanguageMeta = {
  name: string;
  flagIcon: string;
  isDefault?: boolean;
};

export const defaultLanguageContents: Record<string, TranslationContent> = {
  tr: {
    nav: {
      home: "Ana sayfa",
      dashboard: "Dashboard",
      generate: "Üretici",
      billing: "Faturalandırma",
    },
    auth: {
      login: "Giriş yap",
      settings: "Ayarlar",
      admin: "Admin sayfası",
      logout: "Çıkış yap",
    },
    hero: {
      title: "CopyBoost AI ile ürün açıklamalarınızı dakikalar değil saniyeler içinde hazırlayın",
      description:
        "Trendyol, Hepsiburada, Amazon ve Shopify satıcıları için özel tasarlanmış SEO uyumlu açıklamalar, meta başlıklar ve etiket önerileri. Abonelik modeliyle güvenle ölçekleyin.",
      primaryCta: "Hemen ücretsiz deneyin",
      secondaryCtaLoggedIn: "İçerik üretmeye devam et",
      secondaryCtaLoggedOut: "İçerik üret",
      sampleHeading: "Örnek çıktı",
      sampleProductLabel: "Ürün",
      sampleLongLabel: "Uzun açıklama",
      sampleMetaTitle: "Meta title",
      sampleMetaDescription: "Meta description",
      sampleProductValue: "Organik Pamuk Tişört",
      sampleLongText:
        "Nefes alabilir dokusu ve minimal tasarımıyla günlük kombinlerinizin vazgeçilmezi. GOTS sertifikalı %100 organik pamuk kumaş, hassas ciltler için ideal.",
      sampleMetaTitleValue: "Organik Pamuk Tişört | Yazlık Rahat",
      sampleMetaDescriptionValue: "Yumuşak dokulu, sürdürülebilir üretim pamuk tişört. Hızlı kargo.",
      sampleTags: ["organik", "pamuk tişört", "sürdürülebilir", "unisex"],
    },
    plan: {
      planLabel: "Plan",
      dailyQuota: "Günlük hak",
      dailyRemaining: "Bugün kalan",
      dailyUsed: "Bugün kullanılan",
      monthlyUsage: "Bu ay",
      periodRemaining: "Dönem kalan",
      unspecified: "Belirtilmedi",
      updating: "Güncelleniyor",
      loading: "Yükleniyor...",
    },
    features: [
      {
        title: "Saniyeler içinde hazır açıklama",
        description:
          "Ürün başlığından, platforma uygun uzun ve kısa açıklamaları saniyede alın.",
      },
      {
        title: "Pazaryeri uyumu",
        description: "Trendyol, Hepsiburada, Amazon, Shopify için otomatik format ve dil tonları.",
      },
      {
        title: "Sabit kalite, sabit hız",
        description: "Her üründe tutarlı SEO odaklı içerik ve hızlı teslimat.",
      },
      {
        title: "Ekstra zaman kazancı",
        description: "Manuel içerik yazımına harcadığınız süreyi operasyon ve satışa ayırın.",
      },
    ],
    common: {
      loading: "Yükleniyor...",
      redirecting: "Yönlendiriliyorsunuz...",
      copy: "Kopyala",
      copied: "Kopyalandı",
      copyTooltip: "Sonucu kopyala",
      close: "Kapat",
      save: "Kaydet",
      saving: "Kaydediliyor...",
      delete: "Sil",
      deleting: "Siliniyor...",
      confirm: "Onayla",
      cancel: "İptal",
      edit: "Düzenle",
      success: "Başarılı",
      error: "Hata",
    },
    authPages: {
      login: {
        badge: "Giriş yap",
        heading: "CopyBoost AI hesabınıza bağlanın",
        description: "Email/şifre ile oturum açın.",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Şifre",
        submit: "Giriş yap",
        loading: "Kontrol ediliyor...",
        requiredError: "Email ve parola zorunlu.",
        genericError: "Beklenmeyen hata.",
        failed: "Giriş başarısız",
        success: "Giriş başarılı.",
        google: "Google ile devam et",
        switchText: "Hesabın yok mu?",
        switchLink: "Kayıt ol",
      },
      register: {
        badge: "Kayıt ol",
        heading: "Ücretsiz başlayın",
        description: "Free plan ile günde 5 içerik üretin, Pro planla sınırsız.",
        namePlaceholder: "Ad Soyad",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Şifre (en az 8 karakter)",
        submit: "Hesap oluştur",
        loading: "Kaydediliyor...",
        success: "Kayıt başarılı! Giriş yapabilirsiniz.",
        requiredError: "Email ve parola zorunlu.",
        genericError: "Beklenmeyen hata.",
        failed: "Kayıt başarısız",
        google: "Google ile devam et",
        switchText: "Zaten hesabınız var mı?",
        switchLink: "Giriş yap",
      },
    },
    dashboard: {
      title: "Kullanım özetiniz",
      description: "Yapılan aramalar ve yanıtlar kaydedildi. Üretim akışının güncel verilerini buradan takip edin.",
      serverSync: "Sunucudan geçmiş içerikler alınıyor...",
      cards: {
        totalContentLabel: "Toplam içerik",
        savedCountLabel: "Kaydedilen içerik sayısı",
        recentUsageTitle: "Bugünkü kullanım",
        planTitle: "Plan",
        newContentCta: "Yeni içerik oluştur",
        remoteSyncing: "Sunucudan alınıyor",
      },
      recentTitle: "Son aramalar ve yanıtlar",
      recentCta: "Yeni içerik oluştur",
      recentEmpty: "Henüz kayıtlı bir arama yok. Yeni bir ürün girerek sonuçları burada görebilirsiniz.",
      previewMissingTitle: "Başlık belirtilmedi",
      previewMissingContent: "Yanıt içeriği kaydedilemedi",
      copyTooltip: "Sonucu kopyala",
      modal: {
        titleLabel: "Başlık",
        longLabel: "Uzun açıklama",
        shortLabel: "Kısa açıklama",
        seoTitleLabel: "SEO Title",
        seoDescriptionLabel: "SEO Description",
        tagsLabel: "Etiketler",
      },
      close: "Kapat",
    },
    billing: {
      title: "Aboneliklerinizi yönetin",
      description:
        "Stripe Checkout ve müşteri portalı entegrasyonu için placeholder. Plan değişiklikleri ve ödeme geçmişi burada listelenecek.",
      planTitle: "Mevcut plan",
      planDescription: "Günde 5 içerik üretimi",
      upgradeButton: "Pro'ya yükselt",
      billingTitle: "Faturalandırma",
      billingDescription:
        "Stripe müşteri portalı linki eklendiğinde kullanıcılar kart bilgilerini güncelleyebilir ve faturalarını görüntüleyebilir.",
      portalButton: "Stripe portalını aç",
    },
    generate: {
      heroTitle: "Ürün detaylarını girin ve AI çıktısını alın",
      heroDescription:
        "CopyBoost AI, Trendyol, Hepsiburada, Amazon, Shopify ve sosyal medya satış kanallarındaki satıcılar için saniyeler içinde SEO uyumlu ürün açıklamaları, meta başlıklar ve etiket önerileri oluşturan bir yapay zekâ aracıdır. Hız, satış artırma ve SEO avantajlarını bir arada sunar.",
      limitReached:
        "Günlük {{limit}} üretim hakkınız doldu. Yarın tekrar deneyebilir veya plan yükseltebilirsiniz.",
      limitReachedServer: "Günlük hakkınız doldu. Kalan: 0 / {{limit}}",
      titleLabel: "Ürün başlığı",
      titlePlaceholder: "Örn: Organik pamuk tişört",
      titleHint: "JavaScript kodu kabul edilmez",
      categoryLabel: "Kategori",
      platformLabel: "Platform",
      languageLabel: "Hedef dil",
      toneLabel: "Ton",
      categories: {
        giyim: "👕 Giyim & Moda",
        elektronik: "🔌 Elektronik",
        kozmetik: "💄 Kozmetik & Bakım",
        "ev-yasam": "🏠 Ev & Yaşam",
        "spor-outdoor": "🏃‍♂️ Spor & Outdoor",
        "anne-bebek": "🍼 Anne & Bebek",
        pet: "🐾 Evcil Hayvan",
        market: "🛒 Market & Gıda",
        "oto-aksesuar": "🚗 Otomotiv & Aksesuar",
        "hobi-sanat": "🎨 Hobi & Sanat",
      },
      platforms: {
        trendyol: "🧡 Trendyol",
        hepsiburada: "🟠 Hepsiburada",
        amazon: "🛒 Amazon",
        shopify: "🛍️ Shopify",
        etsy: "🧵 Etsy",
        aliexpress: "🌏 AliExpress",
        instagram: "📸 Instagram",
        tiktok: "🎵 TikTok",
        facebook: "📘 Facebook",
        youtube: "▶️ YouTube",
        pinterest: "📌 Pinterest",
      },
      languages: {
        tr: "🇹🇷 Türkçe",
        en: "🇺🇸 İngilizce",
        de: "🇩🇪 Almanca",
        fr: "🇫🇷 Fransızca",
        es: "🇪🇸 İspanyolca",
        it: "🇮🇹 İtalyanca",
        ar: "🇸🇦 Arapça",
        ru: "🇷🇺 Rusça",
        zh: "🇨🇳 Çince",
        nl: "🇳🇱 Flemenkçe",
        pt: "🇵🇹 Portekizce",
        el: "🇬🇷 Yunanca",
        bg: "🇧🇬 Bulgarca",
        az: "🇦🇿 Azerice",
      },
      tones: {
        resmi: "🏛️ Resmi",
        samimi: "🤗 Samimi",
        eglenceli: "🎉 Eğlenceli",
        teknik: "🧠 Teknik",
        "ikna-edici": "🧲 İkna Edici",
        hikaye: "📖 Hikaye Anlatımı",
        minimal: "🌿 Minimal",
        premium: "💎 Premium",
        dinamik: "⚡ Dinamik",
        "acil-kampanya": "⏱️ Acil / FOMO",
      },
      button: {
        default: "Üret",
        loading: "Üretiliyor...",
        checking: "Limit kontrol ediliyor...",
      },
      errors: {
        missingTitle: "Lütfen geçerli bir ürün başlığı girin.",
        noJavascript: "Ürün başlığında JavaScript kodu kullanamazsınız.",
        clipboardUnsupported: "Clipboard desteklenmiyor",
        copyFailed: "Kopyalama başarısız oldu.",
        apiErrorPrefix: "API hatası",
        unknown: "Bilinmeyen hata",
      },
      usageLabel: "Bugünkü kullanım: {{count}} / {{limit}}",
      usageServerLabel: "(sunucu kalan: {{remaining}})",
      resultsTitle: "Sonuçlar",
      resultStatus: {
        sending: "İstek gönderiliyor",
        ready: "Hazır",
        draft: "Taslak",
      },
      fields: {
        long: "Uzun açıklama",
        short: "Kısa açıklama",
        seoMeta: "SEO meta",
        tags: "Tags / keywords",
      },
      placeholders: {
        long: "Başlatmak için ürünü doldurun. API yanıtı burada görünecek.",
        short: "Öne çıkan madde ve bullet point örnekleri.",
        seoTitle: "Meta title",
        seoDescription: "Meta description placeholder.",
      },
    },
    footer: {
      tagline: "SEO uyumlu ürün açıklamalarını saniyeler içinde oluşturun.",
      rights: "Tüm hakları saklıdır.",
      brand: "CopyBoost AI",
      linkLabel: "Murat Çakmak",
    },
    settings: {
      badge: "Profil & Güvenlik",
      title: "Hesap ayarları",
      description:
        "Bilgilerinizi güncelleyin, şifrenizi değiştirin. Email adresi güvenlik için değiştirilemez.",
      statusBadge: "Giriş yapıldı",
      profileCard: {
        title: "Profil bilgileri",
        subtitle: "Ad-soyadınızı güncelleyin, email sabittir.",
        nameLabel: "Ad Soyad",
        namePlaceholder: "Örn: Ayşe Yılmaz",
        emailLabel: "Email (değiştirilemez)",
        saveButton: "Profilimi kaydet",
      },
      passwordCard: {
        title: "Şifre ve güvenlik",
        subtitle:
          "Güçlü bir şifre belirleyin. Şifre değişimi için mevcut şifrenizi doğruluyoruz.",
        currentLabel: "Mevcut şifre",
        newLabel: "Yeni şifre",
        chipLength: "Min 8 karakter",
        chipEmail: "Email değişmez",
        saveButton: "Şifremi güncelle",
        savingText: "Şifre güncelleniyor...",
      },
      usageCard: {
        title: "Paket & kullanım",
        planLabel: "Plan",
        dailyLimit: "Günlük limit",
        dailyUsed: "Bugün kullanılan",
        remaining: "Kalan",
        monthlyUsage: "Aylık kullanım",
        unlimited: "Sınırsız",
        empty: "-",
      },
      securityCard: {
        title: "Güvenlik hatırlatması",
        body: "Email adresi değiştirilmez ve şifre değişimi için mevcut şifre doğrulanır. Şifrenizi kimseyle paylaşmayın.",
      },
      apiCard: {
        title: "API anahtarı",
        description:
          "Kişisel anahtarlar bu alanda görüntülenecek. Şu an için anahtar dağıtımı kısıtlı; talep için support@copyboost.ai.",
        placeholder: "sk-live-*************",
      },
      states: {
        loading: "Yükleniyor...",
        loginRequired: "Hesap ayarları için giriş yapmalısınız. Yönlendiriliyorsunuz...",
      },
    },
  },
  en: {
    nav: {
      home: "Home",
      dashboard: "Dashboard",
      generate: "Generator",
      billing: "Billing",
    },
    auth: {
      login: "Sign in",
      settings: "Settings",
      admin: "Admin page",
      logout: "Log out",
    },
    hero: {
      title: "Create product descriptions in seconds with CopyBoost AI",
      description:
        "SEO-ready descriptions, meta titles and tags designed for Trendyol, Amazon, Shopify and more. Scale your catalog confidently with our subscription model.",
      primaryCta: "Try it for free",
      secondaryCtaLoggedIn: "Keep generating",
      secondaryCtaLoggedOut: "Start creating",
      sampleHeading: "Sample output",
      sampleProductLabel: "Product",
      sampleLongLabel: "Long description",
      sampleMetaTitle: "Meta title",
      sampleMetaDescription: "Meta description",
      sampleProductValue: "Organic Cotton T-Shirt",
      sampleLongText:
        "Breathable fabric and a minimal silhouette for effortless everyday outfits. Made from 100% GOTS-certified cotton that stays gentle even on sensitive skin.",
      sampleMetaTitleValue: "Organic Cotton T-Shirt | Summer Essential",
      sampleMetaDescriptionValue: "Soft sustainable cotton tee with fast shipping. Perfect daily comfort.",
      sampleTags: ["organic", "cotton tee", "sustainable", "unisex"],
    },
    plan: {
      planLabel: "Plan",
      dailyQuota: "Daily quota",
      dailyRemaining: "Remaining today",
      dailyUsed: "Used today",
      monthlyUsage: "This month",
      periodRemaining: "Cycle remaining",
      unspecified: "Not specified",
      updating: "Updating",
      loading: "Loading...",
    },
    features: [
      {
        title: "Ready content in seconds",
        description: "Instant long & short descriptions tailored to each marketplace.",
      },
      {
        title: "Marketplace ready",
        description: "Automatic formatting for Trendyol, Amazon, Shopify and more.",
      },
      {
        title: "Consistent quality",
        description: "Reliable SEO-friendly copy for every SKU.",
      },
      {
        title: "Save precious time",
        description: "Refocus writing time on operations and growth.",
      },
    ],
    common: {
      loading: "Loading...",
      redirecting: "Redirecting...",
      copy: "Copy",
      copied: "Copied",
      copyTooltip: "Copy result",
      close: "Close",
      save: "Save",
      saving: "Saving...",
      delete: "Delete",
      deleting: "Deleting...",
      confirm: "Confirm",
      cancel: "Cancel",
      edit: "Edit",
      success: "Success",
      error: "Error",
    },
    authPages: {
      login: {
        badge: "Sign in",
        heading: "Log into your CopyBoost AI account",
        description: "Use your email and password.",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Password",
        submit: "Sign in",
        loading: "Checking...",
        requiredError: "Email and password are required.",
        genericError: "Unexpected error.",
        failed: "Sign-in failed",
        success: "Signed in successfully.",
        google: "Continue with Google",
        switchText: "No account yet?",
        switchLink: "Create one",
      },
      register: {
        badge: "Create account",
        heading: "Start for free",
        description: "Generate 5 items daily on Free, unlock unlimited on Pro.",
        namePlaceholder: "Full name",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Password (min 8 characters)",
        submit: "Create account",
        loading: "Saving...",
        success: "Registration successful! You can sign in now.",
        requiredError: "Email and password are required.",
        genericError: "Unexpected error.",
        failed: "Registration failed",
        google: "Continue with Google",
        switchText: "Already have an account?",
        switchLink: "Sign in",
      },
    },
    dashboard: {
      title: "Your usage summary",
      description: "Track every prompt and AI response to understand your production flow at a glance.",
      serverSync: "Fetching history from server...",
      cards: {
        totalContentLabel: "Total content",
        savedCountLabel: "Saved items",
        recentUsageTitle: "Today's usage",
        planTitle: "Plan",
        newContentCta: "Create new content",
        remoteSyncing: "Syncing from server",
      },
      recentTitle: "Recent prompts & outputs",
      recentCta: "Create new content",
      recentEmpty: "No saved prompts yet. Create a new product to see results here.",
      previewMissingTitle: "No title provided",
      previewMissingContent: "Response content missing",
      copyTooltip: "Copy result",
      modal: {
        titleLabel: "Title",
        longLabel: "Long description",
        shortLabel: "Short description",
        seoTitleLabel: "SEO Title",
        seoDescriptionLabel: "SEO Description",
        tagsLabel: "Tags",
      },
      close: "Close",
    },
    billing: {
      title: "Manage your subscriptions",
      description:
        "Placeholder for Stripe Checkout and customer portal. Plan changes and payment history will show here.",
      planTitle: "Current plan",
      planDescription: "Generate 5 items per day",
      upgradeButton: "Upgrade to Pro",
      billingTitle: "Billing",
      billingDescription:
        "Once the Stripe customer portal is linked, users can update payment details and download invoices.",
      portalButton: "Open Stripe portal",
    },
    generate: {
      heroTitle: "Enter product details and get AI copy",
      heroDescription:
        "CopyBoost AI creates SEO-friendly descriptions, meta titles and keyword tags for Trendyol, Amazon, Shopify and social platforms within seconds.",
      limitReached: "You've reached the {{limit}} daily limit. Try again tomorrow or upgrade your plan.",
      limitReachedServer: "Daily quota reached. Remaining: 0 / {{limit}}",
      titleLabel: "Product title",
      titlePlaceholder: "e.g. Organic cotton t-shirt",
      titleHint: "JavaScript code is not allowed",
      categoryLabel: "Category",
      platformLabel: "Platform",
      languageLabel: "Target language",
      toneLabel: "Tone",
      categories: {
        giyim: "👕 Fashion & Apparel",
        elektronik: "🔌 Electronics",
        kozmetik: "💄 Beauty & Care",
        "ev-yasam": "🏠 Home & Living",
        "spor-outdoor": "🏃‍♂️ Sports & Outdoor",
        "anne-bebek": "🍼 Mom & Baby",
        pet: "🐾 Pet Care",
        market: "🛒 Grocery",
        "oto-aksesuar": "🚗 Automotive & Accessories",
        "hobi-sanat": "🎨 Hobby & Art",
      },
      platforms: {
        trendyol: "🧡 Trendyol",
        hepsiburada: "🟠 Hepsiburada",
        amazon: "🛒 Amazon",
        shopify: "🛍️ Shopify",
        etsy: "🧵 Etsy",
        aliexpress: "🌏 AliExpress",
        instagram: "📸 Instagram",
        tiktok: "🎵 TikTok",
        facebook: "📘 Facebook",
        youtube: "▶️ YouTube",
        pinterest: "📌 Pinterest",
      },
      languages: {
        tr: "🇹🇷 Turkish",
        en: "🇺🇸 English",
        de: "🇩🇪 German",
        fr: "🇫🇷 French",
        es: "🇪🇸 Spanish",
        it: "🇮🇹 Italian",
        ar: "🇸🇦 Arabic",
        ru: "🇷🇺 Russian",
        zh: "🇨🇳 Chinese",
        nl: "🇳🇱 Dutch",
        pt: "🇵🇹 Portuguese",
        el: "🇬🇷 Greek",
        bg: "🇧🇬 Bulgarian",
        az: "🇦🇿 Azerbaijani",
      },
      tones: {
        resmi: "🏛️ Formal",
        samimi: "🤗 Friendly",
        eglenceli: "🎉 Playful",
        teknik: "🧠 Technical",
        "ikna-edici": "🧲 Persuasive",
        hikaye: "📖 Storytelling",
        minimal: "🌿 Minimal",
        premium: "💎 Premium",
        dinamik: "⚡ Dynamic",
        "acil-kampanya": "⏱️ Urgent / FOMO",
      },
      button: {
        default: "Generate",
        loading: "Generating...",
        checking: "Checking limit...",
      },
      errors: {
        missingTitle: "Please enter a valid product title.",
        noJavascript: "JavaScript code is not allowed in the title.",
        clipboardUnsupported: "Clipboard not supported",
        copyFailed: "Copy failed.",
        apiErrorPrefix: "API error",
        unknown: "Unknown error",
      },
      usageLabel: "Today's usage: {{count}} / {{limit}}",
      usageServerLabel: "(server remaining: {{remaining}})",
      resultsTitle: "Results",
      resultStatus: {
        sending: "Sending request",
        ready: "Ready",
        draft: "Draft",
      },
      fields: {
        long: "Long description",
        short: "Short description",
        seoMeta: "SEO meta",
        tags: "Tags / keywords",
      },
      placeholders: {
        long: "Fill the form to start. API responses appear here.",
        short: "Bullet points and highlights appear here.",
        seoTitle: "Meta title",
        seoDescription: "Meta description placeholder.",
      },
    },
    footer: {
      tagline: "Create SEO-friendly product copy in seconds.",
      rights: "All rights reserved.",
      brand: "CopyBoost AI",
      linkLabel: "Murat Çakmak",
    },
    settings: {
      badge: "Profile & Security",
      title: "Account settings",
      description:
        "Update your details and change your password. Email stays locked for security.",
      statusBadge: "Signed in",
      profileCard: {
        title: "Profile information",
        subtitle: "Update your name. Email cannot be changed.",
        nameLabel: "Full name",
        namePlaceholder: "e.g. Jane Doe",
        emailLabel: "Email (read-only)",
        saveButton: "Save profile",
      },
      passwordCard: {
        title: "Password & security",
        subtitle: "Choose a strong password. We verify your current password for security.",
        currentLabel: "Current password",
        newLabel: "New password",
        chipLength: "Min 8 characters",
        chipEmail: "Email locked",
        saveButton: "Update password",
        savingText: "Updating password...",
      },
      usageCard: {
        title: "Plan & usage",
        planLabel: "Plan",
        dailyLimit: "Daily limit",
        dailyUsed: "Used today",
        remaining: "Remaining",
        monthlyUsage: "Monthly usage",
        unlimited: "Unlimited",
        empty: "-",
      },
      securityCard: {
        title: "Security reminder",
        body: "Email cannot change and password updates require verification. Never share your password.",
      },
      apiCard: {
        title: "API key",
        description:
          "Personal keys will appear here once available. Access is limited—email support@copyboost.ai.",
        placeholder: "sk-live-*************",
      },
      states: {
        loading: "Loading...",
        loginRequired: "You must sign in to manage settings. Redirecting...",
      },
    },
  },
  de: {
    nav: {
      home: "Startseite",
      dashboard: "Dashboard",
      generate: "Generator",
      billing: "Abrechnung",
    },
    auth: {
      login: "Anmelden",
      settings: "Einstellungen",
      admin: "Adminbereich",
      logout: "Abmelden",
    },
    hero: {
      title: "Erstellen Sie Produktbeschreibungen in Sekunden mit CopyBoost AI",
      description:
        "SEO-optimierte Beschreibungen, Meta-Titel und Tags für Trendyol, Amazon, Shopify und mehr. Skalieren Sie Ihr Sortiment sicher mit unserem Abomodell.",
      primaryCta: "Kostenlos testen",
      secondaryCtaLoggedIn: "Weiter schreiben",
      secondaryCtaLoggedOut: "Jetzt starten",
      sampleHeading: "Beispielausgabe",
      sampleProductLabel: "Produkt",
      sampleLongLabel: "Lange Beschreibung",
      sampleMetaTitle: "Meta-Titel",
      sampleMetaDescription: "Meta-Beschreibung",
      sampleProductValue: "Bio-Baumwoll-T-Shirt",
      sampleLongText:
        "Atmungsaktiver Stoff und minimalistisches Design – perfekt für jeden Tag. Gefertigt aus 100 % GOTS-zertifizierter Bio-Baumwolle, besonders sanft zur Haut.",
      sampleMetaTitleValue: "Bio-Baumwoll-T-Shirt | Sommer-Basic",
      sampleMetaDescriptionValue: "Weiches, nachhaltig produziertes Baumwollshirt mit schneller Lieferung.",
      sampleTags: ["bio", "baumwolle", "nachhaltig", "unisex"],
    },
    plan: {
      planLabel: "Tarif",
      dailyQuota: "Tägliches Kontingent",
      dailyRemaining: "Heute verbleibend",
      dailyUsed: "Heute genutzt",
      monthlyUsage: "Diesen Monat",
      periodRemaining: "Restlaufzeit",
      unspecified: "Nicht angegeben",
      updating: "Aktualisiert",
      loading: "Lädt...",
    },
    features: [
      {
        title: "Fertige Texte in Sekunden",
        description: "Lange und kurze Beschreibungen sofort für jeden Marktplatz.",
      },
      {
        title: "Marktplatz-kompatibel",
        description: "Automatische Formatierung für Trendyol, Amazon, Shopify u.v.m.",
      },
      {
        title: "Konstante Qualität",
        description: "Zuverlässige, SEO-freundliche Texte für jedes Produkt.",
      },
      {
        title: "Zeit sparen",
        description: "Nutzen Sie die gewonnene Zeit für Vertrieb und Wachstum.",
      },
    ],
    common: {
      loading: "Wird geladen...",
      redirecting: "Weiterleitung...",
      copy: "Kopieren",
      copied: "Kopiert",
      copyTooltip: "Ergebnis kopieren",
      close: "Schließen",
      save: "Speichern",
      saving: "Speichern...",
      delete: "Löschen",
      deleting: "Wird gelöscht...",
      confirm: "Bestätigen",
      cancel: "Abbrechen",
      edit: "Bearbeiten",
      success: "Erfolg",
      error: "Fehler",
    },
    authPages: {
      login: {
        badge: "Anmelden",
        heading: "Melden Sie sich bei CopyBoost AI an",
        description: "Nutzen Sie Ihre E-Mail und Ihr Passwort.",
        emailPlaceholder: "E-Mail",
        passwordPlaceholder: "Passwort",
        submit: "Anmelden",
        loading: "Wird geprüft...",
        requiredError: "E-Mail und Passwort sind erforderlich.",
        genericError: "Unerwarteter Fehler.",
        failed: "Anmeldung fehlgeschlagen",
        success: "Erfolgreich angemeldet.",
        google: "Mit Google fortfahren",
        switchText: "Noch kein Konto?",
        switchLink: "Registrieren",
      },
      register: {
        badge: "Registrieren",
        heading: "Kostenlos starten",
        description: "Free-Plan mit 5 Inhalten pro Tag, Pro-Plan ohne Limit.",
        namePlaceholder: "Vollständiger Name",
        emailPlaceholder: "E-Mail",
        passwordPlaceholder: "Passwort (mind. 8 Zeichen)",
        submit: "Konto erstellen",
        loading: "Wird gespeichert...",
        success: "Registrierung erfolgreich! Jetzt anmelden.",
        requiredError: "E-Mail und Passwort sind erforderlich.",
        genericError: "Unerwarteter Fehler.",
        failed: "Registrierung fehlgeschlagen",
        google: "Mit Google fortfahren",
        switchText: "Schon ein Konto?",
        switchLink: "Anmelden",
      },
    },
    dashboard: {
      title: "Ihr Nutzungsüberblick",
      description: "Verfolgen Sie alle Suchanfragen und Antworten, um Ihren Produktionsfluss im Blick zu behalten.",
      serverSync: "Verlauf wird vom Server geladen...",
      cards: {
        totalContentLabel: "Gesamtinhalte",
        savedCountLabel: "Gespeicherte Einträge",
        recentUsageTitle: "Heutige Nutzung",
        planTitle: "Tarif",
        newContentCta: "Neuen Inhalt erstellen",
        remoteSyncing: "Vom Server synchronisiert",
      },
      recentTitle: "Letzte Suchanfragen & Antworten",
      recentCta: "Neuen Inhalt erstellen",
      recentEmpty: "Noch keine gespeicherte Suche. Erstellen Sie ein Produkt, um hier Ergebnisse zu sehen.",
      previewMissingTitle: "Kein Titel angegeben",
      previewMissingContent: "Antwortinhalt fehlt",
      copyTooltip: "Ergebnis kopieren",
      modal: {
        titleLabel: "Titel",
        longLabel: "Lange Beschreibung",
        shortLabel: "Kurze Beschreibung",
        seoTitleLabel: "SEO-Titel",
        seoDescriptionLabel: "SEO-Beschreibung",
        tagsLabel: "Tags",
      },
      close: "Schließen",
    },
    billing: {
      title: "Abonnements verwalten",
      description:
        "Platzhalter für Stripe Checkout und Kundenportal. Tarifwechsel und Zahlungs­historie werden hier angezeigt.",
      planTitle: "Aktueller Tarif",
      planDescription: "Bis zu 5 Inhalte pro Tag",
      upgradeButton: "Auf Pro upgraden",
      billingTitle: "Abrechnung",
      billingDescription:
        "Mit dem Stripe-Kundenportal können Nutzer Zahlungsdaten aktualisieren und Rechnungen abrufen.",
      portalButton: "Stripe-Portal öffnen",
    },
    generate: {
      heroTitle: "Produktdetails eingeben und KI-Ergebnis erhalten",
      heroDescription:
        "CopyBoost AI erstellt in Sekunden SEO-optimierte Beschreibungen, Meta-Titel und Tags für Trendyol, Amazon, Shopify und soziale Plattformen.",
      limitReached:
        "Sie haben das Tageslimit von {{limit}} erreicht. Versuchen Sie es morgen erneut oder upgraden Sie Ihren Tarif.",
      limitReachedServer: "Tageskontingent erreicht. Verbleibend: 0 / {{limit}}",
      titleLabel: "Produkttitel",
      titlePlaceholder: "z. B. Bio-Baumwoll-T-Shirt",
      titleHint: "JavaScript-Code ist nicht erlaubt",
      categoryLabel: "Kategorie",
      platformLabel: "Plattform",
      languageLabel: "Zielsprache",
      toneLabel: "Ton",
      categories: {
        giyim: "👕 Mode & Bekleidung",
        elektronik: "🔌 Elektronik",
        kozmetik: "💄 Kosmetik & Pflege",
        "ev-yasam": "🏠 Wohnen & Leben",
        "spor-outdoor": "🏃‍♂️ Sport & Outdoor",
        "anne-bebek": "🍼 Mutter & Baby",
        pet: "🐾 Haustiere",
        market: "🛒 Lebensmittel",
        "oto-aksesuar": "🚗 Auto & Zubehör",
        "hobi-sanat": "🎨 Hobby & Kunst",
      },
      platforms: {
        trendyol: "🧡 Trendyol",
        hepsiburada: "🟠 Hepsiburada",
        amazon: "🛒 Amazon",
        shopify: "🛍️ Shopify",
        etsy: "🧵 Etsy",
        aliexpress: "🌏 AliExpress",
        instagram: "📸 Instagram",
        tiktok: "🎵 TikTok",
        facebook: "📘 Facebook",
        youtube: "▶️ YouTube",
        pinterest: "📌 Pinterest",
      },
      languages: {
        tr: "🇹🇷 Türkisch",
        en: "🇺🇸 Englisch",
        de: "🇩🇪 Deutsch",
        fr: "🇫🇷 Französisch",
        es: "🇪🇸 Spanisch",
        it: "🇮🇹 Italienisch",
        ar: "🇸🇦 Arabisch",
        ru: "🇷🇺 Russisch",
        zh: "🇨🇳 Chinesisch",
        nl: "🇳🇱 Niederländisch",
        pt: "🇵🇹 Portugiesisch",
        el: "🇬🇷 Griechisch",
        bg: "🇧🇬 Bulgarisch",
        az: "🇦🇿 Aserbaidschanisch",
      },
      tones: {
        resmi: "🏛️ Formal",
        samimi: "🤗 Freundlich",
        eglenceli: "🎉 Verspielt",
        teknik: "🧠 Technisch",
        "ikna-edici": "🧲 Überzeugend",
        hikaye: "📖 Storytelling",
        minimal: "🌿 Minimalistisch",
        premium: "💎 Premium",
        dinamik: "⚡ Dynamisch",
        "acil-kampanya": "⏱️ Dringend / FOMO",
      },
      button: {
        default: "Generieren",
        loading: "Wird erstellt...",
        checking: "Limit wird geprüft...",
      },
      errors: {
        missingTitle: "Bitte geben Sie einen gültigen Produkttitel ein.",
        noJavascript: "JavaScript-Code ist im Titel nicht erlaubt.",
        clipboardUnsupported: "Zwischenablage nicht unterstützt",
        copyFailed: "Kopieren fehlgeschlagen.",
        apiErrorPrefix: "API-Fehler",
        unknown: "Unbekannter Fehler",
      },
      usageLabel: "Heutige Nutzung: {{count}} / {{limit}}",
      usageServerLabel: "(Server verbleibend: {{remaining}})",
      resultsTitle: "Ergebnisse",
      resultStatus: {
        sending: "Anfrage wird gesendet",
        ready: "Bereit",
        draft: "Entwurf",
      },
      fields: {
        long: "Lange Beschreibung",
        short: "Kurze Beschreibung",
        seoMeta: "SEO-Meta",
        tags: "Tags / Keywords",
      },
      placeholders: {
        long: "Füllen Sie das Formular aus. API-Antworten erscheinen hier.",
        short: "Bulletpoints und Highlights erscheinen hier.",
        seoTitle: "Meta-Titel",
        seoDescription: "Meta-Beschreibung Platzhalter.",
      },
    },
    footer: {
      tagline: "Erstellen Sie SEO-optimierte Produkttexte in Sekunden.",
      rights: "Alle Rechte vorbehalten.",
      brand: "CopyBoost AI",
      linkLabel: "Murat Çakmak",
    },
    settings: {
      badge: "Profil & Sicherheit",
      title: "Kontoeinstellungen",
      description:
        "Aktualisieren Sie Ihre Angaben und ändern Sie Ihr Passwort. Die E-Mail bleibt aus Sicherheitsgründen unveränderbar.",
      statusBadge: "Eingeloggt",
      profileCard: {
        title: "Profilinformationen",
        subtitle: "Aktualisieren Sie Ihren Namen. Die E-Mail ist fest hinterlegt.",
        nameLabel: "Vollständiger Name",
        namePlaceholder: "z. B. Anna Müller",
        emailLabel: "E-Mail (nicht änderbar)",
        saveButton: "Profil speichern",
      },
      passwordCard: {
        title: "Passwort & Sicherheit",
        subtitle: "Wählen Sie ein starkes Passwort. Wir prüfen Ihr aktuelles Passwort zur Sicherheit.",
        currentLabel: "Aktuelles Passwort",
        newLabel: "Neues Passwort",
        chipLength: "Mind. 8 Zeichen",
        chipEmail: "E-Mail bleibt fix",
        saveButton: "Passwort aktualisieren",
        savingText: "Passwort wird aktualisiert...",
      },
      usageCard: {
        title: "Tarif & Nutzung",
        planLabel: "Tarif",
        dailyLimit: "Tageslimit",
        dailyUsed: "Heute genutzt",
        remaining: "Verbleibend",
        monthlyUsage: "Monatliche Nutzung",
        unlimited: "Unbegrenzt",
        empty: "-",
      },
      securityCard: {
        title: "Sicherheitshinweis",
        body: "Die E-Mail kann nicht geändert werden und Passwort-Updates benötigen eine Verifizierung. Teilen Sie Ihr Passwort niemals.",
      },
      apiCard: {
        title: "API-Schlüssel",
        description:
          "Persönliche Schlüssel werden hier angezeigt, sobald verfügbar. Zugang aktuell limitiert – Anfrage an support@copyboost.ai.",
        placeholder: "sk-live-*************",
      },
      states: {
        loading: "Wird geladen...",
        loginRequired: "Für Einstellungen müssen Sie eingeloggt sein. Weiterleitung...",
      },
    },
  },
  fr: {
    "nav": {
      "home": "Accueil",
      "dashboard": "Tableau de bord",
      "generate": "Générateur",
      "billing": "Facturation"
    },
    "auth": {
      "login": "Connexion",
      "settings": "Paramètres",
      "admin": "Page administrateur",
      "logout": "Déconnexion"
    },
    "hero": {
      "title": "Créez des descriptions produits en quelques secondes avec CopyBoost AI",
      "description": "Descriptions optimisées SEO, titres méta et suggestions de tags conçus pour les vendeurs sur Trendyol, Hepsiburada, Amazon et Shopify. Évoluez en toute confiance avec un modèle d’abonnement.",
      "primaryCta": "Essayer gratuitement",
      "secondaryCtaLoggedIn": "Continuer à générer",
      "secondaryCtaLoggedOut": "Créer du contenu",
      "sampleHeading": "Exemple de sortie",
      "sampleProductLabel": "Produit",
      "sampleLongLabel": "Description longue",
      "sampleMetaTitle": "Titre méta",
      "sampleMetaDescription": "Description méta",
      "sampleProductValue": "T-shirt en coton bio",
      "sampleLongText": "Tissu respirant et coupe minimaliste pour vos tenues du quotidien. 100 % coton biologique certifié GOTS, idéal pour les peaux sensibles.",
      "sampleMetaTitleValue": "T-shirt coton bio | Confort estival",
      "sampleMetaDescriptionValue": "T-shirt doux et durable en coton bio. Expédition rapide.",
      "sampleTags": ["bio", "t-shirt coton", "durable", "unisexe"]
    },
    "plan": {
      "planLabel": "Forfait",
      "dailyQuota": "Quota quotidien",
      "dailyRemaining": "Restant aujourd’hui",
      "dailyUsed": "Utilisé aujourd’hui",
      "monthlyUsage": "Ce mois-ci",
      "periodRemaining": "Temps restant du cycle",
      "unspecified": "Non précisé",
      "updating": "Mise à jour",
      "loading": "Chargement..."
    },
    "features": [
      {
        "title": "Des descriptions prêtes en quelques secondes",
        "description": "Obtenez instantanément des descriptions longues et courtes adaptées à chaque plateforme à partir du titre produit."
      },
      {
        "title": "Compatible marketplaces",
        "description": "Format et ton de voix automatiques pour Trendyol, Hepsiburada, Amazon, Shopify."
      },
      {
        "title": "Qualité et vitesse constantes",
        "description": "Du contenu cohérent, axé SEO, avec une génération rapide pour chaque produit."
      },
      {
        "title": "Un gain de temps précieux",
        "description": "Consacrez moins de temps à l’écriture manuelle et plus à l’opérationnel et à la croissance."
      }
    ],
    "common": {
      "loading": "Chargement...",
      "redirecting": "Redirection en cours...",
      "copy": "Copier",
      "copied": "Copié",
      "copyTooltip": "Copier le résultat",
      "close": "Fermer",
      "save": "Enregistrer",
      "saving": "Enregistrement...",
      "delete": "Supprimer",
      "deleting": "Suppression...",
      "confirm": "Confirmer",
      "cancel": "Annuler",
      "edit": "Modifier",
      "success": "Réussi",
      "error": "Erreur"
    },
    "authPages": {
      "login": {
        "badge": "Connexion",
        "heading": "Connectez-vous à votre compte CopyBoost AI",
        "description": "Connectez-vous avec votre adresse e-mail et votre mot de passe.",
        "emailPlaceholder": "E-mail",
        "passwordPlaceholder": "Mot de passe",
        "submit": "Se connecter",
        "loading": "Vérification...",
        "requiredError": "L’e-mail et le mot de passe sont obligatoires.",
        "genericError": "Erreur inattendue.",
        "failed": "Échec de la connexion",
        "success": "Connexion réussie.",
        "google": "Continuer avec Google",
        "switchText": "Pas encore de compte ?",
        "switchLink": "Créer un compte"
      },
      "register": {
        "badge": "Inscription",
        "heading": "Commencez gratuitement",
        "description": "Générez 5 contenus par jour avec l’offre Free, passez à Pro pour l’illimité.",
        "namePlaceholder": "Nom complet",
        "emailPlaceholder": "E-mail",
        "passwordPlaceholder": "Mot de passe (min. 8 caractères)",
        "submit": "Créer un compte",
        "loading": "Enregistrement...",
        "success": "Inscription réussie ! Vous pouvez maintenant vous connecter.",
        "requiredError": "L’e-mail et le mot de passe sont obligatoires.",
        "genericError": "Erreur inattendue.",
        "failed": "Échec de l’inscription",
        "google": "Continuer avec Google",
        "switchText": "Vous avez déjà un compte ?",
        "switchLink": "Se connecter"
      }
    },
    "dashboard": {
      "title": "Résumé de votre utilisation",
      "description": "Les requêtes et réponses sont enregistrées. Suivez votre flux de production en un coup d’œil.",
      "serverSync": "Récupération de l’historique depuis le serveur...",
      "cards": {
        "totalContentLabel": "Contenu total",
        "savedCountLabel": "Contenu enregistré",
        "recentUsageTitle": "Utilisation du jour",
        "planTitle": "Forfait",
        "newContentCta": "Créer un nouveau contenu",
        "remoteSyncing": "Synchronisation depuis le serveur"
      },
      "recentTitle": "Dernières requêtes et réponses",
      "recentCta": "Créer un nouveau contenu",
      "recentEmpty": "Aucune requête enregistrée pour l’instant. Créez un produit pour voir les résultats ici.",
      "previewMissingTitle": "Titre non renseigné",
      "previewMissingContent": "Contenu de réponse introuvable",
      "copyTooltip": "Copier le résultat",
      "modal": {
        "titleLabel": "Titre",
        "longLabel": "Description longue",
        "shortLabel": "Description courte",
        "seoTitleLabel": "Titre SEO",
        "seoDescriptionLabel": "Description SEO",
        "tagsLabel": "Tags"
      },
      "close": "Fermer"
    },
    "billing": {
      "title": "Gérez vos abonnements",
      "description": "Espace réservé pour Stripe Checkout et le portail client. Les changements de forfait et l’historique de paiement s’afficheront ici.",
      "planTitle": "Forfait actuel",
      "planDescription": "Générez jusqu’à 5 contenus par jour",
      "upgradeButton": "Passer à Pro",
      "billingTitle": "Facturation",
      "billingDescription": "Une fois le portail client Stripe connecté, les utilisateurs pourront mettre à jour leurs moyens de paiement et télécharger leurs factures.",
      "portalButton": "Ouvrir le portail Stripe"
    },
    "generate": {
      "heroTitle": "Saisissez les détails du produit et obtenez le texte de l’IA",
      "heroDescription": "CopyBoost AI génère en quelques secondes des descriptions optimisées SEO, des titres méta et des mots-clés pour Trendyol, Hepsiburada, Amazon, Shopify et les réseaux sociaux.",
      "limitReached": "Vous avez atteint votre limite quotidienne de {{limit}} générations. Réessayez demain ou passez à un forfait supérieur.",
      "limitReachedServer": "Quota quotidien atteint. Restant : 0 / {{limit}}",
      "titleLabel": "Titre du produit",
      "titlePlaceholder": "ex. T-shirt en coton bio",
      "titleHint": "Le code JavaScript n’est pas autorisé",
      "categoryLabel": "Catégorie",
      "platformLabel": "Plateforme",
      "languageLabel": "Langue cible",
      "toneLabel": "Ton",
      "categories": {
        "giyim": "👕 Mode & Prêt-à-porter",
        "elektronik": "🔌 Électronique",
        "kozmetik": "💄 Beauté & Soin",
        "ev-yasam": "🏠 Maison & Décoration",
        "spor-outdoor": "🏃‍♂️ Sport & Outdoor",
        "anne-bebek": "🍼 Maman & Bébé",
        "pet": "🐾 Animaux",
        "market": "🛒 Supermarché & Alimentation",
        "oto-aksesuar": "🚗 Auto & Accessoires",
        "hobi-sanat": "🎨 Loisirs & Art"
      },
      "platforms": {
        "trendyol": "🧡 Trendyol",
        "hepsiburada": "🟠 Hepsiburada",
        "amazon": "🛒 Amazon",
        "shopify": "🛍️ Shopify",
        "etsy": "🧵 Etsy",
        "aliexpress": "🌏 AliExpress",
        "instagram": "📸 Instagram",
        "tiktok": "🎵 TikTok",
        "facebook": "📘 Facebook",
        "youtube": "▶️ YouTube",
        "pinterest": "📌 Pinterest"
      },
      "languages": {
        "tr": "🇹🇷 Turc",
        "en": "🇺🇸 Anglais",
        "de": "🇩🇪 Allemand",
        "fr": "🇫🇷 Français",
        "es": "🇪🇸 Espagnol",
        "it": "🇮🇹 Italien",
        "ar": "🇸🇦 Arabe",
        "ru": "🇷🇺 Russe",
        "zh": "🇨🇳 Chinois",
        "nl": "🇳🇱 Néerlandais",
        "pt": "🇵🇹 Portugais",
        "el": "🇬🇷 Grec",
        "bg": "🇧🇬 Bulgare",
        "az": "🇦🇿 Azerbaïdjanais"
      },
      "tones": {
        "resmi": "🏛️ Formel",
        "samimi": "🤗 Chaleureux",
        "eglenceli": "🎉 Ludique",
        "teknik": "🧠 Technique",
        "ikna-edici": "🧲 Persuasif",
        "hikaye": "📖 Narratif",
        "minimal": "🌿 Minimaliste",
        "premium": "💎 Premium",
        "dinamik": "⚡ Dynamique",
        "acil-kampanya": "⏱️ Urgent / FOMO"
      },
      "button": {
        "default": "Générer",
        "loading": "Génération...",
        "checking": "Vérification du quota..."
      },
      "errors": {
        "missingTitle": "Veuillez saisir un titre de produit valide.",
        "noJavascript": "Le titre du produit ne peut pas contenir de code JavaScript.",
        "clipboardUnsupported": "Presse-papiers non pris en charge",
        "copyFailed": "Échec de la copie.",
        "apiErrorPrefix": "Erreur API",
        "unknown": "Erreur inconnue"
      },
      "usageLabel": "Utilisation du jour : {{count}} / {{limit}}",
      "usageServerLabel": "(reste côté serveur : {{remaining}})",
      "resultsTitle": "Résultats",
      "resultStatus": {
        "sending": "Envoi de la requête",
        "ready": "Prêt",
        "draft": "Brouillon"
      },
      "fields": {
        "long": "Description longue",
        "short": "Description courte",
        "seoMeta": "SEO méta",
        "tags": "Tags / mots-clés"
      },
      "placeholders": {
        "long": "Renseignez le produit pour commencer. La réponse de l’API s’affichera ici.",
        "short": "Les points clés et bullet points s’afficheront ici.",
        "seoTitle": "Titre méta",
        "seoDescription": "Placeholder de description méta."
      }
    },
    "footer": {
      "tagline": "Générez des descriptions produits optimisées SEO en quelques secondes.",
      "rights": "Tous droits réservés.",
      "brand": "CopyBoost AI",
      "linkLabel": "Murat Çakmak"
    },
    "settings": {
      "badge": "Profil & Sécurité",
      "title": "Paramètres du compte",
      "description": "Mettez à jour vos informations et changez votre mot de passe. L’adresse e-mail ne peut pas être modifiée pour des raisons de sécurité.",
      "statusBadge": "Connecté",
      "profileCard": {
        "title": "Informations de profil",
        "subtitle": "Mettez à jour votre nom. L’e-mail reste fixe.",
        "nameLabel": "Nom complet",
        "namePlaceholder": "ex. Marie Dupont",
        "emailLabel": "E-mail (non modifiable)",
        "saveButton": "Enregistrer le profil"
      },
      "passwordCard": {
        "title": "Mot de passe & sécurité",
        "subtitle": "Choisissez un mot de passe fort. Nous vérifions votre mot de passe actuel pour chaque changement.",
        "currentLabel": "Mot de passe actuel",
        "newLabel": "Nouveau mot de passe",
        "chipLength": "Min. 8 caractères",
        "chipEmail": "E-mail fixe",
        "saveButton": "Mettre à jour le mot de passe",
        "savingText": "Mise à jour du mot de passe..."
      },
      "usageCard": {
        "title": "Forfait & utilisation",
        "planLabel": "Forfait",
        "dailyLimit": "Limite quotidienne",
        "dailyUsed": "Utilisé aujourd’hui",
        "remaining": "Restant",
        "monthlyUsage": "Utilisation mensuelle",
        "unlimited": "Illimité",
        "empty": "-"
      },
      "securityCard": {
        "title": "Rappel de sécurité",
        "body": "L’e-mail ne peut pas être modifié et le changement de mot de passe nécessite une vérification. Ne partagez jamais votre mot de passe."
      },
      "apiCard": {
        "title": "Clé API",
        "description": "Vos clés personnelles apparaîtront ici lorsqu’elles seront disponibles. L’accès est limité — contactez support@copyboost.ai.",
        "placeholder": "sk-live-*************"
      },
      "states": {
        "loading": "Chargement...",
        "loginRequired": "Vous devez être connecté pour accéder aux paramètres. Redirection..."
      }
    }
  },
  ar: {
    "nav": {
      "home": "الصفحة الرئيسية",
      "dashboard": "لوحة التحكم",
      "generate": "المولّد",
      "billing": "الفواتير"
    },
    "auth": {
      "login": "تسجيل الدخول",
      "settings": "الإعدادات",
      "admin": "صفحة المدير",
      "logout": "تسجيل الخروج"
    },
    "hero": {
      "title": "أنشئ وصف المنتجات في ثوانٍ مع CopyBoost AI",
      "description": "وصف منتجات متوافق مع محركات البحث، وعناوين ميتا واقتراحات وسوم مخصّصة لبائعي Trendyol وHepsiburada وAmazon وShopify. نمّ عملك بثقة مع نموذج الاشتراك.",
      "primaryCta": "جرّبه مجانًا",
      "secondaryCtaLoggedIn": "تابع إنشاء المحتوى",
      "secondaryCtaLoggedOut": "ابدأ بإنشاء المحتوى",
      "sampleHeading": "نموذج مخرجات",
      "sampleProductLabel": "المنتج",
      "sampleLongLabel": "وصف طويل",
      "sampleMetaTitle": "عنوان ميتا",
      "sampleMetaDescription": "وصف ميتا",
      "sampleProductValue": "قميص قطن عضوي",
      "sampleLongText": "قماش قابل للتنفس وتصميم بسيط يناسب إطلالاتك اليومية. قطن عضوي 100٪ معتمد GOTS، لطيف على البشرة الحساسة.",
      "sampleMetaTitleValue": "قميص قطن عضوي | راحة صيفية",
      "sampleMetaDescriptionValue": "قميص قطن ناعم ومستدام مع شحن سريع.",
      "sampleTags": ["عضوي", "قميص قطن", "مستدام", "يونيسكس"]
    },
    "plan": {
      "planLabel": "الخطة",
      "dailyQuota": "الحد اليومي",
      "dailyRemaining": "المتبقي اليوم",
      "dailyUsed": "المستخدم اليوم",
      "monthlyUsage": "هذا الشهر",
      "periodRemaining": "المدة المتبقية",
      "unspecified": "غير محدد",
      "updating": "جارٍ التحديث",
      "loading": "جارٍ التحميل..."
    },
    "features": [
      {
        "title": "وصف جاهز خلال ثوانٍ",
        "description": "احصل على وصف طويل وقصير مناسب للمنصة مباشرة من عنوان المنتج."
      },
      {
        "title": "متوافق مع الأسواق",
        "description": "تنسيق تلقائي ونبرة لغة مناسبة لـ Trendyol وHepsiburada وAmazon وShopify."
      },
      {
        "title": "جودة ثابتة وسرعة ثابتة",
        "description": "محتوى متّسق يركّز على الـ SEO مع سرعة عالية لكل منتج."
      },
      {
        "title": "توفير وقت إضافي",
        "description": "استثمر الوقت بدل كتابة المحتوى يدويًا في العمليات والمبيعات."
      }
    ],
    "common": {
      "loading": "جارٍ التحميل...",
      "redirecting": "جارٍ إعادة التوجيه...",
      "copy": "نسخ",
      "copied": "تم النسخ",
      "copyTooltip": "نسخ النتيجة",
      "close": "إغلاق",
      "save": "حفظ",
      "saving": "جارٍ الحفظ...",
      "delete": "حذف",
      "deleting": "جارٍ الحذف...",
      "confirm": "تأكيد",
      "cancel": "إلغاء",
      "edit": "تعديل",
      "success": "تم بنجاح",
      "error": "خطأ"
    },
    "authPages": {
      "login": {
        "badge": "تسجيل الدخول",
        "heading": "سجّل الدخول إلى حساب CopyBoost AI",
        "description": "استخدم بريدك الإلكتروني وكلمة المرور.",
        "emailPlaceholder": "البريد الإلكتروني",
        "passwordPlaceholder": "كلمة المرور",
        "submit": "تسجيل الدخول",
        "loading": "جارٍ التحقق...",
        "requiredError": "البريد الإلكتروني وكلمة المرور مطلوبان.",
        "genericError": "خطأ غير متوقع.",
        "failed": "فشل تسجيل الدخول",
        "success": "تم تسجيل الدخول بنجاح.",
        "google": "المتابعة باستخدام Google",
        "switchText": "ليس لديك حساب؟",
        "switchLink": "إنشاء حساب"
      },
      "register": {
        "badge": "إنشاء حساب",
        "heading": "ابدأ مجانًا",
        "description": "أنشئ حتى 5 عناصر يوميًا مع الخطة المجانية، واحصل على عدد غير محدود مع خطة Pro.",
        "namePlaceholder": "الاسم الكامل",
        "emailPlaceholder": "البريد الإلكتروني",
        "passwordPlaceholder": "كلمة المرور (8 أحرف على الأقل)",
        "submit": "إنشاء حساب",
        "loading": "جارٍ الحفظ...",
        "success": "تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.",
        "requiredError": "البريد الإلكتروني وكلمة المرور مطلوبان.",
        "genericError": "خطأ غير متوقع.",
        "failed": "فشل إنشاء الحساب",
        "google": "المتابعة باستخدام Google",
        "switchText": "هل لديك حساب بالفعل؟",
        "switchLink": "تسجيل الدخول"
      }
    },
    "dashboard": {
      "title": "ملخص الاستخدام",
      "description": "يتم حفظ طلبات البحث والردود. تابع بيانات سير عمل إنشاء المحتوى من هنا.",
      "serverSync": "جارٍ جلب المحتوى السابق من الخادم...",
      "cards": {
        "totalContentLabel": "إجمالي المحتوى",
        "savedCountLabel": "عدد المحتويات المحفوظة",
        "recentUsageTitle": "استخدام اليوم",
        "planTitle": "الخطة",
        "newContentCta": "إنشاء محتوى جديد",
        "remoteSyncing": "جارٍ الجلب من الخادم"
      },
      "recentTitle": "أحدث الطلبات والردود",
      "recentCta": "إنشاء محتوى جديد",
      "recentEmpty": "لا يوجد بحث محفوظ بعد. أدخل منتجًا جديدًا لرؤية النتائج هنا.",
      "previewMissingTitle": "لم يتم تحديد عنوان",
      "previewMissingContent": "تعذر حفظ محتوى الرد",
      "copyTooltip": "نسخ النتيجة",
      "modal": {
        "titleLabel": "العنوان",
        "longLabel": "وصف طويل",
        "shortLabel": "وصف قصير",
        "seoTitleLabel": "عنوان SEO",
        "seoDescriptionLabel": "وصف SEO",
        "tagsLabel": "الوسوم"
      },
      "close": "إغلاق"
    },
    "billing": {
      "title": "إدارة الاشتراكات",
      "description": "مكان مخصص لتكامل Stripe Checkout وبوابة العميل. سيظهر هنا تغيير الخطط وسجل المدفوعات.",
      "planTitle": "الخطة الحالية",
      "planDescription": "إنشاء حتى 5 محتويات يوميًا",
      "upgradeButton": "الترقية إلى Pro",
      "billingTitle": "الفوترة",
      "billingDescription": "عند ربط بوابة Stripe، يمكن للمستخدمين تحديث بيانات بطاقاتهم وعرض فواتيرهم.",
      "portalButton": "فتح بوابة Stripe"
    },
    "generate": {
      "heroTitle": "أدخل تفاصيل المنتج واحصل على نص الذكاء الاصطناعي",
      "heroDescription": "CopyBoost AI ينشئ أوصافًا متوافقة مع SEO وعناوين ميتا واقتراحات وسوم لبائعي Trendyol وHepsiburada وAmazon وShopify وقنوات التواصل الاجتماعي خلال ثوانٍ.",
      "limitReached": "لقد وصلت إلى حد {{limit}} اليومي. جرّب غدًا أو قم بترقية خطتك.",
      "limitReachedServer": "تم بلوغ الحد اليومي. المتبقي: 0 / {{limit}}",
      "titleLabel": "عنوان المنتج",
      "titlePlaceholder": "مثال: قميص قطن عضوي",
      "titleHint": "لا يُسمح باستخدام كود JavaScript",
      "categoryLabel": "الفئة",
      "platformLabel": "المنصة",
      "languageLabel": "اللغة المستهدفة",
      "toneLabel": "النبرة",
      "categories": {
        "giyim": "👕 أزياء وملابس",
        "elektronik": "🔌 إلكترونيات",
        "kozmetik": "💄 تجميل وعناية",
        "ev-yasam": "🏠 منزل ومعيشة",
        "spor-outdoor": "🏃‍♂️ رياضة وخارجية",
        "anne-bebek": "🍼 أم وطفل",
        "pet": "🐾 حيوانات أليفة",
        "market": "🛒 سوق وأغذية",
        "oto-aksesuar": "🚗 سيارات وإكسسوارات",
        "hobi-sanat": "🎨 هوايات وفن"
      },
      "platforms": {
        "trendyol": "🧡 Trendyol",
        "hepsiburada": "🟠 Hepsiburada",
        "amazon": "🛒 Amazon",
        "shopify": "🛍️ Shopify",
        "etsy": "🧵 Etsy",
        "aliexpress": "🌏 AliExpress",
        "instagram": "📸 Instagram",
        "tiktok": "🎵 TikTok",
        "facebook": "📘 Facebook",
        "youtube": "▶️ YouTube",
        "pinterest": "📌 Pinterest"
      },
      "languages": {
        "tr": "🇹🇷 التركية",
        "en": "🇺🇸 الإنجليزية",
        "de": "🇩🇪 الألمانية",
        "fr": "🇫🇷 الفرنسية",
        "es": "🇪🇸 الإسبانية",
        "it": "🇮🇹 الإيطالية",
        "ar": "🇸🇦 العربية",
        "ru": "🇷🇺 الروسية",
        "zh": "🇨🇳 الصينية",
        "nl": "🇳🇱 الهولندية",
        "pt": "🇵🇹 البرتغالية",
        "el": "🇬🇷 اليونانية",
        "bg": "🇧🇬 البلغارية",
        "az": "🇦🇿 الأذربيجانية"
      },
      "tones": {
        "resmi": "🏛️ رسمي",
        "samimi": "🤗 ودّي",
        "eglenceli": "🎉 ممتع",
        "teknik": "🧠 تقني",
        "ikna-edici": "🧲 إقناعي",
        "hikaye": "📖 سرد قصصي",
        "minimal": "🌿 بسيط",
        "premium": "💎 فاخر",
        "dinamik": "⚡ ديناميكي",
        "acil-kampanya": "⏱️ عاجل / FOMO"
      },
      "button": {
        "default": "إنشاء",
        "loading": "جارٍ الإنشاء...",
        "checking": "جارٍ التحقق من الحد..."
      },
      "errors": {
        "missingTitle": "يرجى إدخال عنوان منتج صالح.",
        "noJavascript": "لا يمكنك استخدام كود JavaScript في عنوان المنتج.",
        "clipboardUnsupported": "الحافظة غير مدعومة",
        "copyFailed": "فشل النسخ.",
        "apiErrorPrefix": "خطأ في واجهة البرمجة",
        "unknown": "خطأ غير معروف"
      },
      "usageLabel": "استخدام اليوم: {{count}} / {{limit}}",
      "usageServerLabel": "(المتبقي على الخادم: {{remaining}})",
      "resultsTitle": "النتائج",
      "resultStatus": {
        "sending": "جارٍ إرسال الطلب",
        "ready": "جاهز",
        "draft": "مسودة"
      },
      "fields": {
        "long": "وصف طويل",
        "short": "وصف قصير",
        "seoMeta": "SEO ميتا",
        "tags": "وسوم / كلمات مفتاحية"
      },
      "placeholders": {
        "long": "املأ بيانات المنتج للبدء. ستظهر استجابة الـ API هنا.",
        "short": "ستظهر نقاط التعداد والميزات البارزة هنا.",
        "seoTitle": "عنوان ميتا",
        "seoDescription": "placeholder لوصف الميتا."
      }
    },
    "footer": {
      "tagline": "أنشئ أوصاف منتجات متوافقة مع SEO في ثوانٍ.",
      "rights": "جميع الحقوق محفوظة.",
      "brand": "CopyBoost AI",
      "linkLabel": "Murat Çakmak"
    },
    "settings": {
      "badge": "الملف الشخصي والأمان",
      "title": "إعدادات الحساب",
      "description": "حدّث معلوماتك وغيّر كلمة المرور. لا يمكن تغيير البريد الإلكتروني لأسباب أمنية.",
      "statusBadge": "تم تسجيل الدخول",
      "profileCard": {
        "title": "معلومات الملف الشخصي",
        "subtitle": "يمكنك تحديث اسمك، البريد الإلكتروني ثابت.",
        "nameLabel": "الاسم الكامل",
        "namePlaceholder": "مثال: أحمد علي",
        "emailLabel": "البريد الإلكتروني (غير قابل للتغيير)",
        "saveButton": "حفظ الملف الشخصي"
      },
      "passwordCard": {
        "title": "كلمة المرور والأمان",
        "subtitle": "اختر كلمة مرور قوية. نتحقق من كلمتك الحالية قبل التغيير.",
        "currentLabel": "كلمة المرور الحالية",
        "newLabel": "كلمة المرور الجديدة",
        "chipLength": "8 أحرف على الأقل",
        "chipEmail": "البريد الإلكتروني ثابت",
        "saveButton": "تحديث كلمة المرور",
        "savingText": "جارٍ تحديث كلمة المرور..."
      },
      "usageCard": {
        "title": "الخطة والاستخدام",
        "planLabel": "الخطة",
        "dailyLimit": "الحد اليومي",
        "dailyUsed": "المستخدم اليوم",
        "remaining": "المتبقي",
        "monthlyUsage": "الاستخدام الشهري",
        "unlimited": "غير محدود",
        "empty": "-"
      },
      "securityCard": {
        "title": "تذكير أمني",
        "body": "لا يمكن تغيير البريد الإلكتروني، وتغيير كلمة المرور يتطلب التحقق من الكلمة الحالية. لا تشارك كلمة مرورك مع أي شخص."
      },
      "apiCard": {
        "title": "مفتاح الـ API",
        "description": "سيتم عرض المفاتيح الشخصية هنا عند توفرها. الوصول محدود حاليًا – للمزيد راسل support@copyboost.ai.",
        "placeholder": "sk-live-*************"
      },
      "states": {
        "loading": "جارٍ التحميل...",
        "loginRequired": "يجب تسجيل الدخول للوصول إلى الإعدادات. جارٍ إعادة التوجيه..."
      }
    }
  },
  es: {
    "nav": {
      "home": "Inicio",
      "dashboard": "Panel",
      "generate": "Generador",
      "billing": "Facturación"
    },
    "auth": {
      "login": "Iniciar sesión",
      "settings": "Ajustes",
      "admin": "Página de administrador",
      "logout": "Cerrar sesión"
    },
    "hero": {
      "title": "Crea descripciones de productos en segundos con CopyBoost AI",
      "description": "Descripciones optimizadas para SEO, títulos meta y sugerencias de etiquetas para vendedores de Trendyol, Hepsiburada, Amazon y Shopify. Escala tu catálogo con confianza mediante suscripción.",
      "primaryCta": "Probar gratis",
      "secondaryCtaLoggedIn": "Seguir generando",
      "secondaryCtaLoggedOut": "Crear contenido",
      "sampleHeading": "Ejemplo de salida",
      "sampleProductLabel": "Producto",
      "sampleLongLabel": "Descripción larga",
      "sampleMetaTitle": "Título meta",
      "sampleMetaDescription": "Descripción meta",
      "sampleProductValue": "Camiseta de algodón orgánico",
      "sampleLongText": "Tejido transpirable y diseño minimalista para tu día a día. Algodón 100 % orgánico certificado GOTS, ideal para pieles sensibles.",
      "sampleMetaTitleValue": "Camiseta algodón orgánico | Comodidad veraniega",
      "sampleMetaDescriptionValue": "Camiseta sostenible y suave con envío rápido.",
      "sampleTags": ["orgánico", "camiseta algodón", "sostenible", "unisex"]
    },
    "plan": {
      "planLabel": "Plan",
      "dailyQuota": "Cupo diario",
      "dailyRemaining": "Restante hoy",
      "dailyUsed": "Usado hoy",
      "monthlyUsage": "Este mes",
      "periodRemaining": "Restante del ciclo",
      "unspecified": "No especificado",
      "updating": "Actualizando",
      "loading": "Cargando..."
    },
    "features": [
      {
        "title": "Contenido listo en segundos",
        "description": "Obtén descripciones largas y cortas adaptadas a cada marketplace a partir del título del producto."
      },
      {
        "title": "Compatible con marketplaces",
        "description": "Formato automático y tono adecuado para Trendyol, Hepsiburada, Amazon, Shopify."
      },
      {
        "title": "Calidad y velocidad constantes",
        "description": "Contenido coherente y optimizado para SEO con entrega rápida en cada producto."
      },
      {
        "title": "Ahorra tiempo valioso",
        "description": "Dedica menos tiempo a escribir a mano y más a la operación y al crecimiento."
      }
    ],
    "common": {
      "loading": "Cargando...",
      "redirecting": "Redirigiendo...",
      "copy": "Copiar",
      "copied": "Copiado",
      "copyTooltip": "Copiar resultado",
      "close": "Cerrar",
      "save": "Guardar",
      "saving": "Guardando...",
      "delete": "Eliminar",
      "deleting": "Eliminando...",
      "confirm": "Confirmar",
      "cancel": "Cancelar",
      "edit": "Editar",
      "success": "Correcto",
      "error": "Error"
    },
    "authPages": {
      "login": {
        "badge": "Iniciar sesión",
        "heading": "Accede a tu cuenta de CopyBoost AI",
        "description": "Usa tu correo electrónico y contraseña.",
        "emailPlaceholder": "Correo electrónico",
        "passwordPlaceholder": "Contraseña",
        "submit": "Iniciar sesión",
        "loading": "Verificando...",
        "requiredError": "El correo electrónico y la contraseña son obligatorios.",
        "genericError": "Error inesperado.",
        "failed": "Fallo al iniciar sesión",
        "success": "Inicio de sesión correcto.",
        "google": "Continuar con Google",
        "switchText": "¿Todavía no tienes cuenta?",
        "switchLink": "Crear cuenta"
      },
      "register": {
        "badge": "Crear cuenta",
        "heading": "Empieza gratis",
        "description": "Genera 5 contenidos al día con el plan Free; desbloquea ilimitado con Pro.",
        "namePlaceholder": "Nombre completo",
        "emailPlaceholder": "Correo electrónico",
        "passwordPlaceholder": "Contraseña (mínimo 8 caracteres)",
        "submit": "Crear cuenta",
        "loading": "Guardando...",
        "success": "Registro correcto. Ya puedes iniciar sesión.",
        "requiredError": "El correo electrónico y la contraseña son obligatorios.",
        "genericError": "Error inesperado.",
        "failed": "Fallo en el registro",
        "google": "Continuar con Google",
        "switchText": "¿Ya tienes cuenta?",
        "switchLink": "Iniciar sesión"
      }
    },
    "dashboard": {
      "title": "Resumen de uso",
      "description": "Cada consulta y respuesta de IA se registra. Revisa tu flujo de producción de un vistazo.",
      "serverSync": "Obteniendo historial del servidor...",
      "cards": {
        "totalContentLabel": "Contenido total",
        "savedCountLabel": "Elementos guardados",
        "recentUsageTitle": "Uso de hoy",
        "planTitle": "Plan",
        "newContentCta": "Crear nuevo contenido",
        "remoteSyncing": "Sincronizando desde el servidor"
      },
      "recentTitle": "Consultas y resultados recientes",
      "recentCta": "Crear nuevo contenido",
      "recentEmpty": "Aún no hay consultas guardadas. Crea un producto para ver los resultados aquí.",
      "previewMissingTitle": "Sin título",
      "previewMissingContent": "Falta contenido de respuesta",
      "copyTooltip": "Copiar resultado",
      "modal": {
        "titleLabel": "Título",
        "longLabel": "Descripción larga",
        "shortLabel": "Descripción corta",
        "seoTitleLabel": "Título SEO",
        "seoDescriptionLabel": "Descripción SEO",
        "tagsLabel": "Etiquetas"
      },
      "close": "Cerrar"
    },
    "billing": {
      "title": "Gestiona tus suscripciones",
      "description": "Espacio reservado para Stripe Checkout y el portal de clientes. Aquí se mostrarán cambios de plan e historial de pagos.",
      "planTitle": "Plan actual",
      "planDescription": "Genera 5 contenidos al día",
      "upgradeButton": "Actualizar a Pro",
      "billingTitle": "Facturación",
      "billingDescription": "Una vez vinculado el portal de Stripe, los usuarios podrán actualizar sus datos de pago y descargar sus facturas.",
      "portalButton": "Abrir portal de Stripe"
    },
    "generate": {
      "heroTitle": "Introduce los detalles del producto y obtiene el texto con IA",
      "heroDescription": "CopyBoost AI genera descripciones optimizadas para SEO, títulos meta y etiquetas clave para Trendyol, Hepsiburada, Amazon, Shopify y redes sociales en cuestión de segundos.",
      "limitReached": "Has alcanzado el límite diario de {{limit}}. Inténtalo de nuevo mañana o mejora tu plan.",
      "limitReachedServer": "Se alcanzó el cupo diario. Restante: 0 / {{limit}}",
      "titleLabel": "Título del producto",
      "titlePlaceholder": "p. ej. Camiseta de algodón orgánico",
      "titleHint": "No se permite código JavaScript",
      "categoryLabel": "Categoría",
      "platformLabel": "Plataforma",
      "languageLabel": "Idioma objetivo",
      "toneLabel": "Tono",
      "categories": {
        "giyim": "👕 Moda y Ropa",
        "elektronik": "🔌 Electrónica",
        "kozmetik": "💄 Belleza y Cuidado",
        "ev-yasam": "🏠 Hogar y Decoración",
        "spor-outdoor": "🏃‍♂️ Deportes y Outdoor",
        "anne-bebek": "🍼 Mamá y Bebé",
        "pet": "🐾 Mascotas",
        "market": "🛒 Supermercado y Alimentos",
        "oto-aksesuar": "🚗 Automóvil y Accesorios",
        "hobi-sanat": "🎨 Hobby y Arte"
      },
      "platforms": {
        "trendyol": "🧡 Trendyol",
        "hepsiburada": "🟠 Hepsiburada",
        "amazon": "🛒 Amazon",
        "shopify": "🛍️ Shopify",
        "etsy": "🧵 Etsy",
        "aliexpress": "🌏 AliExpress",
        "instagram": "📸 Instagram",
        "tiktok": "🎵 TikTok",
        "facebook": "📘 Facebook",
        "youtube": "▶️ YouTube",
        "pinterest": "📌 Pinterest"
      },
      "languages": {
        "tr": "🇹🇷 Turco",
        "en": "🇺🇸 Inglés",
        "de": "🇩🇪 Alemán",
        "fr": "🇫🇷 Francés",
        "es": "🇪🇸 Español",
        "it": "🇮🇹 Italiano",
        "ar": "🇸🇦 Árabe",
        "ru": "🇷🇺 Ruso",
        "zh": "🇨🇳 Chino",
        "nl": "🇳🇱 Neerlandés",
        "pt": "🇵🇹 Portugués",
        "el": "🇬🇷 Griego",
        "bg": "🇧🇬 Búlgaro",
        "az": "🇦🇿 Azerí"
      },
      "tones": {
        "resmi": "🏛️ Formal",
        "samimi": "🤗 Cercano",
        "eglenceli": "🎉 Divertido",
        "teknik": "🧠 Técnico",
        "ikna-edici": "🧲 Persuasivo",
        "hikaye": "📖 Narrativo",
        "minimal": "🌿 Minimalista",
        "premium": "💎 Premium",
        "dinamik": "⚡ Dinámico",
        "acil-kampanya": "⏱️ Urgente / FOMO"
      },
      "button": {
        "default": "Generar",
        "loading": "Generando...",
        "checking": "Comprobando límite..."
      },
      "errors": {
        "missingTitle": "Introduce un título de producto válido.",
        "noJavascript": "No se permite código JavaScript en el título.",
        "clipboardUnsupported": "Portapapeles no soportado",
        "copyFailed": "Error al copiar.",
        "apiErrorPrefix": "Error de API",
        "unknown": "Error desconocido"
      },
      "usageLabel": "Uso de hoy: {{count}} / {{limit}}",
      "usageServerLabel": "(restante en servidor: {{remaining}})",
      "resultsTitle": "Resultados",
      "resultStatus": {
        "sending": "Enviando petición",
        "ready": "Listo",
        "draft": "Borrador"
      },
      "fields": {
        "long": "Descripción larga",
        "short": "Descripción corta",
        "seoMeta": "SEO meta",
        "tags": "Etiquetas / palabras clave"
      },
      "placeholders": {
        "long": "Rellena el producto para empezar. La respuesta de la API aparecerá aquí.",
        "short": "Los puntos clave y bullets aparecerán aquí.",
        "seoTitle": "Título meta",
        "seoDescription": "Placeholder de descripción meta."
      }
    },
    "footer": {
      "tagline": "Crea descripciones de producto optimizadas para SEO en segundos.",
      "rights": "Todos los derechos reservados.",
      "brand": "CopyBoost AI",
      "linkLabel": "Murat Çakmak"
    },
    "settings": {
      "badge": "Perfil y seguridad",
      "title": "Ajustes de la cuenta",
      "description": "Actualiza tus datos y cambia tu contraseña. El correo se mantiene fijo por seguridad.",
      "statusBadge": "Sesión iniciada",
      "profileCard": {
        "title": "Información de perfil",
        "subtitle": "Actualiza tu nombre. El correo no se puede cambiar.",
        "nameLabel": "Nombre completo",
        "namePlaceholder": "p. ej. Juan Pérez",
        "emailLabel": "Correo (solo lectura)",
        "saveButton": "Guardar perfil"
      },
      "passwordCard": {
        "title": "Contraseña y seguridad",
        "subtitle": "Elige una contraseña segura. Verificamos tu contraseña actual por seguridad.",
        "currentLabel": "Contraseña actual",
        "newLabel": "Nueva contraseña",
        "chipLength": "Mínimo 8 caracteres",
        "chipEmail": "Correo bloqueado",
        "saveButton": "Actualizar contraseña",
        "savingText": "Actualizando contraseña..."
      },
      "usageCard": {
        "title": "Plan y uso",
        "planLabel": "Plan",
        "dailyLimit": "Límite diario",
        "dailyUsed": "Usado hoy",
        "remaining": "Restante",
        "monthlyUsage": "Uso mensual",
        "unlimited": "Ilimitado",
        "empty": "-"
      },
      "securityCard": {
        "title": "Recordatorio de seguridad",
        "body": "El correo no puede cambiarse y la actualización de contraseña requiere verificación. Nunca compartas tu contraseña."
      },
      "apiCard": {
        "title": "Clave de API",
        "description": "Las claves personales aparecerán aquí cuando estén disponibles. El acceso es limitado; escribe a support@copyboost.ai.",
        "placeholder": "sk-live-*************"
      },
      "states": {
        "loading": "Cargando...",
        "loginRequired": "Debes iniciar sesión para gestionar la cuenta. Redirigiendo..."
      }
    }
  },
  pt: {
    "nav": {
      "home": "Início",
      "dashboard": "Painel",
      "generate": "Gerador",
      "billing": "Faturação"
    },
    "auth": {
      "login": "Entrar",
      "settings": "Definições",
      "admin": "Página de admin",
      "logout": "Sair"
    },
    "hero": {
      "title": "Crie descrições de produtos em segundos com o CopyBoost AI",
      "description": "Descrições otimizadas para SEO, títulos meta e sugestões de etiquetas para vendedores da Trendyol, Hepsiburada, Amazon e Shopify. Escale o seu catálogo com confiança através de subscrição.",
      "primaryCta": "Experimentar grátis",
      "secondaryCtaLoggedIn": "Continuar a gerar",
      "secondaryCtaLoggedOut": "Criar conteúdo",
      "sampleHeading": "Exemplo de saída",
      "sampleProductLabel": "Produto",
      "sampleLongLabel": "Descrição longa",
      "sampleMetaTitle": "Meta título",
      "sampleMetaDescription": "Meta descrição",
      "sampleProductValue": "T-shirt de algodão orgânico",
      "sampleLongText": "Tecido respirável e corte minimalista para o dia a dia. 100% algodão orgânico certificado GOTS, ideal para peles sensíveis.",
      "sampleMetaTitleValue": "T-shirt algodão orgânico | Conforto de verão",
      "sampleMetaDescriptionValue": "T-shirt sustentável e macia com envio rápido.",
      "sampleTags": ["orgânico", "t-shirt algodão", "sustentável", "unissex"]
    },
    "plan": {
      "planLabel": "Plano",
      "dailyQuota": "Cota diária",
      "dailyRemaining": "Restante hoje",
      "dailyUsed": "Usado hoje",
      "monthlyUsage": "Este mês",
      "periodRemaining": "Restante do ciclo",
      "unspecified": "Não especificado",
      "updating": "A atualizar",
      "loading": "A carregar..."
    },
    "features": [
      {
        "title": "Conteúdo pronto em segundos",
        "description": "Obtenha descrições longas e curtas adaptadas a cada marketplace a partir do título do produto."
      },
      {
        "title": "Compatível com marketplaces",
        "description": "Formatação automática e tom adequado para Trendyol, Hepsiburada, Amazon, Shopify."
      },
      {
        "title": "Qualidade e velocidade constantes",
        "description": "Texto consistente e optimizado para SEO com geração rápida para cada produto."
      },
      {
        "title": "Poupe tempo precioso",
        "description": "Dedique menos tempo à escrita manual e mais às operações e crescimento."
      }
    ],
    "common": {
      "loading": "A carregar...",
      "redirecting": "A redirecionar...",
      "copy": "Copiar",
      "copied": "Copiado",
      "copyTooltip": "Copiar resultado",
      "close": "Fechar",
      "save": "Guardar",
      "saving": "A guardar...",
      "delete": "Eliminar",
      "deleting": "A eliminar...",
      "confirm": "Confirmar",
      "cancel": "Cancelar",
      "edit": "Editar",
      "success": "Sucesso",
      "error": "Erro"
    },
    "authPages": {
      "login": {
        "badge": "Entrar",
        "heading": "Inicie sessão na sua conta CopyBoost AI",
        "description": "Use o seu e-mail e palavra-passe.",
        "emailPlaceholder": "E-mail",
        "passwordPlaceholder": "Palavra-passe",
        "submit": "Entrar",
        "loading": "A verificar...",
        "requiredError": "E-mail e palavra-passe são obrigatórios.",
        "genericError": "Erro inesperado.",
        "failed": "Falha ao iniciar sessão",
        "success": "Sessão iniciada com sucesso.",
        "google": "Continuar com o Google",
        "switchText": "Ainda não tem conta?",
        "switchLink": "Criar conta"
      },
      "register": {
        "badge": "Criar conta",
        "heading": "Comece gratuitamente",
        "description": "Gere 5 conteúdos diários no plano Free, desbloqueie ilimitado no plano Pro.",
        "namePlaceholder": "Nome completo",
        "emailPlaceholder": "E-mail",
        "passwordPlaceholder": "Palavra-passe (mínimo 8 caracteres)",
        "submit": "Criar conta",
        "loading": "A guardar...",
        "success": "Registo concluído! Já pode iniciar sessão.",
        "requiredError": "E-mail e palavra-passe são obrigatórios.",
        "genericError": "Erro inesperado.",
        "failed": "Falha no registo",
        "google": "Continuar com o Google",
        "switchText": "Já tem conta?",
        "switchLink": "Entrar"
      }
    },
    "dashboard": {
      "title": "Resumo da sua utilização",
      "description": "Todas as solicitações e respostas de IA são registadas. Acompanhe o seu fluxo de produção facilmente.",
      "serverSync": "A obter histórico do servidor...",
      "cards": {
        "totalContentLabel": "Conteúdo total",
        "savedCountLabel": "Itens guardados",
        "recentUsageTitle": "Utilização de hoje",
        "planTitle": "Plano",
        "newContentCta": "Criar novo conteúdo",
        "remoteSyncing": "A sincronizar do servidor"
      },
      "recentTitle": "Pedidos e resultados recentes",
      "recentCta": "Criar novo conteúdo",
      "recentEmpty": "Ainda não há pedidos guardados. Crie um novo produto para ver os resultados aqui.",
      "previewMissingTitle": "Título em falta",
      "previewMissingContent": "Conteúdo da resposta em falta",
      "copyTooltip": "Copiar resultado",
      "modal": {
        "titleLabel": "Título",
        "longLabel": "Descrição longa",
        "shortLabel": "Descrição curta",
        "seoTitleLabel": "Título SEO",
        "seoDescriptionLabel": "Descrição SEO",
        "tagsLabel": "Etiquetas"
      },
      "close": "Fechar"
    },
    "billing": {
      "title": "Gerir subscrições",
      "description": "Placeholder para Stripe Checkout e portal do cliente. Alterações de plano e histórico de pagamentos serão mostrados aqui.",
      "planTitle": "Plano atual",
      "planDescription": "Gera até 5 conteúdos por dia",
      "upgradeButton": "Atualizar para Pro",
      "billingTitle": "Faturação",
      "billingDescription": "Quando o portal Stripe estiver ligado, os utilizadores poderão atualizar dados de pagamento e descarregar faturas.",
      "portalButton": "Abrir portal Stripe"
    },
    "generate": {
      "heroTitle": "Introduza os detalhes do produto e obtenha o texto da IA",
      "heroDescription": "O CopyBoost AI cria descrições otimizadas para SEO, títulos meta e etiquetas de palavras-chave para Trendyol, Hepsiburada, Amazon, Shopify e redes sociais em segundos.",
      "limitReached": "Atingiu o limite diário de {{limit}}. Tente novamente amanhã ou atualize o seu plano.",
      "limitReachedServer": "Limite diário atingido. Restante: 0 / {{limit}}",
      "titleLabel": "Título do produto",
      "titlePlaceholder": "ex.: T-shirt de algodão orgânico",
      "titleHint": "Código JavaScript não é permitido",
      "categoryLabel": "Categoria",
      "platformLabel": "Plataforma",
      "languageLabel": "Idioma alvo",
      "toneLabel": "Tom",
      "categories": {
        "giyim": "👕 Moda & Vestuário",
        "elektronik": "🔌 Eletrónica",
        "kozmetik": "💄 Beleza & Cuidado",
        "ev-yasam": "🏠 Casa & Decoração",
        "spor-outdoor": "🏃‍♂️ Desporto & Outdoor",
        "anne-bebek": "🍼 Mãe & Bebé",
        "pet": "🐾 Animais de estimação",
        "market": "🛒 Mercearia & Alimentação",
        "oto-aksesuar": "🚗 Auto & Acessórios",
        "hobi-sanat": "🎨 Hobby & Arte"
      },
      "platforms": {
        "trendyol": "🧡 Trendyol",
        "hepsiburada": "🟠 Hepsiburada",
        "amazon": "🛒 Amazon",
        "shopify": "🛍️ Shopify",
        "etsy": "🧵 Etsy",
        "aliexpress": "🌏 AliExpress",
        "instagram": "📸 Instagram",
        "tiktok": "🎵 TikTok",
        "facebook": "📘 Facebook",
        "youtube": "▶️ YouTube",
        "pinterest": "📌 Pinterest"
      },
      "languages": {
        "tr": "🇹🇷 Turco",
        "en": "🇺🇸 Inglês",
        "de": "🇩🇪 Alemão",
        "fr": "🇫🇷 Francês",
        "es": "🇪🇸 Espanhol",
        "it": "🇮🇹 Italiano",
        "ar": "🇸🇦 Árabe",
        "ru": "🇷🇺 Russo",
        "zh": "🇨🇳 Chinês",
        "nl": "🇳🇱 Neerlandês",
        "pt": "🇵🇹 Português",
        "el": "🇬🇷 Grego",
        "bg": "🇧🇬 Búlgaro",
        "az": "🇦🇿 Azerbaijano"
      },
      "tones": {
        "resmi": "🏛️ Formal",
        "samimi": "🤗 Informal",
        "eglenceli": "🎉 Divertido",
        "teknik": "🧠 Técnico",
        "ikna-edici": "🧲 Persuasivo",
        "hikaye": "📖 Storytelling",
        "minimal": "🌿 Minimalista",
        "premium": "💎 Premium",
        "dinamik": "⚡ Dinâmico",
        "acil-kampanya": "⏱️ Urgente / FOMO"
      },
      "button": {
        "default": "Gerar",
        "loading": "A gerar...",
        "checking": "A verificar limite..."
      },
      "errors": {
        "missingTitle": "Insira um título de produto válido.",
        "noJavascript": "Não pode usar código JavaScript no título.",
        "clipboardUnsupported": "Área de transferência não suportada",
        "copyFailed": "Falha ao copiar.",
        "apiErrorPrefix": "Erro de API",
        "unknown": "Erro desconhecido"
      },
      "usageLabel": "Utilização de hoje: {{count}} / {{limit}}",
      "usageServerLabel": "(restante no servidor: {{remaining}})",
      "resultsTitle": "Resultados",
      "resultStatus": {
        "sending": "A enviar pedido",
        "ready": "Pronto",
        "draft": "Rascunho"
      },
      "fields": {
        "long": "Descrição longa",
        "short": "Descrição curta",
        "seoMeta": "SEO meta",
        "tags": "Etiquetas / palavras-chave"
      },
      "placeholders": {
        "long": "Preencha o produto para começar. A resposta da API aparecerá aqui.",
        "short": "Pontos-chave e bullets aparecerão aqui.",
        "seoTitle": "Meta título",
        "seoDescription": "Placeholder de meta descrição."
      }
    },
    "footer": {
      "tagline": "Crie descrições de produto otimizadas para SEO em segundos.",
      "rights": "Todos os direitos reservados.",
      "brand": "CopyBoost AI",
      "linkLabel": "Murat Çakmak"
    },
    "settings": {
      "badge": "Perfil & Segurança",
      "title": "Definições da conta",
      "description": "Atualize os seus dados e altere a palavra-passe. O e-mail não pode ser alterado por motivos de segurança.",
      "statusBadge": "Sessão iniciada",
      "profileCard": {
        "title": "Informações de perfil",
        "subtitle": "Atualize o seu nome. O e-mail é fixo.",
        "nameLabel": "Nome completo",
        "namePlaceholder": "ex.: João Silva",
        "emailLabel": "E-mail (só leitura)",
        "saveButton": "Guardar perfil"
      },
      "passwordCard": {
        "title": "Palavra-passe & segurança",
        "subtitle": "Escolha uma palavra-passe forte. Verificamos a atual para cada alteração.",
        "currentLabel": "Palavra-passe atual",
        "newLabel": "Nova palavra-passe",
        "chipLength": "Mín. 8 caracteres",
        "chipEmail": "E-mail bloqueado",
        "saveButton": "Atualizar palavra-passe",
        "savingText": "A atualizar palavra-passe..."
      },
      "usageCard": {
        "title": "Plano & utilização",
        "planLabel": "Plano",
        "dailyLimit": "Limite diário",
        "dailyUsed": "Usado hoje",
        "remaining": "Restante",
        "monthlyUsage": "Utilização mensal",
        "unlimited": "Ilimitado",
        "empty": "-"
      },
      "securityCard": {
        "title": "Lembrete de segurança",
        "body": "O e-mail não pode ser alterado e a atualização da palavra-passe requer verificação. Nunca partilhe a sua palavra-passe."
      },
      "apiCard": {
        "title": "Chave de API",
        "description": "As chaves pessoais serão exibidas aqui quando estiverem disponíveis. O acesso é limitado — contacte support@copyboost.ai.",
        "placeholder": "sk-live-*************"
      },
      "states": {
        "loading": "A carregar...",
        "loginRequired": "Tem de iniciar sessão para gerir as definições. A redirecionar..."
      }
    }
  },
  el: {
    "nav": {
      "home": "Αρχική",
      "dashboard": "Πίνακας",
      "generate": "Δημιουργία",
      "billing": "Χρέωση"
    },
    "auth": {
      "login": "Σύνδεση",
      "settings": "Ρυθμίσεις",
      "admin": "Σελίδα διαχειριστή",
      "logout": "Αποσύνδεση"
    },
    "hero": {
      "title": "Δημιουργήστε περιγραφές προϊόντων σε δευτερόλεπτα με το CopyBoost AI",
      "description": "Περιγραφές, τίτλοι και ετικέτες SEO για Trendyol, Amazon, Shopify και άλλα. Επεκτείνετε τον κατάλογό σας με ασφάλεια μέσω συνδρομής.",
      "primaryCta": "Δοκιμάστε δωρεάν",
      "secondaryCtaLoggedIn": "Συνεχίστε τη δημιουργία",
      "secondaryCtaLoggedOut": "Ξεκινήστε τώρα",
      "sampleHeading": "Δείγμα αποτελέσματος",
      "sampleProductLabel": "Προϊόν",
      "sampleLongLabel": "Αναλυτική περιγραφή",
      "sampleMetaTitle": "Τίτλος meta",
      "sampleMetaDescription": "Περιγραφή meta",
      "sampleProductValue": "Οργανικό βαμβακερό μπλουζάκι",
      "sampleLongText": "Αναπνεύσιμο ύφασμα και μινιμαλιστικός σχεδιασμός. 100% οργανικό βαμβάκι πιστοποιημένο GOTS.",
      "sampleMetaTitleValue": "Οργανικό βαμβακερό μπλουζάκι | Καλοκαιρινό",
      "sampleMetaDescriptionValue": "Απαλό, βιώσιμο, με γρήγορη αποστολή.",
      "sampleTags": ["οργανικό", "βαμβάκι", "βιώσιμο", "unisex"]
    },
    "plan": {
      "planLabel": "Πλάνο",
      "dailyQuota": "Ημερήσιο όριο",
      "dailyRemaining": "Απομένει σήμερα",
      "dailyUsed": "Χρησιμοποιήθηκε σήμερα",
      "monthlyUsage": "Αυτόν τον μήνα",
      "periodRemaining": "Υπόλοιπο περιόδου",
      "unspecified": "Μη καθορισμένο",
      "updating": "Ενημέρωση...",
      "loading": "Φόρτωση..."
    },
    "features": [
      {
        "title": "Περιγραφές σε δευτερόλεπτα",
        "description": "Άμεσες περιγραφές προϊόντων προσαρμοσμένες για κάθε αγορά."
      },
      {
        "title": "Συμβατότητα με αγορές",
        "description": "Αυτόματη μορφοποίηση για Trendyol, Amazon, Shopify και άλλα."
      },
      {
        "title": "Σταθερή ποιότητα",
        "description": "Αξιόπιστο περιεχόμενο SEO για κάθε προϊόν."
      },
      {
        "title": "Εξοικονομήστε χρόνο",
        "description": "Αφιερώστε τον χρόνο σας σε λειτουργίες και πωλήσεις."
      }
    ],
    "common": {
      "loading": "Φόρτωση...",
      "redirecting": "Ανακατεύθυνση...",
      "copy": "Αντιγραφή",
      "copied": "Αντιγράφηκε",
      "close": "Κλείσιμο",
      "save": "Αποθήκευση",
      "delete": "Διαγραφή",
      "confirm": "Επιβεβαίωση",
      "cancel": "Ακύρωση",
      "success": "Επιτυχία",
      "error": "Σφάλμα"
    },
    "authPages": {
      "login": {
        "badge": "Σύνδεση",
        "heading": "Συνδεθείτε στον λογαριασμό σας στο CopyBoost AI",
        "description": "Χρησιμοποιήστε το email και τον κωδικό σας.",
        "emailPlaceholder": "Email",
        "passwordPlaceholder": "Κωδικός πρόσβασης",
        "submit": "Σύνδεση",
        "loading": "Έλεγχος...",
        "requiredError": "Απαιτείται email και κωδικός.",
        "failed": "Αποτυχία σύνδεσης",
        "success": "Επιτυχής σύνδεση.",
        "google": "Συνέχεια με Google",
        "switchText": "Δεν έχετε λογαριασμό;",
        "switchLink": "Εγγραφείτε"
      },
      "register": {
        "badge": "Εγγραφή",
        "heading": "Ξεκινήστε δωρεάν",
        "description": "Παράγετε 5 περιεχόμενα ημερησίως δωρεάν ή απεριόριστα με Pro.",
        "namePlaceholder": "Ονοματεπώνυμο",
        "emailPlaceholder": "Email",
        "passwordPlaceholder": "Κωδικός (τουλάχιστον 8 χαρακτήρες)",
        "submit": "Δημιουργία λογαριασμού",
        "loading": "Αποθήκευση...",
        "success": "Εγγραφή επιτυχής!",
        "failed": "Αποτυχία εγγραφής",
        "google": "Συνέχεια με Google",
        "switchText": "Έχετε ήδη λογαριασμό;",
        "switchLink": "Σύνδεση"
      }
    },
    "dashboard": {
      "title": "Περίληψη χρήσης",
      "description": "Παρακολουθήστε όλα τα αιτήματα και τις απαντήσεις σας.",
      "serverSync": "Ανάκτηση δεδομένων από τον διακομιστή...",
      "cards": {
        "totalContentLabel": "Σύνολο περιεχομένου",
        "savedCountLabel": "Αποθηκευμένα στοιχεία",
        "recentUsageTitle": "Σημερινή χρήση",
        "planTitle": "Πλάνο",
        "newContentCta": "Νέο περιεχόμενο"
      },
      "recentTitle": "Πρόσφατες αναζητήσεις",
      "recentEmpty": "Δεν υπάρχουν αποθηκευμένα δεδομένα ακόμα.",
      "copyTooltip": "Αντιγραφή αποτελέσματος"
    },
    "billing": {
      "title": "Διαχείριση συνδρομών",
      "description": "Πληροφορίες για το Stripe Checkout και τις πληρωμές.",
      "planTitle": "Τρέχον πλάνο",
      "planDescription": "5 δημιουργίες ημερησίως",
      "upgradeButton": "Αναβάθμιση σε Pro",
      "portalButton": "Άνοιγμα πύλης Stripe"
    },
    "generate": {
      "heroTitle": "Εισάγετε στοιχεία προϊόντος και λάβετε αποτέλεσμα AI",
      "heroDescription": "Δημιουργία περιγραφών, τίτλων και ετικετών SEO σε δευτερόλεπτα.",
      "titleLabel": "Τίτλος προϊόντος",
      "categoryLabel": "Κατηγορία",
      "platformLabel": "Πλατφόρμα",
      "languageLabel": "Γλώσσα",
      "toneLabel": "Ύφος",
      "button": {
        "default": "Δημιουργία",
        "loading": "Δημιουργία..."
      },
      "resultsTitle": "Αποτελέσματα"
    },
    "footer": {
      "tagline": "Δημιουργήστε περιεχόμενο προϊόντων SEO σε δευτερόλεπτα.",
      "rights": "Όλα τα δικαιώματα διατηρούνται.",
      "brand": "CopyBoost AI"
    },
    "settings": {
      "title": "Ρυθμίσεις λογαριασμού",
      "profileCard": {
        "title": "Πληροφορίες προφίλ",
        "saveButton": "Αποθήκευση"
      },
      "passwordCard": {
        "title": "Κωδικός και ασφάλεια",
        "saveButton": "Ανανέωση κωδικού"
      },
      "usageCard": {
        "title": "Πλάνο και χρήση"
      }
    }
  },
  bg: {
    "nav": {
      "home": "Начало",
      "dashboard": "Табло",
      "generate": "Генератор",
      "billing": "Фактуриране"
    },
    "auth": {
      "login": "Вход",
      "settings": "Настройки",
      "admin": "Админ страница",
      "logout": "Изход"
    },
    "hero": {
      "title": "Създавайте описания на продукти за секунди с CopyBoost AI",
      "description": "SEO оптимизирани описания и етикети за Trendyol, Amazon, Shopify и други.",
      "primaryCta": "Опитайте безплатно",
      "secondaryCtaLoggedIn": "Продължете създаването",
      "secondaryCtaLoggedOut": "Започнете сега",
      "sampleHeading": "Примерен резултат",
      "sampleProductLabel": "Продукт",
      "sampleLongLabel": "Дълго описание",
      "sampleMetaTitle": "Мета заглавие",
      "sampleMetaDescription": "Мета описание",
      "sampleProductValue": "Органична памучна тениска",
      "sampleLongText": "Дишащ плат и минимален дизайн. 100% органичен памук, сертифициран GOTS.",
      "sampleMetaTitleValue": "Органична тениска | Лято",
      "sampleMetaDescriptionValue": "Мека, устойчива, бърза доставка.",
      "sampleTags": ["органичен", "памук", "устойчив", "унисекс"]
    },
    "plan": {
      "planLabel": "План",
      "dailyQuota": "Дневна квота",
      "dailyRemaining": "Остава днес",
      "dailyUsed": "Използвано днес",
      "monthlyUsage": "Този месец",
      "periodRemaining": "Оставащ период",
      "unspecified": "Неопределено",
      "updating": "Актуализиране...",
      "loading": "Зареждане..."
    },
    "common": {
      "loading": "Зареждане...",
      "redirecting": "Пренасочване...",
      "copy": "Копирай",
      "copied": "Копирано",
      "close": "Затвори",
      "save": "Запази",
      "delete": "Изтрий",
      "confirm": "Потвърди",
      "cancel": "Откажи",
      "success": "Успех",
      "error": "Грешка"
    },
    "dashboard": {
      "title": "Обобщение на използването",
      "description": "Проследявайте вашите заявки и отговори.",
      "cards": {
        "totalContentLabel": "Общо съдържание",
        "recentUsageTitle": "Днешно използване",
        "planTitle": "План"
      },
      "recentEmpty": "Няма записи все още."
    },
    "billing": {
      "title": "Управление на абонаменти",
      "planTitle": "Текущ план",
      "upgradeButton": "Надстрой до Pro"
    },
    "generate": {
      "heroTitle": "Въведете детайли за продукта и получете AI резултат",
      "heroDescription": "Създайте SEO описания за секунди.",
      "titleLabel": "Име на продукт",
      "button": {
        "default": "Генерирай",
        "loading": "Генериране..."
      }
    },
    "footer": {
      "tagline": "Създавайте SEO описания за секунди.",
      "rights": "Всички права запазени.",
      "brand": "CopyBoost AI"
    },
    "settings": {
      "title": "Настройки на акаунта",
      "profileCard": {
        "title": "Профил",
        "saveButton": "Запази"
      }
    }
  },
  az: {
    "nav": {
      "home": "Ana səhifə",
      "dashboard": "Panel",
      "generate": "Yaradıcı",
      "billing": "Fakturalar"
    },
    "auth": {
      "login": "Daxil ol",
      "settings": "Parametrlər",
      "admin": "Admin səhifəsi",
      "logout": "Çıxış"
    },
    "hero": {
      "title": "CopyBoost AI ilə məhsul təsvirlərini saniyələrə hazırlayın",
      "description": "Trendyol, Amazon, Shopify və digərləri üçün SEO uyğun təsvirlər və etiketlər.",
      "primaryCta": "Pulsuz yoxlayın",
      "secondaryCtaLoggedIn": "Yaratmağa davam et",
      "secondaryCtaLoggedOut": "İndi başla",
      "sampleHeading": "Nümunə nəticə",
      "sampleProductLabel": "Məhsul",
      "sampleLongLabel": "Uzun təsvir",
      "sampleMetaTitle": "Meta başlıq",
      "sampleMetaDescription": "Meta təsvir",
      "sampleProductValue": "Orqanik pambıq köynək",
      "sampleLongText": "Nəfəsalan parça və minimalist dizayn. 100% GOTS sertifikatlı orqanik pambıq.",
      "sampleMetaTitleValue": "Orqanik pambıq köynək | Yay rahatlığı",
      "sampleMetaDescriptionValue": "Yumşaq və davamlı pambıq, sürətli çatdırılma.",
      "sampleTags": ["orqanik", "pambıq", "davamlı", "uniseks"]
    },
    "plan": {
      "planLabel": "Plan",
      "dailyQuota": "Günlük limit",
      "dailyRemaining": "Bu gün qalan",
      "dailyUsed": "Bu gün istifadə olunan",
      "monthlyUsage": "Bu ay",
      "periodRemaining": "Qalan dövr",
      "unspecified": "Göstərilməyib",
      "updating": "Yenilənir...",
      "loading": "Yüklənir..."
    },
    "common": {
      "loading": "Yüklənir...",
      "redirecting": "Yönləndirilir...",
      "copy": "Kopyala",
      "copied": "Kopyalandı",
      "close": "Bağla",
      "save": "Yadda saxla",
      "delete": "Sil",
      "confirm": "Təsdiqlə",
      "cancel": "Ləğv et",
      "success": "Uğurlu",
      "error": "Xəta"
    },
    "dashboard": {
      "title": "İstifadə icmalı",
      "description": "Sorğularınızı və cavablarınızı izləyin.",
      "cards": {
        "totalContentLabel": "Ümumi məzmun",
        "planTitle": "Plan"
      }
    },
    "billing": {
      "title": "Abunəliklərin idarəsi",
      "planTitle": "Cari plan",
      "upgradeButton": "Pro versiyaya keç"
    },
    "generate": {
      "heroTitle": "Məhsul detalları daxil edin və AI nəticəsini alın",
      "heroDescription": "SEO uyğun təsvirlər və açar sözlər yaradın.",
      "titleLabel": "Məhsul başlığı",
      "button": {
        "default": "Yarat",
        "loading": "Yaradılır..."
      }
    },
    "footer": {
      "tagline": "SEO uyğun məhsul təsvirlərini saniyələrə yaradın.",
      "rights": "Bütün hüquqlar qorunur.",
      "brand": "CopyBoost AI"
    },
    "settings": {
      "title": "Hesab parametrləri",
      "profileCard": {
        "title": "Profil məlumatları",
        "saveButton": "Yadda saxla"
      }
    }
  },
};

export const languageMetadata: Record<string, LanguageMeta> = {
  tr: { name: "Türkçe", flagIcon: "🇹🇷", isDefault: true },
  en: { name: "English", flagIcon: "🇺🇸" },
  de: { name: "Deutsch", flagIcon: "🇩🇪" },
  fr: { name: "French", flagIcon: "🇫🇷" },
  ar: { name: "Arabic", flagIcon: "🇸🇦" },
  es: { name: "Spanish", flagIcon: "🇪🇸" },
  pt: { name: "Portuguese", flagIcon: "🇵🇹" },
  el: { name: "Greek", flagIcon: "🇬🇷" },
  bg: { name: "Bulgarian", flagIcon: "🇧🇬" },
  az: { name: "Azerbaijani", flagIcon: "🇦🇿" },
};
