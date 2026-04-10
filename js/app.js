// DOM elementleri
const modal = document.getElementById('modal');
const fabBtn = document.getElementById('fab-btn');
const closeBtn = document.getElementById('close-btn');
const form = document.getElementById('ariza-form');
const arizaListesi = document.getElementById('ariza-listesi');
const durumFiltre = document.getElementById('durum-filtre');

// Modal kontrolleri
fabBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    form.reset();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        form.reset();
    }
});

// Form gönderimi
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const yeniAriza = {
        birim: document.getElementById('birim').value,
        cihazTuru: document.getElementById('cihaz-turu').value,
        arizaTuru: document.getElementById('ariza-turu').value,
        aciklama: document.getElementById('aciklama').value,
        talepEden: document.getElementById('talep-eden').value,
        telefon: document.getElementById('telefon').value,
        durum: 'beklemede',
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
        await database.ref('arizalar').push(yeniAriza);
        form.reset();
        modal.classList.remove('active');
    } catch (error) {
        console.error('Hata:', error);
        alert('Kayıt eklenirken bir hata oluştu!');
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
                <div class="info-item"><strong>Birim:</strong> ${ariza.birim}</div>
                <div class="info-item"><strong>Cihaz:</strong> ${ariza.cihazTuru}</div>
                <div class="info-item"><strong>Arıza Türü:</strong> ${ariza.arizaTuru}</div>
                <div class="info-item"><strong>Talep Eden:</strong> ${ariza.talepEden}</div>
                <div class="info-item"><strong>Telefon:</strong> ${ariza.telefon}</div>
                <div class="info-item"><strong>Tarih:</strong> ${ariza.tarih}</div>
            </div>
            <div class="ariza-aciklama">${ariza.aciklama}</div>
            <div class="ariza-actions">
                ${ariza.durum === 'beklemede' ? 
                    `<button class="btn-small btn-devam" onclick="durumDegistir('${ariza.id}', 'devam-ediyor')">Devam Ediyor</button>` 
                    : ''}
                ${ariza.durum !== 'tamamlandi' ? 
                    `<button class="btn-small btn-tamamla" onclick="durumDegistir('${ariza.id}', 'tamamlandi')">Tamamla</button>` 
                    : ''}
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

// Sil
function sil(id) {
    if (confirm('Bu arıza kaydını silmek istediğinizden emin misiniz?')) {
        database.ref('arizalar/' + id).remove().catch(error => {
            console.error('Hata:', error);
            alert('Kayıt silinirken bir hata oluştu!');
        });
    }
}

// Sayfa yüklendiğinde arızaları yükle
arizalariYukle();
