// Kullanıcı Hataları ve Edge Case Düzeltmeleri

// 1. Firebase bağlantı hatası kontrolü
window.addEventListener('DOMContentLoaded', () => {
    // Firebase yükleme kontrolü
    setTimeout(() => {
        if (typeof database === 'undefined') {
            showToast('Firebase bağlantısı kurulamadı. Lütfen sayfayı yenileyin.', 'error');
            console.error('Firebase yüklenmedi!');
        }
    }, 3000);
});

// 2. İnternet bağlantısı kontrolü
window.addEventListener('online', () => {
    showToast('İnternet bağlantısı yeniden kuruldu', 'success');
});

window.addEventListener('offline', () => {
    showToast('İnternet bağlantısı kesildi! Veriler kaydedilmeyebilir.', 'error');
});

// 3. Boş veri kontrolü - arizalariGoster fonksiyonunu güçlendir
const originalArizalariGoster = window.arizalariGoster;
if (originalArizalariGoster) {
    window.arizalariGoster = function(arizalar) {
        if (!arizalar || !Array.isArray(arizalar)) {
            console.error('Geçersiz arıza verisi:', arizalar);
            arizalar = [];
        }
        return originalArizalariGoster(arizalar);
    };
}

// 4. XSS koruması - HTML injection önleme
function sanitizeHTML(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 5. Çok uzun metin girişi kontrolü
document.addEventListener('DOMContentLoaded', () => {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            const maxLength = 1000;
            if (this.value.length > maxLength) {
                this.value = this.value.substring(0, maxLength);
                showToast(`Maksimum ${maxLength} karakter girebilirsiniz`, 'warning');
            }
        });
    });
    
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const maxLength = 200;
            if (this.value.length > maxLength) {
                this.value = this.value.substring(0, maxLength);
                showToast(`Maksimum ${maxLength} karakter girebilirsiniz`, 'warning');
            }
        });
    });
});

// 6. Çift tıklama önleme (Double submit)
let isSubmitting = false;
const originalFormSubmit = document.getElementById('ariza-form')?.addEventListener;
if (originalFormSubmit) {
    const form = document.getElementById('ariza-form');
    form.addEventListener('submit', (e) => {
        if (isSubmitting) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, true);
}

// 7. Modal dışına tıklama - ESC tuşu desteği
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Tüm modalleri kapat
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        
        // Autocomplete'leri kapat
        document.querySelectorAll('.suggestions.active').forEach(sug => {
            sug.classList.remove('active');
        });
    }
});

// 8. Sayfa yenileme uyarısı (form doluyken)
let formDirty = false;
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ariza-form');
    if (form) {
        form.addEventListener('input', () => {
            formDirty = true;
        });
        
        form.addEventListener('submit', () => {
            formDirty = false;
        });
    }
});

window.addEventListener('beforeunload', (e) => {
    if (formDirty) {
        e.preventDefault();
        e.returnValue = 'Kaydedilmemiş değişiklikler var. Sayfadan çıkmak istediğinizden emin misiniz?';
        return e.returnValue;
    }
});

// 9. Tarih formatı hataları için fallback
function safeDateFormat(timestamp) {
    try {
        if (!timestamp) return 'Tarih yok';
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) return 'Geçersiz tarih';
        return date.toLocaleString('tr-TR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        console.error('Tarih formatı hatası:', error);
        return 'Tarih hatası';
    }
}

// 10. LocalStorage kotası aşımı kontrolü
function safeLocalStorageSet(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            showToast('Tarayıcı depolama alanı dolu. Lütfen önbelleği temizleyin.', 'error');
            console.error('LocalStorage dolu:', e);
        }
        return false;
    }
}

// 11. Boş ID ile işlem yapma hatası önleme
function safeGetElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element bulunamadı: ${id}`);
    }
    return element;
}

// 12. Duplicate kayıt önleme (aynı anda iki kez kaydet)
let lastSubmitTime = 0;
function canSubmit() {
    const now = Date.now();
    if (now - lastSubmitTime < 2000) { // 2 saniye içinde tekrar submit engelle
        showToast('Lütfen bekleyin...', 'warning');
        return false;
    }
    lastSubmitTime = now;
    return true;
}

// 13. Geçersiz karakter kontrolü
function hasInvalidChars(text) {
    // SQL injection ve XSS için tehlikeli karakterler
    const dangerousChars = /<script|javascript:|onerror=|onclick=/gi;
    return dangerousChars.test(text);
}

// 14. Boş string kontrolü (sadece boşluk)
function isEmptyOrWhitespace(str) {
    return !str || str.trim().length === 0;
}

// 15. Sayfa görünürlük değişimi - Firebase bağlantısını yenile
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && typeof database !== 'undefined') {
        console.log('Sayfa aktif, bağlantı kontrol ediliyor...');
        // Firebase bağlantısını test et
        database.ref('.info/connected').once('value', (snapshot) => {
            if (snapshot.val() === true) {
                console.log('Firebase bağlantısı aktif');
            } else {
                console.warn('Firebase bağlantısı yok');
                showToast('Bağlantı sorunu olabilir', 'warning');
            }
        });
    }
});

// 16. Console hataları için global error handler
window.addEventListener('error', (e) => {
    console.error('Global hata:', e.error);
    // Kullanıcıya gösterme, sadece log
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise hatası:', e.reason);
    // Kullanıcıya gösterme, sadece log
});

console.log('✅ Hata düzeltmeleri yüklendi');
