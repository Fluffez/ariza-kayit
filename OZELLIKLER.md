# Döşemealtı Belediyesi - Bilgi İşlem Arıza Kayıt Sistemi

## ✅ Tamamlanan Özellikler

### 🔐 Giriş Sistemi
- Kullanıcı adı/şifre: `dosemealti123` / `dosemealti123`
- "Beni Hatırla" özelliği
- Otomatik oturum yönetimi

### 📊 İstatistikler
- Toplam arıza sayısı
- Beklemede olan arızalar
- Devam eden arızalar
- Tamamlanan arızalar
- Gerçek zamanlı güncelleme

### 🔍 Arama ve Filtreleme
- Müdürlük, talep eden, açıklama araması
- Durum filtreleme (Tümü, Beklemede, Devam Ediyor, Tamamlandı)
- Tarih filtreleme (Bugün, Bu Hafta, Bu Ay, Tüm Zamanlar)

### 📥 Dışa Aktarma
- Excel export (XLSX formatında)
- PDF rapor oluşturma
- Tüm arıza kayıtlarını içerir

### 📈 Raporlama ve Grafikler
- **Grafikler:**
  - En çok arıza veren müdürlükler (Bar Chart)
  - Durum dağılımı (Pie Chart)
  - Aylık arıza trendi (Line Chart)
  - Cihaz türü dağılımı (Doughnut Chart)

- **Detaylı İstatistikler:**
  - Ortalama çözüm süresi
  - Bu hafta arıza sayısı
  - Bu ay arıza sayısı
  - Tamamlanma oranı
  - En çok arıza veren müdürlükler listesi

- **Hatırlatıcılar:**
  - 7+ gün bekleyen arızalar (Kritik)
  - 3-6 gün bekleyen arızalar (Uyarı)

### 🌙 Karanlık Mod
- Göz dostu karanlık tema
- Otomatik kaydetme (localStorage)
- Tüm sayfalarda geçerli

### 🔔 Bildirim Sesleri
- Başarılı işlemler için ses
- Hata durumları için ses
- Uyarılar için ses

### 📝 Arıza Yönetimi
- Yeni arıza kaydı ekleme
- Arıza düzenleme
- Arıza silme (onay ile)
- Durum değiştirme (Beklemede → Devam Ediyor → Tamamlandı)
- Atanan kişi belirleme (opsiyonel)

### 🎯 Otomatik Tamamlama
- Müdürlük listesi (21 müdürlük)
- Çalışan listesi (150+ çalışan)
- Teknisyen listesi
- Klavye navigasyonu (↑↓ Enter Esc)

### 🔥 Firebase Entegrasyonu
- Gerçek zamanlı veritabanı
- Otomatik senkronizasyon
- Güvenli veri saklama

## 📋 Kullanım

### Giriş
1. Tarayıcıda `index.html` açın
2. Kullanıcı adı: `dosemealti123`
3. Şifre: `dosemealti123`
4. "Beni Hatırla" işaretleyebilirsiniz

### Yeni Arıza Kaydı
1. Sağ alttaki `+` butonuna tıklayın
2. Formu doldurun (zorunlu alanlar işaretli)
3. Kaydet butonuna tıklayın

### Arama ve Filtreleme
1. Arama kutusuna yazın (müdürlük, talep eden, açıklama)
2. Durum filtresini seçin
3. Tarih filtresini seçin

### Raporlar
1. "📊 Raporlar" butonuna tıklayın
2. Grafikler, İstatistikler veya Hatırlatıcılar sekmesini seçin
3. Verileri inceleyin

### Dışa Aktarma
- **Excel:** "📥 Excel" butonuna tıklayın
- **PDF:** "📄 PDF" butonuna tıklayın

## 🛠️ Teknik Detaylar

### Kullanılan Teknolojiler
- HTML5, CSS3, JavaScript (Vanilla)
- Firebase Realtime Database
- Chart.js (Grafikler)
- SheetJS (Excel export)
- jsPDF (PDF export)

### Tarayıcı Desteği
- Chrome (Önerilen)
- Edge
- Firefox
- Safari

### Dosya Yapısı
```
ariza-kayit/
├── index.html              # Ana sayfa
├── css/
│   └── style.css          # Tüm stiller
├── js/
│   ├── firebase-config.js # Firebase yapılandırması
│   ├── app.js            # Ana uygulama mantığı
│   ├── features.js       # Arama, filtre, export, dark mode
│   └── reports.js        # Raporlama ve grafikler
└── README.md
```

## 🔧 Kurulum

1. Projeyi klonlayın
2. Firebase yapılandırmasını `js/firebase-config.js` dosyasına ekleyin
3. Bir web sunucusu ile çalıştırın (örn: `python -m http.server`)
4. Tarayıcıda açın

## 📝 Notlar

- Tüm veriler Firebase'de saklanır
- Gerçek zamanlı senkronizasyon aktif
- Offline çalışma desteği yok (Firebase gerektirir)
- Mobil uyumlu responsive tasarım

## 🎨 Özelleştirme

### Müdürlük Listesi
`js/app.js` dosyasındaki `mudurlukler` dizisini düzenleyin

### Çalışan Listesi
`js/app.js` dosyasındaki `calisanlar` dizisini düzenleyin

### Teknisyen Listesi
`js/features.js` dosyasındaki `teknisyenler` dizisini düzenleyin

### Renkler
`css/style.css` dosyasındaki CSS değişkenlerini düzenleyin

## 🐛 Bilinen Sorunlar

Şu anda bilinen bir sorun yok.

## 📞 Destek

Herhangi bir sorun için lütfen iletişime geçin.

---

**Son Güncelleme:** 2024
**Versiyon:** 1.0.0
