# Quick Start Guide

## 🚀 Mulai Cepat

### Opsi 1: Run Locally (Tanpa Database)

```bash
# 1. Clone atau buka folder project
cd keuangan

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Buka browser
# http://localhost:3000
```

**Demo Akun:**
- Username: `wahyu` | Password: `wahyu123`
- Username: `nurma` | Password: `nurma123`

**Catatan:** Data akan hilang saat server restart (karena belum ada database)

---

### Opsi 2: Deploy ke Vercel (Recommended)

#### Step 1: Push ke GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/keuangan-app.git
git branch -M main
git push -u origin main
```

#### Step 2: Buat Project di Vercel
1. Buka [vercel.com](https://vercel.com)
2. Klik "Add New" → "Project"
3. Import repository `keuangan-app`
4. Klik "Import"

#### Step 3: Setup Vercel KV Database
1. Di project, pilih "Storage" → "Create Database" → "KV"
2. Pilih region (misal: Singapore)
3. Klik "Create"
4. Vercel auto-generate environment variables

#### Step 4: Deploy
- Klik "Deploy"
- Tunggu hingga selesai
- Buka URL yang diberikan

---

## 📋 Fitur Utama

### 1. Login
- 2 akun terpisah (Wahyu & Nurma)
- Data terpisah per akun

### 2. Transaksi
- Tambah pemasukan/pengeluaran
- Pilih bank (tradisional/digital)
- Kategori & deskripsi
- Tanggal transaksi

### 3. Aset
- Daftar aset per bank
- Tambah/hapus aset
- Total aset otomatis

### 4. Laporan
- Harian
- Mingguan
- Bulanan
- Tahunan

---

## 🏦 Bank yang Tersedia

**Tradisional:** BCA, Mandiri, BNI, BRI, CIMB Niaga

**Digital:** Jenius, Bank Jago, Neo Bank, OVO, DANA, GoPay

---

## 🔧 Troubleshooting

### Error: "Cannot find module"
```bash
npm install
```

### Port 3000 sudah digunakan
```bash
npm run dev -- -p 3001
```

### Data tidak tersimpan
- Pastikan Vercel KV database sudah aktif
- Check environment variables di Vercel dashboard

---

## 📁 Struktur Project

```
keuangan/
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── dashboard/    # Main app
│   │   └── page.tsx      # Login page
│   ├── components/       # React components
│   └── lib/              # Utilities
├── README.md
├── DEPLOYMENT.md
└── package.json
```

---

## 🎯 Next Steps

1. **Customize:** Edit warna, logo, nama di `src/app/page.tsx`
2. **Add Users:** Edit `src/lib/auth.ts` untuk tambah akun
3. **Add Banks:** Edit `src/lib/banks.ts` untuk tambah bank
4. **Deploy:** Follow DEPLOYMENT.md untuk deploy ke Vercel

---

## 📞 Support

Jika ada error:
1. Check console browser (F12)
2. Check terminal logs
3. Baca error message dengan teliti
4. Cek DEPLOYMENT.md untuk troubleshooting

---

**Happy tracking! 💰**
