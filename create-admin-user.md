# Supabase Auth - İlk Admin Kullanıcısı Oluşturma

## Adım 1: Supabase Dashboard'a Git
1. https://supabase.com/dashboard adresine git
2. Projenizi seçin: `wmpvckbtixysxqkttdje`

## Adım 2: Authentication'ı Aktifleştir
1. Sol menüden **Authentication** > **Users** sekmesine git
2. Sağ üstten **Add user** > **Create new user** butonuna tıkla

## Adım 3: Admin Kullanıcısı Oluştur
Aşağıdaki bilgilerle kullanıcı oluştur:

**Email:** admin@local.app
**Password:** admin123
**Email Confirm:** ✅ (Auto Confirm User seçeneğini işaretle)

**User Metadata (JSON):**
```json
{
  "role": "admin",
  "display_name": "Admin"
}
```

## Adım 4: Normal Kullanıcı Oluştur (Opsiyonel)
**Email:** dosemealti123@local.app
**Password:** dosemealti123
**Email Confirm:** ✅

**User Metadata (JSON):**
```json
{
  "role": "user",
  "display_name": "Kullanıcı"
}
```

## Adım 5: Email Settings
Email doğrulama istemiyoruz:
1. **Authentication** > **Settings** > **Email Auth**
2. **Confirm email** seçeneğini KAPAT

## Giriş Bilgileri

### Admin Girişi:
- **Kullanıcı Adı:** admin
- **Şifre:** admin123

### Normal Kullanıcı Girişi:
- **Kullanıcı Adı:** dosemealti123
- **Şifre:** dosemealti123

## Nasıl Çalışıyor?
- Kullanıcı adı girildiğinde otomatik olarak `@local.app` ekleniyor
- Örnek: `admin` → `admin@local.app`
- Supabase Auth email tabanlı çalıştığı için bu trick kullanılıyor
- Kullanıcılar sadece kullanıcı adı görüyor, email görmüyor

## Not:
- Artık `admin/admin123` ve `dosemealti123/dosemealti123` Supabase Auth üzerinden çalışıyor
- Tüm authentication Supabase Auth üzerinden yapılıyor
- Kullanıcılar Supabase Dashboard'dan yönetiliyor
