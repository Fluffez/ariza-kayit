// Admin Panel Authentication Check
// Sadece admin kullanıcıları admin paneline erişebilir

document.addEventListener('DOMContentLoaded', async () => {
    // Auth manager'ın yüklenmesini bekle
    let authCheckAttempts = 0;
    const maxAttempts = 200; // 10 saniye (50ms * 200)
    
    const waitForAuth = setInterval(() => {
        authCheckAttempts++;
        
        if (typeof authManager !== 'undefined') {
            clearInterval(waitForAuth);
            checkAdminAccess();
        } else if (authCheckAttempts >= maxAttempts) {
            // 10 saniye sonra hala yüklenmediyse, localStorage'dan kontrol et
            clearInterval(waitForAuth);
            console.warn('Auth manager not loaded, checking localStorage');
            
            const isAdmin = localStorage.getItem('isAdmin');
            if (isAdmin !== 'true') {
                console.error('Not admin user');
                window.location.href = 'index.html';
            } else {
                console.log('Admin access granted via localStorage');
                setupAdminLogout();
            }
        }
    }, 50);
});

function checkAdminAccess() {
    // Kullanıcı giriş yapmış mı kontrol et
    if (!authManager.isAuthenticated()) {
        console.error('User not authenticated');
        window.location.href = 'index.html';
        return;
    }

    // Admin yetkisi var mı kontrol et
    if (!authManager.isAdminUser()) {
        alert('Bu sayfaya erişim yetkiniz yok');
        window.location.href = 'index.html';
        return;
    }

    console.log('Admin access granted via authManager');
    setupAdminLogout();
}

function setupAdminLogout() {
    // Admin logout button
    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    if (adminLogoutBtn) {
        // Eski event listener'ları temizle
        const newBtn = adminLogoutBtn.cloneNode(true);
        adminLogoutBtn.parentNode.replaceChild(newBtn, adminLogoutBtn);
        
        newBtn.addEventListener('click', async () => {
            try {
                if (typeof authManager !== 'undefined') {
                    await authManager.logout();
                } else {
                    localStorage.removeItem('rememberedUser');
                    localStorage.removeItem('isAdmin');
                }
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Logout error:', error);
                localStorage.removeItem('rememberedUser');
                localStorage.removeItem('isAdmin');
                window.location.href = 'index.html';
            }
        });
    }
}
