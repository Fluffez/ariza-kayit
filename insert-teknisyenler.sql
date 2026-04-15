-- Döşemealtı Belediyesi - Teknisyenler (Bilgi İşlem Ekibi)
-- Bu SQL dosyasını Supabase SQL Editor'de çalıştırın

-- =====================================================
-- TEKNİSYENLER TABLOSU
-- =====================================================

-- Önce mevcut teknisyenleri temizle (opsiyonel)
-- DELETE FROM teknisyenler;

INSERT INTO teknisyenler (name) VALUES
('Adile Cebeci'),
('Hüseyin Acay'),
('Selman Karadağ'),
('Rauf Kurt'),
('Can Gürses'),
('Ahmet Özkan'),
('Bilgi İşlem Ekibi') -- Genel atama için
ON CONFLICT DO NOTHING;

-- Teknisyen sayısını kontrol et
SELECT COUNT(*) as teknisyen_sayisi FROM teknisyenler;

-- Tüm teknisyenleri listele
SELECT * FROM teknisyenler ORDER BY name;
