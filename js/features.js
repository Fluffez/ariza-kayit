// Yeni Özellikler - Arama, Filtreler, Export, Dark Mode

let tumArizalar = [];
let filtrelenmisArizalar = [];

// Arama fonksiyonu
const aramaInput = document.getElementById('arama-input');
if (aramaInput) {
    aramaInput.addEventListener('input', (e) => {
        aramaYap(e.target.value);
    });
}

function aramaYap(aranacak) {
    const aranan = aranacak.toLowerCase().trim();
    
    if (!aranan) {
        filtrelenmisArizalar = tumArizalar;
    } else {
        filtrelenmisArizalar = tumArizalar.filter(ariza => {
            return (
                ariza.birim?.toLowerCase().includes(aranan) ||
                ariza.talepEden?.toLowerCase().includes(aranan) ||
                ariza.aciklama?.toLowerCase().includes(aranan) ||
                ariza.yapilanIsler?.toLowerCase().includes(aranan) ||
                ariza.cihazTuru?.toLowerCase().includes(aranan) ||
                ariza.arizaTuru?.toLowerCase().includes(aranan)
            );
        });
    }
    
    filtreleriUygula();
}

// Tarih filtresi
const tarihFiltre = document.getElementById('tarih-filtre');
if (tarihFiltre) {
    tarihFiltre.addEventListener('change', () => {
        filtreleriUygula();
    });
}

function tarihFiltreUygula(arizalar) {
    const filtre = tarihFiltre?.value || 'tumu';
    if (filtre === 'tumu') return arizalar;
    
    const simdi = new Date();
    const bugun = new Date(simdi.getFullYear(), simdi.getMonth(), simdi.getDate());
    
    return arizalar.filter(ariza => {
        const arizaTarihi = new Date(ariza.timestamp);
        
        switch (filtre) {
            case 'bugun':
                return arizaTarihi >= bugun;
            case 'bu-hafta':
                const haftaBasi = new Date(bugun);
                haftaBasi.setDate(bugun.getDate() - bugun.getDay());
                return arizaTarihi >= haftaBasi;
            case 'bu-ay':
                const ayBasi = new Date(simdi.getFullYear(), simdi.getMonth(), 1);
                return arizaTarihi >= ayBasi;
            default:
                return true;
        }
    });
}

function filtreleriUygula() {
    let sonuc = filtrelenmisArizalar.length > 0 ? filtrelenmisArizalar : tumArizalar;
    
    // Durum filtresi
    const durumFiltre = document.getElementById('durum-filtre');
    if (durumFiltre && durumFiltre.value !== 'tumu') {
        sonuc = sonuc.filter(a => a.durum === durumFiltre.value);
    }
    
    // Tarih filtresi
    sonuc = tarihFiltreUygula(sonuc);
    
    // İstatistikleri güncelle
    istatistikleriGuncelle(tumArizalar);
    
    // Listeyi göster
    arizalariGoster(sonuc);
}

// İstatistikler
function istatistikleriGuncelle(arizalar) {
    const toplam = arizalar.length;
    const beklemede = arizalar.filter(a => a.durum === 'beklemede').length;
    const devam = arizalar.filter(a => a.durum === 'devam-ediyor').length;
    const tamamlandi = arizalar.filter(a => a.durum === 'tamamlandi').length;
    
    document.getElementById('stat-toplam').textContent = toplam;
    document.getElementById('stat-beklemede').textContent = beklemede;
    document.getElementById('stat-devam').textContent = devam;
    document.getElementById('stat-tamamlandi').textContent = tamamlandi;
}

// Excel Export
const excelBtn = document.getElementById('excel-export');
if (excelBtn) {
    excelBtn.addEventListener('click', () => {
        exportToExcel();
    });
}

function exportToExcel() {
    if (tumArizalar.length === 0) {
        showToast('Dışa aktarılacak veri yok', 'warning');
        return;
    }
    
    const data = tumArizalar.map(ariza => ({
        'ID': ariza.id.substring(0, 8),
        'Müdürlük': ariza.birim,
        'Cihaz Türü': ariza.cihazTuru,
        'Arıza Türü': ariza.arizaTuru,
        'Talep Eden': ariza.talepEden,
        'Arıza Açıklaması': ariza.aciklama || '',
        'Yapılan İşler': ariza.yapilanIsler || '',
        'Atanan Kişi': ariza.atananKisi || '',
        'Durum': durumMetni(ariza.durum),
        'Tarih': ariza.tarih
    }));
    
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Arıza Kayıtları');
    
    const tarih = new Date().toLocaleDateString('tr-TR').replace(/\./g, '-');
    XLSX.writeFile(wb, `ariza-kayitlari-${tarih}.xlsx`);
    
    showToast('Excel dosyası indirildi', 'success');
    playSound('success');
}

// PDF Export
const pdfBtn = document.getElementById('pdf-export');
if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
        exportToPDF();
    });
}

function exportToPDF() {
    if (tumArizalar.length === 0) {
        showToast('Dışa aktarılacak veri yok', 'warning');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Türkçe karakter desteği için font ayarı
    doc.setLanguage("tr");
    
    // Başlık
    doc.setFontSize(16);
    doc.text('Dosemealti Belediyesi', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Bilgi Islem Ariza Kayitlari', 105, 22, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Rapor Tarihi: ${new Date().toLocaleDateString('tr-TR')}`, 105, 28, { align: 'center' });
    
    // İstatistikler
    const beklemede = tumArizalar.filter(a => a.durum === 'beklemede').length;
    const devamEdiyor = tumArizalar.filter(a => a.durum === 'devam-ediyor').length;
    const tamamlandi = tumArizalar.filter(a => a.durum === 'tamamlandi').length;
    
    doc.setFontSize(10);
    doc.text(`Toplam: ${tumArizalar.length} | Beklemede: ${beklemede} | Devam Ediyor: ${devamEdiyor} | Tamamlandi: ${tamamlandi}`, 105, 35, { align: 'center' });
    
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
    const tableData = tumArizalar.map(ariza => [
        ariza.id.substring(0, 8),
        turkishToEnglish(ariza.birim),
        turkishToEnglish(ariza.cihazTuru),
        turkishToEnglish(ariza.talepEden),
        turkishToEnglish(durumMetni(ariza.durum)),
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
    playSound('success');
}

// Dark Mode
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
    // Sayfa yüklendiğinde dark mode durumunu kontrol et
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
    
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

const teknisyenler = [
    "Ahmet Yılmaz",
    "Mehmet Demir",
    "Ayşe Kaya",
    "Fatma Şahin",
    "Ali Çelik"
];

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
