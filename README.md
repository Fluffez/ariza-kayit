# Döşemealtı Belediyesi - Bilgi İşlem Arıza Kayıt Sistemi

Modern, güvenli ve kullanıcı dostu arıza takip sistemi. Supabase (PostgreSQL) veritabanı ile çalışır.

## 🚀 Özellikler

### Temel Özellikler
- ✅ Arıza kaydı oluşturma, düzenleme, silme
- ✅ Durum takibi (Beklemede, Devam Ediyor, Tamamlandı)
- ✅ Müdürlük, çalışan ve teknisyen yönetimi
- ✅ Gelişmiş arama ve filtreleme
- ✅ Excel ve PDF export
- ✅ Gerçek zamanlı veri senkronizasyonu
- ✅ Responsive tasarım (mobil uyumlu)

### Güvenlik Özellikleri
- 🔒 Rate limiting (DDoS koruması)
- 🔒 Başarısız giriş takibi
- 🔒 XSS ve SQL injection koruması
- 🔒 Session yönetimi (1 dakika timeout)
- 🔒 CSRF token desteği
- 🔒 Browser fingerprinting

### Kullanıcı Deneyimi
- 🎨 Dark/Light mode
- 🔔 Toast bildirimleri
- 🎵 Ses efektleri
- 📊 İstatistikler ve grafikler
- 📈 Raporlama sistemi
- ⚡ Hızlı autocomplete

## 📋 Gereksinimler

- Modern web tarayıcı (Chrome, Firefox, Safari, Edge)
- Supabase hesabı (ücretsiz)
- Netlify hesabı (deployment için, opsiyonel)

## 🔧 Kurulum

### 1. Supabase Projesi Oluşturma

1. [Supabase](https://supabase.com) adresine gidin ve ücretsiz hesap oluşturun
2. "New Project" butonuna tıklayın
3. Proje adı, veritabanı şifresi ve bölge seçin
4. Projeniz hazır olduğunda "Settings" > "API" bölümüne gidin
5. `Project URL` ve `anon public` key'i kopyalayın

### 2. Veritabanı Şemasını Oluşturma

1. Supabase Dashboard'da "SQL Editor" bölümüne gidin
2. `supabase-schema.sql` dosyasının içeriğini kopyalayın
3. SQL Editor'e yapıştırın ve "Run" butonuna tıklayın
4. Tablolar başarıyla oluşturulacak

### 3. Proje Yapılandırması

`js/supabase-config.js` dosyasını açın ve Supabase bilgilerinizi girin:

```javascript
const SUPABASE_URL = 'https://xxxxx.supabase.co'; // Kendi URL'niz
const SUPABASE_ANON_KEY = 'eyJhbGc...'; // Kendi anon key'iniz
```

### 4. Yerel Test

Projeyi yerel olarak test etmek için bir HTTP sunucusu kullanın:

```bash
# Python ile
python -m http.server 8000

# Node.js ile (http-server)
npx http-server

# VS Code Live Server extension ile
# Sağ tık > "Open with Live Server"
```

Tarayıcıda `http://localhost:8000` adresine gidin.

## 🌐 Netlify'a Deployment

### Otomatik Deployment

1. GitHub'a projeyi push edin:
```bash
git add .
git commit -m "Supabase migration complete"
git push origin main
```

2. [Netlify](https://netlify.com) hesabınıza giriş yapın
3. "Add new site" > "Import an existing project" seçin
4. GitHub repository'nizi seçin
5. Build settings:
   - Build command: (boş bırakın)
   - Publish directory: `.`
6. "Deploy site" butonuna tıklayın

### Manuel Deployment

```bash
# Netlify CLI kurulumu
npm install -g netlify-cli

# Giriş yapın
netlify login

# Deploy edin
netlify deploy --prod
```

## 👤 Kullanıcı Bilgileri

### Admin Girişi
- Kullanıcı adı: `admin`
- Şifre: `admin123`
- Yetkiler: Tüm işlemler + Admin paneli erişimi

### Normal Kullanıcı Girişi
- Kullanıcı adı: `dosemealti123`
- Şifre: `dosemealti123`
- Yetkiler: Arıza kayıtları oluşturma, görüntüleme, düzenleme

**⚠️ ÖNEMLİ:** Canlı ortama geçmeden önce bu şifreleri mutlaka değiştirin!

## 📁 Proje Yapısı

```
ariza-kayit/
├── index.html              # Ana sayfa
├── admin.html              # Admin paneli
├── css/
│   ├── style.css          # Ana sayfa stilleri
│   └── admin.css          # Admin paneli stilleri
├── js/
│   ├── supabase-config.js # Supabase bağlantı ve helper fonksiyonları
│   ├── app.js             # Ana uygulama mantığı
│   ├── admin.js           # Admin paneli mantığı
│   ├── features.js        # Arama, filtreleme, export
│   ├── reports.js         # Raporlama ve grafikler
│   ├── security.js        # Güvenlik özellikleri
│   └── error-fixes.js     # Hata yönetimi
├── supabase-schema.sql    # Veritabanı şeması
├── netlify.toml           # Netlify yapılandırması
├── _redirects             # Netlify yönlendirmeleri
└── README.md              # Bu dosya
```

## 🔄 Firebase'den Supabase'e Geçiş

Proje Firebase'den Supabase'e tamamen geçirilmiştir. Değişiklikler:

### Veritabanı Yapısı
- Firebase Realtime Database → PostgreSQL (Supabase)
- Nested JSON → İlişkisel tablolar
- Push keys → UUID primary keys
- camelCase → snake_case (veritabanında)

### API Değişiklikleri
- `database.ref()` → `supabase.from()`
- `.push()` → `.insert()`
- `.update()` → `.update()`
- `.remove()` → `.delete()`
- `.on('value')` → Realtime subscriptions

### Avantajlar
- ✅ Daha güçlü sorgulama (SQL)
- ✅ İlişkisel veri modeli
- ✅ Daha iyi performans
- ✅ Ücretsiz kotada daha fazla kaynak
- ✅ Row Level Security (RLS)
- ✅ Otomatik API oluşturma

## 📊 Veritabanı Tabloları

### arizalar
Arıza kayıtlarını saklar.
- `id` (UUID, PK)
- `birim` (TEXT) - Müdürlük adı
- `cihaz_turu` (TEXT) - Bilgisayar, Yazıcı, vb.
- `ariza_turu` (TEXT) - Donanım, Yazılım, vb.
- `aciklama` (TEXT) - Arıza detayı
- `yapilan_isler` (TEXT) - Yapılan işlemler
- `talep_eden` (TEXT) - Talep eden kişi
- `atanan_kisi` (TEXT) - Atanan teknisyen
- `durum` (TEXT) - beklemede, devam-ediyor, tamamlandi
- `tarih` (TEXT) - Formatlanmış tarih
- `timestamp` (BIGINT) - Unix timestamp

### mudurlukler
Müdürlük listesi.
- `id` (UUID, PK)
- `name` (TEXT) - Müdürlük adı

### calisanlar
Çalışan listesi.
- `id` (UUID, PK)
- `name` (TEXT) - Çalışan adı

### teknisyenler
Teknisyen listesi.
- `id` (UUID, PK)
- `name` (TEXT) - Teknisyen adı

### failed_logins
Başarısız giriş denemeleri (güvenlik).
- `id` (UUID, PK)
- `fingerprint` (TEXT) - Browser fingerprint
- `username` (TEXT) - Denenen kullanıcı adı
- `timestamp` (BIGINT) - Deneme zamanı
- `user_agent`, `language`, `platform`, vb.

## 🛡️ Güvenlik

### Rate Limiting
- 5 giriş denemesi / 5 dakika
- Aşıldığında otomatik bloke

### Failed Login Tracking
- Her başarısız deneme kaydedilir
- 3 başarısız denemeden sonra bloke
- Browser fingerprinting ile takip

### Input Validation
- XSS koruması (HTML sanitization)
- SQL injection kontrolü
- Maksimum karakter limitleri
- Özel karakter filtreleme

### Session Management
- 1 dakika inaktivite timeout
- CSRF token desteği
- Secure session storage

## 📱 Responsive Tasarım

- 📱 Mobil (< 768px): Tek sütun, büyük butonlar
- 💻 Tablet (768px - 1024px): İki sütun
- 🖥️ Desktop (> 1024px): Tam özellikli görünüm

## 🎨 Dark Mode

- Otomatik tema geçişi
- LocalStorage'da tercih kaydı
- Tüm sayfalarda senkronize
- Göz dostu renkler

## 📈 Raporlama

### İstatistikler
- Toplam arıza sayısı
- Durum bazlı dağılım
- Ortalama çözüm süresi
- Haftalık/aylık trendler

### Grafikler
- Müdürlük bazlı bar chart
- Durum dağılımı pie chart
- Aylık trend line chart
- Cihaz türü doughnut chart

### Export
- Excel (.xlsx) formatında
- PDF raporu
- Tüm veriler dahil
- Türkçe karakter desteği

## 🔧 Sorun Giderme

### Supabase Bağlantı Hatası
1. `supabase-config.js` dosyasındaki URL ve key'i kontrol edin
2. Supabase Dashboard'da projenin aktif olduğundan emin olun
3. Tarayıcı console'unda hata mesajlarını kontrol edin

### Veriler Görünmüyor
1. SQL şemasının doğru çalıştırıldığından emin olun
2. Supabase Dashboard > Table Editor'de tabloları kontrol edin
3. RLS (Row Level Security) politikalarını kontrol edin

### CORS Hatası
1. Supabase Dashboard > Settings > API > CORS'u kontrol edin
2. Domain'inizi whitelist'e ekleyin
3. Netlify deployment sonrası domain güncelleyin

## 📞 Destek

Sorularınız için:
- GitHub Issues
- Supabase Documentation: https://supabase.com/docs
- Netlify Documentation: https://docs.netlify.com

## 📝 Lisans

Bu proje Döşemealtı Belediyesi için geliştirilmiştir.

## 🔄 Güncellemeler

### v2.0.0 (2024)
- ✅ Firebase'den Supabase'e tam geçiş
- ✅ PostgreSQL veritabanı
- ✅ İyileştirilmiş güvenlik
- ✅ Daha hızlı performans
- ✅ Realtime updates

### v1.0.0 (2024)
- ✅ İlk sürüm
- ✅ Firebase Realtime Database
- ✅ Temel CRUD işlemleri
- ✅ Admin paneli

---

**Geliştirici Notu:** Tüm Firebase referansları kaldırılmış ve Supabase'e geçiş tamamlanmıştır. Sistem production-ready durumda.
