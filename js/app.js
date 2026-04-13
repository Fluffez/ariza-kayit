// Müdürlükler listesi - Supabase'den yüklenecek
let mudurlukler = [];

// Çalışanlar listesi - Supabase'den yüklenecek
let calisanlar = [];

// Supabase'den listeleri yükle
async function loadListsFromSupabase() {
    try {
        // Müdürlükleri yükle
        const { data: mudurluklerData, error: mudurlukError } = await supabase
            .from('mudurlukler')
            .select('name')
            .order('name');
        
        if (mudurlukError) throw mudurlukError;
        mudurlukler = mudurluklerData.map(m => m.name);
        console.log('Müdürlükler yüklendi:', mudurlukler.length);
        
        // Çalışanları yükle
        const { data: calisanlarData, error: calisanError } = await supabase
            .from('calisanlar')
            .select('name')
            .order('name');
        
        if (calisanError) throw calisanError;
        calisanlar = calisanlarData.map(c => c.name);
        console.log('Çalışanlar yüklendi:', calisanlar.length);
    } catch (error) {
        console.error('Liste yükleme hatası:', error);
    }
}

// Sayfa yüklendiğinde listeleri çek
if (typeof supabase !== 'undefined') {
    loadListsFromSupabase();
}

// Login kontrolü
const loginScreen = document.getElementById('login-screen');
const mainApp = document.getElementById('main-app');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const fabBtn = document.getElementById('fab-btn');

// Sayfa yüklendiğinde login kontrolü
window.addEventListener('DOMContentLoaded', () => {
    const remembered = localStorage.getItem('rememberedUser');
    const isAdmin = localStorage.getItem('isAdmin');
    
    if (remembered === 'true') {
        showMainApp();
        if (isAdmin === 'true') {
            document.getElementById('admin-link').style.display = 'inline-block';
        }
    }
    
    // Maskot animasyonu
    const passwordInput = document.getElementById('password');
    const usernameInput = document.getElementById('username');
    const mascot = document.getElementById('mascot');
    const leftEyeNormal = document.getElementById('left-eye-normal');
    const rightEyeNormal = document.getElementById('right-eye-normal');
    const leftEyeClosed = document.getElementById('left-eye-closed');
    const rightEyeClosed = document.getElementById('right-eye-closed');
    
    let eyeTimeouts = [];
    
    function clearEyeTimeouts() {
        eyeTimeouts.forEach(timeout => clearTimeout(timeout));
        eyeTimeouts = [];
    }
    
    // Başlangıçta gözleri ayarla
    if (leftEyeNormal && rightEyeNormal && leftEyeClosed && rightEyeClosed) {
        leftEyeNormal.style.display = 'block';
        rightEyeNormal.style.display = 'block';
        leftEyeNormal.style.opacity = '1';
        rightEyeNormal.style.opacity = '1';
        leftEyeClosed.style.display = 'none';
        rightEyeClosed.style.display = 'none';
    }
    
    if (passwordInput && mascot) {
        // Kullanıcı adı input'una focus olunca - gözleri aç
        usernameInput?.addEventListener('focus', () => {
            clearEyeTimeouts();
            
            // Elleri geri çek
            mascot.classList.remove('covering');
            
            // Gözleri aç
            eyeTimeouts.push(setTimeout(() => {
                if (leftEyeClosed && rightEyeClosed && leftEyeNormal && rightEyeNormal) {
                    leftEyeClosed.style.display = 'none';
                    rightEyeClosed.style.display = 'none';
                    leftEyeNormal.style.display = 'block';
                    rightEyeNormal.style.display = 'block';
                    leftEyeNormal.style.opacity = '1';
                    rightEyeNormal.style.opacity = '1';
                }
            }, 200));
        });
        
        // Şifre kutusuna focus olunca
        passwordInput.addEventListener('focus', () => {
            clearEyeTimeouts();
            mascot.classList.add('covering');
            
            // Gözleri kapat (eller hareket ederken)
            eyeTimeouts.push(setTimeout(() => {
                if (leftEyeNormal && rightEyeNormal) {
                    leftEyeNormal.style.opacity = '0';
                    rightEyeNormal.style.opacity = '0';
                }
            }, 200));
            
            eyeTimeouts.push(setTimeout(() => {
                if (leftEyeNormal && rightEyeNormal && leftEyeClosed && rightEyeClosed) {
                    leftEyeNormal.style.display = 'none';
                    rightEyeNormal.style.display = 'none';
                    leftEyeClosed.style.display = 'block';
                    rightEyeClosed.style.display = 'block';
                    leftEyeClosed.style.opacity = '1';
                    rightEyeClosed.style.opacity = '1';
                }
            }, 400));
        });
        
        // Şifre kutusundan çıkınca
        passwordInput.addEventListener('blur', () => {
            clearEyeTimeouts();
            
            // Elleri hemen geri çek
            mascot.classList.remove('covering');
            
            // Gözleri aç
            eyeTimeouts.push(setTimeout(() => {
                if (leftEyeClosed && rightEyeClosed && leftEyeNormal && rightEyeNormal) {
                    leftEyeClosed.style.display = 'none';
                    rightEyeClosed.style.display = 'none';
                    leftEyeNormal.style.display = 'block';
                    rightEyeNormal.style.display = 'block';
                    leftEyeNormal.style.opacity = '1';
                    rightEyeNormal.style.opacity = '1';
                }
            }, 200));
        });
    }
    
    // Şifre göster/gizle
    const togglePassword = document.getElementById('toggle-password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            
            // İkon değiştir
            const icon = togglePassword.querySelector('.eye-icon');
            if (type === 'text') {
                icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
            } else {
                icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
            }
        });
    }
});

// Login form
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('remember-me').checked;
    
    // Güvenlik kontrolü - Engellenen kullanıcı mı?
    if (typeof window.securityUtils !== 'undefined') {
        const isBlocked = await window.securityUtils.failedLoginTracker.isBlocked();
        if (isBlocked) {
            showToast('Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.', 'error');
            return;
        }

        // Rate limiting kontrolü
        const fingerprint = await window.securityUtils.failedLoginTracker.generateFingerprint();
        const rateCheck = window.securityUtils.loginLimiter.checkLimit(fingerprint);
        
        if (!rateCheck.allowed) {
            showToast(`Çok fazla deneme yaptınız. ${rateCheck.waitTime} saniye sonra tekrar deneyin.`, 'error');
            return;
        }
    }
    
    // Input validasyonu
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // Boş kontrol
    if (!username) {
        usernameInput.setCustomValidity('Kullanıcı adı boş olamaz');
        usernameInput.reportValidity();
        return;
    } else {
        usernameInput.setCustomValidity('');
    }
    
    if (!password) {
        passwordInput.setCustomValidity('Şifre boş olamaz');
        passwordInput.reportValidity();
        return;
    } else {
        passwordInput.setCustomValidity('');
    }
    
    // Uzunluk kontrolü
    if (username.length > 50 || password.length > 50) {
        showToast('Kullanıcı adı veya şifre çok uzun', 'error');
        return;
    }

    // Güvenlik validasyonu
    if (typeof window.securityUtils !== 'undefined') {
        const usernameValidation = window.securityUtils.validateInput(username, 'username', 50);
        if (!usernameValidation.valid) {
            showToast(usernameValidation.error, 'error');
            return;
        }
    }
    
    // Admin kontrolü
    if (username === 'admin' && password === 'admin123') {
        if (rememberMe) {
            safeLocalStorageSet('rememberedUser', 'true');
            safeLocalStorageSet('isAdmin', 'true');
        } else {
            localStorage.removeItem('rememberedUser');
            localStorage.removeItem('isAdmin');
        }
        localStorage.setItem('isAdmin', 'true');
        
        // Başarılı giriş - rate limiter'ı sıfırla
        if (typeof window.securityUtils !== 'undefined') {
            const fingerprint = await window.securityUtils.failedLoginTracker.generateFingerprint();
            window.securityUtils.loginLimiter.reset(fingerprint);
        }
        
        showMainApp();
        document.getElementById('admin-link').style.display = 'inline-block';
        showToast('Admin olarak giriş yapıldı', 'success');
    } else if (username === 'dosemealti123' && password === 'dosemealti123') {
        if (rememberMe) {
            safeLocalStorageSet('rememberedUser', 'true');
        } else {
            localStorage.removeItem('rememberedUser');
        }
        localStorage.removeItem('isAdmin');
        
        // Başarılı giriş - rate limiter'ı sıfırla
        if (typeof window.securityUtils !== 'undefined') {
            const fingerprint = await window.securityUtils.failedLoginTracker.generateFingerprint();
            window.securityUtils.loginLimiter.reset(fingerprint);
        }
        
        showMainApp();
        showToast('Giriş başarılı', 'success');
    } else {
        // Başarısız giriş - kaydet
        if (typeof window.securityUtils !== 'undefined') {
            const result = await window.securityUtils.failedLoginTracker.logFailedAttempt(username, password);
            
            if (result.blocked) {
                showToast('Çok fazla başarısız deneme. Hesabınız geçici olarak engellendi.', 'error');
            } else if (result.remaining !== undefined) {
                showToast(`Kullanıcı adı veya şifre hatalı! ${result.remaining} deneme hakkınız kaldı.`, 'error');
            } else {
                showToast('Kullanıcı adı veya şifre hatalı!', 'error');
            }
        } else {
            showToast('Kullanıcı adı veya şifre hatalı!', 'error');
        }
        
        // Input'ları temizle
        passwordInput.value = '';
        passwordInput.focus();
        
        // Güvenlik için biraz beklet
        loginForm.querySelector('button').disabled = true;
        setTimeout(() => {
            loginForm.querySelector('button').disabled = false;
        }, 2000); // 2 saniye bekleme süresi
    }
});

// Input'lara yazarken custom validation'ı temizle
document.getElementById('username')?.addEventListener('input', function() {
    this.setCustomValidity('');
});

document.getElementById('password')?.addEventListener('input', function() {
    this.setCustomValidity('');
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('rememberedUser');
    localStorage.removeItem('isAdmin');
    loginScreen.style.display = 'flex';
    mainApp.style.display = 'none';
    fabBtn.style.display = 'none';
    document.getElementById('admin-link').style.display = 'none';
    loginForm.reset();
});

function showMainApp() {
    loginScreen.style.display = 'none';
    mainApp.style.display = 'block';
    fabBtn.style.display = 'block';
    
    // Dark mode'u temizle - her zaman aydınlık modda başlasın
    document.body.classList.remove('dark-mode');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.textContent = '🌙';
    }
    
    // Kullanıcı tercihini yükle
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.textContent = '☀️';
        }
    }
    
    // Supabase kontrolü
    if (typeof db === 'undefined') {
        console.warn('Supabase henüz yüklenmedi, bekleniyor...');
        let retryCount = 0;
        const maxRetries = 5;
        
        const checkSupabase = setInterval(() => {
            retryCount++;
            if (typeof db !== 'undefined') {
                console.log('Supabase yüklendi, veriler çekiliyor...');
                clearInterval(checkSupabase);
                arizalariYukle();
            } else if (retryCount >= maxRetries) {
                console.error('Supabase yüklenemedi');
                clearInterval(checkSupabase);
                showToast('Veritabanı bağlantısı kurulamadı. Lütfen sayfayı yenileyin.', 'error');
            }
        }, 1000);
    } else {
        arizalariYukle();
    }
}

// DOM elementleri
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close-btn');
const form = document.getElementById('ariza-form');
const arizaListesi = document.getElementById('ariza-listesi');
const durumFiltre = document.getElementById('durum-filtre');

let editingId = null;

// Autocomplete için
const birimInput = document.getElementById('birim');
const birimSuggestions = document.getElementById('birim-suggestions');
const talepInput = document.getElementById('talep-eden');
const talepSuggestions = document.getElementById('talep-suggestions');

let currentFocus = -1;

// Müdürlük autocomplete
birimInput.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    currentFocus = -1;
    
    // Kırmızılığı kaldır
    if (value) {
        this.classList.remove('error');
        document.getElementById('birim-error').textContent = '';
    }
    
    if (!value) {
        birimSuggestions.classList.remove('active');
        return;
    }
    
    const filtered = mudurlukler.filter(m => 
        m.toLowerCase().includes(value)
    );
    
    if (filtered.length > 0) {
        birimSuggestions.innerHTML = filtered.map(m => 
            `<div class="suggestion-item" data-value="${m}">${m}</div>`
        ).join('');
        birimSuggestions.classList.add('active');
        
        // Click event
        birimSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                birimInput.value = this.dataset.value;
                birimSuggestions.classList.remove('active');
                birimInput.classList.remove('error');
                document.getElementById('birim-error').textContent = '';
            });
        });
    } else {
        birimSuggestions.classList.remove('active');
    }
});

// Talep eden autocomplete (çalışanlar listesinden)
talepInput.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    currentFocus = -1;
    
    // Kırmızılığı kaldır
    if (value) {
        this.classList.remove('error');
        document.getElementById('talep-error').textContent = '';
    }
    
    if (!value || value.length < 1) {
        talepSuggestions.classList.remove('active');
        return;
    }
    
    const filtered = calisanlar.filter(c => 
        c.toLowerCase().includes(value)
    );
    
    if (filtered.length > 0) {
        talepSuggestions.innerHTML = filtered.slice(0, 10).map(c => 
            `<div class="suggestion-item" data-value="${c}">${c}</div>`
        ).join('');
        talepSuggestions.classList.add('active');
        
        // Click event
        talepSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                talepInput.value = this.dataset.value;
                talepSuggestions.classList.remove('active');
                talepInput.classList.remove('error');
                document.getElementById('talep-error').textContent = '';
            });
        });
    } else {
        talepSuggestions.classList.remove('active');
    }
});

// Keyboard navigation
function handleKeyDown(e, input, suggestions) {
    const items = suggestions.querySelectorAll('.suggestion-item');
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentFocus++;
        if (currentFocus >= items.length) currentFocus = 0;
        setActive(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentFocus--;
        if (currentFocus < 0) currentFocus = items.length - 1;
        setActive(items);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentFocus > -1 && items[currentFocus]) {
            input.value = items[currentFocus].dataset.value;
            suggestions.classList.remove('active');
            currentFocus = -1;
        }
    } else if (e.key === 'Escape') {
        suggestions.classList.remove('active');
        currentFocus = -1;
    }
}

function setActive(items) {
    items.forEach((item, index) => {
        item.classList.remove('highlighted');
        if (index === currentFocus) {
            item.classList.add('highlighted');
            item.scrollIntoView({ block: 'nearest' });
        }
    });
}

birimInput.addEventListener('keydown', (e) => handleKeyDown(e, birimInput, birimSuggestions));
talepInput.addEventListener('keydown', (e) => handleKeyDown(e, talepInput, talepSuggestions));

// Click outside to close
document.addEventListener('click', (e) => {
    if (!birimInput.contains(e.target) && !birimSuggestions.contains(e.target)) {
        birimSuggestions.classList.remove('active');
    }
    if (!talepInput.contains(e.target) && !talepSuggestions.contains(e.target)) {
        talepSuggestions.classList.remove('active');
    }
});

// Modal kontrolleri
fabBtn.addEventListener('click', () => {
    editingId = null;
    form.reset();
    // Hata mesajlarını ve stilleri temizle
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelector('.modal-header h3').textContent = 'Yeni Arıza Kaydı';
    modal.classList.add('active');
});

// Select ve textarea değişikliklerinde kırmızılığı kaldır
document.getElementById('cihaz-turu')?.addEventListener('change', function() {
    if (this.value) {
        this.classList.remove('error');
        document.getElementById('cihaz-error').textContent = '';
    }
});

document.getElementById('ariza-turu')?.addEventListener('change', function() {
    if (this.value) {
        this.classList.remove('error');
        document.getElementById('ariza-turu-error').textContent = '';
    }
});

document.getElementById('yapilan-isler')?.addEventListener('input', function() {
    if (this.value.trim()) {
        this.classList.remove('error');
        document.getElementById('yapilan-error').textContent = '';
    }
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    form.reset();
    editingId = null;
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        form.reset();
        editingId = null;
    }
});

// Form gönderimi
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Çift submit önleme
    if (isSubmitting) {
        return;
    }
    
    // Validasyon
    let isValid = true;
    
    // Müdürlük kontrolü
    const birimValue = document.getElementById('birim').value.trim();
    const birimError = document.getElementById('birim-error');
    const birimInput = document.getElementById('birim');
    
    if (!birimValue) {
        birimError.textContent = 'Lütfen müdürlük seçiniz';
        birimInput.classList.add('error');
        isValid = false;
    } else if (!mudurlukler.includes(birimValue)) {
        birimError.textContent = 'Lütfen listeden bir müdürlük seçiniz';
        birimInput.classList.add('error');
        isValid = false;
    } else if (hasInvalidChars(birimValue)) {
        birimError.textContent = 'Geçersiz karakterler içeriyor';
        birimInput.classList.add('error');
        isValid = false;
    } else {
        birimError.textContent = '';
        birimInput.classList.remove('error');
    }
    
    // Cihaz türü kontrolü
    const cihazValue = document.getElementById('cihaz-turu').value;
    const cihazError = document.getElementById('cihaz-error');
    const cihazInput = document.getElementById('cihaz-turu');
    
    if (!cihazValue) {
        cihazError.textContent = 'Lütfen cihaz türü seçiniz';
        cihazInput.classList.add('error');
        isValid = false;
    } else {
        cihazError.textContent = '';
        cihazInput.classList.remove('error');
    }
    
    // Arıza türü kontrolü
    const arizaTuruValue = document.getElementById('ariza-turu').value;
    const arizaTuruError = document.getElementById('ariza-turu-error');
    const arizaTuruInput = document.getElementById('ariza-turu');
    
    if (!arizaTuruValue) {
        arizaTuruError.textContent = 'Lütfen arıza türü seçiniz';
        arizaTuruInput.classList.add('error');
        isValid = false;
    } else {
        arizaTuruError.textContent = '';
        arizaTuruInput.classList.remove('error');
    }
    
    // Talep eden kontrolü
    const talepValue = document.getElementById('talep-eden').value.trim();
    const talepError = document.getElementById('talep-error');
    const talepInput = document.getElementById('talep-eden');
    
    if (!talepValue) {
        talepError.textContent = 'Lütfen talep eden bilgisini giriniz';
        talepInput.classList.add('error');
        isValid = false;
    } else if (hasInvalidChars(talepValue)) {
        talepError.textContent = 'Geçersiz karakterler içeriyor';
        talepInput.classList.add('error');
        isValid = false;
    } else {
        talepError.textContent = '';
        talepInput.classList.remove('error');
    }
    
    // Yapılan işler kontrolü
    const yapilanValue = document.getElementById('yapilan-isler').value.trim();
    const yapilanError = document.getElementById('yapilan-error');
    const yapilanInput = document.getElementById('yapilan-isler');
    
    if (!yapilanValue) {
        yapilanError.textContent = 'Lütfen yapılan işleri giriniz';
        yapilanInput.classList.add('error');
        isValid = false;
    } else if (hasInvalidChars(yapilanValue)) {
        yapilanError.textContent = 'Geçersiz karakterler içeriyor';
        yapilanInput.classList.add('error');
        isValid = false;
    } else {
        yapilanError.textContent = '';
        yapilanInput.classList.remove('error');
    }
    
    // Açıklama kontrolü (opsiyonel ama kontrol edelim)
    const aciklamaValue = document.getElementById('aciklama').value.trim();
    if (aciklamaValue && hasInvalidChars(aciklamaValue)) {
        showToast('Açıklama geçersiz karakterler içeriyor', 'error');
        isValid = false;
    }
    
    if (!isValid) {
        showToast('Lütfen tüm zorunlu alanları doğru doldurunuz', 'error');
        return;
    }
    
    // Supabase kontrolü
    if (typeof db === 'undefined') {
        showToast('Veritabanı bağlantısı yok. Lütfen sayfayı yenileyin.', 'error');
        return;
    }
    
    isSubmitting = true;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Kaydediliyor...';
    
    const arizaData = {
        birim: sanitizeHTML(birimValue),
        cihaz_turu: sanitizeHTML(cihazValue),
        ariza_turu: sanitizeHTML(arizaTuruValue),
        aciklama: sanitizeHTML(aciklamaValue) || '',
        yapilan_isler: sanitizeHTML(yapilanValue),
        talep_eden: sanitizeHTML(talepValue),
        atanan_kisi: sanitizeHTML(document.getElementById('atanan-kisi')?.value.trim() || ''),
        durum: editingId ? undefined : 'beklemede',
        tarih: safeDateFormat(Date.now()),
        timestamp: Date.now()
    };
    
    try {
        if (editingId) {
            await db.updateAriza(editingId, arizaData);
            showToast('Kayıt başarıyla güncellendi', 'success');
            if (typeof playSound === 'function') playSound('success');
        } else {
            await db.addAriza(arizaData);
            showToast('Yeni kayıt başarıyla eklendi', 'success');
            if (typeof playSound === 'function') playSound('success');
        }
        form.reset();
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        modal.classList.remove('active');
        editingId = null;
        formDirty = false;
    } catch (error) {
        console.error('Kayıt hatası:', error);
        showToast('İşlem sırasında bir hata oluştu: ' + error.message, 'error');
    } finally {
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

// Durum filtreleme
durumFiltre.addEventListener('change', () => {
    arizalariYukle();
});

// Arızaları yükle
async function arizalariYukle() {
    try {
        tumArizalar = await db.getArizalar();
        filtrelenmisArizalar = tumArizalar;
        
        // Filtreleri uygula
        if (typeof filtreleriUygula === 'function') {
            filtreleriUygula();
        } else {
            arizalariGoster(tumArizalar);
        }
        
        // Realtime updates için subscribe
        db.subscribeToArizalar((payload) => {
            console.log('Arıza değişikliği:', payload);
            arizalariYukle(); // Yeniden yükle
        });
    } catch (error) {
        console.error('Arıza yükleme hatası:', error);
        showToast('Veriler yüklenirken hata oluştu', 'error');
    }
}

// Arızaları göster
function arizalariGoster(arizalar) {
    // Güvenlik kontrolü
    if (!arizalar || !Array.isArray(arizalar)) {
        console.error('Geçersiz arıza verisi');
        arizalar = [];
    }
    
    if (arizalar.length === 0) {
        arizaListesi.innerHTML = `
            <div class="empty-state">
                <h3>Henüz arıza kaydı yok</h3>
                <p>Yeni kayıt eklemek için + butonuna tıklayın</p>
            </div>
        `;
        return;
    }
    
    try {
        arizaListesi.innerHTML = arizalar.map(ariza => {
            // Null kontrolü
            if (!ariza || !ariza.id) {
                console.warn('Geçersiz arıza:', ariza);
                return '';
            }
            
            return `
                <div class="ariza-item">
                    <div class="ariza-header">
                        <span class="ariza-id">#${sanitizeHTML(ariza.id.substring(0, 8))}</span>
                        <span class="durum-badge durum-${ariza.durum || 'beklemede'}">${durumMetni(ariza.durum || 'beklemede')}</span>
                    </div>
                    <div class="ariza-info">
                        <div class="info-item"><strong>Müdürlük:</strong> ${sanitizeHTML(ariza.birim || 'Belirtilmemiş')}</div>
                        <div class="info-item"><strong>Talep Eden:</strong> ${sanitizeHTML(ariza.talepEden || 'Belirtilmemiş')}</div>
                        <div class="info-item"><strong>Cihaz:</strong> ${sanitizeHTML(ariza.cihazTuru || 'Belirtilmemiş')}</div>
                        <div class="info-item"><strong>Arıza Türü:</strong> ${sanitizeHTML(ariza.arizaTuru || 'Belirtilmemiş')}</div>
                        <div class="info-item"><strong>Tarih:</strong> ${sanitizeHTML(ariza.tarih || safeDateFormat(ariza.timestamp))}</div>
                    </div>
                    ${ariza.aciklama ? `<div class="ariza-aciklama"><strong>Arıza:</strong> ${sanitizeHTML(ariza.aciklama)}</div>` : ''}
                    ${ariza.yapilanIsler ? `<div class="ariza-aciklama"><strong>Yapılan İşler:</strong> ${sanitizeHTML(ariza.yapilanIsler)}</div>` : ''}
                    ${ariza.atananKisi ? `<div class="ariza-aciklama"><strong>Atanan:</strong> ${sanitizeHTML(ariza.atananKisi)}</div>` : ''}
                    <div class="ariza-actions">
                        ${ariza.durum === 'beklemede' ? 
                            `<button class="btn-small btn-devam" onclick="durumDegistir('${ariza.id}', 'devam-ediyor')">Devam Ediyor</button>` 
                            : ''}
                        ${ariza.durum !== 'tamamlandi' ? 
                            `<button class="btn-small btn-tamamla" onclick="durumDegistir('${ariza.id}', 'tamamlandi')">Tamamla</button>` 
                            : ''}
                        <button class="btn-small btn-duzenle" onclick="duzenle('${ariza.id}')">Düzenle</button>
                        <button class="btn-small btn-sil" onclick="silArizaKaydi('${ariza.id}')">Sil</button>
                    </div>
                </div>
            `;
        }).filter(html => html).join('');
    } catch (error) {
        console.error('Arıza gösterme hatası:', error);
        arizaListesi.innerHTML = `
            <div class="empty-state">
                <h3>Veriler yüklenirken hata oluştu</h3>
                <p>Lütfen sayfayı yenileyin</p>
            </div>
        `;
    }
}

// Durum metni
function durumMetni(durum) {
    const durumlar = {
        'beklemede': 'Beklemede',
        'devam-ediyor': 'Devam Ediyor',
        'tamamlandi': 'Tamamlandı'
    };
    return durumlar[durum] || durum;
}

// Durum değiştir
async function durumDegistir(id, yeniDurum) {
    try {
        await db.updateAriza(id, { durum: yeniDurum });
        const durumMetinleri = {
            'beklemede': 'Beklemede',
            'devam-ediyor': 'Devam Ediyor',
            'tamamlandi': 'Tamamlandı'
        };
        showToast(`Durum "${durumMetinleri[yeniDurum]}" olarak güncellendi`, 'success');
    } catch (error) {
        console.error('Hata:', error);
        showToast('Durum güncellenirken bir hata oluştu!', 'error');
    }
}

// Düzenle
async function duzenle(id) {
    try {
        const { data, error } = await supabase
            .from('arizalar')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        
        const ariza = data;
        if (ariza) {
            editingId = id;
            document.getElementById('birim').value = ariza.birim || '';
            document.getElementById('cihaz-turu').value = ariza.cihaz_turu || '';
            document.getElementById('ariza-turu').value = ariza.ariza_turu || '';
            document.getElementById('aciklama').value = ariza.aciklama || '';
            document.getElementById('yapilan-isler').value = ariza.yapilan_isler || '';
            document.getElementById('talep-eden').value = ariza.talep_eden || '';
            if (document.getElementById('atanan-kisi')) {
                document.getElementById('atanan-kisi').value = ariza.atanan_kisi || '';
            }
            
            // Hata mesajlarını temizle
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            
            document.querySelector('.modal-header h3').textContent = 'Arıza Kaydını Düzenle';
            modal.classList.add('active');
        }
    } catch (error) {
        console.error('Düzenleme hatası:', error);
        showToast('Kayıt yüklenirken hata oluştu', 'error');
    }
}

// Sil - Global fonksiyon
let deleteCallback = null;

window.silArizaKaydi = function(id) {
    console.log('Silme işlemi başlatıldı, ID:', id);
    const confirmModal = document.getElementById('confirm-modal');
    confirmModal.classList.add('active');
    
    deleteCallback = async () => {
        console.log('Silme onaylandı, siliniyor...');
        try {
            await db.deleteAriza(id);
            console.log('Kayıt başarıyla silindi');
            showToast('Kayıt başarıyla silindi', 'success');
        } catch (error) {
            console.error('Silme hatası:', error);
            showToast('Kayıt silinirken bir hata oluştu!', 'error');
        }
    };
}

// Confirmation modal kontrolleri
document.getElementById('confirm-yes').addEventListener('click', () => {
    console.log('Evet butonuna tıklandı');
    document.getElementById('confirm-modal').classList.remove('active');
    if (deleteCallback) {
        deleteCallback();
        deleteCallback = null;
    } else {
        console.log('deleteCallback bulunamadı!');
    }
});

document.getElementById('confirm-no').addEventListener('click', () => {
    console.log('İptal butonuna tıklandı');
    document.getElementById('confirm-modal').classList.remove('active');
    deleteCallback = null;
});

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.success}</span>
        <span class="toast-message">${message}</span>
    `;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}


// Arızaları yükle
async function loadArizalar() {
    const arizaListesi = document.getElementById('ariza-listesi');
    if (!arizaListesi) return;
    
    try {
        // Skeleton loader göster
        arizaListesi.innerHTML = `
            <div class="skeleton-loader">
                ${Array(3).fill(0).map(() => `
                    <div class="skeleton-card">
                        <div class="skeleton-header">
                            <div class="skeleton-line skeleton-id"></div>
                            <div class="skeleton-line skeleton-badge"></div>
                        </div>
                        <div class="skeleton-body">
                            <div class="skeleton-line"></div>
                            <div class="skeleton-line"></div>
                            <div class="skeleton-line skeleton-short"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        const { data: arizalar, error } = await supabase
            .from('arizalar')
            .select('*')
            .order('timestamp', { ascending: false });
        
        if (error) throw error;
        
        // Minimum 500ms bekle (smooth görünsün)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!arizalar || arizalar.length === 0) {
            arizaListesi.innerHTML = `
                <div class="empty-state fade-in">
                    <h3>📋 Henüz arıza kaydı yok</h3>
                    <p>Yeni bir arıza kaydı eklemek için + butonuna tıklayın</p>
                </div>
            `;
            updateStats(arizalar);
            return;
        }
        
        displayArizalar(arizalar);
        updateStats(arizalar);
    } catch (error) {
        console.error('Arıza yükleme hatası:', error);
        arizaListesi.innerHTML = `
            <div class="empty-state fade-in">
                <h3>❌ Veriler yüklenirken hata oluştu</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Arızaları göster
function displayArizalar(arizalar) {
    const arizaListesi = document.getElementById('ariza-listesi');
    if (!arizaListesi) return;
    
    arizaListesi.innerHTML = arizalar.map((ariza, index) => `
        <div class="ariza-item fade-in" style="animation-delay: ${index * 0.05}s">
            <div class="ariza-header">
                <span class="ariza-id">#${ariza.id.substring(0, 8)}</span>
                <span class="durum-badge durum-${ariza.durum}">${getDurumText(ariza.durum)}</span>
            </div>
            <div class="ariza-info">
                <div class="info-item"><strong>Müdürlük:</strong> ${ariza.birim}</div>
                <div class="info-item"><strong>Cihaz:</strong> ${ariza.cihaz_turu}</div>
                <div class="info-item"><strong>Arıza:</strong> ${ariza.ariza_turu}</div>
                <div class="info-item"><strong>Talep Eden:</strong> ${ariza.talep_eden}</div>
                <div class="info-item"><strong>Tarih:</strong> ${ariza.tarih}</div>
                ${ariza.atanan_kisi ? `<div class="info-item"><strong>Atanan:</strong> ${ariza.atanan_kisi}</div>` : ''}
            </div>
            ${ariza.aciklama ? `<div class="ariza-aciklama"><strong>Açıklama:</strong> ${ariza.aciklama}</div>` : ''}
            <div class="ariza-aciklama"><strong>Yapılan İşler:</strong> ${ariza.yapilan_isler}</div>
            <div class="ariza-actions">
                ${ariza.durum === 'beklemede' ? `<button class="btn-small btn-devam" onclick="window.updateDurum('${ariza.id}', 'devam-ediyor')">Devam Ediyor</button>` : ''}
                ${ariza.durum === 'devam-ediyor' ? `<button class="btn-small btn-tamamla" onclick="window.updateDurum('${ariza.id}', 'tamamlandi')">Tamamla</button>` : ''}
                <button class="btn-small btn-duzenle" onclick="window.editAriza('${ariza.id}')">Düzenle</button>
                <button class="btn-small btn-sil" onclick="window.deleteAriza('${ariza.id}')">Sil</button>
            </div>
        </div>
    `).join('');
}

// İstatistikleri güncelle
function updateStats(arizalar) {
    const toplam = arizalar.length;
    const beklemede = arizalar.filter(a => a.durum === 'beklemede').length;
    const devam = arizalar.filter(a => a.durum === 'devam-ediyor').length;
    const tamamlandi = arizalar.filter(a => a.durum === 'tamamlandi').length;
    
    // Animasyonlu sayı güncelleme
    animateValue('stat-toplam', 0, toplam, 500);
    animateValue('stat-beklemede', 0, beklemede, 500);
    animateValue('stat-devam', 0, devam, 500);
    animateValue('stat-tamamlandi', 0, tamamlandi, 500);
}

// Sayı animasyonu
function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

// Durum metni
function getDurumText(durum) {
    const durumlar = {
        'beklemede': 'Beklemede',
        'devam-ediyor': 'Devam Ediyor',
        'tamamlandi': 'Tamamlandı'
    };
    return durumlar[durum] || durum;
}

// Durum güncelle
async function updateDurum(id, yeniDurum) {
    try {
        const { error } = await supabase
            .from('arizalar')
            .update({ durum: yeniDurum })
            .eq('id', id);
        
        if (error) throw error;
        
        showToast('Durum güncellendi', 'success');
        loadArizalar();
    } catch (error) {
        console.error('Durum güncelleme hatası:', error);
        showToast('Durum güncellenirken hata oluştu', 'error');
    }
}

// Arıza sil
async function deleteAriza(id) {
    if (!confirm('Bu arıza kaydını silmek istediğinizden emin misiniz?')) return;
    
    try {
        const { error } = await supabase
            .from('arizalar')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        
        showToast('Arıza kaydı silindi', 'success');
        loadArizalar();
    } catch (error) {
        console.error('Arıza silme hatası:', error);
        showToast('Arıza silinirken hata oluştu', 'error');
    }
}

// Arıza düzenle
async function editAriza(id) {
    try {
        // Arızayı getir
        const { data: ariza, error } = await supabase
            .from('arizalar')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        
        // Modal'ı aç ve formu doldur
        const modal = document.getElementById('modal');
        const modalTitle = modal.querySelector('.modal-header h3');
        
        modalTitle.textContent = 'Arıza Kaydını Düzenle';
        
        // Form alanlarını doldur
        document.getElementById('birim').value = ariza.birim;
        document.getElementById('cihaz-turu').value = ariza.cihaz_turu;
        document.getElementById('ariza-turu').value = ariza.ariza_turu;
        document.getElementById('talep-eden').value = ariza.talep_eden;
        document.getElementById('aciklama').value = ariza.aciklama || '';
        document.getElementById('yapilan-isler').value = ariza.yapilan_isler;
        document.getElementById('atanan-kisi').value = ariza.atanan_kisi || '';
        
        // Form'a edit mode flag ekle
        const form = document.getElementById('ariza-form');
        form.dataset.editId = id;
        form.dataset.editMode = 'true';
        
        modal.classList.add('active');
    } catch (error) {
        console.error('Arıza düzenleme hatası:', error);
        showToast('Arıza yüklenirken hata oluştu', 'error');
    }
}

// Global fonksiyonlar
window.loadArizalar = loadArizalar;
window.updateDurum = updateDurum;
window.deleteAriza = deleteAriza;
window.editAriza = editAriza;


// Form submit handler
document.addEventListener('DOMContentLoaded', () => {
    const arizaForm = document.getElementById('ariza-form');
    const modal = document.getElementById('modal');
    const fabBtn = document.getElementById('fab-btn');
    const closeBtn = document.getElementById('close-btn');
    
    // FAB button - yeni arıza ekle
    if (fabBtn) {
        fabBtn.addEventListener('click', () => {
            const modalTitle = modal.querySelector('.modal-header h3');
            modalTitle.textContent = 'Yeni Arıza Kaydı';
            
            // Form'u temizle
            arizaForm.reset();
            delete arizaForm.dataset.editId;
            delete arizaForm.dataset.editMode;
            
            modal.classList.add('active');
        });
    }
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            arizaForm.reset();
            delete arizaForm.dataset.editId;
            delete arizaForm.dataset.editMode;
        });
    }
    
    // Form submit
    if (arizaForm) {
        arizaForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                birim: document.getElementById('birim').value.trim(),
                cihaz_turu: document.getElementById('cihaz-turu').value,
                ariza_turu: document.getElementById('ariza-turu').value,
                talep_eden: document.getElementById('talep-eden').value.trim(),
                aciklama: document.getElementById('aciklama').value.trim(),
                yapilan_isler: document.getElementById('yapilan-isler').value.trim(),
                atanan_kisi: document.getElementById('atanan-kisi').value.trim(),
                tarih: new Date().toLocaleDateString('tr-TR'),
                timestamp: Date.now()
            };
            
            // Düzenleme mi yoksa yeni kayıt mı?
            const editMode = arizaForm.dataset.editMode === 'true';
            const editId = arizaForm.dataset.editId;
            
            try {
                if (editMode && editId) {
                    // Güncelle
                    const { error } = await supabase
                        .from('arizalar')
                        .update(formData)
                        .eq('id', editId);
                    
                    if (error) throw error;
                    
                    showToast('Arıza kaydı güncellendi', 'success');
                } else {
                    // Yeni kayıt
                    formData.durum = 'beklemede';
                    
                    const { error } = await supabase
                        .from('arizalar')
                        .insert([formData]);
                    
                    if (error) throw error;
                    
                    showToast('Arıza kaydı eklendi', 'success');
                }
                
                // Modal'ı kapat ve listeyi yenile
                modal.classList.remove('active');
                arizaForm.reset();
                delete arizaForm.dataset.editId;
                delete arizaForm.dataset.editMode;
                loadArizalar();
            } catch (error) {
                console.error('Form submit hatası:', error);
                showToast('İşlem sırasında hata oluştu: ' + error.message, 'error');
            }
        });
    }
});


// Arama ve Filtreleme
let allArizalar = []; // Tüm arızaları sakla

// Arızaları yükle (güncellenmiş)
async function loadArizalarWithFilter() {
    const arizaListesi = document.getElementById('ariza-listesi');
    if (!arizaListesi) return;
    
    try {
        // Skeleton loader göster
        arizaListesi.innerHTML = `
            <div class="skeleton-loader">
                ${Array(3).fill(0).map(() => `
                    <div class="skeleton-card">
                        <div class="skeleton-header">
                            <div class="skeleton-line skeleton-id"></div>
                            <div class="skeleton-line skeleton-badge"></div>
                        </div>
                        <div class="skeleton-body">
                            <div class="skeleton-line"></div>
                            <div class="skeleton-line"></div>
                            <div class="skeleton-line skeleton-short"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        const { data: arizalar, error } = await supabase
            .from('arizalar')
            .select('*')
            .order('timestamp', { ascending: false });
        
        if (error) throw error;
        
        // Minimum 500ms bekle
        await new Promise(resolve => setTimeout(resolve, 500));
        
        allArizalar = arizalar || [];
        
        if (allArizalar.length === 0) {
            arizaListesi.innerHTML = `
                <div class="empty-state fade-in">
                    <h3>📋 Henüz arıza kaydı yok</h3>
                    <p>Yeni bir arıza kaydı eklemek için + butonuna tıklayın</p>
                </div>
            `;
            updateStats(allArizalar);
            return;
        }
        
        applyFilters();
    } catch (error) {
        console.error('Arıza yükleme hatası:', error);
        arizaListesi.innerHTML = `
            <div class="empty-state fade-in">
                <h3>❌ Veriler yüklenirken hata oluştu</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Filtreleri uygula
function applyFilters() {
    const aramaInput = document.getElementById('arama-input');
    const durumFiltre = document.getElementById('durum-filtre');
    const tarihFiltre = document.getElementById('tarih-filtre');
    
    let filteredData = [...allArizalar];
    
    // Arama filtresi
    if (aramaInput && aramaInput.value.trim()) {
        const searchTerm = aramaInput.value.toLowerCase().trim();
        filteredData = filteredData.filter(ariza => 
            ariza.birim.toLowerCase().includes(searchTerm) ||
            ariza.talep_eden.toLowerCase().includes(searchTerm) ||
            ariza.cihaz_turu.toLowerCase().includes(searchTerm) ||
            ariza.ariza_turu.toLowerCase().includes(searchTerm) ||
            (ariza.aciklama && ariza.aciklama.toLowerCase().includes(searchTerm)) ||
            (ariza.yapilan_isler && ariza.yapilan_isler.toLowerCase().includes(searchTerm))
        );
    }
    
    // Durum filtresi
    if (durumFiltre && durumFiltre.value !== 'tumu') {
        filteredData = filteredData.filter(ariza => ariza.durum === durumFiltre.value);
    }
    
    // Tarih filtresi
    if (tarihFiltre && tarihFiltre.value !== 'tumu') {
        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;
        
        filteredData = filteredData.filter(ariza => {
            const arizaTime = ariza.timestamp;
            
            switch (tarihFiltre.value) {
                case 'bugun':
                    return now - arizaTime < oneDayMs;
                case 'bu-hafta':
                    return now - arizaTime < 7 * oneDayMs;
                case 'bu-ay':
                    return now - arizaTime < 30 * oneDayMs;
                default:
                    return true;
            }
        });
    }
    
    // Sonuçları göster
    if (filteredData.length === 0) {
        document.getElementById('ariza-listesi').innerHTML = `
            <div class="empty-state fade-in">
                <h3>🔍 Sonuç bulunamadı</h3>
                <p>Arama kriterlerinize uygun arıza kaydı bulunamadı</p>
            </div>
        `;
    } else {
        displayArizalar(filteredData);
    }
    
    updateStats(filteredData);
}

// Event listener'ları ekle
document.addEventListener('DOMContentLoaded', () => {
    const aramaInput = document.getElementById('arama-input');
    const durumFiltre = document.getElementById('durum-filtre');
    const tarihFiltre = document.getElementById('tarih-filtre');
    
    if (aramaInput) {
        aramaInput.addEventListener('input', applyFilters);
    }
    
    if (durumFiltre) {
        durumFiltre.addEventListener('change', applyFilters);
    }
    
    if (tarihFiltre) {
        tarihFiltre.addEventListener('change', applyFilters);
    }
});

// loadArizalar'ı güncelle
window.loadArizalar = loadArizalarWithFilter;


// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const adminDarkModeToggle = document.getElementById('admin-dark-mode-toggle');
    
    // Sayfa yüklendiğinde dark mode durumunu kontrol et
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.textContent = '☀️';
        if (adminDarkModeToggle) adminDarkModeToggle.textContent = '☀️';
    }
    
    // Dark mode toggle fonksiyonu
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        // İkon değiştir
        const icon = isDark ? '☀️' : '🌙';
        if (darkModeToggle) darkModeToggle.textContent = icon;
        if (adminDarkModeToggle) adminDarkModeToggle.textContent = icon;
    }
    
    // Event listener'lar
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    if (adminDarkModeToggle) {
        adminDarkModeToggle.addEventListener('click', toggleDarkMode);
    }
});
