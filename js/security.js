// Güvenlik ve Koruma Sistemi

// Rate Limiting - DDoS Koruması
class RateLimiter {
    constructor(maxAttempts = 5, timeWindow = 60000) { // 5 deneme / 1 dakika
        this.maxAttempts = maxAttempts;
        this.timeWindow = timeWindow;
        this.attempts = new Map();
    }

    checkLimit(key) {
        const now = Date.now();
        const userAttempts = this.attempts.get(key) || [];
        
        // Eski denemeleri temizle
        const recentAttempts = userAttempts.filter(time => now - time < this.timeWindow);
        
        if (recentAttempts.length >= this.maxAttempts) {
            const oldestAttempt = recentAttempts[0];
            const waitTime = Math.ceil((this.timeWindow - (now - oldestAttempt)) / 1000);
            return {
                allowed: false,
                waitTime: waitTime
            };
        }
        
        recentAttempts.push(now);
        this.attempts.set(key, recentAttempts);
        
        return {
            allowed: true,
            remainingAttempts: this.maxAttempts - recentAttempts.length
        };
    }

    reset(key) {
        this.attempts.delete(key);
    }
}

// Login Rate Limiter
const loginLimiter = new RateLimiter(5, 300000); // 5 deneme / 5 dakika

// Failed Login Tracker - IP ve Zaman Kaydı
class FailedLoginTracker {
    constructor() {
        this.failedAttempts = [];
        this.blockedIPs = new Set();
        this.maxFailedAttempts = 3;
    }

    async logFailedAttempt(username, password) {
        try {
            // IP adresini al (client-side'da tam IP alamayız, fingerprint kullanacağız)
            const fingerprint = await this.generateFingerprint();
            const timestamp = Date.now();
            
            const attempt = {
                fingerprint: fingerprint,
                username: username,
                timestamp: timestamp,
                userAgent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform,
                screenResolution: `${screen.width}x${screen.height}`,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };

            this.failedAttempts.push(attempt);
            
            // Firebase'e kaydet
            if (typeof database !== 'undefined') {
                await database.ref('security/failedLogins').push(attempt);
            }

            // Son 10 dakikadaki başarısız denemeleri say
            const recentAttempts = this.failedAttempts.filter(a => 
                a.fingerprint === fingerprint && 
                timestamp - a.timestamp < 600000 // 10 dakika
            );

            if (recentAttempts.length >= this.maxFailedAttempts) {
                this.blockFingerprint(fingerprint);
                return {
                    blocked: true,
                    attempts: recentAttempts.length
                };
            }

            return {
                blocked: false,
                attempts: recentAttempts.length,
                remaining: this.maxFailedAttempts - recentAttempts.length
            };
        } catch (error) {
            console.error('Failed login tracking error:', error);
            return { blocked: false, attempts: 0 };
        }
    }

    async generateFingerprint() {
        // Browser fingerprint oluştur
        const components = [
            navigator.userAgent,
            navigator.language,
            screen.colorDepth,
            screen.width,
            screen.height,
            new Date().getTimezoneOffset(),
            navigator.hardwareConcurrency || 'unknown',
            navigator.deviceMemory || 'unknown'
        ];

        const fingerprint = components.join('|');
        
        // Simple hash function
        let hash = 0;
        for (let i = 0; i < fingerprint.length; i++) {
            const char = fingerprint.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        
        return 'fp_' + Math.abs(hash).toString(36);
    }

    blockFingerprint(fingerprint) {
        this.blockedIPs.add(fingerprint);
        
        // Firebase'e kaydet
        if (typeof database !== 'undefined') {
            database.ref('security/blockedFingerprints/' + fingerprint).set({
                blockedAt: Date.now(),
                reason: 'Multiple failed login attempts'
            });
        }
    }

    async isBlocked() {
        const fingerprint = await this.generateFingerprint();
        return this.blockedIPs.has(fingerprint);
    }

    clearOldAttempts() {
        const now = Date.now();
        const oneHourAgo = now - 3600000;
        this.failedAttempts = this.failedAttempts.filter(a => a.timestamp > oneHourAgo);
    }
}

const failedLoginTracker = new FailedLoginTracker();

// Her saat başı eski kayıtları temizle
setInterval(() => {
    failedLoginTracker.clearOldAttempts();
}, 3600000);

// XSS Koruması
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    
    return input.replace(/[&<>"'/]/g, (char) => map[char]);
}

// SQL Injection Koruması (Firebase için gerekli değil ama yine de kontrol)
function detectSQLInjection(input) {
    if (typeof input !== 'string') return false;
    
    const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
        /(UNION.*SELECT)/gi,
        /(OR\s+1\s*=\s*1)/gi,
        /(AND\s+1\s*=\s*1)/gi,
        /('|"|;|--|\*|\/\*|\*\/)/g
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
}

// Input Validation
function validateInput(input, type = 'text', maxLength = 500) {
    if (!input || typeof input !== 'string') {
        return { valid: false, error: 'Geçersiz giriş' };
    }

    // Uzunluk kontrolü
    if (input.length > maxLength) {
        return { valid: false, error: `Maksimum ${maxLength} karakter olmalı` };
    }

    // SQL Injection kontrolü
    if (detectSQLInjection(input)) {
        return { valid: false, error: 'Güvenlik nedeniyle reddedildi' };
    }

    // Tip bazlı validasyon
    switch (type) {
        case 'username':
            if (!/^[a-zA-Z0-9_]{3,50}$/.test(input)) {
                return { valid: false, error: 'Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir' };
            }
            break;
        case 'email':
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
                return { valid: false, error: 'Geçerli bir email adresi giriniz' };
            }
            break;
        case 'phone':
            if (!/^[0-9\s\-\+\(\)]{10,20}$/.test(input)) {
                return { valid: false, error: 'Geçerli bir telefon numarası giriniz' };
            }
            break;
    }

    return { valid: true, sanitized: sanitizeInput(input) };
}

// CSRF Token Generator
function generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Session Management
class SessionManager {
    constructor() {
        this.sessionTimeout = 60000; // 1 dakika
        this.lastActivity = Date.now();
        this.sessionToken = null;
        this.startActivityMonitor();
    }

    startActivityMonitor() {
        // Kullanıcı aktivitesini izle
        ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => {
                this.updateActivity();
            }, { passive: true });
        });

        // Her dakika session kontrolü yap
        setInterval(() => {
            this.checkSession();
        }, 60000);
    }

    updateActivity() {
        this.lastActivity = Date.now();
    }

    checkSession() {
        const now = Date.now();
        const inactiveTime = now - this.lastActivity;

        if (inactiveTime > this.sessionTimeout) {
            this.expireSession();
        }
    }

    expireSession() {
        console.log('Session expired due to inactivity');
        localStorage.removeItem('rememberedUser');
        localStorage.removeItem('isAdmin');
        
        if (window.location.pathname.includes('admin.html') || 
            document.getElementById('main-app')?.style.display !== 'none') {
            alert('Oturum süreniz doldu. Lütfen tekrar giriş yapın.');
            window.location.reload();
        }
    }

    createSession() {
        this.sessionToken = generateCSRFToken();
        this.lastActivity = Date.now();
        sessionStorage.setItem('sessionToken', this.sessionToken);
        return this.sessionToken;
    }

    validateSession() {
        const token = sessionStorage.getItem('sessionToken');
        return token === this.sessionToken;
    }
}

const sessionManager = new SessionManager();

// Content Security Policy Helper
function enforceCSP() {
    // Meta tag ile CSP ekle (eğer yoksa)
    if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.gstatic.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;";
        document.head.appendChild(meta);
    }
}

// Clickjacking Koruması
function preventClickjacking() {
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
}

// Console Warning
function showSecurityWarning() {
    console.log('%cDUR!', 'color: red; font-size: 72px; font-weight: bold;');
    console.log('%cBu bir tarayıcı özelliğidir ve geliştiriciler içindir.', 'font-size: 18px;');
    console.log('%cBirisi size buraya bir şey kopyalayıp yapıştırmanızı söylediyse, bu bir dolandırıcılıktır ve hesabınıza erişim sağlayabilir.', 'font-size: 16px; color: red;');
}

// Initialize Security
function initializeSecurity() {
    enforceCSP();
    preventClickjacking();
    showSecurityWarning();
    sessionManager.createSession();
}

// Sayfa yüklendiğinde güvenlik önlemlerini başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSecurity);
} else {
    initializeSecurity();
}

// Export functions
window.securityUtils = {
    loginLimiter,
    failedLoginTracker,
    sanitizeInput,
    validateInput,
    sessionManager,
    generateCSRFToken
};
