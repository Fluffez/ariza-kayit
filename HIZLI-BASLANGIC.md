# 🚀 Hızlı Başlangıç - Netlify Deployment

## 3 Adımda Canlıya Alın!

### Yöntem 1: Drag & Drop (En Kolay - 2 Dakika)

1. **Netlify'a Git**
   - [https://app.netlify.com/drop](https://app.netlify.com/drop) adresine git
   - Netlify hesabı yoksa ücretsiz oluştur

2. **Klasörü Sürükle**
   - `ariza-kayit` klasörünü tarayıcıya sürükle
   - Bekle... ⏳

3. **Hazır! 🎉**
   - Site URL'iniz: `https://random-name.netlify.app`
   - Hemen kullanmaya başlayabilirsiniz!

---

### Yöntem 2: GitHub ile (Otomatik Güncellemeler)

1. **GitHub'a Yükle**
   ```bash
   cd ariza-kayit
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/KULLANICI_ADINIZ/ariza-kayit.git
   git push -u origin main
   ```

2. **Netlify'a Bağla**
   - [Netlify Dashboard](https://app.netlify.com) > "Add new site"
   - "Import an existing project" > GitHub seç
   - Repo'yu seç
   - Settings:
     - Build command: Boş
     - Publish directory: `.`
   - "Deploy site" tıkla

3. **Otomatik Deploy Aktif! 🔄**
   - Her `git push` otomatik deploy olur

---

### Yöntem 3: CLI ile (Gelişmiş)

```bash
# 1. Netlify CLI kur
npm install -g netlify-cli

# 2. Login ol
netlify login

# 3. Deploy et
cd ariza-kayit
netlify deploy --prod
```

---

## ⚙️ Firebase Ayarları

### 1. Firebase Console'da Domain Ekle

1. [Firebase Console](https://console.firebase.google.com) > Projeniz
2. Authentication > Settings > Authorized domains
3. Netlify URL'inizi ekleyin: `your-site.netlify.app`

### 2. Firebase Config Kontrol

`js/firebase-config.js` dosyasında config'inizin doğru olduğundan emin olun.

---

## 🔒 Güvenlik Kontrol Listesi

- [ ] Firebase config doğru mu?
- [ ] Firebase'de domain whitelist'e eklendi mi?
- [ ] Admin şifresi değiştirildi mi? (Önerilen!)
- [ ] HTTPS aktif mi? (Netlify otomatik yapar)

---

## 🎨 Özel Domain Ekleme (Opsiyonel)

1. Netlify Dashboard > Domain settings
2. "Add custom domain" tıkla
3. Domain'inizi girin (örn: `ariza.dosemealti.bel.tr`)
4. DNS ayarlarını yapın:
   ```
   A Record: 75.2.60.5
   CNAME: your-site.netlify.app
   ```

---

## 📱 İlk Giriş

Site yayına alındıktan sonra:

1. **Admin Girişi**
   - Kullanıcı: `admin`
   - Şifre: `admin123`

2. **Normal Kullanıcı**
   - Kullanıcı: `dosemealti123`
   - Şifre: `dosemealti123`

⚠️ **ÖNEMLİ**: Şifreleri hemen değiştirin!

---

## 🐛 Sorun mu Var?

### "Firebase bağlantı hatası"
- Firebase Console'da domain'i whitelist'e eklediniz mi?
- `js/firebase-config.js` doğru mu?

### "Site açılmıyor"
- Netlify deploy tamamlandı mı?
- Netlify Dashboard'da "Published" yazıyor mu?

### "Admin paneli açılmıyor"
- URL'de `/admin.html` yazdınız mı?
- Örnek: `https://your-site.netlify.app/admin.html`

---

## 📞 Yardım

Detaylı bilgi için:
- [NETLIFY-DEPLOYMENT.md](NETLIFY-DEPLOYMENT.md) - Tam deployment rehberi
- [README.md](README.md) - Proje dokümantasyonu
- [GUVENLIK.md](GUVENLIK.md) - Güvenlik özellikleri

---

## ✅ Başarılı Deploy Sonrası

Tebrikler! Siteniz artık:
- ✅ Canlıda ve erişilebilir
- ✅ HTTPS ile güvenli
- ✅ Global CDN ile hızlı
- ✅ Otomatik yedekleme ile korumalı

**Keyifli kullanımlar! 🎊**
