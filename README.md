# Döşemealtı Belediyesi - Bilgi İşlem Arıza Kayıt Sistemi

Modern, güvenli ve kullanıcı dostu arıza takip sistemi.

## 🚀 Özellikler

### Temel Özellikler
- ✅ Arıza kaydı oluşturma ve düzenleme
- ✅ Durum takibi (Beklemede, Devam Ediyor, Tamamlandı)
- ✅ Müdürlük, çalışan ve teknisyen yönetimi
- ✅ Gelişmiş arama ve filtreleme
- ✅ Excel ve PDF export
- ✅ Detaylı raporlama ve istatistikler
- ✅ Dark mode desteği
- ✅ Responsive tasarım

### Admin Paneli
- ✅ Müdürlük yönetimi
- ✅ Çalışan yönetimi
- ✅ Teknisyen yönetimi
- ✅ Kullanıcı yönetimi
- ✅ Sistem ayarları
- ✅ Yedekleme ve geri yükleme

### Güvenlik Özellikleri
- 🔒 Rate limiting (DDoS koruması)
- 🔒 Başarısız giriş takibi
- 🔒 Otomatik engelleme sistemi
- 🔒 XSS koruması
- 🔒 SQL Injection koruması
- 🔒 Input validasyonu
- 🔒 Session yönetimi
- 🔒 CSRF koruması
- 🔒 Clickjacking koruması

## 📦 Teknolojiler

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Firebase Realtime Database
- **Hosting**: Netlify
- **Libraries**: 
  - Chart.js (Grafikler)
  - SheetJS (Excel export)
  - jsPDF (PDF export)

## 🔧 Kurulum

### 1. Firebase Kurulumu

1. [Firebase Console](https://console.firebase.google.com) üzerinden yeni proje oluşturun
2. Realtime Database'i etkinleştirin
3. Firebase config bilgilerinizi `js/firebase-config.js` dosyasına ekleyin

### 2. Yerel Geliştirme

```bash
# Projeyi klonlayın
git clone https://github.com/KULLANICI_ADINIZ/ariza-kayit.git

# Klasöre girin
cd ariza-kayit

# Basit bir HTTP server başlatın
python -m http.server 8000
# veya
npx serve
```

Tarayıcıda `http://localhost:8000` adresini açın.

### 3. Netlify'a Deploy

Detaylı talimatlar için [NETLIFY-DEPLOYMENT.md](NETLIFY-DEPLOYMENT.md) dosyasına bakın.

**Hızlı Deploy:**
```bash
# Netlify CLI ile
netlify deploy --prod

# veya GitHub ile otomatik deploy
git push origin main
```

## 👤 Giriş Bilgileri

### Admin
- **Kullanıcı Adı**: `admin`
- **Şifre**: `admin123`

### Normal Kullanıcı
- **Kullanıcı Adı**: `dosemealti123`
- **Şifre**: `dosemealti123`

⚠️ **ÖNEMLİ**: Üretim ortamında bu şifreleri mutlaka değiştirin!

## 📖 Kullanım

### Arıza Kaydı Ekleme
1. Giriş yapın
2. Sağ alttaki `+` butonuna tıklayın
3. Formu doldurun
4. "Kaydet" butonuna tıklayın

### Arıza Durumu Güncelleme
1. Arıza kartındaki "Devam Ediyor" veya "Tamamla" butonuna tıklayın
2. Durum otomatik güncellenecektir

### Raporlar
1. Üst menüden "📊 Raporlar" butonuna tıklayın
2. Grafikleri ve istatistikleri görüntüleyin
3. Excel veya PDF olarak dışa aktarın

### Admin Paneli
1. Admin olarak giriş yapın
2. "⚙️ Admin" butonuna tıklayın
3. Müdürlük, çalışan, teknisyen yönetimi yapın

## 🔒 Güvenlik

Detaylı güvenlik bilgileri için [GUVENLIK.md](GUVENLIK.md) dosyasına bakın.

### Önemli Güvenlik Notları:
- Başarısız giriş denemeleri Firebase'e kaydedilir
- 3 yanlış denemeden sonra kullanıcı engellenir
- Tüm input'lar sanitize edilir
- Session timeout: 1 dakika

## 📊 Firebase Veritabanı Yapısı

```
ariza-kayit/
├── arizalar/
│   ├── {ariza-id}/
│   │   ├── birim
│   │   ├── cihazTuru
│   │   ├── arizaTuru
│   │   ├── aciklama
│   │   ├── yapilanIsler
│   │   ├── talepEden
│   │   ├── atananKisi
│   │   ├── durum
│   │   ├── tarih
│   │   └── timestamp
├── mudurlukler/
│   └── {mudurluk-id}/
│       └── name
├── calisanlar/
│   └── {calisan-id}/
│       └── name
├── teknisyenler/
│   └── {teknisyen-id}/
│       └── name
└── security/
    ├── failedLogins/
    └── blockedFingerprints/
```

## 🎨 Özelleştirme

### Renk Teması Değiştirme
`css/style.css` ve `css/admin.css` dosyalarındaki gradient renklerini değiştirin:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Logo Ekleme
`index.html` ve `admin.html` dosyalarındaki header bölümüne logo ekleyin.

## 🐛 Bilinen Sorunlar

- Çok büyük veri setlerinde sayfalama yavaşlayabilir
- Excel export'ta Türkçe karakterler bazı sistemlerde sorun çıkarabilir

## 📝 Yapılacaklar

- [ ] Email bildirimleri
- [ ] SMS entegrasyonu
- [ ] Mobil uygulama
- [ ] Çoklu dil desteği
- [ ] Gelişmiş raporlama
- [ ] QR kod ile arıza takibi

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Sorularınız için:
- GitHub Issues
- Email: info@dosemealti.bel.tr

## 🙏 Teşekkürler

- Firebase
- Netlify
- Chart.js
- SheetJS
- jsPDF

---

**Döşemealtı Belediyesi Bilgi İşlem Müdürlüğü** tarafından geliştirilmiştir.
