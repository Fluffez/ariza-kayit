# ⚡ Hızlı Kurulum - 4 Adımda Veritabanı

## 📋 Gereksinimler
- ✅ Supabase hesabı
- ✅ Proje oluşturulmuş
- ✅ SQL Editor erişimi

---

## 🚀 Kurulum Adımları

### 1️⃣ ADIM: Tabloları Oluştur
```bash
Dosya: supabase-schema.sql
Süre: ~10 saniye
```
**Ne yapar?** 
- 6 tablo oluşturur (arizalar, mudurlukler, calisanlar, teknisyenler, users, failed_logins)

**Nasıl?**
1. Supabase Dashboard → SQL Editor
2. `supabase-schema.sql` içeriğini kopyala
3. Yapıştır ve **Run** butonuna tıkla
4. ✅ "Success" mesajını bekle

---

### 2️⃣ ADIM: Müdürlükler ve Çalışanları Ekle
```bash
Dosya: insert-data.sql
Süre: ~5 saniye
Eklenecek: 23 Müdürlük + 200+ Çalışan
```
**Ne yapar?**
- Tüm müdürlükleri ekler
- Tüm çalışanları dahili numaralarıyla ekler

**Nasıl?**
1. SQL Editor → New Query
2. `insert-data.sql` içeriğini kopyala
3. Yapıştır ve **Run**
4. ✅ Sonuçları kontrol et

---

### 3️⃣ ADIM: Teknisyenleri Ekle
```bash
Dosya: insert-teknisyenler.sql
Süre: ~2 saniye
Eklenecek: 7 Teknisyen (Bilgi İşlem Ekibi)
```
**Ne yapar?**
- Bilgi İşlem çalışanlarını teknisyen olarak ekler

**Nasıl?**
1. SQL Editor → New Query
2. `insert-teknisyenler.sql` içeriğini kopyala
3. Yapıştır ve **Run**
4. ✅ 7 teknisyen eklendi

---

### 4️⃣ ADIM: Kullanıcıları Oluştur
```bash
Dosya: users-schema.sql
Süre: ~3 saniye
Eklenecek: 2 Kullanıcı (Admin + Normal)
```
**Ne yapar?**
- Admin kullanıcısı oluşturur
- Normal kullanıcı oluşturur

**Nasıl?**
1. SQL Editor → New Query
2. `users-schema.sql` içeriğini kopyala
3. Yapıştır ve **Run**
4. ✅ Kullanıcılar hazır

**Giriş Bilgileri:**
- 👤 Admin: `admin` / `admin123`
- 👤 Normal: `dosemealti123` / `dosemealti123`

⚠️ **Canlıya geçmeden önce şifreleri değiştir!**

---

## ✅ Kontrol Et

Kurulum tamamlandı mı? Kontrol et:

```sql
-- Hepsini tek seferde çalıştır
SELECT 
    (SELECT COUNT(*) FROM mudurlukler) as mudurlukler,
    (SELECT COUNT(*) FROM calisanlar) as calisanlar,
    (SELECT COUNT(*) FROM teknisyenler) as teknisyenler,
    (SELECT COUNT(*) FROM users) as kullanicilar;
```

**Beklenen Sonuç:**
```
mudurlukler: 23
calisanlar: 200+
teknisyenler: 7
kullanicilar: 2
```

---

## 🎯 Toplam Süre: ~20 saniye

✅ Kurulum tamamlandı!  
🚀 Artık sistemi kullanmaya başlayabilirsiniz!

---

## 📚 Detaylı Bilgi

Daha fazla bilgi için: `VERITABANI-KURULUM.md`

## 🆘 Sorun mu var?

1. Her adımdan sonra "Success" mesajını kontrol et
2. Hata varsa, önceki adımları kontrol et
3. `VERITABANI-KURULUM.md` dosyasındaki "Sorun Giderme" bölümüne bak
