// Charts for PKBM Pulau Tiga Website

let genderChart = null;
let nilaiChart = null;
let keuanganChart = null;

function initCharts() {
    initGenderChart();
    initNilaiChart();
    initKeuanganChart();
}

function initGenderChart() {
    const ctx = document.getElementById('genderChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (genderChart) {
        genderChart.destroy();
    }
    
    // Calculate gender distribution
    const lakiLaki = window.PKBM.siswaData.filter(s => s.jenisKelamin === 'Laki-laki').length;
    const perempuan = window.PKBM.siswaData.filter(s => s.jenisKelamin === 'Perempuan').length;
    
    genderChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Laki-laki', 'Perempuan'],
            datasets: [{
                data: [lakiLaki, perempuan],
                backgroundColor: [
                    'rgba(46, 139, 87, 0.8)',
                    'rgba(255, 165, 0, 0.8)'
                ],
                borderColor: [
                    'rgba(46, 139, 87, 1)',
                    'rgba(255, 165, 0, 1)'
                ],
                borderWidth: 2,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#F0F0F0',
                        font: {
                            family: 'Exo 2',
                            size: 12
                        },
                        padding: 20
                    }
                },
                title: {
                    display: true,
                    text: 'Distribusi Siswa Berdasarkan Jenis Kelamin',
                    color: '#F0F0F0',
                    font: {
                        family: 'Orbitron',
                        size: 16
                    },
                    padding: 20
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} siswa (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '60%',
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

function initNilaiChart() {
    const ctx = document.getElementById('nilaiChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (nilaiChart) {
        nilaiChart.destroy();
    }
    
    const siswaNames = window.PKBM.nilaiData.map(n => n.nama);
    const matematika = window.PKBM.nilaiData.map(n => n.matematika);
    const bahasaIndonesia = window.PKBM.nilaiData.map(n => n.bahasaIndonesia);
    const ipa = window.PKBM.nilaiData.map(n => n.ipa);
    const ips = window.PKBM.nilaiData.map(n => n.ips);
    
    nilaiChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: siswaNames,
            datasets: [
                {
                    label: 'Matematika',
                    data: matematika,
                    backgroundColor: 'rgba(46, 139, 87, 0.7)',
                    borderColor: 'rgba(46, 139, 87, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Bahasa Indonesia',
                    data: bahasaIndonesia,
                    backgroundColor: 'rgba(65, 105, 225, 0.7)',
                    borderColor: 'rgba(65, 105, 225, 1)',
                    borderWidth: 1
                },
                {
                    label: 'IPA',
                    data: ipa,
                    backgroundColor: 'rgba(255, 165, 0, 0.7)',
                    borderColor: 'rgba(255, 165, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: 'IPS',
                    data: ips,
                    backgroundColor: 'rgba(220, 20, 60, 0.7)',
                    borderColor: 'rgba(220, 20, 60, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#F0F0F0',
                        font: {
                            family: 'Exo 2',
                            size: 11
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Perbandingan Nilai Mata Pelajaran Utama',
                    color: '#F0F0F0',
                    font: {
                        family: 'Orbitron',
                        size: 16
                    },
                    padding: 20
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#F0F0F0',
                        font: {
                            family: 'Exo 2'
                        }
                    },
                    grid: {
                        color: 'rgba(240, 240, 240, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Nilai',
                        color: '#F0F0F0',
                        font: {
                            family: 'Exo 2'
                        }
                    }
                },
                x: {
                    ticks: {
                        color: '#F0F0F0',
                        font: {
                            family: 'Exo 2'
                        }
                    },
                    grid: {
                        color: 'rgba(240, 240, 240, 0.1)'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

function initKeuanganChart() {
    const ctx = document.getElementById('keuanganChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (keuanganChart) {
        keuanganChart.destroy();
    }
    
    // Calculate saldo over time
    const saldoData = calculateSaldoProgression();
    
    keuanganChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: saldoData.labels,
            datasets: [{
                label: 'Saldo (Rupiah)',
                data: saldoData.data,
                backgroundColor: 'rgba(46, 139, 87, 0.2)',
                borderColor: 'rgba(46, 139, 87, 1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: 'rgba(46, 139, 87, 1)',
                pointBorderColor: '#F0F0F0',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#F0F0F0',
                        font: {
                            family: 'Exo 2',
                            size: 11
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Perkembangan Saldo Keuangan PKBM',
                    color: '#F0F0F0',
                    font: {
                        family: 'Orbitron',
                        size: 16
                    },
                    padding: 20
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Saldo: Rp ${window.PKBM.formatRupiah(context.raw)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#F0F0F0',
                        font: {
                            family: 'Exo 2'
                        },
                        callback: function(value) {
                            return 'Rp ' + window.PKBM.formatRupiah(value);
                        }
                    },
                    grid: {
                        color: 'rgba(240, 240, 240, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Jumlah (Rupiah)',
                        color: '#F0F0F0',
                        font: {
                            family: 'Exo 2'
                        }
                    }
                },
                x: {
                    ticks: {
                        color: '#F0F0F0',
                        font: {
                            family: 'Exo 2'
                        }
                    },
                    grid: {
                        color: 'rgba(240, 240, 240, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Bulan',
                        color: '#F0F0F0',
                        font: {
                            family: 'Exo 2'
                        }
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

function calculateSaldoProgression() {
    const pemasukan = window.PKBM.keuanganData.pemasukan;
    const pengeluaran = window.PKBM.keuanganData.pengeluaran;
    
    // Combine all transactions and sort by date
    const allTransactions = [
        ...pemasukan.map(p => ({ ...p, type: 'pemasukan' })),
        ...pengeluaran.map(p => ({ ...p, type: 'pengeluaran' }))
    ].sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
    
    let saldo = 0;
    const saldoData = {
        labels: [],
        data: []
    };
    
    allTransactions.forEach(transaction => {
        if (transaction.type === 'pemasukan') {
            saldo += transaction.jumlah;
        } else {
            saldo -= transaction.jumlah;
        }
        
        saldoData.labels.push(transaction.tanggal);
        saldoData.data.push(saldo);
    });
    
    return saldoData;
}

function updateCharts() {
    if (genderChart) initGenderChart();
    if (nilaiChart) initNilaiChart();
    if (keuanganChart) initKeuanganChart();
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts with a small delay to ensure DOM is fully rendered
    setTimeout(initCharts, 500);
});

// Reinitialize charts when window is resized
window.addEventListener('resize', function() {
    if (genderChart || nilaiChart || keuanganChart) {
        setTimeout(updateCharts, 250);
    }
});

// Export for global use
window.initCharts = initCharts;
window.updateCharts = updateCharts;