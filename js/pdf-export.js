// PDF Export functionality for PKBM Pulau Tiga Website

// Wait for jsPDF to load
let jsPDF;
if (typeof window.jspdf !== 'undefined') {
    jsPDF = window.jspdf.jsPDF;
}

function exportToPDF(type) {
    if (!jsPDF) {
        alert('PDF library belum terload. Silakan refresh halaman.');
        return;
    }

    switch(type) {
        case 'pemasukan':
            exportPemasukanPDF();
            break;
        case 'pengeluaran':
            exportPengeluaranPDF();
            break;
        case 'saldo':
            exportSaldoPDF();
            break;
        default:
            alert('Jenis ekspor tidak dikenali.');
    }
}

function exportPemasukanPDF() {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(46, 139, 87);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('LAPORAN PEMASUKAN', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text('PKBM PULAU TIGA - NAKAI DISTRIK PULAU TIGA', 105, 25, { align: 'center' });
    
    // Date
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    doc.setFontSize(10);
    doc.text(`Dicetak pada: ${dateStr}`, 105, 35, { align: 'center' });
    
    // Table data
    const tableData = window.PKBM.keuanganData.pemasukan.map(item => [
        item.tanggal,
        item.sumber,
        `Rp ${window.PKBM.formatRupiah(item.jumlah)}`,
        item.keterangan
    ]);
    
    // Add table
    doc.setTextColor(0, 0, 0);
    doc.autoTable({
        startY: 45,
        head: [['Tanggal', 'Sumber', 'Jumlah', 'Keterangan']],
        body: tableData,
        theme: 'grid',
        headStyles: {
            fillColor: [46, 139, 87],
            textColor: 255,
            fontStyle: 'bold'
        },
        styles: {
            fontSize: 9,
            cellPadding: 3
        },
        margin: { left: 10, right: 10 }
    });
    
    // Total
    const totalPemasukan = window.PKBM.keuanganData.pemasukan.reduce((sum, item) => sum + item.jumlah, 0);
    const finalY = doc.lastAutoTable.finalY + 10;
    
    doc.setFillColor(240, 240, 240);
    doc.rect(10, finalY, 190, 15, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`TOTAL PEMASUKAN: Rp ${window.PKBM.formatRupiah(totalPemasukan)}`, 105, finalY + 10, { align: 'center' });
    
    // Footer
    const footerY = 280;
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Dokumen ini dicetak secara otomatis dari Sistem Informasi PKBM Pulau Tiga', 105, footerY, { align: 'center' });
    
    // Save PDF
    doc.save(`Laporan_Pemasukan_PKBM_Pulau_Tiga_${formatDateForFile(now)}.pdf`);
}

function exportPengeluaranPDF() {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(46, 139, 87);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('LAPORAN PENGELUARAN', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text('PKBM PULAU TIGA - NAKAI DISTRIK PULAU TIGA', 105, 25, { align: 'center' });
    
    // Date
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    doc.setFontSize(10);
    doc.text(`Dicetak pada: ${dateStr}`, 105, 35, { align: 'center' });
    
    // Table data
    const tableData = window.PKBM.keuanganData.pengeluaran.map(item => [
        item.tanggal,
        item.item,
        item.kategori,
        `Rp ${window.PKBM.formatRupiah(item.jumlah)}`,
        item.keterangan
    ]);
    
    // Add table
    doc.setTextColor(0, 0, 0);
    doc.autoTable({
        startY: 45,
        head: [['Tanggal', 'Item', 'Kategori', 'Jumlah', 'Keterangan']],
        body: tableData,
        theme: 'grid',
        headStyles: {
            fillColor: [46, 139, 87],
            textColor: 255,
            fontStyle: 'bold'
        },
        styles: {
            fontSize: 8,
            cellPadding: 3
        },
        margin: { left: 10, right: 10 }
    });
    
    // Total
    const totalPengeluaran = window.PKBM.keuanganData.pengeluaran.reduce((sum, item) => sum + item.jumlah, 0);
    const finalY = doc.lastAutoTable.finalY + 10;
    
    doc.setFillColor(240, 240, 240);
    doc.rect(10, finalY, 190, 15, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`TOTAL PENGELUARAN: Rp ${window.PKBM.formatRupiah(totalPengeluaran)}`, 105, finalY + 10, { align: 'center' });
    
    // Footer
    const footerY = 280;
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Dokumen ini dicetak secara otomatis dari Sistem Informasi PKBM Pulau Tiga', 105, footerY, { align: 'center' });
    
    // Save PDF
    doc.save(`Laporan_Pengeluaran_PKBM_Pulau_Tiga_${formatDateForFile(now)}.pdf`);
}

function exportSaldoPDF() {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(46, 139, 87);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('LAPORAN SALDO KEUANGAN', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text('PKBM PULAU TIGA - NAKAI DISTRIK PULAU TIGA', 105, 25, { align: 'center' });
    
    // Date
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    doc.setFontSize(10);
    doc.text(`Dicetak pada: ${dateStr}`, 105, 35, { align: 'center' });
    
    // Calculate totals
    const totalPemasukan = window.PKBM.keuanganData.pemasukan.reduce((sum, item) => sum + item.jumlah, 0);
    const totalPengeluaran = window.PKBM.keuanganData.pengeluaran.reduce((sum, item) => sum + item.jumlah, 0);
    const saldoAkhir = totalPemasukan - totalPengeluaran;
    
    // Summary table
    const summaryData = [
        ['Total Pemasukan', `Rp ${window.PKBM.formatRupiah(totalPemasukan)}`],
        ['Total Pengeluaran', `Rp ${window.PKBM.formatRupiah(totalPengeluaran)}`],
        ['Saldo Akhir', `Rp ${window.PKBM.formatRupiah(saldoAkhir)}`]
    ];
    
    // Add summary table
    doc.setTextColor(0, 0, 0);
    doc.autoTable({
        startY: 50,
        head: [['Keterangan', 'Jumlah']],
        body: summaryData,
        theme: 'grid',
        headStyles: {
            fillColor: [46, 139, 87],
            textColor: 255,
            fontStyle: 'bold'
        },
        styles: {
            fontSize: 11,
            cellPadding: 5
        },
        margin: { left: 50, right: 50 }
    });
    
    // Pemasukan detail
    const pemasukanY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(14);
    doc.setTextColor(46, 139, 87);
    doc.text('DETAIL PEMASUKAN', 105, pemasukanY, { align: 'center' });
    
    const pemasukanData = window.PKBM.keuanganData.pemasukan.map(item => [
        item.tanggal,
        item.sumber,
        `Rp ${window.PKBM.formatRupiah(item.jumlah)}`,
        item.keterangan
    ]);
    
    doc.autoTable({
        startY: pemasukanY + 10,
        head: [['Tanggal', 'Sumber', 'Jumlah', 'Keterangan']],
        body: pemasukanData,
        theme: 'grid',
        headStyles: {
            fillColor: [100, 100, 100],
            textColor: 255,
            fontStyle: 'bold'
        },
        styles: {
            fontSize: 8,
            cellPadding: 3
        },
        margin: { left: 10, right: 10 }
    });
    
    // Pengeluaran detail (new page if needed)
    let pengeluaranY = doc.lastAutoTable.finalY + 20;
    
    // Check if we need a new page
    if (pengeluaranY > 250) {
        doc.addPage();
        pengeluaranY = 20;
    }
    
    doc.setFontSize(14);
    doc.setTextColor(46, 139, 87);
    doc.text('DETAIL PENGELUARAN', 105, pengeluaranY, { align: 'center' });
    
    const pengeluaranData = window.PKBM.keuanganData.pengeluaran.map(item => [
        item.tanggal,
        item.item,
        item.kategori,
        `Rp ${window.PKBM.formatRupiah(item.jumlah)}`,
        item.keterangan
    ]);
    
    doc.autoTable({
        startY: pengeluaranY + 10,
        head: [['Tanggal', 'Item', 'Kategori', 'Jumlah', 'Keterangan']],
        body: pengeluaranData,
        theme: 'grid',
        headStyles: {
            fillColor: [100, 100, 100],
            textColor: 255,
            fontStyle: 'bold'
        },
        styles: {
            fontSize: 7,
            cellPadding: 2
        },
        margin: { left: 10, right: 10 }
    });
    
    // Footer
    const footerY = 280;
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Dokumen ini dicetak secara otomatis dari Sistem Informasi PKBM Pulau Tiga', 105, footerY, { align: 'center' });
    
    // Save PDF
    doc.save(`Laporan_Saldo_Keuangan_PKBM_Pulau_Tiga_${formatDateForFile(now)}.pdf`);
}

function formatDateForFile(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}${month}${day}_${hours}${minutes}`;
}

// Initialize PDF export when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('PDF Export functionality loaded');
});

// Export for global use
window.exportToPDF = exportToPDF;