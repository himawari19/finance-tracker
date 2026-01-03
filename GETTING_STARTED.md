# 🎯 Getting Started - Pencatat Keuangan

Selamat datang! Panduan ini akan membantu Anda memulai dengan Pencatat Keuangan.

---

## ⚡ 5 Menit Setup

### Step 1: Clone/Buka Project
```bash
cd keuangan
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```

### Step 4: Buka Browser
```
http://localhost:3000
```

### Step 5: Login
- Username: `wahyu` | Password: `wahyu123`
- atau
- Username: `nurma` | Password: `nurma123`

**Selesai! 🎉**

---

## 📚 Dokumentasi

Pilih dokumentasi sesuai kebutuhan:

### 🚀 Ingin Cepat Mencoba?
→ Anda sudah di sini! Lanjut ke step di atas.

### 📖 Ingin Tahu Lebih Detail?
→ Baca [DOCS_INDEX.md](./DOCS_INDEX.md) untuk panduan lengkap

### 🌐 Ingin Deploy ke Vercel?
→ Baca [DEPLOYMENT.md](./DEPLOYMENT.md)

### 🔧 Ingin Customize?
→ Baca [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)

---

## 🎯 Apa yang Bisa Dilakukan?

### 1. Login
- 2 akun terpisah (Wahyu & Nurma)
- Data terpisah per akun

### 2. Catat Transaksi
- Pemasukan/Pengeluaran
- Pilih bank (11 pilihan)
- Kategori & deskripsi
- Tanggal transaksi

### 3. Kelola Aset
- Daftar aset per bank
- Tambah/hapus aset
- Total aset otomatis

### 4. Lihat Laporan
- Harian, Mingguan, Bulanan, Tahunan
- Statistik Pemasukan/Pengeluaran/Saldo

---

## 🏦 Bank yang Tersedia

**Tradisional:** BCA, Mandiri, BNI, BRI, CIMB Niaga

**Digital:** Jenius, Bank Jago, Neo Bank, OVO, DANA, GoPay

---

## 🛠️ Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Vercel KV (Redis)
- date-fns

---

## 📁 Project Structure

```
keuangan/
├── src/
│   ├── app/              # Pages & API routes
│   ├── components/       # React components
│   └── lib/              # Utilities & database
├── public/               # Static files
├── package.json          # Dependencies
└── [Documentation files]
```

---

## 🚀 Next Steps

### Opsi 1: Local Development
- Jalankan `npm run dev`
- Test semua fitur
- Customize sesuai kebutuhan

### Opsi 2: Deploy ke Vercel
1. Push ke GitHub
2. Import di Vercel
3. Setup Vercel KV database
4. Deploy!

Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk detail.

---

## 🐛 Troubleshooting

### Error: "Cannot find module"
```bash
npm install
```

### Port 3000 sudah digunakan
```bash
npm run dev -- -p 3001
```

### Lainnya?
Baca [QUICKSTART.md](./QUICKSTART.md) atau [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)

---

## 📞 Bantuan

- 📖 Dokumentasi: [DOCS_INDEX.md](./DOCS_INDEX.md)
- 🚀 Quick Start: [QUICKSTART.md](./QUICKSTART.md)
- 🌐 Deployment: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 📋 Setup: [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)

---

## ✅ Checklist

- [ ] Project sudah di-clone/dibuka
- [ ] Dependencies sudah di-install
- [ ] Development server sudah running
- [ ] Bisa login dengan akun demo
- [ ] Bisa tambah transaksi
- [ ] Bisa tambah aset
- [ ] Bisa lihat laporan

---

## 🎉 Selamat!

Anda sudah siap menggunakan Pencatat Keuangan!

**Mulai tracking keuangan Anda sekarang! 💰**

---

**Butuh bantuan?** Baca dokumentasi di atas atau check [DOCS_INDEX.md](./DOCS_INDEX.md)

**Siap deploy?** Ikuti [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**Version:** 1.0.0  
**Status:** Ready to Use ✅
