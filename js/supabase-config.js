// Supabase Configuration
// https://supabase.com adresinden projenizi oluşturun

const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Örnek: https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Supabase client oluştur
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
window.db = db;
window.supabase = supabase;

console.log('✅ Supabase bağlantısı hazır');
