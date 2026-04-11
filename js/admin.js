// Admin Panel JavaScript

// Firebase'den verileri çek
let mudurluklerData = [];
let calisanlarData = [];
let teknisyenlerData = [];
let kullanicilarData = [];
let ayarlarData = {};

// Sayfa yüklendiğinde
window.addEventListener('DOMContentLoaded', () => {
    // Admin kontrolü
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
        // Admin değilse ana sayfaya yönlendir
        window.location.href = 'index.html';
        return;
    }
    
    loadAllData();
    setupEventListeners();
});

// Tüm verileri yükle
function loadAllData() {
    loadMudurlukler();
    loadCalisanlar();
    loadTeknisyenler();
    loadKullanicilar();
    loadAyarlar();
}

// Müdürlükleri yükle
function loadMudurlukler() {
    database.ref('mudurlukler').once('value', (snapshot) => {
        if (!snapshot.exists()) {
            // İlk yükleme - app.js'deki verileri Firebase'e aktar
            const defaultMudurlukler = [
                "NAR MASA",
                "Ruhsat ve Denetim Müdürlüğü",
                "Evrak Kayıt",
                "Zabıta Müdürlüğü",
                "Gelirler Müdürlüğü",
                "Sağlık İşleri Müdürlüğü",
                "İmar ve Şehircilik Müdürlüğü",
                "Plan ve Proje Müdürlüğü",
                "Bilgi İşlem Müdürlüğü",
                "Fen İşleri Müdürlüğü",
                "Mali Hizmetler Müdürlüğü",
                "Yazı İşleri Müdürlüğü",
                "Basın Yayın ve Halkla İlişkiler Müdürlüğü",
                "Destek Hizmetler Müdürlüğü",
                "İnsan Kaynakları ve Eğitim Müdürlüğü",
                "Emlak ve İstimlak Müdürlüğü",
                "Muhtarlık İşleri Müdürlüğü",
                "İklim Değişikliği ve Sıfır Atık",
                "Afet İşleri Müdürlüğü",
                "Hukuk İşleri Müdürlüğü",
                "Özel Kalem Müdürlüğü"
            ];
            
            defaultMudurlukler.forEach(name => {
                database.ref('mudurlukler').push({ name });
            });
            
            showToast('Müdürlükler Firebase\'e aktarıldı', 'success');
        }
        
        // Verileri dinle
        database.ref('mudurlukler').on('value', (snapshot) => {
            mudurluklerData = [];
            snapshot.forEach((child) => {
                mudurluklerData.push({
                    id: child.key,
                    name: child.val().name || child.val()
                });
            });
            displayMudurlukler(mudurluklerData);
        });
    });
}

function displayMudurlukler(data) {
    const list = document.getElementById('mudurluk-list');
    if (data.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #718096;">Henüz müdürlük eklenmemiş</p>';
        return;
    }
    
    list.innerHTML = data.map(item => `
        <div class="item-card">
            <div class="item-info">
                <div class="item-name">${item.name}</div>
            </div>
            <div class="item-actions">
                <button class="btn-icon btn-edit" onclick="editMudurluk('${item.id}', '${item.name}')">✏️ Düzenle</button>
                <button class="btn-icon btn-delete" onclick="deleteMudurluk('${item.id}', '${item.name}')">🗑️ Sil</button>
            </div>
        </div>
    `).join('');
}

// Çalışanları yükle
function loadCalisanlar() {
    database.ref('calisanlar').once('value', (snapshot) => {
        if (!snapshot.exists()) {
            // İlk yükleme - TÜM çalışanları Firebase'e aktar
            const defaultCalisanlar = [
                "1001 - Suzan Ayaz", "1002 - Emine Aysel Atalık", "1003 - Deniz ERBİ", "1010 - Süleyman Çakan",
                "1011 - Gökhan Gökçe", "1012 - Ebru İpek Akay", "1013 - Havvanur Tekin", "1014 - Ceren Oğuz",
                "1015 - Berkay Nizam", "1020 - Halil İbrahim Karacin", "1021 - Olcay Altun", "1022 - Cem Şahin",
                "1023 - İsmet Tolu", "1023 - Elif Küçüktekin", "1024 - Hidayet Ayverdi", "1024 - Büşra Selin Kepenek",
                "1025 - Merve Kıvrak", "1025 - Merdan Akpınar", "1026 - Bayram Ünal", "1027 - Bilal Aktaş",
                "1030 - Zeliha Yenicil", "1040 - Tarkan Gümüş", "1041 - Sebahattin Ekiz", "1042 - Tuna Özdemir",
                "1043 - İlkay Bahşi", "1043 - Özbek Yılmaz", "1044 - Ali Çetin", "1046 - Tahsin Kayapınar",
                "1060 - Ramazan Yanar", "1061 - İrfan Kaşlı", "1062 - Doğan Özen", "1062 - Umut Ördem",
                "1063 - Durmuş Gürkan", "1063 - Oğuzhan Fırat", "1064 - Osman Yanar", "1064 - Hasibe Tosun",
                "1065 - Recai Kara", "1065 - Bekir Arıca", "1066 - Abdurrahman Dal", "1066 - Nurgül Günay",
                "1067 - Mehmet Tatlı", "1070 - Fatmana Tıraş Türker", "1071 - Fatma İnce", "1072 - Ahmet Altıner",
                "1073 - Süleyman Serhat Acar", "1074 - Serpil Üneş", "1075 - Merve Balcak",
                "1100 - Sevgi Uzunoğlu", "1101 - Hayrettin Bahşi", "1102 - Sezen Küçükbaşkan", "1103 - Baki Uzunoğlu",
                "1104 - Fulya Barut", "1105 - Hale Fırat", "1106 - Enver Altundağ", "1107 - Mehmet Solaklar",
                "1108 - Hayriye Dölen Sönmez", "1109 - Hacer Büyükşahin", "1110 - Nurten Yağan", "1111 - Ümit Küçükçakal",
                "1112 - Ayşe Böcek Gökçe", "1113 - Helin Şahika Barut", "1114 - İbrahim Akan", "1115 - Salih Saçkan",
                "1116 - Serap Erkuş", "1117 - Seher Ataseven", "1118 - İsmail Kalkay", "1119 - Bayram Kalın",
                "1120 - Mehmet Ali Gökmen", "1121 - Mustafa Tatlı", "1130 - Meral Tekşan", "1140 - Mustafa Yıldırım",
                "1132 - Hakan Çiloğlu", "1133 - Rabia Cebeci", "1134 - Fatma Öztürk", "1135 - Süleyman Dukluk",
                "1136 - Hanife Özkan", "1137 - Özlem Görücü", "1138 - Emel Parlak", "1150 - Adile Cebeci",
                "1151 - Hüseyin Acay", "1152 - Selman Karadağ", "1153 - Rauf Kurt", "1154 - Can Gürses",
                "1155 - Ahmet Özkan", "1170 - Ezgi Nur Akça", "1171 - Harun Erbi", "1172 - Erdi Bahşi",
                "1173 - Aydın Kıvrım", "1173 - Eray Dinsel", "1174 - Halil Kolak", "1174 - Furkan Akın",
                "1175 - Alparslan Şahin", "1176 - Melda Sapmaz", "1177 - Azize Zenkin", "1178 - Pınar Sedef Ünal",
                "1179 - Yasin Tekeli", "1180 - Halil Çelik", "1200 - Cansel Güneş", "1201 - Rabia Uysal",
                "1202 - Adem Erkuş", "1203 - Hayal Yurtseven", "1204 - Muzaffer Yurtseven", "1205 - Ayşe Kübra Yüztaş",
                "1206 - Binnur Uygur", "1207 - Tuğba Erdil", "1208 - Arif Bahşi", "1209 - Ummani Türkmenoğlu",
                "1210 - Emre Alkan", "1211 - Havva Keser", "1212 - Ali Şekerli", "1220 - Mustafa Aldemir",
                "1221 - Nadire Özdemir", "1222 - Mehmet Ali Tunç", "1223 - Erçin Ulukaya", "1224 - Çiğdem Ayhan Tosun",
                "1230 - Figen Yurtseven", "1231 - Eylem İmir", "1232 - Suna Uysal", "1233 - Ahmet Karbuz",
                "1234 - Arif Tom", "1235 - Zeynep Doğan", "1240 - Erkan Şimşek", "1241 - Mehmet Kara",
                "1242 - Hatice Yıldıran", "1243 - Selçuk Öcü", "1244 - Melek İnce", "1245 - Oğuz Taşar",
                "1246 - Harun Önkal", "1247 - Esma İnce", "1248 - Gülfem Durak", "1260 - Özlem Akın",
                "1261 - Neslihan Baygül", "1262 - Derya Akın", "1262 - Ramazan Küçükbaşkan", "1263 - Mürüvvet Yılmaz",
                "1264 - Eda Deke", "1264 - Murat Çankaya", "1265 - Murat Yaldız", "1265 - İsmail Yıldız",
                "1270 - Hüseyin Sivri", "1271 - Arif Çini", "1272 - Yalçın Kaya", "1273 - Ramazan Boz",
                "1280 - Kadir Çıra", "1281 - Sevgi Çiçekdağı", "1282 - Gülsüm Karataş", "1290 - Alper Yerli",
                "1291 - Zafer Koyuncu", "1305 - Hüsnü Şahin", "1306 - Dilek Küçükbaşkan", "1310 - Emre İpek",
                "1311 - Kübra Tat", "1315 - İbrahim Tekşan", "1320 - Mehmet Akif Karabay", "1321 - Temel Yetim",
                "1330 - Ezgi Çot", "1340 - Ramazan Dönmez", "1341 - Rahime Deke", "1342 - Ümit Tutar",
                "1343 - Abdullah Gümüş", "1350 - Esra Çil", "1352 - Ömer Kıvrak", "1355 - Emine Alkan",
                "1357 - Hakan Bilgi", "1360 - Hanife Acar", "1362 - Cavit Aktar", "1365 - Merve Keklik",
                "1366 - Mehtap Çelik", "1367 - Barış Yönter", "1368 - Ali İhsan Topçu", "1400 - Nilüfer Öztürk",
                "1402 - Raziye Şimşek", "1403 - Ömer Dereli"
            ];
            
            console.log(`${defaultCalisanlar.length} çalışan Firebase'e aktarılıyor...`);
            
            defaultCalisanlar.forEach(name => {
                database.ref('calisanlar').push({ name });
            });
            
            showToast(`${defaultCalisanlar.length} çalışan Firebase'e aktarıldı`, 'success');
        }
        
        // Verileri dinle
        database.ref('calisanlar').on('value', (snapshot) => {
            calisanlarData = [];
            snapshot.forEach((child) => {
                calisanlarData.push({
                    id: child.key,
                    name: child.val().name || child.val()
                });
            });
            displayCalisanlar(calisanlarData);
        });
    });
}

function displayCalisanlar(data) {
    const list = document.getElementById('calisan-list');
    if (data.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #718096;">Henüz çalışan eklenmemiş</p>';
        return;
    }
    
    list.innerHTML = data.map(item => `
        <div class="item-card">
            <div class="item-info">
                <div class="item-name">${item.name}</div>
            </div>
            <div class="item-actions">
                <button class="btn-icon btn-edit" onclick="editCalisan('${item.id}', '${item.name}')">✏️ Düzenle</button>
                <button class="btn-icon btn-delete" onclick="deleteCalisan('${item.id}', '${item.name}')">🗑️ Sil</button>
            </div>
        </div>
    `).join('');
}

// Teknisyenleri yükle
function loadTeknisyenler() {
    database.ref('teknisyenler').once('value', (snapshot) => {
        if (!snapshot.exists()) {
            // İlk yükleme - varsayılan teknisyenler
            const defaultTeknisyenler = [
                "Ahmet Yılmaz",
                "Mehmet Demir",
                "Ayşe Kaya",
                "Fatma Şahin",
                "Ali Çelik"
            ];
            
            defaultTeknisyenler.forEach(name => {
                database.ref('teknisyenler').push({ name });
            });
            
            showToast('Teknisyenler Firebase\'e aktarıldı', 'success');
        }
        
        // Verileri dinle
        database.ref('teknisyenler').on('value', (snapshot) => {
            teknisyenlerData = [];
            snapshot.forEach((child) => {
                teknisyenlerData.push({
                    id: child.key,
                    name: child.val().name || child.val()
                });
            });
            displayTeknisyenler(teknisyenlerData);
        });
    });
}

function displayTeknisyenler(data) {
    const list = document.getElementById('teknisyen-list');
    if (data.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #718096;">Henüz teknisyen eklenmemiş</p>';
        return;
    }
    
    list.innerHTML = data.map(item => `
        <div class="item-card">
            <div class="item-info">
                <div class="item-name">${item.name}</div>
            </div>
            <div class="item-actions">
                <button class="btn-icon btn-edit" onclick="editTeknisyen('${item.id}', '${item.name}')">✏️ Düzenle</button>
                <button class="btn-icon btn-delete" onclick="deleteTeknisyen('${item.id}', '${item.name}')">🗑️ Sil</button>
            </div>
        </div>
    `).join('');
}

// Kullanıcıları yükle
function loadKullanicilar() {
    database.ref('kullanicilar').on('value', (snapshot) => {
        kullanicilarData = [];
        snapshot.forEach((child) => {
            kullanicilarData.push({
                id: child.key,
                ...child.val()
            });
        });
        displayKullanicilar(kullanicilarData);
    });
}

function displayKullanicilar(data) {
    const list = document.getElementById('user-list');
    if (data.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #718096;">Henüz kullanıcı eklenmemiş</p>';
        return;
    }
    
    list.innerHTML = data.map(user => `
        <div class="user-card">
            <div class="user-info">
                <h4>${user.username}</h4>
                <span class="user-role ${user.role}">${user.role === 'admin' ? 'Admin' : user.role === 'user' ? 'Kullanıcı' : 'Görüntüleyici'}</span>
            </div>
            <div class="item-actions">
                <button class="btn-icon btn-edit" onclick="editUser('${user.id}')">✏️ Düzenle</button>
                <button class="btn-icon btn-delete" onclick="deleteUser('${user.id}', '${user.username}')">🗑️ Sil</button>
            </div>
        </div>
    `).join('');
}

// Ayarları yükle
function loadAyarlar() {
    database.ref('ayarlar').once('value', (snapshot) => {
        ayarlarData = snapshot.val() || {
            notifications: true,
            sounds: true,
            autoRefresh: false,
            warningDays: 3,
            criticalDays: 7,
            itemsPerPage: 25
        };
        
        // Ayarları forma yükle
        document.getElementById('setting-notifications').checked = ayarlarData.notifications;
        document.getElementById('setting-sounds').checked = ayarlarData.sounds;
        document.getElementById('setting-auto-refresh').checked = ayarlarData.autoRefresh;
        document.getElementById('setting-warning-days').value = ayarlarData.warningDays;
        document.getElementById('setting-critical-days').value = ayarlarData.criticalDays;
        document.getElementById('setting-items-per-page').value = ayarlarData.itemsPerPage;
    });
}

// Event Listeners
function setupEventListeners() {
    // Tab değiştirme
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(tabName + '-tab').classList.add('active');
        });
    });
    
    // Arama
    document.getElementById('mudurluk-search')?.addEventListener('input', (e) => {
        const filtered = mudurluklerData.filter(m => 
            m.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        displayMudurlukler(filtered);
    });
    
    document.getElementById('calisan-search')?.addEventListener('input', (e) => {
        const filtered = calisanlarData.filter(c => 
            c.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        displayCalisanlar(filtered);
    });
    
    document.getElementById('teknisyen-search')?.addEventListener('input', (e) => {
        const filtered = teknisyenlerData.filter(t => 
            t.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        displayTeknisyenler(filtered);
    });
    
    // Yeni ekleme butonları
    document.getElementById('add-mudurluk-btn')?.addEventListener('click', () => addMudurluk());
    document.getElementById('add-calisan-btn')?.addEventListener('click', () => addCalisan());
    document.getElementById('add-teknisyen-btn')?.addEventListener('click', () => addTeknisyen());
    document.getElementById('add-user-btn')?.addEventListener('click', () => addUser());
    
    // Ayarları kaydet
    document.getElementById('save-settings-btn')?.addEventListener('click', saveAyarlar);
    
    // Yedekleme
    document.getElementById('backup-btn')?.addEventListener('click', backupData);
    document.getElementById('restore-btn')?.addEventListener('click', () => {
        document.getElementById('restore-file').click();
    });
    document.getElementById('restore-file')?.addEventListener('change', restoreData);
    document.getElementById('delete-all-btn')?.addEventListener('click', deleteAllData);
    
    // Logout
    document.getElementById('admin-logout-btn')?.addEventListener('click', () => {
        localStorage.removeItem('rememberedUser');
        localStorage.removeItem('isAdmin');
        window.location.href = 'index.html';
    });
    
    // Modal kapat
    document.getElementById('admin-close-btn')?.addEventListener('click', closeModal);
}

// CRUD İşlemleri - Müdürlük
function addMudurluk() {
    showModal('Yeni Müdürlük Ekle', `
        <div class="form-group">
            <label>Müdürlük Adı *</label>
            <input type="text" id="modal-input" required placeholder="Örn: Bilgi İşlem Müdürlüğü">
        </div>
    `, () => {
        const name = document.getElementById('modal-input').value.trim();
        if (!name) {
            showToast('Müdürlük adı boş olamaz', 'error');
            return;
        }
        
        database.ref('mudurlukler').push({ name })
            .then(() => {
                showToast('Müdürlük eklendi', 'success');
                closeModal();
            })
            .catch(error => {
                showToast('Hata: ' + error.message, 'error');
            });
    });
}

window.editMudurluk = function(id, name) {
    showModal('Müdürlük Düzenle', `
        <div class="form-group">
            <label>Müdürlük Adı *</label>
            <input type="text" id="modal-input" value="${name}" required>
        </div>
    `, () => {
        const newName = document.getElementById('modal-input').value.trim();
        if (!newName) {
            showToast('Müdürlük adı boş olamaz', 'error');
            return;
        }
        
        database.ref('mudurlukler/' + id).update({ name: newName })
            .then(() => {
                showToast('Müdürlük güncellendi', 'success');
                closeModal();
            })
            .catch(error => {
                showToast('Hata: ' + error.message, 'error');
            });
    });
};

window.deleteMudurluk = function(id, name) {
    if (confirm(`"${name}" müdürlüğünü silmek istediğinizden emin misiniz?`)) {
        database.ref('mudurlukler/' + id).remove()
            .then(() => {
                showToast('Müdürlük silindi', 'success');
            })
            .catch(error => {
                showToast('Hata: ' + error.message, 'error');
            });
    }
};

// CRUD İşlemleri - Çalışan
function addCalisan() {
    showModal('Yeni Çalışan Ekle', `
        <div class="form-group">
            <label>Çalışan Adı *</label>
            <input type="text" id="modal-input" required placeholder="Örn: 1001 - Ahmet Yılmaz">
        </div>
    `, () => {
        const name = document.getElementById('modal-input').value.trim();
        if (!name) {
            showToast('Çalışan adı boş olamaz', 'error');
            return;
        }
        
        database.ref('calisanlar').push({ name })
            .then(() => {
                showToast('Çalışan eklendi', 'success');
                closeModal();
            })
            .catch(error => {
                showToast('Hata: ' + error.message, 'error');
            });
    });
}

window.editCalisan = function(id, name) {
    showModal('Çalışan Düzenle', `
        <div class="form-group">
            <label>Çalışan Adı *</label>
            <input type="text" id="modal-input" value="${name}" required>
        </div>
    `, () => {
        const newName = document.getElementById('modal-input').value.trim();
        if (!newName) {
            showToast('Çalışan adı boş olamaz', 'error');
            return;
        }
        
        database.ref('calisanlar/' + id).update({ name: newName })
            .then(() => {
                showToast('Çalışan güncellendi', 'success');
                closeModal();
            })
            .catch(error => {
                showToast('Hata: ' + error.message, 'error');
            });
    });
};

window.deleteCalisan = function(id, name) {
    if (confirm(`"${name}" çalışanını silmek istediğinizden emin misiniz?`)) {
        database.ref('calisanlar/' + id).remove()
            .then(() => {
                showToast('Çalışan silindi', 'success');
            })
            .catch(error => {
                showToast('Hata: ' + error.message, 'error');
            });
    }
};

// CRUD İşlemleri - Teknisyen
function addTeknisyen() {
    showModal('Yeni Teknisyen Ekle', `
        <div class="form-group">
            <label>Teknisyen Adı *</label>
            <input type="text" id="modal-input" required placeholder="Örn: Mehmet Demir">
        </div>
    `, () => {
        const name = document.getElementById('modal-input').value.trim();
        if (!name) {
            showToast('Teknisyen adı boş olamaz', 'error');
            return;
        }
        
        database.ref('teknisyenler').push({ name })
            .then(() => {
                showToast('Teknisyen eklendi', 'success');
                closeModal();
            })
            .catch(error => {
                showToast('Hata: ' + error.message, 'error');
            });
    });
}

window.editTeknisyen = function(id, name) {
    showModal('Teknisyen Düzenle', `
        <div class="form-group">
            <label>Teknisyen Adı *</label>
            <input type="text" id="modal-input" value="${name}" required>
        </div>
    `, () => {
        const newName = document.getElementById('modal-input').value.trim();
        if (!newName) {
            showToast('Teknisyen adı boş olamaz', 'error');
            return;
        }
        
        database.ref('teknisyenler/' + id).update({ name: newName })
            .then(() => {
                showToast('Teknisyen güncellendi', 'success');
                closeModal();
            })
            .catch(error => {
                showToast('Hata: ' + error.message, 'error');
            });
    });
};

window.deleteTeknisyen = function(id, name) {
    if (confirm(`"${name}" teknisyenini silmek istediğinizden emin misiniz?`)) {
        database.ref('teknisyenler/' + id).remove()
            .then(() => {
                showToast('Teknisyen silindi', 'success');
            })
            .catch(error => {
                showToast('Hata: ' + error.message, 'error');
            });
    }
};

// CRUD İşlemleri - Kullanıcı
function addUser() {
    showModal('Yeni Kullanıcı Ekle', `
        <div class="form-group">
            <label>Kullanıcı Adı *</label>
            <input type="text" id="user-username" required>
        </div>
        <div class="form-group">
            <label>Şifre *</label>
            <input type="password" id="user-password" required>
        </div>
        <div class="form-group">
            <label>Rol *</label>
            <select id="user-role">
                <option value="user">Kullanıcı</option>
                <option value="admin">Admin</option>
                <option value="viewer">Görüntüleyici</option>
            </select>
        </div>
    `, () => {
        const username = document.getElementById('user-username').value.trim();
        const password = document.getElementById('user-password').value.trim();
        const role = document.getElementById('user-role').value;
        
        if (!username || !password) {
            showToast('Tüm alanları doldurun', 'error');
            return;
        }
        
        database.ref('kullanicilar').push({ username, password, role })
            .then(() => {
                showToast('Kullanıcı eklendi', 'success');
                closeModal();
            })
            .catch(error => {
                showToast('Hata: ' + error.message, 'error');
            });
    });
}

window.editUser = function(id) {
    const user = kullanicilarData.find(u => u.id === id);
    if (!user) return;
    
    showModal('Kullanıcı Düzenle', `
        <div class="form-group">
            <label>Kullanıcı Adı *</label>
            <input type="text" id="user-username" value="${user.username}" required>
        </div>
        <div class="form-group">
            <label>Yeni Şifre (boş bırakılırsa değişmez)</label>
            <input type="password" id="user-password">
        </div>
        <div class="form-group">
            <label>Rol *</label>
            <select id="user-role">
                <option value="user" ${user.role === 'user' ? 'selected' : ''}>Kullanıcı</option>
                <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                <option value="viewer" ${user.role === 'viewer' ? 'selected' : ''}>Görüntüleyici</option>
            </select>
        </div>
    `, () => {
        const username = document.getElementById('user-username').value.trim();
        const password = document.getElementById('user-password').value.trim();
        const role = document.getElementById('user-role').value;
        
        if (!username) {
            showToast('Kullanıcı adı boş olamaz', 'error');
            return;
        }
        
        const updateData = { username, role };
        if (password) {
            updateData.password = password;
        }
        
        database.ref('kullanicilar/' + id).update(updateData)
            .then(() => {
                showToast('Kullanıcı güncellendi', 'success');
                closeModal();
            })
            .catch(error => {
                showToast('Hata: ' + error.message, 'error');
            });
    });
};

window.deleteUser = function(id, username) {
    if (confirm(`"${username}" kullanıcısını silmek istediğinizden emin misiniz?`)) {
        database.ref('kullanicilar/' + id).remove()
            .then(() => {
                showToast('Kullanıcı silindi', 'success');
            })
            .catch(error => {
                showToast('Hata: ' + error.message, 'error');
            });
    }
};

// Ayarları kaydet
function saveAyarlar() {
    const ayarlar = {
        notifications: document.getElementById('setting-notifications').checked,
        sounds: document.getElementById('setting-sounds').checked,
        autoRefresh: document.getElementById('setting-auto-refresh').checked,
        warningDays: parseInt(document.getElementById('setting-warning-days').value),
        criticalDays: parseInt(document.getElementById('setting-critical-days').value),
        itemsPerPage: parseInt(document.getElementById('setting-items-per-page').value)
    };
    
    database.ref('ayarlar').set(ayarlar)
        .then(() => {
            showToast('Ayarlar kaydedildi', 'success');
        })
        .catch(error => {
            showToast('Hata: ' + error.message, 'error');
        });
}

// Yedekleme
function backupData() {
    database.ref().once('value', (snapshot) => {
        const data = snapshot.val();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `yedek-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Yedek indirildi', 'success');
    });
}

function restoreData(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!confirm('Mevcut tüm veriler silinip yedekten geri yüklenecek. Emin misiniz?')) {
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            database.ref().set(data)
                .then(() => {
                    showToast('Veriler geri yüklendi', 'success');
                    setTimeout(() => location.reload(), 1500);
                })
                .catch(error => {
                    showToast('Hata: ' + error.message, 'error');
                });
        } catch (error) {
            showToast('Geçersiz yedek dosyası', 'error');
        }
    };
    reader.readAsText(file);
}

function deleteAllData() {
    const confirmation = prompt('TÜM VERİLER SİLİNECEK! Onaylamak için "SIL" yazın:');
    if (confirmation === 'SIL') {
        database.ref('arizalar').remove()
            .then(() => {
                showToast('Tüm arıza kayıtları silindi', 'success');
            })
            .catch(error => {
                showToast('Hata: ' + error.message, 'error');
            });
    }
}

// Modal yönetimi
let modalCallback = null;

function showModal(title, content, callback) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-form-content').innerHTML = content;
    document.getElementById('admin-modal').classList.add('active');
    modalCallback = callback;
    
    const form = document.getElementById('admin-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        if (modalCallback) modalCallback();
    };
}

function closeModal() {
    document.getElementById('admin-modal').classList.remove('active');
    document.getElementById('admin-form').reset();
    modalCallback = null;
}

// Toast
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
