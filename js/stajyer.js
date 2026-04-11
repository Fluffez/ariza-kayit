// Sesli Kayıt Sistemi
let recognition;
let isRecording = false;
let fullTranscript = '';

// Web Speech API kontrolü
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'tr-TR';
    recognition.continuous = true;
    recognition.interimResults = true;
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
    
    isRecording = true;
    fullTranscript = '';
    transcript.textContent = '';
    
    voiceBtn.textContent = 'Kaydı Durdur';
    voiceBtn.classList.add('recording');
    voiceIcon.classList.add('recording');
    voiceStatus.textContent = 'Dinliyorum...';
    
    recognition.start();
}

function stopRecording() {
    if (!recognition) return;
    
    isRecording = false;
    recognition.stop();
    
    voiceBtn.textContent = 'Sesli Kayıt Başlat';
    voiceBtn.classList.remove('recording');
    voiceIcon.classList.remove('recording');
    voiceStatus.textContent = 'Kayıt Tamamlandı';
    
    // Metni işle
    if (fullTranscript) {
        processTranscript(fullTranscript);
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
    stopRecording();
    showToast('Ses tanıma hatası: ' + event.error, 'error');
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
