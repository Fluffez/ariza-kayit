# Kullanıcı Tablosu Oluşturma

## Supabase SQL Editor'de Çalıştır

1. Supabase Dashboard > SQL Editor'e git
2. `users-schema.sql` dosyasındaki SQL'i çalıştır
3. Varsayılan kullanıcılar otomatik oluşturulacak

## Giriş Bilgileri

### Admin:
- **Kullanıcı Adı:** admin
- **Şifre:** admin123

### Normal Kullanıcı:
- **Kullanıcı Adı:** dosemealti123
- **Şifre:** dosemealti123

## Sistem
- Artık Supabase Auth kullanılmıyor
- Kendi `users` tablomuzda username/password saklıyoruz
- Plain text şifre (basit sistem için)
- Üretimde mutlaka bcrypt kullanın!
