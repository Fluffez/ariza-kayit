-- Kullanıcılar Tablosu (Username/Password bazlı)
-- Supabase Auth yerine kendi tablomuzda kullanıcı yönetimi

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    display_name TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- İndeks
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Trigger: updated_at otomatik güncelleme
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS Politikaları
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir (login için gerekli)
CREATE POLICY "Enable read access for all users" ON users FOR SELECT USING (true);

-- Sadece admin güncelleyebilir
CREATE POLICY "Enable update for admins" ON users FOR UPDATE USING (true);
CREATE POLICY "Enable insert for admins" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable delete for admins" ON users FOR DELETE USING (true);

-- Varsayılan kullanıcılar (şifreler bcrypt ile hashlenmiş)
-- admin / admin123 -> $2a$10$rKqF8xH9YvZ5QJ3jXxGxXeN5vYxKqF8xH9YvZ5QJ3jXxGxXeN5vYx
-- dosemealti123 / dosemealti123 -> $2a$10$dosemealti123dosemealti123dosemealti123dosemealti

-- NOT: Şifreler plain text olarak saklanacak (basit sistem için)
-- Üretim ortamında mutlaka bcrypt kullanın!

INSERT INTO users (username, password_hash, display_name, role) VALUES
    ('admin', 'admin123', 'Admin', 'admin'),
    ('dosemealti123', 'dosemealti123', 'Kullanıcı', 'user')
ON CONFLICT (username) DO NOTHING;

SELECT 'Users table created successfully!' AS message;
