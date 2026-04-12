-- Supabase Database Schema
-- Bu SQL'i Supabase SQL Editor'de çalıştırın

-- 1. Arızalar Tablosu
CREATE TABLE IF NOT EXISTS arizalar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    birim TEXT NOT NULL,
    cihaz_turu TEXT NOT NULL,
    ariza_turu TEXT NOT NULL,
    aciklama TEXT,
    yapilan_isler TEXT NOT NULL,
    talep_eden TEXT NOT NULL,
    atanan_kisi TEXT,
    durum TEXT DEFAULT 'beklemede' CHECK (durum IN ('beklemede', 'devam-ediyor', 'tamamlandi')),
    tarih TEXT NOT NULL,
    timestamp BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW()) * 1000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Müdürlükler Tablosu
CREATE TABLE IF NOT EXISTS mudurlukler (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Çalışanlar Tablosu
CREATE TABLE IF NOT EXISTS calisanlar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Teknisyenler Tablosu
CREATE TABLE IF NOT EXISTS teknisyenler (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Başarısız Giriş Logları
CREATE TABLE IF NOT EXISTS failed_logins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fingerprint TEXT NOT NULL,
    username TEXT NOT NULL,
    timestamp BIGINT NOT NULL,
    user_agent TEXT,
    language TEXT,
    platform TEXT,
    screen_resolution TEXT,
    timezone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Engellenen Fingerprint'ler
CREATE TABLE IF NOT EXISTS blocked_fingerprints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fingerprint TEXT NOT NULL UNIQUE,
    blocked_at BIGINT NOT NULL,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- İndeksler (Performans için)
CREATE INDEX IF NOT EXISTS idx_arizalar_durum ON arizalar(durum);
CREATE INDEX IF NOT EXISTS idx_arizalar_timestamp ON arizalar(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_arizalar_birim ON arizalar(birim);
CREATE INDEX IF NOT EXISTS idx_failed_logins_fingerprint ON failed_logins(fingerprint);
CREATE INDEX IF NOT EXISTS idx_failed_logins_timestamp ON failed_logins(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_blocked_fingerprints_fingerprint ON blocked_fingerprints(fingerprint);

-- Trigger: updated_at otomatik güncelleme
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_arizalar_updated_at
    BEFORE UPDATE ON arizalar
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Politikaları
-- Herkes okuyabilir, herkes yazabilir (basit versiyon)
-- Üretim ortamında daha kısıtlayıcı yapabilirsiniz

ALTER TABLE arizalar ENABLE ROW LEVEL SECURITY;
ALTER TABLE mudurlukler ENABLE ROW LEVEL SECURITY;
ALTER TABLE calisanlar ENABLE ROW LEVEL SECURITY;
ALTER TABLE teknisyenler ENABLE ROW LEVEL SECURITY;
ALTER TABLE failed_logins ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_fingerprints ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir
CREATE POLICY "Enable read access for all users" ON arizalar FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON mudurlukler FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON calisanlar FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON teknisyenler FOR SELECT USING (true);

-- Herkes yazabilir (basit versiyon)
CREATE POLICY "Enable insert for all users" ON arizalar FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON arizalar FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON arizalar FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON mudurlukler FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON mudurlukler FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON mudurlukler FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON calisanlar FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON calisanlar FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON calisanlar FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON teknisyenler FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON teknisyenler FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON teknisyenler FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON failed_logins FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for all users" ON failed_logins FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON blocked_fingerprints FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for all users" ON blocked_fingerprints FOR SELECT USING (true);

-- Örnek Veriler (Opsiyonel)
INSERT INTO mudurlukler (name) VALUES
    ('NAR MASA'),
    ('Ruhsat ve Denetim Müdürlüğü'),
    ('Evrak Kayıt'),
    ('Zabıta Müdürlüğü'),
    ('Gelirler Müdürlüğü'),
    ('Sağlık İşleri Müdürlüğü'),
    ('İmar ve Şehircilik Müdürlüğü'),
    ('Plan ve Proje Müdürlüğü'),
    ('Bilgi İşlem Müdürlüğü')
ON CONFLICT (name) DO NOTHING;

-- Başarılı!
SELECT 'Database schema created successfully!' AS message;
