// Sesli Kayıt Sistemi
let recognition;
let isRecording = false;
let fullTranscript = '';
let recognitionTimeout;

// Web Speech API kontrolü
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'tr-TR';
    recognition.continuous = false; // Continuous false yaparak daha stabil çalışır
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    
    // Test için kısa bir deneme
    console.log('Ses tanıma hazır');
} else {
    alert('Tarayıcınız sesli kayıt özelliğini desteklemiyor. Lütfen Chrome veya Edge kullanın.');
}

const voiceBtn = document.getElementById('voice-btn');
const voiceIcon = document.getElementById('voice-icon');
const voiceStatus = document.getElementById('voice-status');
const transcript = document.getElementById('transcript');

voiceBtn.addEventListener('click', () => {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
});

function startRecording() {
    if (!recognition) return;
    
    // Mikrofon izni kontrolü
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
            isRecording = true;
            fullTranscript = '';
            transcript.textContent = '';
            
            voiceBtn.textContent = 'Kaydı Durdur';
            voiceBtn.classList.add('recording');
            voiceIcon.classList.add('recording');
            voiceStatus.textContent = 'Dinliyorum...';
            
            try {
                recognition.start();
                
                // 30 saniye sonra otomatik durdur
                recognitionTimeout = setTimeout(() => {
                    if (isRecording) {
                        stopRecording();
                        showToast('Kayıt süresi doldu', 'warning');
                    }
                }, 30000);
            } catch (error) {
                console.error('Başlatma hatası:', error);
                showToast('Kayıt başlatılamadı. Lütfen tekrar deneyin.', 'error');
                resetRecording();
            }
        })
        .catch((error) => {
            console.error('Mikrofon izni hatası:', error);
            showToast('Mikrofon izni verilmedi. Lütfen tarayıcı ayarlarından mikrofon iznini açın.', 'error');
        });
}

function resetRecording() {
    isRecording = false;
    voiceBtn.textContent = 'Sesli Kayıt Başlat';
    voiceBtn.classList.remove('recording');
    voiceIcon.classList.remove('recording');
    voiceStatus.textContent = 'Kayıt Başlatmak İçin Tıklayın';
    if (recognitionTimeout) {
        clearTimeout(recognitionTimeout);
    }
}

function stopRecording() {
    if (!recognition) return;
    
    isRecording = false;
    
    if (recognitionTimeout) {
        clearTimeout(recognitionTimeout);
    }
    
    try {
        recognition.stop();
    } catch (error) {
        console.error('Durdurma hatası:', error);
    }
    
    voiceBtn.textContent = 'Sesli Kayıt Başlat';
    voiceBtn.classList.remove('recording');
    voiceIcon.classList.remove('recording');
    voiceStatus.textContent = 'Kayıt Tamamlandı';
    
    // Metni işle
    if (fullTranscript.trim()) {
        processTranscript(fullTranscript);
    } else {
        showToast('Hiçbir ses algılanamadı', 'warning');
    }
}

recognition.onresult = (event) => {
    let interimTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            fullTranscript += transcriptPiece + ' ';
        } else {
            interimTranscript += transcriptPiece;
        }
    }
    
    transcript.textContent = fullTranscript + interimTranscript;
};

recognition.onerror = (event) => {
    console.error('Ses tanıma hatası:', event.error);
    
    let errorMessage = 'Ses tanıma hatası';
    let shouldReset = true;
    
    switch(event.error) {
        case 'network':
            errorMessage = '⚠️ Google ses tanıma servisine bağlanılamıyor.\n\nÇözümler:\n1. HTTPS bağlantısı kullanın (http:// değil https://)\n2. localhost kullanıyorsanız sorun olmaz\n3. İnternet bağlantınızı kontrol edin\n4. VPN kullanıyorsanız kapatın\n5. Firewall ayarlarını kontrol edin';
            break;
        case 'not-allowed':
        case 'permission-denied':
            errorMessage = 'Mikrofon izni verilmedi. Tarayıcı ayarlarından mikrofon iznini açın.';
            break;
        case 'no-speech':
            errorMessage = 'Ses algılanamadı. Lütfen tekrar deneyin ve mikrofona yakın konuşun.';
            shouldReset = false; // Tekrar deneyebilir
            break;
        case 'audio-capture':
            errorMessage = 'Mikrofon bulunamadı veya kullanılamıyor. Mikrofon bağlantısını kontrol edin.';
            break;
        case 'aborted':
            errorMessage = 'Kayıt iptal edildi.';
            shouldReset = false;
            break;
        default:
            errorMessage = 'Ses tanıma hatası: ' + event.error;
    }
    
    if (event.error === 'network') {
        // Network hatası için özel uyarı
        if (confirm(errorMessage + '\n\nManuel giriş moduna geçmek ister misiniz?')) {
            window.location.href = 'index.html';
        }
    } else {
        showToast(errorMessage, 'error');
    }
    
    if (shouldReset) {
        resetRecording();
    }
};

recognition.onend = () => {
    console.log('Kayıt sona erdi');
    if (isRecording) {
        // Continuous mode için yeniden başlat
        setTimeout(() => {
            if (isRecording) {
                try {
                    recognition.start();
                    console.log('Yeniden başlatıldı');
                } catch (error) {
                    console.log('Yeniden başlatma hatası:', error);
                    // Hata varsa kullanıcıya bildir ve durdur
                    if (error.message && error.message.includes('already')) {
                        // Zaten çalışıyor, sorun yok
                        return;
                    }
                    resetRecording();
                    showToast('Kayıt sonlandı. Lütfen tekrar başlatın.', 'warning');
                }
            }
        }, 100);
    }
};

// Metni işle ve formu doldur (Basit AI simülasyonu)
function processTranscript(text) {
    const lowerText = text.toLowerCase();
    
    // Müdürlük tespiti
    const mudurlukler = [
        "nar masa", "ruhsat", "evrak", "zabıta", "gelirler", "sağlık", 
        "imar", "plan", "bilgi işlem", "fen işleri", "mali", "yazı işleri",
        "basın yayın", "destek", "insan kaynakları", "emlak", "muhtarlık",
        "iklim", "afet", "hukuk", "özel kalem"
    ];
    
    let bulunanMudurluk = '';
    for (const m of mudurlukler) {
        if (lowerText.includes(m)) {
            bulunanMudurluk = m.charAt(0).toUpperCase() + m.slice(1) + ' Müdürlüğü';
            break;
        }
    }
    
    // Cihaz türü tespiti
    let cihazTuru = '';
    if (lowerText.includes('bilgisayar') || lowerText.includes('pc') || lowerText.includes('masaüstü')) {
        cihazTuru = 'Bilgisayar';
    } else if (lowerText.includes('yazıcı') || lowerText.includes('printer')) {
        cihazTuru = 'Yazıcı';
    } else if (lowerText.includes('tarayıcı') || lowerText.includes('scanner')) {
        cihazTuru = 'Tarayıcı';
    } else if (lowerText.includes('telefon') || lowerText.includes('santral')) {
        cihazTuru = 'Telefon';
    } else if (lowerText.includes('ağ') || lowerText.includes('internet') || lowerText.includes('switch')) {
        cihazTuru = 'Ağ Cihazı';
    }
    
    // Arıza türü tespiti
    let arizaTuru = '';
    if (lowerText.includes('donanım') || lowerText.includes('bozuk') || lowerText.includes('kırık')) {
        arizaTuru = 'Donanım';
    } else if (lowerText.includes('yazılım') || lowerText.includes('program') || lowerText.includes('uygulama')) {
        arizaTuru = 'Yazılım';
    } else if (lowerText.includes('ağ') || lowerText.includes('internet') || lowerText.includes('bağlantı')) {
        arizaTuru = 'Ağ';
    } else if (lowerText.includes('kullanıcı') || lowerText.includes('yanlış')) {
        arizaTuru = 'Kullanıcı Hatası';
    }
    
    // Talep eden tespiti (dahili numara veya isim)
    const dahiliMatch = text.match(/\b\d{4}\b/);
    let talepEden = dahiliMatch ? dahiliMatch[0] : '';
    
    // Formu doldur
    document.getElementById('ai-birim').value = bulunanMudurluk;
    document.getElementById('ai-cihaz').value = cihazTuru;
    document.getElementById('ai-ariza-turu').value = arizaTuru;
    document.getElementById('ai-talep-eden').value = talepEden;
    document.getElementById('ai-aciklama').value = text;
    document.getElementById('ai-yapilan').value = 'Arıza kaydedildi, inceleme yapılacak';
    
    showToast('Form otomatik olarak dolduruldu', 'success');
}

// Form gönderimi
const stajyerForm = document.getElementById('stajyer-form');
stajyerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const arizaData = {
        birim: document.getElementById('ai-birim').value,
        cihazTuru: document.getElementById('ai-cihaz').value,
        arizaTuru: document.getElementById('ai-ariza-turu').value,
        talepEden: document.getElementById('ai-talep-eden').value,
        aciklama: document.getElementById('ai-aciklama').value,
        yapilanIsler: document.getElementById('ai-yapilan').value,
        durum: 'beklemede',
        tarih: new Date().toLocaleString('tr-TR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }),
        timestamp: Date.now(),
        kayitTuru: 'sesli'
    };
    
    try {
        await database.ref('arizalar').push(arizaData);
        showToast('Kayıt başarıyla eklendi', 'success');
        
        // Formu temizle
        stajyerForm.reset();
        fullTranscript = '';
        transcript.textContent = '';
    } catch (error) {
        console.error('Hata:', error);
        showToast('Kayıt eklenirken bir hata oluştu!', 'error');
    }
});

// Logout
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('rememberedUser');
    window.location.href = 'index.html';
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


// Manuel mod toggle
let manuelMod = false;
const manuelBtn = document.getElementById('manuel-mod');
const formInputs = document.querySelectorAll('.form-readonly');

manuelBtn.addEventListener('click', () => {
    manuelMod = !manuelMod;
    
    formInputs.forEach(input => {
        if (manuelMod) {
            input.removeAttribute('readonly');
            input.classList.remove('form-readonly');
        } else {
            input.setAttribute('readonly', 'readonly');
            input.classList.add('form-readonly');
        }
    });
    
    manuelBtn.textContent = manuelMod ? '🎤 Sesli Mod' : '✏️ Manuel Giriş';
    showToast(manuelMod ? 'Manuel giriş modu aktif' : 'Sesli kayıt modu aktif', 'success');
});

// Sayfa yüklendiğinde protokol kontrolü
window.addEventListener('DOMContentLoaded', () => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    
    if (protocol !== 'https:' && hostname !== 'localhost' && hostname !== '127.0.0.1') {
        const warning = document.createElement('div');
        warning.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; background: #fc8181; color: white; padding: 15px; text-align: center; z-index: 9999; font-weight: bold;';
        warning.innerHTML = '⚠️ UYARI: Sesli kayıt için HTTPS bağlantısı gereklidir! Manuel giriş modunu kullanın.';
        document.body.prepend(warning);
        
        // Manuel modu otomatik aç
        setTimeout(() => {
            manuelBtn.click();
        }, 1000);
    }
});
