// Supabase Authentication System
// Firebase tamamen kaldırıldı, Supabase Auth kullanılıyor

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isAdmin = false;
        this.initializeAuth();
    }

    async initializeAuth() {
        try {
            // Mevcut kullanıcıyı kontrol et
            const user = await db.getCurrentUser();
            if (user) {
                this.currentUser = user;
                this.isAdmin = user.user_metadata?.role === 'admin';
                this.showMainApp();
            }
        } catch (error) {
            console.log('No active session');
        }

        // Auth state değişikliklerini dinle
        db.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                this.currentUser = session.user;
                this.isAdmin = session.user.user_metadata?.role === 'admin';
                this.showMainApp();
            } else if (event === 'SIGNED_OUT') {
                this.currentUser = null;
                this.isAdmin = false;
                this.showLoginScreen();
            }
        });
    }

    async login(email, password, rememberMe = false) {
        try {
            // Güvenlik kontrolü - Engellenen kullanıcı mı?
            if (typeof window.securityUtils !== 'undefined') {
                const isBlocked = await window.securityUtils.failedLoginTracker.isBlocked();
                if (isBlocked) {
                    throw new Error('Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.');
                }

                // Rate limiting kontrolü
                const fingerprint = await window.securityUtils.failedLoginTracker.generateFingerprint();
                const rateCheck = window.securityUtils.loginLimiter.checkLimit(fingerprint);
                
                if (!rateCheck.allowed) {
                    throw new Error(`Çok fazla deneme yaptınız. ${rateCheck.waitTime} saniye sonra tekrar deneyin.`);
                }
            }

            // Supabase Auth ile giriş yap
            const { user, session } = await db.signIn(email, password);
            
            this.currentUser = user;
            this.isAdmin = user.user_metadata?.role === 'admin';

            // Remember me
            if (rememberMe) {
                localStorage.setItem('rememberedUser', 'true');
                if (this.isAdmin) {
                    localStorage.setItem('isAdmin', 'true');
                }
            }

            // Başarılı giriş - rate limiter'ı sıfırla
            if (typeof window.securityUtils !== 'undefined') {
                const fingerprint = await window.securityUtils.failedLoginTracker.generateFingerprint();
                window.securityUtils.loginLimiter.reset(fingerprint);
            }

            return { success: true, user };
        } catch (error) {
            // Başarısız giriş - kaydet
            if (typeof window.securityUtils !== 'undefined') {
                const result = await window.securityUtils.failedLoginTracker.logFailedAttempt(email, password);
                
                if (result.blocked) {
                    throw new Error('Çok fazla başarısız deneme. Hesabınız geçici olarak engellendi.');
                } else if (result.remaining !== undefined) {
                    throw new Error(`Kullanıcı adı veya şifre hatalı! ${result.remaining} deneme hakkınız kaldı.`);
                }
            }

            throw new Error(error.message || 'Giriş başarısız');
        }
    }

    async logout() {
        try {
            await db.signOut();
            this.currentUser = null;
            this.isAdmin = false;
            localStorage.removeItem('rememberedUser');
            localStorage.removeItem('isAdmin');
            this.showLoginScreen();
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    async register(email, password, displayName, role = 'user') {
        try {
            const { user } = await db.signUp(email, password, {
                display_name: displayName,
                role: role
            });

            return { success: true, user };
        } catch (error) {
            throw new Error(error.message || 'Kayıt başarısız');
        }
    }

    async resetPassword(email) {
        try {
            await db.resetPassword(email);
            return { success: true };
        } catch (error) {
            throw new Error(error.message || 'Şifre sıfırlama başarısız');
        }
    }

    async updatePassword(newPassword) {
        try {
            await db.updatePassword(newPassword);
            return { success: true };
        } catch (error) {
            throw new Error(error.message || 'Şifre güncelleme başarısız');
        }
    }

    async updateProfile(metadata) {
        try {
            const { user } = await db.updateUserMetadata(metadata);
            this.currentUser = user;
            return { success: true, user };
        } catch (error) {
            throw new Error(error.message || 'Profil güncelleme başarısız');
        }
    }

    showMainApp() {
        const loginScreen = document.getElementById('login-screen');
        const mainApp = document.getElementById('main-app');
        const fabBtn = document.getElementById('fab-btn');
        const adminLink = document.getElementById('admin-link');

        if (loginScreen) loginScreen.style.display = 'none';
        if (mainApp) mainApp.style.display = 'block';
        if (fabBtn) fabBtn.style.display = 'block';
        
        if (adminLink && this.isAdmin) {
            adminLink.style.display = 'inline-block';
        }

        // Verileri yükle
        if (typeof loadArizalar === 'function') {
            loadArizalar();
        }
    }

    showLoginScreen() {
        const loginScreen = document.getElementById('login-screen');
        const mainApp = document.getElementById('main-app');
        const fabBtn = document.getElementById('fab-btn');

        if (loginScreen) loginScreen.style.display = 'flex';
        if (mainApp) mainApp.style.display = 'none';
        if (fabBtn) fabBtn.style.display = 'none';
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    isAdminUser() {
        return this.isAdmin;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Global auth manager instance
const authManager = new AuthManager();

// Export
window.authManager = authManager;
