// Müdürlükler listesi - Supabase'den yüklenecek
let mudurlukler = [];

// Çalışanlar listesi - Supabase'den yüklenecek
let calisanlar = [];

// Çift submit önleme flag'i
let isSubmitting = false;

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
    
    // Caps Lock uyarısı
    const capsLockWarning = document.getElementById('caps-lock-warning');
    
    if (passwordInput && capsLockWarning) {
        let isPasswordFocused = false;
        
        // Caps Lock kontrolü
        function checkCapsLock(event) {
            if (isPasswordFocused && event.getModifierState && event.getModifierState('CapsLock')) {
                capsLockWarning.style.display = 'flex';
            } else {
                capsLockWarning.style.display = 'none';
            }
        }
        
        // Şifre input'una focus olduğunda
        passwordInput.addEventListener('focus', (event) => {
            isPasswordFocused = true;
            checkCapsLock(event);
        });
        
        // Şifre input'undan çıkıldığında
        passwordInput.addEventListener('blur', () => {
            isPasswordFocused = false;
            capsLockWarning.style.display = 'none';
        });
        
        // Tuşa basıldığında kontrol et
        passwordInput.addEventListener('keydown', checkCapsLock);
        passwordInput.addEventListener('keyup', checkCapsLock);
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
    if (typeof supabase === 'undefined') {
        console.warn('Supabase henüz yüklenmedi, bekleniyor...');
        let retryCount = 0;
        const maxRetries = 5;
        
        const checkSupabase = setInterval(() => {
            retryCount++;
            if (typeof supabase !== 'undefined') {
                console.log('Supabase yüklendi, veriler çekiliyor...');
                clearInterval(checkSupabase);
                loadArizalar();
            } else if (retryCount >= maxRetries) {
                console.error('Supabase yüklenemedi');
                clearInterval(checkSupabase);
                showToast('Veritabanı bağlantısı kurulamadı. Lütfen sayfayı yenileyin.', 'error');
            }
        }, 1000);
    } else {
        loadArizalar();
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

// Müdürlük autocomplete - Input event
birimInput.addEventListener('input', function() {
    showBirimSuggestions(this.value);
});

// Müdürlük autocomplete - Focus event (tıklayınca direkt göster)
birimInput.addEventListener('focus', function() {
    showBirimSuggestions(this.value);
});

function showBirimSuggestions(value) {
    value = value.toLowerCase();
    currentFocus = -1;
    
    // Kırmızılığı kaldır
    if (value) {
        birimInput.classList.remove('error');
        document.getElementById('birim-error').textContent = '';
    }
    
    // Boş ise tüm listeyi göster
    const filtered = value ? 
        mudurlukler.filter(m => m.toLowerCase().includes(value)) :
        mudurlukler;
    
    if (filtered.length > 0) {
        // İlk 20 sonucu göster (performans için)
        birimSuggestions.innerHTML = filtered.slice(0, 20).map(m => 
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
}

// Talep eden autocomplete - Input event
talepInput.addEventListener('input', function() {
    showTalepSuggestions(this.value);
});

// Talep eden autocomplete - Focus event (tıklayınca direkt göster)
talepInput.addEventListener('focus', function() {
    showTalepSuggestions(this.value);
});

function showTalepSuggestions(value) {
    value = value.toLowerCase();
    currentFocus = -1;
    
    // Kırmızılığı kaldır
    if (value) {
        talepInput.classList.remove('error');
        document.getElementById('talep-error').textContent = '';
    }
    
    // Boş ise tüm listeyi göster
    const filtered = value ?
        calisanlar.filter(c => c.toLowerCase().includes(value)) :
        calisanlar;
    
    if (filtered.length > 0) {
        // İlk 20 sonucu göster (performans için)
        talepSuggestions.innerHTML = filtered.slice(0, 20).map(c => 
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
}

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

// Eski form submit handler kaldırıldı - yeni handler aşağıda (1184. satır civarında)

// Eski arizalariYukle fonksiyonu kaldırıldı - loadArizalar kullanılıyor

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

// Eski silme kodu kaldırıldı - yeni deleteAriza fonksiyonu kullanılıyor

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
        
        // Global değişkeni güncelle
        allArizalar = arizalar || [];
        window.allArizalar = allArizalar; // features.js için
        
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
        
        // Filtreleri uygula (eğer arama/filtre varsa)
        if (typeof applyFilters === 'function') {
            applyFilters();
        } else {
            // Filtre fonksiyonu yoksa direkt göster
            displayArizalar(allArizalar);
            updateStats(allArizalar);
        }
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
    
    // Animasyonlu sayı güncelleme (twixtor efekti - ease-out)
    animateValue('stat-toplam', 0, toplam, 800);
    animateValue('stat-beklemede', 0, beklemede, 800);
    animateValue('stat-devam', 0, devam, 800);
    animateValue('stat-tamamlandi', 0, tamamlandi, 800);
}

// Sayı animasyonu (twixtor efekti - ease-out)
function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const startTime = performance.now();
    
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out cubic easing
        const easedProgress = easeOutCubic(progress);
        const current = start + (end - start) * easedProgress;
        
        element.textContent = Math.round(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(update);
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
    console.log('deleteAriza çağrıldı, ID:', id);
    
    // Özel confirm modal'ı göster
    const confirmModal = document.getElementById('confirm-modal');
    const confirmDelete = document.getElementById('confirm-delete');
    const confirmCancel = document.getElementById('confirm-cancel');
    
    console.log('Modal elementleri:', {
        confirmModal: !!confirmModal,
        confirmDelete: !!confirmDelete,
        confirmCancel: !!confirmCancel
    });
    
    if (!confirmModal || !confirmDelete || !confirmCancel) {
        console.error('Confirm modal elementleri bulunamadı');
        alert('Modal elementleri bulunamadı! Sayfayı yenileyin.');
        return;
    }
    
    console.log('Modal açılıyor...');
    confirmModal.classList.add('active');
    
    // Promise ile onay bekle
    const confirmed = await new Promise((resolve) => {
        const handleDelete = () => {
            console.log('Sil butonuna tıklandı');
            cleanup();
            resolve(true);
        };
        
        const handleCancel = () => {
            console.log('İptal butonuna tıklandı');
            cleanup();
            resolve(false);
        };
        
        const handleClickOutside = (e) => {
            if (e.target === confirmModal) {
                console.log('Modal dışına tıklandı');
                cleanup();
                resolve(false);
            }
        };
        
        const cleanup = () => {
            console.log('Event listenerlar temizleniyor');
            confirmDelete.removeEventListener('click', handleDelete);
            confirmCancel.removeEventListener('click', handleCancel);
            confirmModal.removeEventListener('click', handleClickOutside);
            confirmModal.classList.remove('active');
        };
        
        confirmDelete.addEventListener('click', handleDelete);
        confirmCancel.addEventListener('click', handleCancel);
        confirmModal.addEventListener('click', handleClickOutside);
        
        console.log('Event listenerlar eklendi, onay bekleniyor...');
    });
    
    console.log('Onay sonucu:', confirmed);
    
    if (!confirmed) {
        console.log('Silme iptal edildi');
        return;
    }
    
    console.log('Silme işlemi başlıyor...');
    
    try {
        const { error } = await supabase
            .from('arizalar')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        
        console.log('Silme başarılı');
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
window.getDurumText = getDurumText;


// Form submit handler
document.addEventListener('DOMContentLoaded', () => {
    const arizaForm = document.getElementById('ariza-form');
    const modal = document.getElementById('modal');
    const fabBtn = document.getElementById('fab-btn');
    const closeBtn = document.getElementById('close-btn');
    
    console.log('DOMContentLoaded - Form elementi:', !!arizaForm);
    
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
        console.log('Form submit event listener ekleniyor...');
        arizaForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            console.log('Form submit başladı, isSubmitting:', isSubmitting);
            
            // Çift submit önleme
            if (isSubmitting) {
                console.log('Zaten submit ediliyor, iptal ediliyor');
                return;
            }
            
            // Form verilerini al
            const birimValue = document.getElementById('birim').value.trim();
            const cihazValue = document.getElementById('cihaz-turu').value;
            const arizaTuruValue = document.getElementById('ariza-turu').value;
            const talepValue = document.getElementById('talep-eden').value.trim();
            const aciklamaValue = document.getElementById('aciklama').value.trim();
            const yapilanValue = document.getElementById('yapilan-isler').value.trim();
            const atananValue = document.getElementById('atanan-kisi').value.trim();
            
            // Validasyon
            let isValid = true;
            
            // Müdürlük kontrolü
            const birimError = document.getElementById('birim-error');
            const birimInput = document.getElementById('birim');
            
            if (!birimValue) {
                if (birimError) birimError.textContent = 'Lütfen müdürlük seçiniz';
                if (birimInput) birimInput.classList.add('error');
                isValid = false;
            } else if (!mudurlukler.includes(birimValue)) {
                if (birimError) birimError.textContent = 'Lütfen listeden bir müdürlük seçiniz';
                if (birimInput) birimInput.classList.add('error');
                isValid = false;
            } else if (hasInvalidChars(birimValue)) {
                if (birimError) birimError.textContent = 'Geçersiz karakterler içeriyor';
                if (birimInput) birimInput.classList.add('error');
                isValid = false;
            } else {
                if (birimError) birimError.textContent = '';
                if (birimInput) birimInput.classList.remove('error');
            }
            
            // Cihaz türü kontrolü
            const cihazError = document.getElementById('cihaz-error');
            const cihazInput = document.getElementById('cihaz-turu');
            
            if (!cihazValue) {
                if (cihazError) cihazError.textContent = 'Lütfen cihaz türü seçiniz';
                if (cihazInput) cihazInput.classList.add('error');
                isValid = false;
            } else {
                if (cihazError) cihazError.textContent = '';
                if (cihazInput) cihazInput.classList.remove('error');
            }
            
            // Arıza türü kontrolü
            const arizaTuruError = document.getElementById('ariza-turu-error');
            const arizaTuruInput = document.getElementById('ariza-turu');
            
            if (!arizaTuruValue) {
                if (arizaTuruError) arizaTuruError.textContent = 'Lütfen arıza türü seçiniz';
                if (arizaTuruInput) arizaTuruInput.classList.add('error');
                isValid = false;
            } else {
                if (arizaTuruError) arizaTuruError.textContent = '';
                if (arizaTuruInput) arizaTuruInput.classList.remove('error');
            }
            
            // Talep eden kontrolü
            const talepError = document.getElementById('talep-error');
            const talepInput = document.getElementById('talep-eden');
            
            if (!talepValue) {
                if (talepError) talepError.textContent = 'Lütfen talep eden bilgisini giriniz';
                if (talepInput) talepInput.classList.add('error');
                isValid = false;
            } else if (hasInvalidChars(talepValue)) {
                if (talepError) talepError.textContent = 'Geçersiz karakterler içeriyor';
                if (talepInput) talepInput.classList.add('error');
                isValid = false;
            } else {
                if (talepError) talepError.textContent = '';
                if (talepInput) talepInput.classList.remove('error');
            }
            
            // Yapılan işler kontrolü
            const yapilanError = document.getElementById('yapilan-error');
            const yapilanInput = document.getElementById('yapilan-isler');
            
            if (!yapilanValue) {
                if (yapilanError) yapilanError.textContent = 'Lütfen yapılan işleri giriniz';
                if (yapilanInput) yapilanInput.classList.add('error');
                isValid = false;
            } else if (hasInvalidChars(yapilanValue)) {
                if (yapilanError) yapilanError.textContent = 'Geçersiz karakterler içeriyor';
                if (yapilanInput) yapilanInput.classList.add('error');
                isValid = false;
            } else {
                if (yapilanError) yapilanError.textContent = '';
                if (yapilanInput) yapilanInput.classList.remove('error');
            }
            
            // Açıklama kontrolü (opsiyonel)
            if (aciklamaValue && hasInvalidChars(aciklamaValue)) {
                showToast('Açıklama geçersiz karakterler içeriyor', 'error');
                isValid = false;
            }
            
            if (!isValid) {
                showToast('Lütfen tüm zorunlu alanları doğru doldurunuz', 'error');
                return;
            }
            
            // Supabase kontrolü
            if (typeof supabase === 'undefined') {
                showToast('Veritabanı bağlantısı yok. Lütfen sayfayı yenileyin.', 'error');
                return;
            }
            
            isSubmitting = true;
            const submitBtn = arizaForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : 'Kaydet';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Kaydediliyor...';
            }
            
            const formData = {
                birim: sanitizeHTML(birimValue),
                cihaz_turu: sanitizeHTML(cihazValue),
                ariza_turu: sanitizeHTML(arizaTuruValue),
                talep_eden: sanitizeHTML(talepValue),
                aciklama: sanitizeHTML(aciklamaValue) || '',
                yapilan_isler: sanitizeHTML(yapilanValue),
                atanan_kisi: sanitizeHTML(atananValue) || '',
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
                
                console.log('İşlem başarılı, modal kapatılıyor');
                
                // Modal'ı kapat ve listeyi yenile
                if (modal) {
                    modal.classList.remove('active');
                    console.log('Modal kapatıldı');
                } else {
                    console.error('Modal elementi bulunamadı!');
                }
                
                arizaForm.reset();
                document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
                document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
                delete arizaForm.dataset.editId;
                delete arizaForm.dataset.editMode;
                loadArizalar();
            } catch (error) {
                console.error('Form submit hatası:', error);
                showToast('İşlem sırasında hata oluştu: ' + error.message, 'error');
            } finally {
                isSubmitting = false;
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }
        });
    }
});


// Arama ve Filtreleme
let allArizalar = []; // Tüm arızaları sakla
window.allArizalar = allArizalar; // features.js için global yap

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
    
    // İstatistikler filtrelenmiş verilerden gösterilsin
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
