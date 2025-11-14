// Modal Management for PKBM Pulau Tiga Website

// Modal functions
function showSiswaDetail(siswa) {
    const modal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    modalBody.innerHTML = `
        <div class="modal-profile">
            <div class="modal-profile-img">
                <img src="${siswa.foto}" alt="${siswa.nama}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="photo-placeholder" style="display: none;"><i class="fas fa-user-graduate"></i></div>
            </div>
            <h3>${siswa.biodata.namaLengkap}</h3>
            <div class="position">Siswa PKBM Pulau Tiga</div>
        </div>
        
        <div class="modal-details">
            <h4>Biodata Lengkap</h4>
            <p><strong>Program:</strong> ${siswa.program}</p>
            <p><strong>Jenis Kelamin:</strong> ${siswa.jenisKelamin}</p>
            <p><strong>Umur:</strong> ${siswa.umur} tahun</p>
            <p><strong>Tempat Lahir:</strong> ${siswa.biodata.tempatLahir}</p>
            <p><strong>Tanggal Lahir:</strong> ${siswa.biodata.tanggalLahir}</p>
            <p><strong>Alamat:</strong> ${siswa.biodata.alamat}</p>
            <p><strong>No. Telepon:</strong> ${siswa.biodata.noTelepon}</p>
            <p><strong>Pendidikan Terakhir:</strong> ${siswa.biodata.pendidikan}</p>
            <p><strong>Tanggal Bergabung:</strong> ${siswa.tanggalBergabung}</p>
        </div>
    `;
    
    showModal();
}

function showNilaiDetail(nilai, siswa) {
    const modal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    const rataRata = calculateRataRata(nilai);
    
    modalBody.innerHTML = `
        <div class="modal-profile">
            <div class="modal-profile-img">
                <img src="${siswa.foto}" alt="${siswa.nama}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="photo-placeholder" style="display: none;"><i class="fas fa-user-graduate"></i></div>
            </div>
            <h3>${siswa.nama}</h3>
            <div class="position">Laporan Nilai Akademik</div>
        </div>
        
        <div class="modal-details">
            <h4>Detail Nilai Mata Pelajaran</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="background: rgba(46, 139, 87, 0.1); padding: 1rem; border-radius: 0.5rem;">
                    <strong>Matematika</strong><br>
                    <span style="font-size: 1.2rem; color: var(--primary);">${nilai.matematika}</span>
                </div>
                <div style="background: rgba(46, 139, 87, 0.1); padding: 1rem; border-radius: 0.5rem;">
                    <strong>Bahasa Indonesia</strong><br>
                    <span style="font-size: 1.2rem; color: var(--primary);">${nilai.bahasaIndonesia}</span>
                </div>
                <div style="background: rgba(46, 139, 87, 0.1); padding: 1rem; border-radius: 0.5rem;">
                    <strong>IPA</strong><br>
                    <span style="font-size: 1.2rem; color: var(--primary);">${nilai.ipa}</span>
                </div>
                <div style="background: rgba(46, 139, 87, 0.1); padding: 1rem; border-radius: 0.5rem;">
                    <strong>IPS</strong><br>
                    <span style="font-size: 1.2rem; color: var(--primary);">${nilai.ips}</span>
                </div>
                <div style="background: rgba(46, 139, 87, 0.1); padding: 1rem; border-radius: 0.5rem;">
                    <strong>PKN</strong><br>
                    <span style="font-size: 1.2rem; color: var(--primary);">${nilai.pkn}</span>
                </div>
                <div style="background: rgba(46, 139, 87, 0.1); padding: 1rem; border-radius: 0.5rem;">
                    <strong>SBdP</strong><br>
                    <span style="font-size: 1.2rem; color: var(--primary);">${nilai.sbdp}</span>
                </div>
                <div style="background: rgba(46, 139, 87, 0.1); padding: 1rem; border-radius: 0.5rem;">
                    <strong>PJOK</strong><br>
                    <span style="font-size: 1.2rem; color: var(--primary);">${nilai.pjok}</span>
                </div>
            </div>
            
            <div style="background: var(--primary); color: white; padding: 1rem; border-radius: 0.5rem; text-align: center;">
                <strong>Nilai Rata-rata: ${rataRata}</strong>
            </div>
            
            <div style="margin-top: 1.5rem;">
                <h4>Keterangan</h4>
                <p>Nilai berdasarkan evaluasi pembelajaran semester genap 2023</p>
            </div>
        </div>
    `;
    
    showModal();
}

function showPengajarDetail(pengajar) {
    const modal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    modalBody.innerHTML = `
        <div class="modal-profile">
            <div class="modal-profile-img">
                <img src="${pengajar.foto}" alt="${pengajar.nama}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="photo-placeholder" style="display: none;"><i class="fas fa-chalkboard-teacher"></i></div>
            </div>
            <h3>${pengajar.nama}</h3>
            <div class="position">${pengajar.jabatan}</div>
        </div>
        
        <div class="modal-details">
            <h4>Biodata Pengajar</h4>
            <p><strong>Tempat Lahir:</strong> ${pengajar.biodata.tempatLahir}</p>
            <p><strong>Tanggal Lahir:</strong> ${pengajar.biodata.tanggalLahir}</p>
            <p><strong>Pendidikan:</strong> ${pengajar.biodata.pendidikan}</p>
            <p><strong>Pengalaman:</strong> ${pengajar.biodata.pengalaman}</p>
            <p><strong>No. Telepon:</strong> ${pengajar.biodata.noTelepon}</p>
            <p><strong>Email:</strong> ${pengajar.biodata.email}</p>
        </div>
    `;
    
    showModal();
}

function showModal() {
    const modal = document.getElementById('detailModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add event listener for close button
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.onclick = closeModal;
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
}

function closeModal() {
    const modal = document.getElementById('detailModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Utility functions from main.js
function calculateRataRata(nilai) {
    const total = nilai.matematika + nilai.bahasaIndonesia + nilai.ipa + nilai.ips + 
                 nilai.pkn + nilai.sbdp + nilai.pjok;
    return (total / 7).toFixed(2);
}

// Initialize modal functionality for all pages
function initializeModalEvents() {
    // Detail buttons untuk organization members
    document.querySelectorAll('.btn-detail').forEach(button => {
        button.addEventListener('click', function() {
            const element = this.closest('[data-id]');
            if (!element) return;
            
            const memberId = element.getAttribute('data-id');
            const memberData = window.PKBM.pengajarData[memberId];
            
            if (memberData) {
                showPengajarDetail(memberData);
            } else {
                console.warn('Data tidak ditemukan untuk ID:', memberId);
            }
        });
    });

    // Event listener untuk tabel siswa (jika ada di halaman)
    document.querySelectorAll('#data-siswa tbody tr').forEach(row => {
        row.addEventListener('click', function() {
            const siswaId = this.getAttribute('data-id');
            const siswa = window.PKBM.siswaData.find(s => s.id == siswaId);
            if (siswa) {
                showSiswaDetail(siswa);
            }
        });
    });

    // Event listener untuk tabel nilai (jika ada di halaman)
    document.querySelectorAll('#nilaiTable tbody tr').forEach(row => {
        row.addEventListener('click', function() {
            const nilaiId = this.getAttribute('data-id');
            const nilai = window.PKBM.nilaiData.find(n => n.id == nilaiId);
            const siswa = window.PKBM.siswaData.find(s => s.id == nilaiId);
            if (nilai && siswa) {
                showNilaiDetail(nilai, siswa);
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Modal close events (tetap seperti sebelumnya)
    const modal = document.getElementById('detailModal');
    if (modal) {
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }

    // Initialize modal events untuk halaman saat ini
    initializeModalEvents();
});

// Export functions for global use
window.showSiswaDetail = showSiswaDetail;
window.showNilaiDetail = showNilaiDetail;
window.showPengajarDetail = showPengajarDetail;
window.showModal = showModal;
window.closeModal = closeModal;
window.initializeModalEvents = initializeModalEvents;