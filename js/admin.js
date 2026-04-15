// Admin Panel JavaScript

// Firebase'den verileri çek
let mudurluklerData = [];
let calisanlarData = [];
let teknisyenlerData = [];
let kullanicilarData = [];
let ayarlarData = {};

// Sayfa yüklendiğinde
window.addEventListener('DOMContentLoaded', () => {
    // Admin kontrolü admin-auth.js tarafından yapılıyor
    
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
async function loadMudurlukler() {
    const list = document.getElementById('mudurluk-list');
    
    try {
        // Skeleton loader göster
        if (list) {
            list.innerHTML = Array(5).fill(0).map(() => `
                <div class="item-card skeleton-card">
                    <div class="skeleton-line" style="width: 60%; height: 20px;"></div>
                </div>
            `).join('');
        }
        
        mudurluklerData = await db.getMudurlukler();
        
        // Minimum 300ms bekle
        await new Promise(resolve => setTimeout(resolve, 300));
        
        console.log(`Toplam ${mudurluklerData.length} müdürlük yüklendi`);
        currentPageMudurluk = 1;
        displayMudurlukler();
    } catch (error) {
        console.error('Müdürlük yükleme hatası:', error);
        showToast('Müdürlükler yüklenirken hata oluştu', 'error');
    }
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
async function loadCalisanlar() {
    const list = document.getElementById('calisan-list');
    
    try {
        // Skeleton loader göster
        if (list) {
            list.innerHTML = Array(5).fill(0).map(() => `
                <div class="item-card skeleton-card">
                    <div class="skeleton-line" style="width: 70%; height: 20px;"></div>
                </div>
            `).join('');
        }
        
        calisanlarData = await db.getCalisanlar();
        
        // Minimum 300ms bekle
        await new Promise(resolve => setTimeout(resolve, 300));
        
        console.log(`Toplam ${calisanlarData.length} çalışan yüklendi`);
        currentPageCalisan = 1;
        displayCalisanlar();
    } catch (error) {
        console.error('Çalışan yükleme hatası:', error);
        showToast('Çalışanlar yüklenirken hata oluştu', 'error');
    }
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
async function loadTeknisyenler() {
    const list = document.getElementById('teknisyen-list');
    
    try {
        // Skeleton loader göster
        if (list) {
            list.innerHTML = Array(5).fill(0).map(() => `
                <div class="item-card skeleton-card">
                    <div class="skeleton-line" style="width: 65%; height: 20px;"></div>
                </div>
            `).join('');
        }
        
        teknisyenlerData = await db.getTeknisyenler();
        
        // Minimum 300ms bekle
        await new Promise(resolve => setTimeout(resolve, 300));
        
        console.log(`Toplam ${teknisyenlerData.length} teknisyen yüklendi`);
        currentPageTeknisyen = 1;
        displayTeknisyenler();
    } catch (error) {
        console.error('Teknisyen yükleme hatası:', error);
        showToast('Teknisyenler yüklenirken hata oluştu', 'error');
    }
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

// Kullanıcıları yükle - Şimdilik kullanılmıyor
function loadKullanicilar() {
    // Kullanıcı yönetimi şimdilik devre dışı
    kullanicilarData = [];
    displayKullanicilar(kullanicilarData);
}

function displayKullanicilar(data) {
    const list = document.getElementById('user-list');
    if (!list) return;
    list.innerHTML = '<p style="text-align: center; color: #718096;">Kullanıcı yönetimi şimdilik devre dışı</p>';
}

// Ayarları yükle - Şimdilik kullanılmıyor
function loadAyarlar() {
    ayarlarData = {
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
    
    // Logout - admin-auth.js tarafından yönetiliyor
    // Burada duplicate event listener eklemeyin
    
    // Modal kapat
    document.getElementById('admin-close-btn')?.addEventListener('click', closeModal);
}

// CRUD İşlemleri - Müdürlük
async function addMudurluk() {
    showModal('Yeni Müdürlük Ekle', `
        <div class="form-group">
            <label>Müdürlük Adı *</label>
            <input type="text" id="modal-input" required placeholder="Örn: Bilgi İşlem Müdürlüğü">
        </div>
    `, async () => {
        const name = document.getElementById('modal-input').value.trim();
        if (!name) {
            showToast('Müdürlük adı boş olamaz', 'error');
            return;
        }
        
        try {
            await db.addMudurluk(name);
            showToast('Müdürlük eklendi', 'success');
            closeModal();
            loadMudurlukler();
        } catch (error) {
            showToast('Hata: ' + error.message, 'error');
        }
    });
}

window.editMudurluk = function(id, name) {
    showModal('Müdürlük Düzenle', `
        <div class="form-group">
            <label>Müdürlük Adı *</label>
            <input type="text" id="modal-input" value="${name}" required>
        </div>
    `, async () => {
        const newName = document.getElementById('modal-input').value.trim();
        if (!newName) {
            showToast('Müdürlük adı boş olamaz', 'error');
            return;
        }
        
        try {
            await db.updateMudurluk(id, newName);
            showToast('Müdürlük güncellendi', 'success');
            closeModal();
            loadMudurlukler();
        } catch (error) {
            showToast('Hata: ' + error.message, 'error');
        }
    });
};

window.deleteMudurluk = async function(id, name) {
    if (confirm(`"${name}" müdürlüğünü silmek istediğinizden emin misiniz?`)) {
        try {
            await db.deleteMudurluk(id);
            showToast('Müdürlük silindi', 'success');
            loadMudurlukler();
        } catch (error) {
            showToast('Hata: ' + error.message, 'error');
        }
    }
};

// CRUD İşlemleri - Çalışan
async function addCalisan() {
    showModal('Yeni Çalışan Ekle', `
        <div class="form-group">
            <label>Çalışan Adı *</label>
            <input type="text" id="modal-input" required placeholder="Örn: 1001 - Ahmet Yılmaz">
        </div>
    `, async () => {
        const name = document.getElementById('modal-input').value.trim();
        if (!name) {
            showToast('Çalışan adı boş olamaz', 'error');
            return;
        }
        
        try {
            await db.addCalisan(name);
            showToast('Çalışan eklendi', 'success');
            closeModal();
            loadCalisanlar();
        } catch (error) {
            showToast('Hata: ' + error.message, 'error');
        }
    });
}

window.editCalisan = function(id, name) {
    showModal('Çalışan Düzenle', `
        <div class="form-group">
            <label>Çalışan Adı *</label>
            <input type="text" id="modal-input" value="${name}" required>
        </div>
    `, async () => {
        const newName = document.getElementById('modal-input').value.trim();
        if (!newName) {
            showToast('Çalışan adı boş olamaz', 'error');
            return;
        }
        
        try {
            await db.updateCalisan(id, newName);
            showToast('Çalışan güncellendi', 'success');
            closeModal();
            loadCalisanlar();
        } catch (error) {
            showToast('Hata: ' + error.message, 'error');
        }
    });
};

window.deleteCalisan = async function(id, name) {
    if (confirm(`"${name}" çalışanını silmek istediğinizden emin misiniz?`)) {
        try {
            await db.deleteCalisan(id);
            showToast('Çalışan silindi', 'success');
            loadCalisanlar();
        } catch (error) {
            showToast('Hata: ' + error.message, 'error');
        }
    }
};

// CRUD İşlemleri - Teknisyen
async function addTeknisyen() {
    showModal('Yeni Teknisyen Ekle', `
        <div class="form-group">
            <label>Teknisyen Adı *</label>
            <input type="text" id="modal-input" required placeholder="Örn: Mehmet Demir">
        </div>
    `, async () => {
        const name = document.getElementById('modal-input').value.trim();
        if (!name) {
            showToast('Teknisyen adı boş olamaz', 'error');
            return;
        }
        
        try {
            await db.addTeknisyen(name);
            showToast('Teknisyen eklendi', 'success');
            closeModal();
            loadTeknisyenler();
        } catch (error) {
            showToast('Hata: ' + error.message, 'error');
        }
    });
}

window.editTeknisyen = function(id, name) {
    showModal('Teknisyen Düzenle', `
        <div class="form-group">
            <label>Teknisyen Adı *</label>
            <input type="text" id="modal-input" value="${name}" required>
        </div>
    `, async () => {
        const newName = document.getElementById('modal-input').value.trim();
        if (!newName) {
            showToast('Teknisyen adı boş olamaz', 'error');
            return;
        }
        
        try {
            await db.updateTeknisyen(id, newName);
            showToast('Teknisyen güncellendi', 'success');
            closeModal();
            loadTeknisyenler();
        } catch (error) {
            showToast('Hata: ' + error.message, 'error');
        }
    });
};

window.deleteTeknisyen = async function(id, name) {
    if (confirm(`"${name}" teknisyenini silmek istediğinizden emin misiniz?`)) {
        try {
            await db.deleteTeknisyen(id);
            showToast('Teknisyen silindi', 'success');
            loadTeknisyenler();
        } catch (error) {
            showToast('Hata: ' + error.message, 'error');
        }
    }
};

// CRUD İşlemleri - Kullanıcı (Şimdilik devre dışı)
function addUser() {
    showToast('Kullanıcı yönetimi şimdilik devre dışı', 'warning');
}

window.editUser = function(id) {
    showToast('Kullanıcı yönetimi şimdilik devre dışı', 'warning');
};

window.deleteUser = function(id, username) {
    showToast('Kullanıcı yönetimi şimdilik devre dışı', 'warning');
};

// Ayarları kaydet (Şimdilik devre dışı)
function saveAyarlar() {
    showToast('Ayarlar kaydedildi (yerel)', 'success');
}

// Yedekleme
async function backupData() {
    try {
        const arizalar = await db.getArizalar();
        const mudurlukler = await db.getMudurlukler();
        const calisanlar = await db.getCalisanlar();
        const teknisyenler = await db.getTeknisyenler();
        
        const data = {
            arizalar,
            mudurlukler,
            calisanlar,
            teknisyenler,
            exportDate: new Date().toISOString()
        };
        
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `yedek-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Yedek indirildi', 'success');
    } catch (error) {
        console.error('Yedekleme hatası:', error);
        showToast('Yedekleme hatası: ' + error.message, 'error');
    }
}

function restoreData(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!confirm('Mevcut tüm veriler silinip yedekten geri yüklenecek. Emin misiniz?')) {
        return;
    }
    
    showToast('Geri yükleme özelliği şimdilik devre dışı', 'warning');
}

async function deleteAllData() {
    const confirmation = prompt('TÜM VERİLER SİLİNECEK! Onaylamak için "SIL" yazın:');
    if (confirmation === 'SIL') {
        try {
            // Tüm arızaları sil
            const arizalar = await db.getArizalar();
            for (const ariza of arizalar) {
                await db.deleteAriza(ariza.id);
            }
            showToast('Tüm arıza kayıtları silindi', 'success');
        } catch (error) {
            showToast('Hata: ' + error.message, 'error');
        }
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
