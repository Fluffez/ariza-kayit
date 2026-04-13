// Yeni Özellikler - Arama, Filtreler, Export, Dark Mode

// NOT: allArizalar global değişkeni app.js'de tanımlı

// Excel Export
const excelBtn = document.getElementById('excel-export');
if (excelBtn) {
    excelBtn.addEventListener('click', () => {
        exportToExcel();
    });
}

function exportToExcel() {
    // allArizalar app.js'den geliyor
    if (!window.allArizalar || !allArizalar || allArizalar.length === 0) {
        showToast('Dışa aktarılacak veri yok', 'warning');
        return;
    }
    
    try {
        const data = allArizalar.map(ariza => ({
            'ID': ariza.id ? ariza.id.substring(0, 8) : 'N/A',
            'Müdürlük': ariza.birim || '',
            'Cihaz Türü': ariza.cihaz_turu || '',
            'Arıza Türü': ariza.ariza_turu || '',
            'Talep Eden': ariza.talep_eden || '',
            'Arıza Açıklaması': ariza.aciklama || '',
            'Yapılan İşler': ariza.yapilan_isler || '',
            'Atanan Kişi': ariza.atanan_kisi || '',
            'Durum': getDurumText(ariza.durum || 'beklemede'),
            'Tarih': ariza.tarih || new Date(ariza.timestamp).toLocaleDateString('tr-TR')
        }));
        
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Arıza Kayıtları');
        
        const tarih = new Date().toLocaleDateString('tr-TR').replace(/\./g, '-');
        XLSX.writeFile(wb, `ariza-kayitlari-${tarih}.xlsx`);
        
        showToast('Excel dosyası indirildi', 'success');
        if (typeof playSound === 'function') playSound('success');
    } catch (error) {
        console.error('Excel export hatası:', error);
        showToast('Excel oluşturulurken hata oluştu: ' + error.message, 'error');
    }
}

// PDF Export
const pdfBtn = document.getElementById('pdf-export');
if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
        exportToPDF();
    });
}

function exportToPDF() {
    // allArizalar app.js'den geliyor
    if (!window.allArizalar || !allArizalar || allArizalar.length === 0) {
        showToast('Dışa aktarılacak veri yok', 'warning');
        return;
    }
    
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Başlık
        doc.setFontSize(16);
        doc.text('Dosemealti Belediyesi', 105, 15, { align: 'center' });
        doc.setFontSize(12);
        doc.text('Bilgi Islem Ariza Kayitlari', 105, 22, { align: 'center' });
        doc.setFontSize(10);
        doc.text(`Rapor Tarihi: ${new Date().toLocaleDateString('tr-TR')}`, 105, 28, { align: 'center' });
        
        // İstatistikler
        const beklemede = allArizalar.filter(a => a.durum === 'beklemede').length;
        const devamEdiyor = allArizalar.filter(a => a.durum === 'devam-ediyor').length;
        const tamamlandi = allArizalar.filter(a => a.durum === 'tamamlandi').length;
        
        doc.setFontSize(10);
        doc.text(`Toplam: ${allArizalar.length} | Beklemede: ${beklemede} | Devam Ediyor: ${devamEdiyor} | Tamamlandi: ${tamamlandi}`, 105, 35, { align: 'center' });
        
        // Türkçe karakterleri değiştir
        const turkishToEnglish = (text) => {
            if (!text) return '';
            return text
                .replace(/ğ/g, 'g').replace(/Ğ/g, 'G')
                .replace(/ü/g, 'u').replace(/Ü/g, 'U')
                .replace(/ş/g, 's').replace(/Ş/g, 'S')
                .replace(/ı/g, 'i').replace(/İ/g, 'I')
                .replace(/ö/g, 'o').replace(/Ö/g, 'O')
                .replace(/ç/g, 'c').replace(/Ç/g, 'C');
        };
        
        // Tablo
        const tableData = allArizalar.map(ariza => [
            ariza.id.substring(0, 8),
            turkishToEnglish(ariza.birim),
            turkishToEnglish(ariza.cihaz_turu),
            turkishToEnglish(ariza.talep_eden),
            turkishToEnglish(getDurumText(ariza.durum)),
            ariza.tarih
        ]);
        
        doc.autoTable({
            startY: 40,
            head: [['ID', 'Mudurluk', 'Cihaz', 'Talep Eden', 'Durum', 'Tarih']],
            body: tableData,
            styles: { 
                fontSize: 8,
                font: 'helvetica'
            },
            headStyles: { 
                fillColor: [102, 126, 234],
                font: 'helvetica',
                fontStyle: 'bold'
            }
        });
        
        const tarih = new Date().toLocaleDateString('tr-TR').replace(/\./g, '-');
        doc.save(`ariza-raporu-${tarih}.pdf`);
        
        showToast('PDF raporu indirildi', 'success');
        if (typeof playSound === 'function') playSound('success');
    } catch (error) {
        console.error('PDF export hatası:', error);
        showToast('PDF oluşturulurken hata oluştu: ' + error.message, 'error');
    }
}

// Dark Mode
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
    // Dark mode toggle - showMainApp'te yükleniyor
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        darkModeToggle.textContent = isDark ? '☀️' : '🌙';
        showToast(isDark ? 'Karanlık mod aktif' : 'Aydınlık mod aktif', 'success');
    });
}

// Bildirim Sesleri
function playSound(type) {
    const sounds = {
        success: [523.25, 659.25, 783.99], // C, E, G
        error: [392.00, 329.63], // G, E
        warning: [440.00, 493.88] // A, B
    };
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const frequencies = sounds[type] || sounds.success;
    
    frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        const startTime = audioContext.currentTime + (index * 0.1);
        gainNode.gain.setValueAtTime(0.1, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.1);
    });
}

// Atanan kişi autocomplete
const atananInput = document.getElementById('atanan-kisi');
const atananSuggestions = document.getElementById('atanan-suggestions');

let teknisyenler = [];

// Teknisyenleri Supabase'den yükle
if (typeof db !== 'undefined') {
    db.getTeknisyenler().then(data => {
        teknisyenler = data.map(t => t.name);
        console.log('Teknisyenler yüklendi:', teknisyenler.length);
    }).catch(error => {
        console.error('Teknisyen yükleme hatası:', error);
    });
}

if (atananInput) {
    atananInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        
        if (!value) {
            atananSuggestions.classList.remove('active');
            return;
        }
        
        const filtered = teknisyenler.filter(t => 
            t.toLowerCase().includes(value)
        );
        
        if (filtered.length > 0) {
            atananSuggestions.innerHTML = filtered.map(t => 
                `<div class="suggestion-item" data-value="${t}">${t}</div>`
            ).join('');
            atananSuggestions.classList.add('active');
            
            atananSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', function() {
                    atananInput.value = this.dataset.value;
                    atananSuggestions.classList.remove('active');
                });
            });
        } else {
            atananSuggestions.classList.remove('active');
        }
    });
}

// Hatırlatıcılar - Uzun süre bekleyen arızalar için
function hatirlaticiKontrol() {
    const simdi = Date.now();
    const birGun = 24 * 60 * 60 * 1000;
    
    tumArizalar.forEach(ariza => {
        if (ariza.durum !== 'tamamlandi') {
            const gecenSure = simdi - ariza.timestamp;
            if (gecenSure > birGun * 3) { // 3 günden eski
                console.log(`Hatırlatıcı: ${ariza.id} - ${ariza.birim} - ${Math.floor(gecenSure / birGun)} gündür bekliyor`);
            }
        }
    });
}

// Her 1 saatte bir hatırlatıcı kontrolü
setInterval(hatirlaticiKontrol, 60 * 60 * 1000);
