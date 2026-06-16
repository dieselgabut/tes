const bookingForm = document.getElementById('bookingForm');
const ruteSelect = document.getElementById('rute');
const jumlahInput = document.getElementById('jumlah');
const totalTampilan = document.getElementById('totalTampilan');
const summaryContent = document.getElementById('summaryContent');

// Format Rupiah
const toRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
};

// Hitung Harga Otomatis Berdasarkan Rute
function hitungHarga() {
    const selectedOption = ruteSelect.options[ruteSelect.selectedIndex];
    const hargaSatuan = selectedOption.getAttribute('data-harga') || 0;
    const jumlah = jumlahInput.value || 0;
    
    const total = parseInt(hargaSatuan) * parseInt(jumlah);
    totalTampilan.value = toRupiah(total);
}

ruteSelect.addEventListener('change', hitungHarga);
jumlahInput.addEventListener('input', hitungHarga);

// Submit Form
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const jam = document.getElementById('jam').value;
    const metode = document.getElementById('metode').value;
    const total = totalTampilan.value;
    
    // Ambil Data Maskapai & Teks Rute
    const selectedOption = ruteSelect.options[ruteSelect.selectedIndex];
    const maskapai = selectedOption.getAttribute('data-maskapai');
    const rute = selectedOption.value;

    summaryContent.innerHTML = `
        <div class="summary-row"><span>Nama:</span> <strong>${nama}</strong></div>
        <div class="summary-row"><span>Maskapai:</span> <strong style="color:var(--primary)">${maskapai}</strong></div>
        <div class="summary-row"><span>Rute:</span> <strong>${rute}</strong></div>
        <div class="summary-row"><span>Jam Berangkat:</span> <strong>${jam}</strong></div>
        <div class="summary-row"><span>Metode Bayar:</span> <strong style="color:#27ae60">${metode}</strong></div>
        <div class="summary-row"><span>Jumlah:</span> <strong>${jumlahInput.value} Tiket</strong></div>
        <div class="summary-row" style="margin-top:15px; border-top: 2px solid #eee; padding-top:10px;">
            <span>TOTAL:</span> <strong style="color:#e67e22; font-size:20px;">${total}</strong>
        </div>
        <p style="text-align:center; color:green; font-size:11px; margin-top:10px;">✔ Pembayaran berhasil</p>
    `;

    alert("Pesanan Berhasil Dibuat!\nSilahkan selesaikan pembayaran melalui " + metode);
});