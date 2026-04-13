// Login/Logout Handler - Supabase Auth Integration
// Bu dosya app.js'deki login kodunu override eder

document.addEventListener('DOMContentLoaded', () => {
    // authManager'ın yüklenmesini bekle
    const waitForAuth = setInterval(() => {
        if (typeof authManager !== 'undefined') {
            clearInterval(waitForAuth);
            initializeLoginHandlers();
            initializeCapsLockDetection();
            initializePasswordToggle();
            initializeMascotAnimation();
        }
    }, 50);
});

function initializeMascotAnimation() {
    const passwordInput = document.getElementById('password');
    const usernameInput = document.getElementById('username');
    const mascot = document.getElementById('mascot');
    const leftEyeNormal = document.getElementById('left-eye-normal');
    const rightEyeNormal = document.getElementById('right-eye-normal');
    const leftEyeClosed = document.getElementById('left-eye-closed');
    const rightEyeClosed = document.getElementById('right-eye-closed');
    
    if (!passwordInput || !mascot) return;
    
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
    
    // Kullanıcı adı input'una focus olunca - gözleri aç
    if (usernameInput) {
        usernameInput.addEventListener('focus', () => {
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
            }, 300));
        });
    }
    
    // Şifre input'una focus olunca - gözleri kapat
    passwordInput.addEventListener('focus', () => {
        clearEyeTimeouts();
        
        // Elleri gözlere götür
        mascot.classList.add('covering');
        
        // Gözleri kapat
        eyeTimeouts.push(setTimeout(() => {
            if (leftEyeNormal && rightEyeNormal) {
                leftEyeNormal.style.opacity = '0';
                rightEyeNormal.style.opacity = '0';
            }
        }, 300));
        
        eyeTimeouts.push(setTimeout(() => {
            if (leftEyeNormal && rightEyeNormal && leftEyeClosed && rightEyeClosed) {
                leftEyeNormal.style.display = 'none';
                rightEyeNormal.style.display = 'none';
                leftEyeClosed.style.display = 'block';
                rightEyeClosed.style.display = 'block';
            }
        }, 400));
    });
    
    // Şifre input'undan blur olunca - gözleri aç
    passwordInput.addEventListener('blur', () => {
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
        }, 300));
    });
}

function initializePasswordToggle() {
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    const mascot = document.getElementById('mascot');
    const leftEyeNormal = document.getElementById('left-eye-normal');
    const rightEyeNormal = document.getElementById('right-eye-normal');
    const leftEyeClosed = document.getElementById('left-eye-closed');
    const rightEyeClosed = document.getElementById('right-eye-closed');
    
    if (!togglePassword || !passwordInput) return;
    
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Panda animasyonu
        if (type === 'text') {
            // Şifre gösteriliyor - gözleri aç
            if (mascot) mascot.classList.remove('covering');
            if (leftEyeClosed && rightEyeClosed && leftEyeNormal && rightEyeNormal) {
                leftEyeClosed.style.display = 'none';
                rightEyeClosed.style.display = 'none';
                leftEyeNormal.style.display = 'block';
                rightEyeNormal.style.display = 'block';
                leftEyeNormal.style.opacity = '1';
                rightEyeNormal.style.opacity = '1';
            }
        } else {
            // Şifre gizleniyor - gözleri kapat
            if (mascot) mascot.classList.add('covering');
            setTimeout(() => {
                if (leftEyeNormal && rightEyeNormal) {
                    leftEyeNormal.style.opacity = '0';
                    rightEyeNormal.style.opacity = '0';
                }
            }, 300);
            setTimeout(() => {
                if (leftEyeNormal && rightEyeNormal && leftEyeClosed && rightEyeClosed) {
                    leftEyeNormal.style.display = 'none';
                    rightEyeNormal.style.display = 'none';
                    leftEyeClosed.style.display = 'block';
                    rightEyeClosed.style.display = 'block';
                }
            }, 400);
        }
        
        // İkon değiştir
        const svg = togglePassword.querySelector('svg');
        if (type === 'text') {
            // Göz kapalı ikonu
            svg.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            `;
        } else {
            // Göz açık ikonu
            svg.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
        }
    });
}

function initializeCapsLockDetection() {
    const passwordInput = document.getElementById('password');
    const capsLockWarning = document.getElementById('caps-lock-warning');
    
    if (!passwordInput || !capsLockWarning) return;
    
    let isPasswordFocused = false;
    
    // Caps Lock kontrolü
    function checkCapsLock(event) {
        // Sadece şifre input'una odaklanıldığında göster
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
    
    // Şifre input'undan blur olduğunda
    passwordInput.addEventListener('blur', () => {
        isPasswordFocused = false;
        capsLockWarning.style.display = 'none';
    });
    
    // Şifre input'unda tuş basıldığında kontrol et
    passwordInput.addEventListener('keydown', checkCapsLock);
    passwordInput.addEventListener('keyup', checkCapsLock);
}

function initializeLoginHandlers() {
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (loginForm) {
        // Eski event listener'ı kaldır ve yenisini ekle
        const newLoginForm = loginForm.cloneNode(true);
        loginForm.parentNode.replaceChild(newLoginForm, loginForm);
        
        newLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Input validasyonu
            if (!username || !password) {
                showToast('Kullanıcı adı ve şifre gerekli', 'error');
                return;
            }
            
            try {
                // Supabase Auth ile giriş (kullanıcı adı otomatik email formatına çevrilecek)
                const result = await authManager.login(username, password, rememberMe);
                
                if (result.success) {
                    showToast(authManager.isAdminUser() ? 'Admin olarak giriş yapıldı' : 'Giriş başarılı', 'success');
                    
                    // Ana ekrana geç
                    authManager.showMainApp();
                    
                    // Verileri yükle
                    setTimeout(() => {
                        if (typeof window.loadArizalar === 'function') {
                            window.loadArizalar();
                        }
                    }, 200);
                }
            } catch (error) {
                showToast(error.message, 'error');
                
                // Input'ları temizle
                document.getElementById('password').value = '';
                document.getElementById('password').focus();
                
                // Güvenlik için biraz beklet
                const submitBtn = newLoginForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    setTimeout(() => {
                        submitBtn.disabled = false;
                    }, 2000);
                }
            }
        });
    }
    
    if (logoutBtn) {
        // Eski event listener'ı kaldır ve yenisini ekle
        const newLogoutBtn = logoutBtn.cloneNode(true);
        logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
        
        newLogoutBtn.addEventListener('click', async () => {
            try {
                await authManager.logout();
                showToast('Çıkış yapıldı', 'success');
                document.getElementById('login-form').reset();
            } catch (error) {
                showToast('Çıkış yapılırken hata oluştu', 'error');
            }
        });
    }
}
