// Admin Panel Authentication Check
// Sadece admin kullanıcıları admin paneline erişebilir

document.addEventListener('DOMContentLoaded', async () => {
    // Auth manager'ın yüklenmesini bekle
    if (typeof authManager === 'undefined') {
        console.error('Auth manager not loaded');
        window.location.href = 'index.html';
        return;
    }

    // Kullanıcı giriş yapmış mı kontrol et
    if (!authManager.isAuthenticated()) {
        alert('Lütfen önce giriş yapın');
        window.location.href = 'index.html';
        return;
    }

    // Admin yetkisi var mı kontrol et
    if (!authManager.isAdminUser()) {
        alert('Bu sayfaya erişim yetkiniz yok');
        window.location.href = 'index.html';
        return;
    }

    // Admin logout button
    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', async () => {
            try {
                await authManager.logout();
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Logout error:', error);
                alert('Çıkış yapılırken hata oluştu');
            }
        });
    }
});
