# Döşemealtı Belediyesi - Bilgi İşlem Arıza Kayıt Sistemi

Modern, responsive ve Firebase entegrasyonlu arıza kayıt sistemi.

## Özellikler

- ✅ Firebase Realtime Database ile gerçek zamanlı veri senkronizasyonu
- ✅ Responsive tasarım (Telefon ve PC uyumlu)
- ✅ Floating Action Button (+) ile hızlı kayıt ekleme
- ✅ Otomatik tarih/saat kaydı
- ✅ Durum takibi (Beklemede, Devam Ediyor, Tamamlandı)
- ✅ Filtreleme özellikleri
- ✅ GitHub Pages ile kolay yayınlama

## Kurulum

### 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Add project" ile yeni proje oluşturun
3. Proje ayarlarından "Web app" ekleyin
4. Firebase yapılandırma bilgilerini kopyalayın

### 2. Firebase Yapılandırması

`js/firebase-config.js` dosyasını açın ve Firebase bilgilerinizi ekleyin:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 3. Firebase Realtime Database Kuralları

Firebase Console'da Database > Rules bölümüne gidin ve şu kuralları ekleyin:

```json
{
  "rules": {
    "arizalar": {
      ".read": true,
      ".write": true
    }
  }
}
```

⚠️ **Güvenlik Notu:** Üretim ortamında daha güvenli kurallar kullanın!

## GitHub Pages ile Yayınlama

### 1. Repository Oluşturma

```bash
git init
git add .
git commit -m "İlk commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/ariza-kayit.git
git push -u origin main
```

### 2. GitHub Pages Aktifleştirme

1. GitHub repository'nizde Settings > Pages'e gidin
2. Source: "Deploy from a branch" seçin
3. Branch: "main" ve folder: "/ (root)" seçin
4. Save'e tıklayın

Siteniz şu adreste yayınlanacak:
`https://KULLANICI_ADINIZ.github.io/ariza-kayit/`

## Kullanım

1. Sağ alttaki **+** butonuna tıklayın
2. Arıza bilgilerini doldurun
3. "Kaydet" butonuna tıklayın
4. Kayıtlar anında listeye eklenir
5. Durum değiştirme ve silme işlemleri için kayıt üzerindeki butonları kullanın

## Teknolojiler

- HTML5
- CSS3 (Flexbox, Grid)
- Vanilla JavaScript
- Firebase Realtime Database
- GitHub Pages

## Lisans

Bu proje Döşemealtı Belediyesi için geliştirilmiştir.
