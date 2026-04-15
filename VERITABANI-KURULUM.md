# 📊 Veritabanı Kurulum Rehberi

Döşemealtı Belediyesi Arıza Kayıt Sistemi için veritabanı kurulum adımları.

## 🚀 Hızlı Başlangıç

### 1. Supabase'e Giriş Yapın
- [Supabase Dashboard](https://app.supabase.com) adresine gidin
- Projenizi seçin

### 2. SQL Editor'ü Açın
- Sol menüden **SQL Editor** sekmesine tıklayın
- **New Query** butonuna tıklayın

### 3. Veritabanı Şemasını Oluşturun

**İlk adım:** `supabase-schema.sql` dosyasını çalıştırın
```sql
-- Bu dosya tabloları oluşturur:
-- - arizalar
-- - mudurlukler
-- - calisanlar
-- - teknisyenler
-- - users
-- - failed_logins
```

**Adımlar:**
1. `supabase-schema.sql` dosyasını açın
2. Tüm içeriği kopyalayın
3. SQL Editor'e yapıştırın
4. **Run** (Çalıştır) butonuna tıklayın
5. ✅ "Success" mesajını bekleyin

### 4. Müdürlükler ve Çalışanları Ekleyin

**İkinci adım:** `insert-data.sql` dosyasını çalıştırın

**Adımlar:**
1. `insert-data.sql` dosyasını açın
2. Tüm içeriği kopyalayın
3. SQL Editor'de **New Query** açın
4. Yapıştırın ve **Run** butonuna tıklayın
5. ✅ Sonuçları kontrol edin:
   - **23 Müdürlük** eklendi
   - **200+ Çalışan** eklendi

### 5. Teknisyenleri Ekleyin

**Üçüncü adım:** `insert-teknisyenler.sql` dosyasını çalıştırın

**Adımlar:**
1. `insert-teknisyenler.sql` dosyasını açın
2. Tüm içeriği kopyalayın
3. SQL Editor'de **New Query** açın
4. Yapıştırın ve **Run** butonuna tıklayın
5. ✅ **7 Teknisyen** eklendi

### 6. Kullanıcıları Oluşturun

**Dördüncü adım:** `users-schema.sql` dosyasını çalıştırın

**Adımlar:**
1. `users-schema.sql` dosyasını açın
2. Tüm içeriği kopyalayın
3. SQL Editor'de **New Query** açın
4. Yapıştırın ve **Run** butonuna tıklayın
5. ✅ Admin ve normal kullanıcı oluşturuldu

**Varsayılan Kullanıcılar:**
- **Admin:** `admin` / `admin123`
- **Normal:** `dosemealti123` / `dosemealti123`

⚠️ **ÖNEMLİ:** Canlı ortama geçmeden önce bu şifreleri mutlaka değiştirin!

## 📋 Dosya Açıklamaları

| Dosya | Açıklama | Sıra |
|-------|----------|------|
| `supabase-schema.sql` | Tablo yapılarını oluşturur | 1️⃣ |
| `insert-data.sql` | Müdürlükler ve çalışanları ekler | 2️⃣ |
| `insert-teknisyenler.sql` | Teknisyenleri ekler | 3️⃣ |
| `users-schema.sql` | Kullanıcıları oluşturur | 4️⃣ |

## 🔍 Veri Kontrolü

Verilerin doğru eklendiğini kontrol etmek için:

```sql
-- Müdürlük sayısı (23 olmalı)
SELECT COUNT(*) FROM mudurlukler;

-- Çalışan sayısı (200+ olmalı)
SELECT COUNT(*) FROM calisanlar;

-- Teknisyen sayısı (7 olmalı)
SELECT COUNT(*) FROM teknisyenler;

-- Kullanıcı sayısı (2 olmalı)
SELECT COUNT(*) FROM users;

-- Tüm müdürlükleri listele
SELECT * FROM mudurlukler ORDER BY name;

-- Tüm teknisyenleri listele
SELECT * FROM teknisyenler ORDER BY name;
```

## 📊 Eklenen Müdürlükler

1. NAR MASA
2. RUHSAT VE DENETİM MÜDÜRLÜĞÜ
3. EVRAK KAYIT
4. ZABITA MÜDÜRLÜĞÜ
5. GELİRLER MÜDÜRLÜĞÜ
6. SAĞLIK İŞLERİ MÜDÜRLÜĞÜ
7. İMAR VE ŞEHİRCİLİK MÜDÜRLÜĞÜ
8. PLAN VE PROJE MÜDÜRLÜĞÜ
9. BİLGİ İŞLEM MÜDÜRLÜĞÜ
10. FEN İŞLERİ MÜDÜRLÜĞÜ
11. MALİ HİZMETLER MÜDÜRLÜĞÜ
12. YAZI İŞLERİ MÜDÜRLÜĞÜ
13. BASIN YAYIN VE HALKLA İLİŞKİLER MÜDÜRLÜĞÜ
14. DESTEK HİZMETLER MÜDÜRLÜĞÜ
15. İNSAN KAYNAKLARI VE EĞİTİM MÜDÜRLÜĞÜ
16. EMLAK VE İSTİMLAK MÜDÜRLÜĞÜ
17. MUHTARLIK İŞLERİ MÜDÜRLÜĞÜ
18. FEN İŞLERİ MÜDÜRLÜĞÜ (KAZI RUHSAT)
19. ÖZEL KALEM MÜDÜRLÜĞÜ
20. İKLİM DEĞİŞİKLİĞİ VE SIFIR ATIK
21. AFET İŞLERİ MÜDÜRLÜĞÜ
22. HUKUK İŞLERİ MÜDÜRLÜĞÜ
23. DİĞER

## 👥 Eklenen Teknisyenler (Bilgi İşlem)

1. Adile Cebeci (1150)
2. Hüseyin Acay (1151)
3. Selman Karadağ (1152)
4. Rauf Kurt (1153)
5. Can Gürses (1154)
6. Ahmet Özkan (1155)
7. Bilgi İşlem Ekibi (Genel)

## 🔄 Verileri Güncelleme

Eğer verileri güncellemek isterseniz:

### Yeni Müdürlük Eklemek
```sql
INSERT INTO mudurlukler (name) VALUES ('YENİ MÜDÜRLÜK ADI');
```

### Yeni Çalışan Eklemek
```sql
INSERT INTO calisanlar (name) VALUES ('1999 - Ad Soyad');
```

### Yeni Teknisyen Eklemek
```sql
INSERT INTO teknisyenler (name) VALUES ('Ad Soyad');
```

### Kayıt Silmek
```sql
-- Müdürlük silmek
DELETE FROM mudurlukler WHERE name = 'MÜDÜRLÜK ADI';

-- Çalışan silmek
DELETE FROM calisanlar WHERE name = '1001 - Ad Soyad';

-- Teknisyen silmek
DELETE FROM teknisyenler WHERE name = 'Ad Soyad';
```

### Kayıt Güncellemek
```sql
-- Müdürlük adını değiştirmek
UPDATE mudurlukler SET name = 'YENİ AD' WHERE name = 'ESKİ AD';

-- Çalışan adını değiştirmek
UPDATE calisanlar SET name = '1001 - Yeni Ad' WHERE name = '1001 - Eski Ad';
```

## ⚠️ Önemli Notlar

1. **Sıralı Çalıştırın:** SQL dosyalarını yukarıdaki sırayla çalıştırın
2. **Hata Kontrolü:** Her adımdan sonra "Success" mesajını kontrol edin
3. **Yedekleme:** Canlı ortamda değişiklik yapmadan önce yedek alın
4. **Şifre Güvenliği:** Varsayılan şifreleri mutlaka değiştirin
5. **Duplicate Kontrol:** `ON CONFLICT DO NOTHING` sayesinde aynı kayıt tekrar eklenmez

## 🛠️ Sorun Giderme

### "relation does not exist" Hatası
- `supabase-schema.sql` dosyasını önce çalıştırdığınızdan emin olun

### "duplicate key value" Hatası
- Normal, aynı kayıt zaten var demektir
- `ON CONFLICT DO NOTHING` sayesinde hata vermez

### Veriler Görünmüyor
1. SQL Editor'de kontrol sorguları çalıştırın
2. Table Editor'den manuel kontrol edin
3. RLS (Row Level Security) politikalarını kontrol edin

## 📞 Destek

Sorun yaşarsanız:
1. Supabase Dashboard > Logs bölümünden hataları kontrol edin
2. SQL Editor'de kontrol sorgularını çalıştırın
3. Table Editor'den manuel kontrol yapın

---

**Son Güncelleme:** 2026-04-15
**Versiyon:** 2.0.0
