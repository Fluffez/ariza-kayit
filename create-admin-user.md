# Supabase Auth - İlk Admin Kullanıcısı Oluşturma

## Adım 1: Supabase Dashboard'a Git
1. https://supabase.com/dashboard adresine git
2. Projenizi seçin: `wmpvckbtixysxqkttdje`

## Adım 2: Authentication'ı Aktifleştir
1. Sol menüden **Authentication** > **Users** sekmesine git
2. Sağ üstten **Add user** > **Create new user** butonuna tıkla

## Adım 3: Admin Kullanıcısı Oluştur
Aşağıdaki bilgilerle kullanıcı oluştur:

**Email:** admin@dosemealti.gov.tr
**Password:** Admin123!@#
**Email Confirm:** ✅ (Auto Confirm User seçeneğini işaretle)

**User Metadata (JSON):**
```json
{
  "role": "admin",
  "display_name": "Admin"
}
```

## Adım 4: Normal Kullanıcı Oluştur (Opsiyonel)
**Email:** user@dosemealti.gov.tr
**Password:** User123!@#
**Email Confirm:** ✅

**User Metadata (JSON):**
```json
{
  "role": "user",
  "display_name": "Kullanıcı"
}
```

## Adım 5: Email Settings (Opsiyonel)
Eğer email doğrulama istemiyorsan:
1. **Authentication** > **Settings** > **Email Auth**
2. **Confirm email** seçeneğini KAPAT

## Giriş Bilgileri

### Admin Girişi:
- **Email:** admin@dosemealti.gov.tr
- **Şifre:** Admin123!@#

### Normal Kullanıcı Girişi:
- **Email:** user@dosemealti.gov.tr
- **Şifre:** User123!@#

## Not:
- Artık `admin/admin123` ve `dosemealti123/dosemealti123` kullanılmıyor
- Tüm authentication Supabase Auth üzerinden yapılıyor
- Kullanıcılar Supabase Dashboard'dan yönetiliyor
