# Döşemealtı Belediyesi - Bilgi İşlem Arıza Kayıt Sistemi

Modern, güvenli ve kullanıcı dostu arıza takip sistemi. **Supabase** (PostgreSQL) ve **Netlify** ile çalışır.

## 🚀 Hızlı Başlangıç (5 Dakika)

### 1. Supabase Kurulumu
1. [supabase.com](https://supabase.com) üzerinden ücretsiz hesap oluşturun
2. Yeni proje oluşturun
3. SQL Editor'de `supabase-schema.sql` dosyasını çalıştırın
4. Settings > API'den `URL` ve `anon key` alın
5. `js/supabase-config.js` dosyasına yapıştırın

### 2. Netlify'a Deploy
**En Kolay Yol:**
1. [app.netlify.com/drop](https://app.netlify.com/drop) adresine gidin
2. `ariza-kayit` klasörünü sürükleyin
3. Hazır! 🎉

**GitHub ile (Otomatik Güncellemeler):**
```bash
git push origin main
```
Netlify'da "Import from GitHub" seçin.

### 3. Giriş Yapın
- **Admin**: `admin` / `admin123`
- **Kullanıcı**: `dosemealti123` / `dosemealti123`

⚠️ **Şifreleri hemen değiştirin!**

---

## ✨ Özellikler

### 📋 Temel
- ✅ Arıza kaydı oluşturma/düzenleme/silme
- ✅ Durum takibi (Beklemede, Devam Ediyor, Tamamlandı)
- ✅ Gelişmiş arama ve filtreleme
- ✅ Excel ve PDF export
- ✅ Detaylı raporlama ve grafikler
- ✅ Dark mode
- ✅ Responsive tasarım
- ✅ Realtime güncellemeler

### 👨‍💼 Admin Paneli
- ✅ Müdürlük yönetimi
- ✅ Çalışan yönetimi
- ✅ Teknisyen yönetimi
- ✅ Kullanıcı yönetimi
- ✅ Sistem ayarları
- ✅ Yedekleme/geri yükleme

### 🔒 Güvenlik
- 🔒 Rate limiting (DDoS koruması)
- 🔒 Başarısız giriş takibi
- 🔒 Otomatik engelleme (3 yanlış deneme)
- 🔒 XSS koruması
- 🔒 SQL Injection koruması
- 🔒 Input validasyonu
- 🔒 Session yönetimi (1 dk timeout)
- 🔒 CSRF koruması
- 🔒 Clickjacking koruması
- 🔒 Browser fingerprinting

---

## 🛠️ Teknolojiler

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Supabase (PostgreSQL)
- **Hosting**: Netlify
- **Libraries**: Chart.js, SheetJS, jsPDF

---

## 📦 Kurulum Detayları

### Supabase Kurulumu

1. **Proje Oluştur**
   - [supabase.com](https://supabase.com) > New Project
   - Proje adı: `ariza-kayit`
   - Database şifresi belirleyin
   - Region: Europe (Frankfurt) önerilen

2. **Database Schema Oluştur**
   - Sol menüden "SQL Editor"
   - "New query" tıklayın
   - `supabase-schema.sql` içeriğini yapıştırın
   - "Run" tıklayın
   - ✅ "Database schema created successfully!" göreceksiniz

3. **API Keys Al**
   - Settings > API
   - `Project URL` kopyalayın
   - `anon public` key kopyalayın

4. **Config Dosyasını Güncelle**
   ```javascript
   // js/supabase-config.js
   const SUPABASE_URL = 'https://xxxxx.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGc...';
   ```

### Netlify Deployment

**Yöntem 1: Drag & Drop (2 Dakika)**
1. [app.netlify.com/drop](https://app.netlify.com/drop)
2. Klasörü sürükle
3. Hazır!

**Yöntem 2: GitHub (Otomatik)**
1. GitHub'a push edin
2. Netlify > "Add new site" > "Import from GitHub"
3. Repo seçin
4. Settings:
   - Build command: Boş
   - Publish directory: `.`
5. Deploy!

**Yöntem 3: CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## 📊 Database Yapısı

```sql
arizalar (
  id UUID PRIMARY KEY,
  birim TEXT,
  cihaz_turu TEXT,
  ariza_turu TEXT,
  aciklama TEXT,
  yapilan_isler TEXT,
  talep_eden TEXT,
  atanan_kisi TEXT,
  durum TEXT,
  tarih TEXT,
  timestamp BIGINT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

mudurlukler (id, name)
calisanlar (id, name)
teknisyenler (id, name)
failed_logins (id, fingerprint, username, timestamp, ...)
blocked_fingerprints (id, fingerprint, blocked_at, reason)
```

---

## 🎯 Kullanım

### Arıza Ekleme
1. `+` butonuna tıkla
2. Formu doldur
3. Kaydet

### Durum Güncelleme
1. Arıza kartında "Devam Ediyor" veya "Tamamla" tıkla
2. Otomatik güncellenir

### Raporlar
1. "📊 Raporlar" butonuna tıkla
2. Grafikleri görüntüle
3. Excel/PDF export

### Admin Paneli
1. Admin olarak giriş yap
2. "⚙️ Admin" butonuna tıkla
3. Yönetim işlemlerini yap

---

## 🔒 Güvenlik Detayları

### Rate Limiting
- 5 deneme / 5 dakika
- Aşılırsa bekleme süresi gösterilir

### Başarısız Giriş Takibi
- Her yanlış giriş Supabase'e kaydedilir
- Browser fingerprint ile kullanıcı tanıma
- Kayıt bilgileri:
  - Fingerprint (IP benzeri)
  - Kullanıcı adı
  - Zaman damgası
  - User Agent, Platform, Dil
  - Ekran çözünürlüğü
  - Saat dilimi

### Otomatik Engelleme
- 3 yanlış denemeden sonra engel
- 10 dakika süreyle
- `blocked_fingerprints` tablosuna kaydedilir

### Input Sanitizasyonu
- Tüm input'lar temizlenir
- HTML karakterleri escape edilir
- SQL Injection pattern tespiti
- Maksimum uzunluk kontrolü

### Session Yönetimi
- 1 dakika inaktivite sonrası logout
- Aktivite izleme (mouse, keyboard, scroll)
- CSRF token her oturumda

---

## 🎨 Özelleştirme

### Renk Teması
`css/style.css` ve `css/admin.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Logo Ekleme
`index.html` ve `admin.html` header bölümüne ekleyin.

### Şifre Değiştirme
`js/app.js` dosyasında:
```javascript
if (username === 'admin' && password === 'YENİ_ŞİFRE') {
```

---

## 🐛 Sorun Giderme

### "Supabase bağlantı hatası"
- `js/supabase-config.js` doğru mu?
- Supabase projesi aktif mi?
- RLS politikaları doğru mu?

### "Veri gelmiyor"
- SQL schema çalıştırıldı mı?
- Tablolar oluştu mu? (Supabase > Table Editor)
- Console'da hata var mı? (F12)

### "Admin paneli açılmıyor"
- URL: `https://site.netlify.app/admin.html`
- Admin olarak giriş yaptınız mı?

---

## 📈 Performans

### Supabase Avantajları
- ✅ PostgreSQL (gerçek SQL)
- ✅ Otomatik indeksleme
- ✅ Connection pooling
- ✅ Realtime subscriptions
- ✅ Row Level Security

### Netlify Avantajları
- ✅ Global CDN
- ✅ Otomatik HTTPS
- ✅ Asset optimization
- ✅ Gzip/Brotli compression

---

## 📊 Ücretsiz Limitler

### Supabase Free Tier
- ✅ 500 MB database
- ✅ 1 GB file storage
- ✅ 2 GB bandwidth/ay
- ✅ 50,000 monthly active users
- ✅ Sınırsız API requests

### Netlify Free Tier
- ✅ 100 GB bandwidth/ay
- ✅ 300 build dakikası/ay
- ✅ Sınırsız site
- ✅ Otomatik HTTPS

**Sonuç**: Küçük-orta ölçekli projeler için tamamen ücretsiz! 🎉

---

## 🔄 Güncelleme

### GitHub ile
```bash
git add .
git commit -m "Update"
git push
```
Netlify otomatik deploy eder!

### Manuel
1. Dosyaları düzenleyin
2. Netlify'a tekrar sürükleyin

---

## 📝 Yapılacaklar

- [ ] Email bildirimleri
- [ ] SMS entegrasyonu
- [ ] Mobil uygulama
- [ ] Çoklu dil desteği
- [ ] Gelişmiş raporlama
- [ ] QR kod ile takip
- [ ] Dosya ekleme
- [ ] Yorum sistemi

---

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch: `git checkout -b feature/amazing`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing`
5. Pull Request açın

---

## 📄 Lisans

MIT License - Özgürce kullanabilirsiniz!

---

## 📞 Destek

- **GitHub Issues**: Sorunları bildirin
- **Email**: info@dosemealti.bel.tr
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)

---

## 🙏 Teşekkürler

- [Supabase](https://supabase.com) - Backend
- [Netlify](https://netlify.com) - Hosting
- [Chart.js](https://chartjs.org) - Grafikler
- [SheetJS](https://sheetjs.com) - Excel
- [jsPDF](https://github.com/parallax/jsPDF) - PDF

---

## ✅ Deployment Checklist

- [ ] Supabase projesi oluşturuldu
- [ ] SQL schema çalıştırıldı
- [ ] Supabase config güncellendi
- [ ] Netlify'a deploy edildi
- [ ] HTTPS aktif
- [ ] Admin şifresi değiştirildi
- [ ] Test edildi
- [ ] Yedek alındı

---

**Döşemealtı Belediyesi Bilgi İşlem Müdürlüğü** 🏛️

*Modern, Güvenli, Hızlı* ⚡
