# UI Chat Bot
![UI](https://github.com/fikriaf/faftech-ai/blob/main/wfwrw.PNG)
# Faftech-AI

Faftech-AI adalah antarmuka web interaktif berbasis HTML, CSS, dan JavaScript yang menggunakan Bootstrap untuk tata letak responsif, Prism.js untuk penyorotan sintaksis kode, serta berbagai fitur interaktif lainnya. Proyek ini dirancang untuk menyediakan UI yang modern dan intuitif.

## Fitur Utama

1. **Dukungan Multi-AI**: Antarmuka dengan dua panel interaksi untuk berkomunikasi dengan dua model AI secara bersamaan.
2. **Penyorotan Kode**: Menggunakan Prism.js untuk penyorotan sintaksis pada blok kode.
3. **Interaksi Fleksibel**:
   - Tombol untuk menyalin kode ke clipboard dengan umpan balik visual.
   - Input file yang terintegrasi dengan dua tombol kontrol.
   - Dukungan pintasan keyboard untuk pengiriman data.
4. **Tata Letak Responsif**: Menggunakan Bootstrap 5.3.3 untuk memastikan kompatibilitas di berbagai perangkat.
5. **Offcanvas Menu**: Untuk pengaturan tambahan seperti reset riwayat.

## Teknologi yang Digunakan

- **HTML5**: Struktur dasar halaman.
- **CSS3**: Gaya tambahan untuk mempercantik antarmuka.
- **Bootstrap 5.3.3**: Membuat tata letak responsif.
- **Prism.js**: Penyorotan sintaksis kode.
- **JavaScript**: Logika interaktif, seperti clipboard, input file, dan tombol dinamis.
- **Font Awesome & Bootstrap Icons**: Ikon untuk elemen UI.

## Cara Menggunakan

1. **Clone Repository**:
   ```bash
   git clone https://github.com/fikriarmiafahmi/faftech-ai.git
   cd faftech-ai
   ```

2. **Jalankan di Browser**:
- Pastikan Anda memiliki server lokal seperti Laragon atau XAMPP.
- Tempatkan folder proyek di direktori server Anda (htdocs atau setara).
- Akses halaman melalui browser, misalnya http://localhost/faftech-ai.

3. **Fitur Input dan Interaksi**:
- Masukkan teks ke dalam input textarea.
- Gunakan pintasan berikut untuk mengirim:
- Kirim ke kedua AI: CTRL + ENTER
- Kirim ke kiri: CTRL + ALT + L
- Kirim ke kanan: CTRL + ALT + R
- Gunakan tombol folder atau plus untuk mengunggah file.

4. **Reset Riwayat**:
- Buka menu offcanvas menggunakan ikon grid.
- Klik tombol Reset History.

## Struktur Proyek
├── index.html       # Halaman utama
<br>
├── style.css        # Gaya kustom
<br>
├── script.js        # Logika interaktif
<br>
├── prismjs/
<br>
│   ├── prism.css    # Gaya penyorotan sintaksis
<br>
│   └── prism.js     # Script penyorotan sintaksis
<br>
├── README.md        # Dokumentasi proyek
