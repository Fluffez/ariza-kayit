// Login/Logout Handler - Supabase Auth Integration
// Bu dosya app.js'deki login kodunu override eder

document.addEventListener('DOMContentLoaded', () => {
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
                await authManager.login(username, password, rememberMe);
                showToast(authManager.isAdminUser() ? 'Admin olarak giriş yapıldı' : 'Giriş başarılı', 'success');
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
});
