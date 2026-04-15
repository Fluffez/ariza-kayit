// Yeni Özellikler - Arama, Filtreler, Export, Dark Mode

// NOT: allArizalar global değişkeni app.js'de tanımlı

// Excel Export
const excelBtn = document.getElementById('excel-export');
const excelFilterModal = document.getElementById('excel-filter-modal');
const excelFilterClose = document.getElementById('excel-filter-close');
const excelFilterCancel = document.getElementById('excel-filter-cancel');
const excelFilterExport = document.getElementById('excel-filter-export');
const excelDurumFilter = document.getElementById('excel-durum-filter');
const excelTarihFilter = document.getElementById('excel-tarih-filter');
const excelCustomDates = document.getElementById('excel-custom-dates');
const excelKayitSayisi = document.getElementById('excel-kayit-sayisi');

if (excelBtn) {
    excelBtn.addEventListener('click', () => {
        openExcelFilterModal();
    });
}

if (excelFilterClose) {
    excelFilterClose.addEventListener('click', closeExcelFilterModal);
}

if (excelFilterCancel) {
    excelFilterCancel.addEventListener('click', closeExcelFilterModal);
}

// Modal dışına tıklanınca kapatma (opsiyonel - kullanıcı deneyimi için kapalı)
// excelFilterModal?.addEventListener('click', (e) => {
//     if (e.target === excelFilterModal) {
//         closeExcelFilterModal();
//     }
// });

if (excelFilterExport) {
    excelFilterExport.addEventListener('click', () => {
        // Kayıt sayısı kontrolü
        const filtered = getFilteredArizalarForExcel();
        
        if (filtered.length === 0) {
            showToast('Seçilen filtrelere uygun kayıt bulunamadı', 'warning');
            return;
        }
        
        // Çok fazla kayıt uyarısı
        if (filtered.length > 5000) {
            if (!confirm(`${filtered.length} kayıt aktarılacak. Bu işlem biraz zaman alabilir. Devam etmek istiyor musunuz?`)) {
                return;
            }
        }
        
        exportToExcel();
        closeExcelFilterModal();
    });
}

// Tarih filtresi değiştiğinde özel tarih alanlarını göster/gizle
if (excelTarihFilter) {
    excelTarihFilter.addEventListener('change', () => {
        if (excelTarihFilter.value === 'ozel') {
            excelCustomDates.style.display = 'block';
        } else {
            excelCustomDates.style.display = 'none';
        }
        updateExcelKayitSayisi();
    });
}

// Durum filtresi değiştiğinde kayıt sayısını güncelle
if (excelDurumFilter) {
    excelDurumFilter.addEventListener('change', updateExcelKayitSayisi);
}

// Özel tarihler değiştiğinde kayıt sayısını güncelle ve validasyon yap
document.getElementById('excel-start-date')?.addEventListener('change', function() {
    const endDateInput = document.getElementById('excel-end-date');
    
    // Başlangıç tarihi seçildiğinde, bitiş tarihi için min değer ayarla
    if (this.value) {
        endDateInput.min = this.value;
    } else {
        endDateInput.min = '';
    }
    
    updateExcelKayitSayisi();
});

document.getElementById('excel-end-date')?.addEventListener('change', function() {
    const startDateInput = document.getElementById('excel-start-date');
    
    // Bitiş tarihi seçildiğinde, başlangıç tarihi için max değer ayarla
    if (this.value) {
        startDateInput.max = this.value;
    } else {
        // Bugünün tarihini max olarak ayarla
        const today = new Date().toISOString().split('T')[0];
        startDateInput.max = today;
    }
    
    updateExcelKayitSayisi();
});

function openExcelFilterModal() {
    if (!window.allArizalar || !allArizalar || allArizalar.length === 0) {
        showToast('Dışa aktarılacak veri yok', 'warning');
        return;
    }
    
    // Filtreleri sıfırla
    excelDurumFilter.value = 'tumu';
    excelTarihFilter.value = 'tumu';
    excelCustomDates.style.display = 'none';
    
    // Bugünün tarihini max olarak ayarla (gelecek tarih seçilemesin)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('excel-start-date').value = '';
    document.getElementById('excel-start-date').max = today;
    document.getElementById('excel-end-date').value = '';
    document.getElementById('excel-end-date').max = today;
    
    // Tarih bilgisini gizle
    document.getElementById('excel-tarih-bilgi').style.display = 'none';
    
    updateExcelKayitSayisi();
    excelFilterModal.classList.add('active');
}

function closeExcelFilterModal() {
    excelFilterModal.classList.remove('active');
}

function updateExcelKayitSayisi() {
    const filtered = getFilteredArizalarForExcel();
    excelKayitSayisi.textContent = filtered.length;
    
    // Tarih bilgisi göster
    const tarihBilgi = document.getElementById('excel-tarih-bilgi');
    const tarihValue = excelTarihFilter.value;
    
    if (tarihValue === 'ozel') {
        const startDate = document.getElementById('excel-start-date').value;
        const endDate = document.getElementById('excel-end-date').value;
        
        if (startDate && endDate) {
            tarihBilgi.textContent = `📅 ${formatDate(startDate)} - ${formatDate(endDate)}`;
            tarihBilgi.style.display = 'block';
        } else if (startDate) {
            tarihBilgi.textContent = `📅 ${formatDate(startDate)} tarihinden sonraki kayıtlar`;
            tarihBilgi.style.display = 'block';
        } else if (endDate) {
            tarihBilgi.textContent = `📅 ${formatDate(endDate)} tarihine kadar olan kayıtlar`;
            tarihBilgi.style.display = 'block';
        } else {
            tarihBilgi.style.display = 'none';
        }
    } else if (tarihValue !== 'tumu') {
        const tarihMetinleri = {
            'bugun': '📅 Bugünkü kayıtlar',
            'bu-hafta': '📅 Bu haftaki kayıtlar',
            'bu-ay': '📅 Bu ayki kayıtlar',
            'son-3-ay': '📅 Son 3 aydaki kayıtlar',
            'bu-yil': '📅 Bu yılki kayıtlar'
        };
        tarihBilgi.textContent = tarihMetinleri[tarihValue] || '';
        tarihBilgi.style.display = 'block';
    } else {
        tarihBilgi.style.display = 'none';
    }
    
    // Kayıt sayısı uyarısı
    if (filtered.length === 0) {
        excelKayitSayisi.style.color = '#e53e3e';
    } else if (filtered.length > 1000) {
        excelKayitSayisi.style.color = '#f6ad55';
    } else {
        excelKayitSayisi.style.color = '#48bb78';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function getFilteredArizalarForExcel() {
    let filtered = [...allArizalar];
    
    // Durum filtresi
    const durumValue = excelDurumFilter.value;
    if (durumValue !== 'tumu') {
        filtered = filtered.filter(a => a.durum === durumValue);
    }
    
    // Tarih filtresi
    const tarihValue = excelTarihFilter.value;
    const now = new Date();
    
    if (tarihValue !== 'tumu') {
        filtered = filtered.filter(ariza => {
            const arizaTarih = new Date(ariza.timestamp);
            
            switch (tarihValue) {
                case 'bugun':
                    return arizaTarih.toDateString() === now.toDateString();
                    
                case 'bu-hafta':
                    const haftaBasi = new Date(now);
                    haftaBasi.setDate(now.getDate() - now.getDay());
                    haftaBasi.setHours(0, 0, 0, 0);
                    return arizaTarih >= haftaBasi;
                    
                case 'bu-ay':
                    return arizaTarih.getMonth() === now.getMonth() && 
                           arizaTarih.getFullYear() === now.getFullYear();
                    
                case 'son-3-ay':
                    const ucAyOnce = new Date(now);
                    ucAyOnce.setMonth(now.getMonth() - 3);
                    return arizaTarih >= ucAyOnce;
                    
                case 'bu-yil':
                    return arizaTarih.getFullYear() === now.getFullYear();
                    
                case 'ozel':
                    const startDate = document.getElementById('excel-start-date').value;
                    const endDate = document.getElementById('excel-end-date').value;
                    
                    if (startDate && endDate) {
                        const start = new Date(startDate);
                        const end = new Date(endDate);
                        end.setHours(23, 59, 59, 999);
                        return arizaTarih >= start && arizaTarih <= end;
                    } else if (startDate) {
                        const start = new Date(startDate);
                        return arizaTarih >= start;
                    } else if (endDate) {
                        const end = new Date(endDate);
                        end.setHours(23, 59, 59, 999);
                        return arizaTarih <= end;
                    }
                    return true;
                    
                default:
                    return true;
            }
        });
    }
    
    return filtered;
}

function exportToExcel() {
    // Özel tarih aralığı seçilmişse tarih kontrolü yap
    if (excelTarihFilter.value === 'ozel') {
        const startDate = document.getElementById('excel-start-date').value;
        const endDate = document.getElementById('excel-end-date').value;
        
        if (!startDate && !endDate) {
            showToast('Lütfen başlangıç veya bitiş tarihi seçin', 'warning');
            return;
        }
        
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            
            if (start > end) {
                showToast('Başlangıç tarihi bitiş tarihinden sonra olamaz', 'error');
                return;
            }
        }
    }
    
    const filtered = getFilteredArizalarForExcel();
    
    if (filtered.length === 0) {
        showToast('Seçilen filtrelere uygun veri yok', 'warning');
        return;
    }
    
    try {
        // Düzgün sütunlar halinde veri hazırla - Uzun metinleri kısalt
        const data = filtered.map(ariza => {
            // Uzun metinleri kısaltma fonksiyonu
            const truncate = (text, maxLength) => {
                if (!text) return '';
                text = String(text);
                return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
            };
            
            return {
                'ID': ariza.id ? ariza.id.substring(0, 8) : 'N/A',
                'Müdürlük': truncate(ariza.birim, 50),
                'Cihaz Türü': truncate(ariza.cihaz_turu, 30),
                'Arıza Türü': truncate(ariza.ariza_turu, 30),
                'Talep Eden': truncate(ariza.talep_eden, 40),
                'Arıza Açıklaması': truncate(ariza.aciklama, 100),
                'Yapılan İşler': truncate(ariza.yapilan_isler, 100),
                'Atanan Kişi': truncate(ariza.atanan_kisi, 40),
                'Durum': getDurumText(ariza.durum || 'beklemede'),
                'Tarih': ariza.tarih || new Date(ariza.timestamp).toLocaleDateString('tr-TR')
            };
        });
        
        // Worksheet oluştur
        const ws = XLSX.utils.json_to_sheet(data);
        
        // Sütun genişliklerini ayarla (karaktere göre)
        const colWidths = [
            { wch: 12 },  // ID
            { wch: 35 },  // Müdürlük
            { wch: 18 },  // Cihaz Türü
            { wch: 18 },  // Arıza Türü
            { wch: 30 },  // Talep Eden
            { wch: 50 },  // Arıza Açıklaması
            { wch: 50 },  // Yapılan İşler
            { wch: 25 },  // Atanan Kişi
            { wch: 18 },  // Durum
            { wch: 15 }   // Tarih
        ];
        ws['!cols'] = colWidths;
        
        // Satır yüksekliklerini ayarla (tüm satırlar için)
        const rowHeights = [];
        for (let i = 0; i <= data.length; i++) {
            rowHeights.push({ hpt: 20 }); // 20 piksel yükseklik
        }
        ws['!rows'] = rowHeights;
        
        // Hücre stillerini ayarla (başlık satırı)
        const range = XLSX.utils.decode_range(ws['!ref']);
        
        // Başlık satırı için stil
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const address = XLSX.utils.encode_col(C) + "1";
            if (!ws[address]) continue;
            
            ws[address].s = {
                font: { bold: true, sz: 11 },
                fill: { fgColor: { rgb: "4472C4" } },
                alignment: { horizontal: "center", vertical: "center", wrapText: false }
            };
        }
        
        // Veri satırları için stil
        for (let R = range.s.r + 1; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const address = XLSX.utils.encode_col(C) + (R + 1);
                if (!ws[address]) continue;
                
                ws[address].s = {
                    alignment: { 
                        horizontal: "left", 
                        vertical: "top", 
                        wrapText: false // Text wrapping kapalı - iç içe girmeyi önler
                    }
                };
            }
        }
        
        // Workbook oluştur
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Arıza Kayıtları');
        
        // Dosya adı oluştur
        const tarih = new Date().toLocaleDateString('tr-TR').replace(/\./g, '-');
        const durumText = excelDurumFilter.value !== 'tumu' ? `-${excelDurumFilter.value}` : '';
        let tarihText = '';
        
        // Tarih filtresi için dosya adı
        if (excelTarihFilter.value !== 'tumu') {
            if (excelTarihFilter.value === 'ozel') {
                const startDate = document.getElementById('excel-start-date').value;
                const endDate = document.getElementById('excel-end-date').value;
                
                if (startDate && endDate) {
                    tarihText = `-${startDate}_${endDate}`;
                } else if (startDate) {
                    tarihText = `-${startDate}-sonrasi`;
                } else if (endDate) {
                    tarihText = `-${endDate}-oncesi`;
                }
            } else {
                tarihText = `-${excelTarihFilter.value}`;
            }
        }
        
        XLSX.writeFile(wb, `ariza-kayitlari${durumText}${tarihText}-${tarih}.xlsx`);
        
        showToast(`${filtered.length} kayıt Excel'e aktarıldı`, 'success');
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
    // Input event
    atananInput.addEventListener('input', function() {
        showAtananSuggestions(this.value);
    });
    
    // Focus event (tıklayınca direkt göster)
    atananInput.addEventListener('focus', function() {
        showAtananSuggestions(this.value);
    });
}

function showAtananSuggestions(value) {
    value = value.toLowerCase();
    
    // Boş ise tüm listeyi göster
    const filtered = value ?
        teknisyenler.filter(t => t.toLowerCase().includes(value)) :
        teknisyenler;
    
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
}

// Click outside to close atanan suggestions
document.addEventListener('click', (e) => {
    if (atananInput && atananSuggestions && 
        !atananInput.contains(e.target) && !atananSuggestions.contains(e.target)) {
        atananSuggestions.classList.remove('active');
    }
});

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
