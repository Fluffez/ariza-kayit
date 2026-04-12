-- Firestore'dan Supabase'e Müdürlük Import
-- Bu SQL'i Supabase SQL Editor'de çalıştırın

-- Müdürlükleri ekle (tekrar etmeyenler)
INSERT INTO mudurlukler (name) VALUES
('Afet İşleri Müdürlüğü'),
('Basın Yayın ve Halkla İlişkiler Müdürlüğü'),
('Basın Yayın ve Halklla İlişkiler Müdürlüğü / Çay Ocağı'),
('Basın Yayın ve Halklla İlişkiler Müdürlüğü / İşkur Servisi'),
('Başkanlık'),
('Bilgi İşlem Müdürlüğü'),
('Boş Birim'),
('Çağrı Merkezi'),
('Destek Hizmetleri Müdürlüğü'),
('Emlak ve İstimlak Müdürlüğü'),
('Fen İşleri Müdürlüğü'),
('Fen İşleri Müdürlüğü / Araç Havuz'),
('Hukuk İşleri Müdürlüğü'),
('İklim Değişikliği ve Sıfır Atık Müdürlüğü'),
('İmar ve Şehircilik Müdürlüğü'),
('İnsan Kaynakları ve Eğitim Müdürlüğü'),
('Kreş Müdürlüğü'),
('Mali Hizmetler Müdürlüğü'),
('Mali Hizmetler Müdürlüğü / Emlak Servisi'),
('Mali Hizmetler Müdürlüğü / Gelir Takip Servisi'),
('Meclis Üyeleri'),
('Muhtarlık İşleri Müdürlüğü'),
('Özel Kalem Müdürlüğü'),
('Özel Kalem Müdürlüğü / Nar Masa'),
('Özel Kalem Müdürlüğü / Nar Masa / Banko'),
('Özel Kalem Müdürlüğü / Nar Masa / Santral'),
('Özel Kalem Müdürlüğü / Özel Proje'),
('Park ve Bahçeler Müdürlüğü / Elektrik'),
('Plan ve Proje Müdürlüğü'),
('Plan ve Proje Müdürlüğü / Çap Servisi'),
('Plan ve Proje Müdürlüğü / Harita Servisi'),
('Ruhsat Denetim Müdürlüğü'),
('Sağlık İşleri Müdürlüğü'),
('Sağlık İşleri Müdürlüğü / Diş Tabip'),
('Sağlık İşleri Müdürlüğü / Veterinerlik'),
('Teftiş Kurulu Müdürlüğü'),
('Yazı İşleri Müdürlüğü'),
('Zabıta Müdürlüğü'),
('Zabıta Müdürlüğü / Güvenlik'),
('Zabıta Müdürlüğü / İlan Reklam Birimi'),
('Zabıta Müdürlüğü / Kalem')
ON CONFLICT (name) DO NOTHING;

-- Kaç kayıt eklendi kontrol et
SELECT COUNT(*) as toplam_mudurluk FROM mudurlukler;

SELECT 'Müdürlükler başarıyla import edildi!' as mesaj;
