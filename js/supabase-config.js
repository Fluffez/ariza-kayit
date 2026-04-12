// Supabase Configuration
// https://supabase.com adresinden projenizi oluşturun

const SUPABASE_URL = 'https://wmpvckbtixysxqkttdje.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtcHZja2J0aXh5c3hxa3R0ZGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NjY0NDksImV4cCI6MjA5MTU0MjQ0OX0.pBfYMVzprjT-AtF_79ehnfCFimQzEkCJmDVblrEijmA';

// Supabase SDK'nın yüklenmesini bekle
if (typeof window.supabase === 'undefined') {
    console.error('❌ Supabase SDK yüklenemedi! Script tag\'ini kontrol edin.');
    throw new Error('Supabase SDK not loaded');
}

// Supabase client oluştur
const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database helper fonksiyonları
const db = {
    // Arızalar
    async getArizalar() {
        const { data, error } = await supabase
            .from('arizalar')
            .select('*')
            .order('timestamp', { ascending: false });
        
        if (error) throw error;
        
        // Convert snake_case to camelCase for compatibility
        return (data || []).map(ariza => ({
            id: ariza.id,
            birim: ariza.birim,
            cihazTuru: ariza.cihaz_turu,
            arizaTuru: ariza.ariza_turu,
            aciklama: ariza.aciklama,
            yapilanIsler: ariza.yapilan_isler,
            talepEden: ariza.talep_eden,
            atananKisi: ariza.atanan_kisi,
            durum: ariza.durum,
            tarih: ariza.tarih,
            timestamp: ariza.timestamp
        }));
    },

    async addAriza(ariza) {
        const { data, error } = await supabase
            .from('arizalar')
            .insert([ariza])
            .select();
        
        if (error) throw error;
        return data[0];
    },

    async updateAriza(id, updates) {
        const { data, error } = await supabase
            .from('arizalar')
            .update(updates)
            .eq('id', id)
            .select();
        
        if (error) throw error;
        return data[0];
    },

    async deleteAriza(id) {
        const { error } = await supabase
            .from('arizalar')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    },

    // Müdürlükler
    async getMudurlukler() {
        const { data, error } = await supabase
            .from('mudurlukler')
            .select('*')
            .order('name');
        
        if (error) throw error;
        return data || [];
    },

    async addMudurluk(name) {
        const { data, error } = await supabase
            .from('mudurlukler')
            .insert([{ name }])
            .select();
        
        if (error) throw error;
        return data[0];
    },

    async updateMudurluk(id, name) {
        const { data, error } = await supabase
            .from('mudurlukler')
            .update({ name })
            .eq('id', id)
            .select();
        
        if (error) throw error;
        return data[0];
    },

    async deleteMudurluk(id) {
        const { error } = await supabase
            .from('mudurlukler')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    },

    // Çalışanlar
    async getCalisanlar() {
        const { data, error } = await supabase
            .from('calisanlar')
            .select('*')
            .order('name');
        
        if (error) throw error;
        return data || [];
    },

    async addCalisan(name) {
        const { data, error } = await supabase
            .from('calisanlar')
            .insert([{ name }])
            .select();
        
        if (error) throw error;
        return data[0];
    },

    async updateCalisan(id, name) {
        const { data, error } = await supabase
            .from('calisanlar')
            .update({ name })
            .eq('id', id)
            .select();
        
        if (error) throw error;
        return data[0];
    },

    async deleteCalisan(id) {
        const { error } = await supabase
            .from('calisanlar')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    },

    // Teknisyenler
    async getTeknisyenler() {
        const { data, error } = await supabase
            .from('teknisyenler')
            .select('*')
            .order('name');
        
        if (error) throw error;
        return data || [];
    },

    async addTeknisyen(name) {
        const { data, error } = await supabase
            .from('teknisyenler')
            .insert([{ name }])
            .select();
        
        if (error) throw error;
        return data[0];
    },

    async updateTeknisyen(id, name) {
        const { data, error } = await supabase
            .from('teknisyenler')
            .update({ name })
            .eq('id', id)
            .select();
        
        if (error) throw error;
        return data[0];
    },

    async deleteTeknisyen(id) {
        const { error } = await supabase
            .from('teknisyenler')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    },

    // Güvenlik - Başarısız girişler
    async logFailedLogin(attempt) {
        const { error } = await supabase
            .from('failed_logins')
            .insert([attempt]);
        
        if (error) console.error('Failed login log error:', error);
    },

    async getFailedLogins() {
        const { data, error } = await supabase
            .from('failed_logins')
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(100);
        
        if (error) throw error;
        return data || [];
    },

    // Supabase Auth - Kullanıcı Yönetimi
    async signUp(email, password, metadata = {}) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata
            }
        });
        
        if (error) throw error;
        return data;
    },

    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        return data;
    },

    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    },

    async updateUserMetadata(metadata) {
        const { data, error } = await supabase.auth.updateUser({
            data: metadata
        });
        
        if (error) throw error;
        return data;
    },

    async resetPassword(email) {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        return data;
    },

    async updatePassword(newPassword) {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        });
        
        if (error) throw error;
        return data;
    },

    // Auth state listener
    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange(callback);
    },

    // Realtime subscriptions
    subscribeToArizalar(callback) {
        return supabase
            .channel('arizalar-changes')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'arizalar' },
                callback
            )
            .subscribe();
    },

    unsubscribe(subscription) {
        supabase.removeChannel(subscription);
    }
};

// Global olarak kullanılabilir yap
window.supabaseClient = supabase;
window.db = db;

console.log('✅ Supabase bağlantısı hazır');
