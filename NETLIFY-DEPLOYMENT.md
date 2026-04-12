# Netlify Deployment Rehberi

## 🚀 Netlify'a Deploy Etme Adımları

### Yöntem 1: GitHub ile (Önerilen)

1. **GitHub'a Yükle**
   ```bash
   cd ariza-kayit
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git
   git push -u origin main
   ```

2. **Netlify'a Bağlan**
   - [Netlify](https://app.netlify.com) sitesine git
   - "Add new site" > "Import an existing project" tıkla
   - GitHub'ı seç ve repo'yu bul
   - Deploy settings:
     - **Build command**: Boş bırak
     - **Publish directory**: `.` (nokta)
   - "Deploy site" tıkla

3. **Otomatik Deployment**
   - Artık her GitHub push'unda otomatik deploy olur!

---

### Yöntem 2: Netlify CLI ile

1. **Netlify CLI Kur**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login Ol**
   ```bash
   netlify login
   ```

3. **Deploy Et**
   ```bash
   cd ariza-kayit
   netlify deploy
   ```
   - "Create & configure a new site" seç
   - Publish directory: `.` (nokta) gir

4. **Production'a Deploy**
   ```bash
   netlify deploy --prod
   ```

---

### Yöntem 3: Drag & Drop (En Kolay)

1. **Netlify'a Git**
   - [Netlify Drop](https://app.netlify.com/drop) sayfasına git

2. **Klasörü Sürükle**
   - `ariza-kayit` klasörünü tarayıcıya sürükle
   - Otomatik deploy başlar!

3. **Site Hazır!**
   - Netlify size rastgele bir URL verir
   - Örnek: `https://random-name-123.netlify.app`

---

## ⚙️ Özel Domain Ekleme

1. Netlify Dashboard'a git
2. Site Settings > Domain management
3. "Add custom domain" tıkla
4. Domain'inizi girin
5. DNS ayarlarını yapın:
   - **A Record**: `75.2.60.5`
   - **CNAME**: `your-site.netlify.app`

---

## 🔒 HTTPS (Otomatik)

Netlify otomatik olarak ücretsiz SSL sertifikası sağlar!
- Let's Encrypt kullanır
- Hiçbir ayar gerekmez
- 5-10 dakika içinde aktif olur

---

## 🔧 Environment Variables (Firebase Config)

Firebase config'inizi güvenli tutmak için:

1. Netlify Dashboard > Site settings > Environment variables
2. Şu değişkenleri ekleyin:
   ```
   FIREBASE_API_KEY=your-api-key
   FIREBASE_AUTH_DOMAIN=your-auth-domain
   FIREBASE_DATABASE_URL=your-database-url
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_STORAGE_BUCKET=your-storage-bucket
   FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   FIREBASE_APP_ID=your-app-id
   ```

3. `js/firebase-config.js` dosyasını güncelleyin:
   ```javascript
   const firebaseConfig = {
       apiKey: process.env.FIREBASE_API_KEY || "your-fallback-key",
       authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your-fallback-domain",
       // ... diğer ayarlar
   };
   ```

---

## 📊 Netlify Özellikleri

### Ücretsiz Plan İçeriği:
- ✅ 100 GB bandwidth/ay
- ✅ 300 build dakikası/ay
- ✅ Otomatik HTTPS
- ✅ Sürekli deployment
- ✅ Form handling
- ✅ Split testing
- ✅ Deploy previews
- ✅ Rollback özelliği

### Faydalı Komutlar:
```bash
# Site durumunu kontrol et
netlify status

# Loglara bak
netlify logs

# Site'ı aç
netlify open

# Environment variables listele
netlify env:list

# Build'i tetikle
netlify build
```

---

## 🐛 Sorun Giderme

### Deploy Başarısız Olursa:
1. `netlify.toml` dosyasını kontrol edin
2. Publish directory'nin doğru olduğundan emin olun
3. Netlify logs'u inceleyin

### Firebase Bağlantı Sorunu:
1. Firebase config'in doğru olduğundan emin olun
2. Firebase Console'da domain'i whitelist'e ekleyin:
   - Authentication > Settings > Authorized domains
   - `your-site.netlify.app` ekleyin

### CORS Hatası:
1. Firebase Realtime Database Rules'u kontrol edin
2. Netlify headers'ı kontrol edin (`netlify.toml`)

---

## 📱 Performans İpuçları

1. **Cache Ayarları**: `netlify.toml`'da zaten yapılandırıldı
2. **Asset Optimization**: Netlify otomatik optimize eder
3. **CDN**: Netlify global CDN kullanır
4. **Compression**: Otomatik gzip/brotli

---

## 🔄 Güncelleme Yapmak

### GitHub ile:
```bash
git add .
git commit -m "Update message"
git push
```
Netlify otomatik deploy eder!

### CLI ile:
```bash
netlify deploy --prod
```

### Drag & Drop ile:
Klasörü tekrar sürükle!

---

## 📞 Destek

- [Netlify Docs](https://docs.netlify.com)
- [Netlify Community](https://answers.netlify.com)
- [Netlify Status](https://www.netlifystatus.com)

---

## ✅ Deployment Checklist

- [ ] Firebase config doğru mu?
- [ ] `netlify.toml` dosyası var mı?
- [ ] `_redirects` dosyası var mı?
- [ ] `.gitignore` dosyası var mı?
- [ ] Tüm dosyalar commit edildi mi?
- [ ] Firebase'de domain whitelist'e eklendi mi?
- [ ] HTTPS çalışıyor mu?
- [ ] Admin paneli erişilebilir mi?
- [ ] Dark mode çalışıyor mu?
- [ ] Güvenlik özellikleri aktif mi?

---

## 🎉 Başarılı Deploy Sonrası

Site URL'iniz: `https://your-site.netlify.app`

Artık siteniz:
- ✅ Canlıda
- ✅ HTTPS ile güvenli
- ✅ Global CDN ile hızlı
- ✅ Otomatik güncellemeler

**Tebrikler! 🎊**
