# Güvenlik Özellikleri

## Eklenen Güvenlik Önlemleri

### 1. Rate Limiting (DDoS Koruması)
- **Özellik**: Aynı kullanıcıdan gelen çok sayıda isteği engeller
- **Limit**: 5 deneme / 5 dakika
- **Sonuç**: Başarısız deneme sonrası bekleme süresi gösterilir

### 2. Başarısız Giriş Takibi
- **Özellik**: Yanlış şifre girişlerini kaydeder
- **Fingerprint**: Browser fingerprint ile kullanıcı tanıma
- **Firebase Kaydı**: Tüm başarısız girişler Firebase'e kaydedilir
- **Kayıt Bilgileri**:
  - Browser fingerprint (IP benzeri)
  - Kullanıcı adı
  - Zaman damgası
  - User Agent
  - Dil
  - Platform
  - Ekran çözünürlüğü
  - Saat dilimi

### 3. Otomatik Engelleme
- **Özellik**: 3 başarısız denemeden sonra kullanıcı engellenir
- **Süre**: 10 dakika
- **Firebase Kaydı**: Engellenen fingerprint'ler kaydedilir

### 4. XSS (Cross-Site Scripting) Koruması
- **Özellik**: Tüm kullanıcı girdileri temizlenir
- **Sanitizasyon**: HTML karakterleri escape edilir
- **Korunan Karakterler**: `& < > " ' /`

### 5. SQL Injection Koruması
- **Özellik**: SQL komutlarını tespit eder
- **Kontrol Edilen Pattern'ler**:
  - SELECT, INSERT, UPDATE, DELETE, DROP vb.
  - UNION SELECT
  - OR 1=1, AND 1=1
  - Özel karakterler (', ", ;, --, /*, */)

### 6. Input Validasyonu
- **Kullanıcı Adı**: Sadece harf, rakam ve alt çizgi (3-50 karakter)
- **Email**: Geçerli email formatı kontrolü
- **Telefon**: Geçerli telefon numarası formatı
- **Maksimum Uzunluk**: Her input için 500 karakter limiti

### 7. Session Yönetimi
- **Timeout**: 1 saat inaktivite sonrası oturum kapatılır
- **Aktivite İzleme**: Mouse, klavye, scroll, touch hareketleri izlenir
- **CSRF Token**: Her oturum için benzersiz token oluşturulur

### 8. Content Security Policy (CSP)
- **Özellik**: Sadece güvenli kaynaklardan script yüklenmesine izin verir
- **Kısıtlamalar**:
  - Script: Sadece kendi domain ve Firebase
  - Style: Sadece kendi domain
  - Image: Kendi domain ve HTTPS kaynaklar

### 9. Clickjacking Koruması
- **Özellik**: Sitenin iframe içinde açılmasını engeller
- **Yöntem**: Frame busting tekniği

### 10. Console Uyarısı
- **Özellik**: Developer Console'da güvenlik uyarısı gösterir
- **Amaç**: Self-XSS saldırılarını önler

## Firebase Güvenlik Kuralları

Aşağıdaki kuralları Firebase Console'da ayarlayın:

```json
{
  "rules": {
    "arizalar": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["timestamp", "durum"]
    },
    "mudurlukler": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "calisanlar": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "teknisyenler": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "security": {
      "failedLogins": {
        ".read": "auth != null && auth.uid == 'ADMIN_UID'",
        ".write": true
      },
      "blockedFingerprints": {
        ".read": "auth != null && auth.uid == 'ADMIN_UID'",
        ".write": true
      }
    }
  }
}
```

## Kullanım

### Başarısız Giriş Kayıtlarını Görüntüleme

Firebase Console'da:
1. Realtime Database'e gidin
2. `security/failedLogins` yolunu açın
3. Tüm başarısız giriş denemelerini görebilirsiniz

### Engellenen Kullanıcıları Görüntüleme

Firebase Console'da:
1. Realtime Database'e gidin
2. `security/blockedFingerprints` yolunu açın
3. Engellenen fingerprint'leri görebilirsiniz

### Manuel Engel Kaldırma

Bir kullanıcının engelini kaldırmak için:
1. Firebase Console'da `security/blockedFingerprints` yoluna gidin
2. İlgili fingerprint'i silin

## Öneriler

### Üretim Ortamı İçin

1. **HTTPS Kullanın**: Tüm trafiği HTTPS üzerinden yönlendirin
2. **Firebase Authentication**: Gerçek authentication sistemi ekleyin
3. **Güçlü Şifreler**: Varsayılan şifreleri değiştirin
4. **Firewall**: Sunucu tarafında firewall kuralları ekleyin
5. **Backup**: Düzenli veritabanı yedekleri alın
6. **Monitoring**: Güvenlik loglarını düzenli kontrol edin
7. **Rate Limiting**: Sunucu tarafında da rate limiting ekleyin
8. **IP Whitelist**: Admin paneli için IP whitelist kullanın

### Şifre Politikası

Üretim ortamında şifreler için:
- Minimum 12 karakter
- Büyük/küçük harf, rakam ve özel karakter içermeli
- Düzenli olarak değiştirilmeli
- Hash'lenerek saklanmalı (bcrypt, argon2)

### İzleme ve Raporlama

- Başarısız giriş denemelerini düzenli kontrol edin
- Anormal aktiviteleri tespit edin
- Güvenlik loglarını arşivleyin
- Şüpheli aktivitelerde alarm sistemi kurun

## Test

Güvenlik özelliklerini test etmek için:

1. **Rate Limiting**: 5 kez hızlıca giriş yapmayı deneyin
2. **Engelleme**: 3 kez yanlış şifre girin
3. **XSS**: Input'lara `<script>alert('xss')</script>` yazmayı deneyin
4. **SQL Injection**: `' OR 1=1 --` gibi SQL komutları deneyin
5. **Session Timeout**: 1 saat bekleyin ve otomatik çıkış yapıldığını görün

## Destek

Güvenlik sorunları için:
- Firebase Console'u kontrol edin
- Browser Console'da hata mesajlarını inceleyin
- `security/failedLogins` kayıtlarını gözden geçirin
