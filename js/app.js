// Müdürlükler listesi
const mudurlukler = [
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

// Talep edenler listesi (Firebase'den otomatik toplanacak)
let talepEdenler = [];

// Login kontrolü
const loginScreen = document.getElementById('login-screen');
const mainApp = document.getElementById('main-app');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

// Sayfa yüklendiğinde login kontrolü
window.addEventListener('DOMContentLoaded', () => {
    const remembered = localStorage.getItem('rememberedUser');
    if (remembered === 'true') {
        showMainApp();
    }
});

// Login form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    if (username === 'dosemealti123' && password === 'dosemealti123') {
        if (rememberMe) {
            localStorage.setItem('rememberedUser', 'true');
        } else {
            localStorage.removeItem('rememberedUser');
        }
        showMainApp();
    } else {
        alert('Kullanıcı adı veya şifre hatalı!');
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('rememberedUser');
    loginScreen.style.display = 'flex';
    mainApp.style.display = 'none';
    loginForm.reset();
});

function showMainApp() {
    loginScreen.style.display = 'none';
    mainApp.style.display = 'block';
    arizalariYukle();
    talepEdenleriYukle();
}

// DOM elementleri
const modal = document.getElementById('modal');
const fabBtn = document.getElementById('fab-btn');
const closeBtn = document.getElementById('close-btn');
const form = document.getElementById('ariza-form');
const arizaListesi = document.getElementById('ariza-listesi');
const durumFiltre = document.getElementById('durum-filtre');

let editingId = null;

// Autocomplete için
const birimInput = document.getElementById('birim');
const birimSuggestions = document.getElementById('birim-suggestions');
const talepInput = document.getElementById('talep-eden');
const talepSuggestions = document.getElementById('talep-suggestions');

let currentFocus = -1;

// Müdürlük autocomplete
birimInput.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    currentFocus = -1;
    
    if (!value) {
        birimSuggestions.classList.remove('active');
        return;
    }
    
    const filtered = mudurlukler.filter(m => 
        m.toLowerCase().includes(value)
    );
    
    if (filtered.length > 0) {
        birimSuggestions.innerHTML = filtered.map(m => 
            `<div class="suggestion-item" data-value="${m}">${m}</div>`
        ).join('');
        birimSuggestions.classList.add('active');
        
        // Click event
        birimSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                birimInput.value = this.dataset.value;
                birimSuggestions.classList.remove('active');
            });
        });
    } else {
        birimSuggestions.classList.remove('active');
    }
});

// Talep eden autocomplete
talepInput.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    currentFocus = -1;
    
    if (!value || value.length < 2) {
        talepSuggestions.classList.remove('active');
        return;
    }
    
    const filtered = talepEdenler.filter(t => 
        t.toLowerCase().includes(value)
    );
    
    if (filtered.length > 0) {
        talepSuggestions.innerHTML = filtered.map(t => 
            `<div class="suggestion-item" data-value="${t}">${t}</div>`
        ).join('');
        talepSuggestions.classList.add('active');
        
        // Click event
        talepSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                talepInput.value = this.dataset.value;
                talepSuggestions.classList.remove('active');
            });
        });
    } else {
        talepSuggestions.classList.remove('active');
    }
});

// Keyboard navigation
function handleKeyDown(e, input, suggestions) {
    const items = suggestions.querySelectorAll('.suggestion-item');
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentFocus++;
        if (currentFocus >= items.length) currentFocus = 0;
        setActive(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentFocus--;
        if (currentFocus < 0) currentFocus = items.length - 1;
        setActive(items);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentFocus > -1 && items[currentFocus]) {
            input.value = items[currentFocus].dataset.value;
            suggestions.classList.remove('active');
            currentFocus = -1;
        }
    } else if (e.key === 'Escape') {
        suggestions.classList.remove('active');
        currentFocus = -1;
    }
}

function setActive(items) {
    items.forEach((item, index) => {
        item.classList.remove('highlighted');
        if (index === currentFocus) {
            item.classList.add('highlighted');
            item.scrollIntoView({ block: 'nearest' });
        }
    });
}

birimInput.addEventListener('keydown', (e) => handleKeyDown(e, birimInput, birimSuggestions));
talepInput.addEventListener('keydown', (e) => handleKeyDown(e, talepInput, talepSuggestions));

// Click outside to close
document.addEventListener('click', (e) => {
    if (!birimInput.contains(e.target) && !birimSuggestions.contains(e.target)) {
        birimSuggestions.classList.remove('active');
    }
    if (!talepInput.contains(e.target) && !talepSuggestions.contains(e.target)) {
        talepSuggestions.classList.remove('active');
    }
});

// Modal kontrolleri
fabBtn.addEventListener('click', () => {
    editingId = null;
    form.reset();
    document.querySelector('.modal-header h3').textContent = 'Yeni Arıza Kaydı';
    modal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    form.reset();
    editingId = null;
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        form.reset();
        editingId = null;
    }
});

// Form gönderimi
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const arizaData = {
        birim: document.getElementById('birim').value,
        cihazTuru: document.getElementById('cihaz-turu').value,
        arizaTuru: document.getElementById('ariza-turu').value,
        aciklama: document.getElementById('aciklama').value || '',
        yapilanIsler: document.getElementById('yapilan-isler').value,
        talepEden: document.getElementById('talep-eden').value,
        durum: editingId ? undefined : 'beklemede',
        tarih: new Date().toLocaleString('tr-TR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }),
        timestamp: Date.now()
    };
    
    try {
        if (editingId) {
            // Güncelleme
            await database.ref('arizalar/' + editingId).update(arizaData);
        } else {
            // Yeni kayıt
            await database.ref('arizalar').push(arizaData);
        }
        form.reset();
        modal.classList.remove('active');
        editingId = null;
    } catch (error) {
        console.error('Hata:', error);
        alert('İşlem sırasında bir hata oluştu!');
    }
});

// Durum filtreleme
durumFiltre.addEventListener('change', () => {
    arizalariYukle();
});

// Talep edenleri yükle
function talepEdenleriYukle() {
    database.ref('arizalar').on('value', (snapshot) => {
        const uniqueNames = new Set();
        snapshot.forEach((childSnapshot) => {
            const ariza = childSnapshot.val();
            if (ariza.talepEden) {
                uniqueNames.add(ariza.talepEden);
            }
        });
        talepEdenler = Array.from(uniqueNames).sort();
    });
}

// Arızaları yükle
function arizalariYukle() {
    const filtre = durumFiltre.value;
    
    database.ref('arizalar').orderByChild('timestamp').on('value', (snapshot) => {
        const arizalar = [];
        snapshot.forEach((childSnapshot) => {
            arizalar.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        
        // Tersten sırala (en yeni üstte)
        arizalar.reverse();
        
        // Filtrele
        const filtrelenmis = filtre === 'tumu' 
            ? arizalar 
            : arizalar.filter(a => a.durum === filtre);
        
        arizalariGoster(filtrelenmis);
    });
}

// Arızaları göster
function arizalariGoster(arizalar) {
    if (arizalar.length === 0) {
        arizaListesi.innerHTML = `
            <div class="empty-state">
                <h3>Henüz arıza kaydı yok</h3>
                <p>Yeni kayıt eklemek için + butonuna tıklayın</p>
            </div>
        `;
        return;
    }
    
    arizaListesi.innerHTML = arizalar.map(ariza => `
        <div class="ariza-item">
            <div class="ariza-header">
                <span class="ariza-id">#${ariza.id.substring(0, 8)}</span>
                <span class="durum-badge durum-${ariza.durum}">${durumMetni(ariza.durum)}</span>
            </div>
            <div class="ariza-info">
                <div class="info-item"><strong>Müdürlük:</strong> ${ariza.birim}</div>
                <div class="info-item"><strong>Cihaz:</strong> ${ariza.cihazTuru}</div>
                <div class="info-item"><strong>Arıza Türü:</strong> ${ariza.arizaTuru}</div>
                <div class="info-item"><strong>Talep Eden:</strong> ${ariza.talepEden}</div>
                <div class="info-item"><strong>Tarih:</strong> ${ariza.tarih}</div>
            </div>
            ${ariza.aciklama ? `<div class="ariza-aciklama"><strong>Arıza:</strong> ${ariza.aciklama}</div>` : ''}
            ${ariza.yapilanIsler ? `<div class="ariza-aciklama"><strong>Yapılan İşler:</strong> ${ariza.yapilanIsler}</div>` : ''}
            <div class="ariza-actions">
                ${ariza.durum === 'beklemede' ? 
                    `<button class="btn-small btn-devam" onclick="durumDegistir('${ariza.id}', 'devam-ediyor')">Devam Ediyor</button>` 
                    : ''}
                ${ariza.durum !== 'tamamlandi' ? 
                    `<button class="btn-small btn-tamamla" onclick="durumDegistir('${ariza.id}', 'tamamlandi')">Tamamla</button>` 
                    : ''}
                <button class="btn-small btn-duzenle" onclick="duzenle('${ariza.id}')">Düzenle</button>
                <button class="btn-small btn-sil" onclick="sil('${ariza.id}')">Sil</button>
            </div>
        </div>
    `).join('');
}

// Durum metni
function durumMetni(durum) {
    const durumlar = {
        'beklemede': 'Beklemede',
        'devam-ediyor': 'Devam Ediyor',
        'tamamlandi': 'Tamamlandı'
    };
    return durumlar[durum] || durum;
}

// Durum değiştir
function durumDegistir(id, yeniDurum) {
    database.ref('arizalar/' + id).update({
        durum: yeniDurum
    }).catch(error => {
        console.error('Hata:', error);
        alert('Durum güncellenirken bir hata oluştu!');
    });
}

// Düzenle
function duzenle(id) {
    database.ref('arizalar/' + id).once('value', (snapshot) => {
        const ariza = snapshot.val();
        if (ariza) {
            editingId = id;
            document.getElementById('birim').value = ariza.birim;
            document.getElementById('cihaz-turu').value = ariza.cihazTuru;
            document.getElementById('ariza-turu').value = ariza.arizaTuru;
            document.getElementById('aciklama').value = ariza.aciklama || '';
            document.getElementById('yapilan-isler').value = ariza.yapilanIsler || '';
            document.getElementById('talep-eden').value = ariza.talepEden;
            document.querySelector('.modal-header h3').textContent = 'Arıza Kaydını Düzenle';
            modal.classList.add('active');
        }
    });
}

// Sil
function sil(id) {
    if (confirm('Bu arıza kaydını silmek istediğinizden emin misiniz?')) {
        database.ref('arizalar/' + id).remove().catch(error => {
            console.error('Hata:', error);
            alert('Kayıt silinirken bir hata oluştu!');
        });
    }
}
