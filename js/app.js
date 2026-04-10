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

// Çalışanlar listesi
const calisanlar = [
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

// Talep eden autocomplete (çalışanlar listesinden)
talepInput.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    currentFocus = -1;
    
    if (!value || value.length < 1) {
        talepSuggestions.classList.remove('active');
        return;
    }
    
    const filtered = calisanlar.filter(c => 
        c.toLowerCase().includes(value)
    );
    
    if (filtered.length > 0) {
        talepSuggestions.innerHTML = filtered.slice(0, 10).map(c => 
            `<div class="suggestion-item" data-value="${c}">${c}</div>`
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
    
    // Validasyon
    let isValid = true;
    
    // Müdürlük kontrolü
    const birimValue = document.getElementById('birim').value.trim();
    const birimError = document.getElementById('birim-error');
    const birimInput = document.getElementById('birim');
    
    if (!birimValue) {
        birimError.textContent = 'Lütfen müdürlük seçiniz';
        birimInput.classList.add('error');
        isValid = false;
    } else if (!mudurlukler.includes(birimValue)) {
        birimError.textContent = 'Lütfen listeden bir müdürlük seçiniz';
        birimInput.classList.add('error');
        isValid = false;
    } else {
        birimError.textContent = '';
        birimInput.classList.remove('error');
    }
    
    // Cihaz türü kontrolü
    const cihazValue = document.getElementById('cihaz-turu').value;
    const cihazError = document.getElementById('cihaz-error');
    const cihazInput = document.getElementById('cihaz-turu');
    
    if (!cihazValue) {
        cihazError.textContent = 'Lütfen cihaz türü seçiniz';
        cihazInput.classList.add('error');
        isValid = false;
    } else {
        cihazError.textContent = '';
        cihazInput.classList.remove('error');
    }
    
    // Arıza türü kontrolü
    const arizaTuruValue = document.getElementById('ariza-turu').value;
    const arizaTuruError = document.getElementById('ariza-turu-error');
    const arizaTuruInput = document.getElementById('ariza-turu');
    
    if (!arizaTuruValue) {
        arizaTuruError.textContent = 'Lütfen arıza türü seçiniz';
        arizaTuruInput.classList.add('error');
        isValid = false;
    } else {
        arizaTuruError.textContent = '';
        arizaTuruInput.classList.remove('error');
    }
    
    // Talep eden kontrolü
    const talepValue = document.getElementById('talep-eden').value.trim();
    const talepError = document.getElementById('talep-error');
    const talepInput = document.getElementById('talep-eden');
    
    if (!talepValue) {
        talepError.textContent = 'Lütfen talep eden bilgisini giriniz';
        talepInput.classList.add('error');
        isValid = false;
    } else {
        talepError.textContent = '';
        talepInput.classList.remove('error');
    }
    
    // Yapılan işler kontrolü
    const yapilanValue = document.getElementById('yapilan-isler').value.trim();
    const yapilanError = document.getElementById('yapilan-error');
    const yapilanInput = document.getElementById('yapilan-isler');
    
    if (!yapilanValue) {
        yapilanError.textContent = 'Lütfen yapılan işleri giriniz';
        yapilanInput.classList.add('error');
        isValid = false;
    } else {
        yapilanError.textContent = '';
        yapilanInput.classList.remove('error');
    }
    
    if (!isValid) {
        showToast('Lütfen tüm zorunlu alanları doldurunuz', 'error');
        return;
    }
    
    const arizaData = {
        birim: birimValue,
        cihazTuru: document.getElementById('cihaz-turu').value,
        arizaTuru: document.getElementById('ariza-turu').value,
        aciklama: document.getElementById('aciklama').value.trim() || '',
        yapilanIsler: yapilanValue,
        talepEden: talepValue,
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
            showToast('Kayıt başarıyla güncellendi', 'success');
        } else {
            // Yeni kayıt
            await database.ref('arizalar').push(arizaData);
            showToast('Yeni kayıt başarıyla eklendi', 'success');
        }
        form.reset();
        // Hata mesajlarını temizle
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        modal.classList.remove('active');
        editingId = null;
    } catch (error) {
        console.error('Hata:', error);
        showToast('İşlem sırasında bir hata oluştu!', 'error');
    }
});

// Durum filtreleme
durumFiltre.addEventListener('change', () => {
    arizalariYukle();
});

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
                <button class="btn-small btn-sil" onclick="silArizaKaydi('${ariza.id}')">Sil</button>
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
    })
    .then(() => {
        const durumMetinleri = {
            'beklemede': 'Beklemede',
            'devam-ediyor': 'Devam Ediyor',
            'tamamlandi': 'Tamamlandı'
        };
        showToast(`Durum "${durumMetinleri[yeniDurum]}" olarak güncellendi`, 'success');
    })
    .catch(error => {
        console.error('Hata:', error);
        showToast('Durum güncellenirken bir hata oluştu!', 'error');
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

// Sil - Global fonksiyon
let deleteCallback = null;

window.silArizaKaydi = function(id) {
    const confirmModal = document.getElementById('confirm-modal');
    confirmModal.classList.add('active');
    
    deleteCallback = () => {
        database.ref('arizalar/' + id).remove()
            .then(() => {
                showToast('Kayıt başarıyla silindi', 'success');
            })
            .catch(error => {
                console.error('Hata:', error);
                showToast('Kayıt silinirken bir hata oluştu!', 'error');
            });
    };
}

// Confirmation modal kontrolleri
document.getElementById('confirm-yes').addEventListener('click', () => {
    document.getElementById('confirm-modal').classList.remove('active');
    if (deleteCallback) {
        deleteCallback();
        deleteCallback = null;
    }
});

document.getElementById('confirm-no').addEventListener('click', () => {
    document.getElementById('confirm-modal').classList.remove('active');
    deleteCallback = null;
});

// Toast notification
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
