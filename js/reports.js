// Raporlama ve Grafikler

const reportBtn = document.getElementById('report-btn');
const reportModal = document.getElementById('report-modal');
const closeReportBtn = document.getElementById('close-report-btn');

let charts = {};

// Modal açma/kapama
if (reportBtn) {
    reportBtn.addEventListener('click', () => {
        reportModal.classList.add('active');
        generateReports();
    });
}

if (closeReportBtn) {
    closeReportBtn.addEventListener('click', () => {
        reportModal.classList.remove('active');
    });
}

reportModal?.addEventListener('click', (e) => {
    if (e.target === reportModal) {
        reportModal.classList.remove('active');
    }
});

// Tab değiştirme
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        // Tüm tabları gizle
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Seçili tabı göster
        btn.classList.add('active');
        document.getElementById(tabName + '-tab').classList.add('active');
        
        if (tabName === 'charts') {
            setTimeout(() => updateCharts(), 100);
        }
    });
});

function generateReports() {
    // allArizalar global değişkenini kullan
    const tumArizalar = window.allArizalar || [];
    
    if (!tumArizalar || tumArizalar.length === 0) {
        console.warn('Henüz arıza verisi yok');
        return;
    }
    
    generateCharts(tumArizalar);
    generateStats(tumArizalar);
    generateReminders(tumArizalar);
}

function generateCharts(tumArizalar) {
    // Müdürlük dağılımı
    const mudurlukData = {};
    tumArizalar.forEach(ariza => {
        mudurlukData[ariza.birim] = (mudurlukData[ariza.birim] || 0) + 1;
    });
    
    const topMudurlukler = Object.entries(mudurlukData)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    createBarChart('mudurluk-chart', 
        topMudurlukler.map(m => m[0]), 
        topMudurlukler.map(m => m[1]),
        'En Çok Arıza Veren Müdürlükler'
    );
    
    // Durum dağılımı
    const durumData = {
        'Beklemede': tumArizalar.filter(a => a.durum === 'beklemede').length,
        'Devam Ediyor': tumArizalar.filter(a => a.durum === 'devam-ediyor').length,
        'Tamamlandı': tumArizalar.filter(a => a.durum === 'tamamlandi').length
    };
    
    createPieChart('durum-chart', 
        Object.keys(durumData), 
        Object.values(durumData)
    );
    
    // Aylık trend
    const monthlyData = {};
    tumArizalar.forEach(ariza => {
        const date = new Date(ariza.timestamp);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
    });
    
    const sortedMonths = Object.keys(monthlyData).sort();
    const last6Months = sortedMonths.slice(-6);
    
    createLineChart('trend-chart',
        last6Months,
        last6Months.map(m => monthlyData[m]),
        'Son 6 Ay Arıza Trendi'
    );
    
    // Cihaz türü dağılımı
    const cihazData = {};
    tumArizalar.forEach(ariza => {
        cihazData[ariza.cihazTuru] = (cihazData[ariza.cihazTuru] || 0) + 1;
    });
    
    createDoughnutChart('cihaz-chart',
        Object.keys(cihazData),
        Object.values(cihazData)
    );
}

function createBarChart(canvasId, labels, data, title) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    if (charts[canvasId]) {
        charts[canvasId].destroy();
    }
    
    charts[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Arıza Sayısı',
                data: data,
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function createPieChart(canvasId, labels, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    if (charts[canvasId]) {
        charts[canvasId].destroy();
    }
    
    charts[canvasId] = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(252, 129, 129, 0.8)',
                    'rgba(246, 173, 85, 0.8)',
                    'rgba(72, 187, 120, 0.8)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

function createLineChart(canvasId, labels, data, title) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    if (charts[canvasId]) {
        charts[canvasId].destroy();
    }
    
    charts[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Arıza Sayısı',
                data: data,
                borderColor: 'rgba(102, 126, 234, 1)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function createDoughnutChart(canvasId, labels, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    if (charts[canvasId]) {
        charts[canvasId].destroy();
    }
    
    charts[canvasId] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(72, 187, 120, 0.8)',
                    'rgba(246, 173, 85, 0.8)',
                    'rgba(252, 129, 129, 0.8)',
                    'rgba(66, 153, 225, 0.8)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

function updateCharts() {
    Object.values(charts).forEach(chart => {
        if (chart) chart.resize();
    });
}

function generateStats(tumArizalar) {
    // Ortalama çözüm süresi
    const tamamlananlar = tumArizalar.filter(a => a.durum === 'tamamlandi');
    let toplamSure = 0;
    
    tamamlananlar.forEach(ariza => {
        // Basit hesaplama - gerçekte tamamlanma tarihi de kaydedilmeli
        toplamSure += 2; // Ortalama 2 gün varsayalım
    });
    
    const ortalamaSure = tamamlananlar.length > 0 ? 
        (toplamSure / tamamlananlar.length).toFixed(1) : 0;
    
    document.getElementById('avg-time').textContent = ortalamaSure + ' gün';
    
    // Bu hafta
    const bugun = new Date();
    const haftaBasi = new Date(bugun);
    haftaBasi.setDate(bugun.getDate() - bugun.getDay());
    
    const buHafta = tumArizalar.filter(a => 
        new Date(a.timestamp) >= haftaBasi
    ).length;
    
    document.getElementById('week-count').textContent = buHafta;
    
    // Bu ay
    const ayBasi = new Date(bugun.getFullYear(), bugun.getMonth(), 1);
    const buAy = tumArizalar.filter(a => 
        new Date(a.timestamp) >= ayBasi
    ).length;
    
    document.getElementById('month-count').textContent = buAy;
    
    // Tamamlanma oranı
    const tamamlanmaOrani = tumArizalar.length > 0 ?
        ((tamamlananlar.length / tumArizalar.length) * 100).toFixed(1) : 0;
    
    document.getElementById('completion-rate').textContent = tamamlanmaOrani + '%';
    
    // En çok arıza veren müdürlükler listesi
    const mudurlukData = {};
    tumArizalar.forEach(ariza => {
        mudurlukData[ariza.birim] = (mudurlukData[ariza.birim] || 0) + 1;
    });
    
    const topMudurlukler = Object.entries(mudurlukData)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    const topListHtml = `
        <h4>En Çok Arıza Veren Müdürlükler</h4>
        ${topMudurlukler.map((m, i) => `
            <div class="top-item">
                <span>${i + 1}. ${m[0]}</span>
                <span style="font-weight: 600; color: #667eea;">${m[1]} arıza</span>
            </div>
        `).join('')}
    `;
    
    document.getElementById('top-mudurlukler').innerHTML = topListHtml;
}

function generateReminders(tumArizalar) {
    const simdi = Date.now();
    const birGun = 24 * 60 * 60 * 1000;
    
    const bekleyenler = tumArizalar.filter(a => a.durum !== 'tamamlandi');
    
    const kritik = [];
    const uyari = [];
    
    bekleyenler.forEach(ariza => {
        const gecenSure = simdi - ariza.timestamp;
        const gunSayisi = Math.floor(gecenSure / birGun);
        
        if (gunSayisi >= 7) {
            kritik.push({ ...ariza, gunSayisi });
        } else if (gunSayisi >= 3) {
            uyari.push({ ...ariza, gunSayisi });
        }
    });
    
    let html = '';
    
    if (kritik.length === 0 && uyari.length === 0) {
        html = '<div class="empty-state"><p>Bekleyen arıza yok 🎉</p></div>';
    } else {
        if (kritik.length > 0) {
            html += '<h4 style="color: #fc8181; margin-bottom: 15px;">🚨 Kritik (7+ gün)</h4>';
            kritik.forEach(ariza => {
                html += `
                    <div class="reminder-item">
                        <h4>#${ariza.id.substring(0, 8)} - ${ariza.birim}</h4>
                        <p>${ariza.cihazTuru} - ${ariza.talepEden}</p>
                        <p style="color: #fc8181; font-weight: 600;">${ariza.gunSayisi} gündür bekliyor</p>
                    </div>
                `;
            });
        }
        
        if (uyari.length > 0) {
            html += '<h4 style="color: #f6ad55; margin: 20px 0 15px;">⚠️ Uyarı (3-6 gün)</h4>';
            uyari.forEach(ariza => {
                html += `
                    <div class="reminder-item warning">
                        <h4>#${ariza.id.substring(0, 8)} - ${ariza.birim}</h4>
                        <p>${ariza.cihazTuru} - ${ariza.talepEden}</p>
                        <p style="color: #f6ad55; font-weight: 600;">${ariza.gunSayisi} gündür bekliyor</p>
                    </div>
                `;
            });
        }
    }
    
    document.getElementById('reminders-list').innerHTML = html;
}
