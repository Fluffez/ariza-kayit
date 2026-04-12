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
    
    // Dark mode'u yükle
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('admin-dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            darkModeToggle.textContent = isDark ? '☀️' : '🌙';
            showToast(isDark ? 'Karanlık mod aktif' : 'Aydınlık mod aktif', 'success');
        });
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

// Sayfalama değişkenleri
let currentPageMudurluk = 1;
let currentPageCalisan = 1;
let currentPageTeknisyen = 1;
const itemsPerPage = 50;

// Müdürlükleri yükle
function loadMudurlukler() {
    database.ref('mudurlukler').on('value', (snapshot) => {
        mudurluklerData = [];
        snapshot.forEach((child) => {
            mudurluklerData.push({
                id: child.key,
                name: child.val().name || child.val()
            });
        });
        console.log(`Toplam ${mudurluklerData.length} müdürlük yüklendi`);
        currentPageMudurluk = 1;
        displayMudurlukler();
    });
}

function displayMudurlukler(dataToDisplay = null) {
    const list = document.getElementById('mudurluk-list');
    const data = dataToDisplay || mudurluklerData;
    
    if (data.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #718096;">Henüz müdürlük eklenmemiş</p>';
        return;
    }
    
    // Sayfalama hesapla
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPageMudurluk - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = data.slice(startIndex, endIndex);
    
    list.innerHTML = `
        <div class="pagination-info">
            Toplam ${data.length} kayıt - Sayfa ${currentPageMudurluk} / ${totalPages}
        </div>
        ${pageData.map(item => `
            <div class="item-card">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                </div>
                <div class="item-actions">
                    <button class="btn-icon btn-edit" onclick="editMudurluk('${item.id}', '${item.name}')">✏️ Düzenle</button>
                    <button class="btn-icon btn-delete" onclick="deleteMudurluk('${item.id}', '${item.name}')">🗑️ Sil</button>
                </div>
            </div>
        `).join('')}
        ${totalPages > 1 ? `
            <div class="pagination">
                <button onclick="changeMudurlukPage(${currentPageMudurluk - 1})" ${currentPageMudurluk === 1 ? 'disabled' : ''}>◀ Önceki</button>
                <span>Sayfa ${currentPageMudurluk} / ${totalPages}</span>
                <button onclick="changeMudurlukPage(${currentPageMudurluk + 1})" ${currentPageMudurluk === totalPages ? 'disabled' : ''}>Sonraki ▶</button>
            </div>
        ` : ''}
    `;
}

window.changeMudurlukPage = function(page) {
    const totalPages = Math.ceil(mudurluklerData.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPageMudurluk = page;
        displayMudurlukler();
    }
};

// Çalışanları yükle
function loadCalisanlar() {
    database.ref('calisanlar').on('value', (snapshot) => {
        calisanlarData = [];
        snapshot.forEach((child) => {
            calisanlarData.push({
                id: child.key,
                name: child.val().name || child.val()
            });
        });
        console.log(`Toplam ${calisanlarData.length} çalışan yüklendi`);
        currentPageCalisan = 1;
        displayCalisanlar();
    });
}

function displayCalisanlar(dataToDisplay = null) {
    const list = document.getElementById('calisan-list');
    const data = dataToDisplay || calisanlarData;
    
    if (data.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #718096;">Henüz çalışan eklenmemiş</p>';
        return;
    }
    
    // Sayfalama hesapla
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPageCalisan - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = data.slice(startIndex, endIndex);
    
    list.innerHTML = `
        <div class="pagination-info">
            Toplam ${data.length} kayıt - Sayfa ${currentPageCalisan} / ${totalPages}
        </div>
        ${pageData.map(item => `
            <div class="item-card">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                </div>
                <div class="item-actions">
                    <button class="btn-icon btn-edit" onclick="editCalisan('${item.id}', '${item.name}')">✏️ Düzenle</button>
                    <button class="btn-icon btn-delete" onclick="deleteCalisan('${item.id}', '${item.name}')">🗑️ Sil</button>
                </div>
            </div>
        `).join('')}
        ${totalPages > 1 ? `
            <div class="pagination">
                <button onclick="changeCalisanPage(${currentPageCalisan - 1})" ${currentPageCalisan === 1 ? 'disabled' : ''}>◀ Önceki</button>
                <span>Sayfa ${currentPageCalisan} / ${totalPages}</span>
                <button onclick="changeCalisanPage(${currentPageCalisan + 1})" ${currentPageCalisan === totalPages ? 'disabled' : ''}>Sonraki ▶</button>
            </div>
        ` : ''}
    `;
}

window.changeCalisanPage = function(page) {
    const totalPages = Math.ceil(calisanlarData.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPageCalisan = page;
        displayCalisanlar();
    }
};

// Teknisyenleri yükle
function loadTeknisyenler() {
    database.ref('teknisyenler').on('value', (snapshot) => {
        teknisyenlerData = [];
        snapshot.forEach((child) => {
            teknisyenlerData.push({
                id: child.key,
                name: child.val().name || child.val()
            });
        });
        console.log(`Toplam ${teknisyenlerData.length} teknisyen yüklendi`);
        currentPageTeknisyen = 1;
        displayTeknisyenler();
    });
}

function displayTeknisyenler(dataToDisplay = null) {
    const list = document.getElementById('teknisyen-list');
    const data = dataToDisplay || teknisyenlerData;
    
    if (data.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #718096;">Henüz teknisyen eklenmemiş</p>';
        return;
    }
    
    // Sayfalama hesapla
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPageTeknisyen - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = data.slice(startIndex, endIndex);
    
    list.innerHTML = `
        <div class="pagination-info">
            Toplam ${data.length} kayıt - Sayfa ${currentPageTeknisyen} / ${totalPages}
        </div>
        ${pageData.map(item => `
            <div class="item-card">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                </div>
                <div class="item-actions">
                    <button class="btn-icon btn-edit" onclick="editTeknisyen('${item.id}', '${item.name}')">✏️ Düzenle</button>
                    <button class="btn-icon btn-delete" onclick="deleteTeknisyen('${item.id}', '${item.name}')">🗑️ Sil</button>
                </div>
            </div>
        `).join('')}
        ${totalPages > 1 ? `
            <div class="pagination">
                <button onclick="changeTeknisyenPage(${currentPageTeknisyen - 1})" ${currentPageTeknisyen === 1 ? 'disabled' : ''}>◀ Önceki</button>
                <span>Sayfa ${currentPageTeknisyen} / ${totalPages}</span>
                <button onclick="changeTeknisyenPage(${currentPageTeknisyen + 1})" ${currentPageTeknisyen === totalPages ? 'disabled' : ''}>Sonraki ▶</button>
            </div>
        ` : ''}
    `;
}

window.changeTeknisyenPage = function(page) {
    const totalPages = Math.ceil(teknisyenlerData.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPageTeknisyen = page;
        displayTeknisyenler();
    }
};

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
        const searchValue = e.target.value.toLowerCase().trim();
        if (searchValue === '') {
            currentPageMudurluk = 1;
            displayMudurlukler();
        } else {
            const filtered = mudurluklerData.filter(m => 
                m.name.toLowerCase().includes(searchValue)
            );
            currentPageMudurluk = 1;
            displayMudurlukler(filtered);
        }
    });
    
    document.getElementById('calisan-search')?.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase().trim();
        if (searchValue === '') {
            currentPageCalisan = 1;
            displayCalisanlar();
        } else {
            const filtered = calisanlarData.filter(c => 
                c.name.toLowerCase().includes(searchValue)
            );
            currentPageCalisan = 1;
            displayCalisanlar(filtered);
        }
    });
    
    document.getElementById('teknisyen-search')?.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase().trim();
        if (searchValue === '') {
            currentPageTeknisyen = 1;
            displayTeknisyenler();
        } else {
            const filtered = teknisyenlerData.filter(t => 
                t.name.toLowerCase().includes(searchValue)
            );
            currentPageTeknisyen = 1;
            displayTeknisyenler(filtered);
        }
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
