# 📱 Pencatat Keuangan - Setup Instructions

Website pencatat keuangan dengan 2 akun (Wahyu & Nurma), laporan berkala, dan manajemen aset.

---

## ✅ Apa yang Sudah Dibuat

- ✅ Next.js 15 + TypeScript + Tailwind CSS
- ✅ Authentication untuk 2 akun (Wahyu & Nurma)
- ✅ Pencatatan transaksi (Pemasukan/Pengeluaran)
- ✅ 11 Bank Indonesia (Tradisional & Digital)
- ✅ Laporan Harian, Mingguan, Bulanan, Tahunan
- ✅ Manajemen Aset
- ✅ Vercel KV Database (Redis)
- ✅ Middleware untuk proteksi route
- ✅ Responsive UI dengan Tailwind CSS

---

## 🚀 Cara Menjalankan

### Opsi A: Local Development (Tanpa Database)

```bash
cd keuangan
npm install
npm run dev
```

Buka: http://localhost:3000

**Demo Akun:**
- Username: `wahyu` | Password: `wahyu123`
- Username: `nurma` | Password: `nurma123`

**Catatan:** Data akan hilang saat server restart

---

### Opsi B: Deploy ke Vercel (Recommended)

#### 1. Push ke GitHub

```bash
cd keuangan
git remote add origin https://github.com/YOUR_USERNAME/keuangan-app.git
git branch -M main
git push -u origin main
```

#### 2. Buat Project di Vercel

1. Buka https://vercel.com
2. Login dengan GitHub
3. Klik "Add New" → "Project"
4. Pilih repository `keuangan-app`
5. Klik "Import"

#### 3. Setup Vercel KV Database

1. Di halaman project, pilih "Storage"
2. Klik "Create Database" → "KV"
3. Pilih region (misal: Singapore)
4. Klik "Create"
5. Vercel akan auto-generate environment variables

#### 4. Deploy

1. Klik "Deploy"
2. Tunggu hingga selesai (biasanya 2-3 menit)
3. Buka URL yang diberikan

**Selesai! 🎉**

---

## 📋 Fitur Aplikasi

### 1. Login
- 2 akun terpisah (Wahyu & Nurma)
- Data terpisah per akun
- Session 7 hari

### 2. Dashboard
- Total Aset
- Total Pemasukan
- Total Pengeluaran

### 3. Transaksi
- Tambah pemasukan/pengeluaran
- Pilih bank (11 pilihan)
- Kategori & deskripsi
- Tanggal transaksi
- Riwayat transaksi

### 4. Aset
- Daftar aset per bank
- Tambah aset baru
- Hapus aset
- Total aset otomatis

### 5. Laporan
- Laporan Harian
- Laporan Mingguan
- Laporan Bulanan
- Laporan Tahunan
- Statistik Pemasukan/Pengeluaran/Saldo

---

## 🏦 Bank yang Tersedia

### Bank Tradisional Indonesia
- BCA (Bank Central Asia)
- Mandiri (Bank Mandiri)
- BNI (Bank Negara Indonesia)
- BRI (Bank Rakyat Indonesia)
- CIMB Niaga

### Bank Digital Indonesia
- Jenius
- Bank Jago
- Neo Bank
- OVO
- DANA
- GoPay

---

## 📁 Struktur Project

```
keuangan/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/login/route.ts      # Login API
│   │   │   ├── transactions/route.ts    # Transaksi API
│   │   │   └── assets/route.ts          # Aset API
│   │   ├── dashboard/page.tsx           # Main dashboard
│   │   └── page.tsx                     # Login page
│   ├── components/
│   │   ├── LoginForm.tsx                # Form login
│   │   ├── TransactionForm.tsx          # Form transaksi
│   │   └── AssetForm.tsx                # Form aset
│   ├── lib/
│   │   ├── auth.ts                      # Authentication
│   │   ├── banks.ts                     # Daftar bank
│   │   ├── db.ts                        # Database functions
│   │   └── reports.ts                   # Report functions
│   └── middleware.ts                    # Route protection
├── .env.local                           # Environment variables
├── vercel.json                          # Vercel config
├── README.md                            # Documentation
├── QUICKSTART.md                        # Quick start
├── DEPLOYMENT.md                        # Deployment guide
└── package.json
```

---

## 🔐 Demo Akun

| Username | Password | Nama |
|----------|----------|------|
| wahyu | wahyu123 | Wahyu |
| nurma | nurma123 | Nurma |

---

## 🛠️ Teknologi yang Digunakan

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Vercel KV (Redis)
- **Authentication:** Custom (Cookie-based)
- **Date Handling:** date-fns
- **Deployment:** Vercel

---

## 📝 Customization

### Tambah Akun Baru

Edit `src/lib/auth.ts`:

```typescript
export const users = {
  wahyu: { ... },
  nurma: { ... },
  // Tambah di sini
  budi: {
    id: "3",
    name: "Budi",
    email: "budi@example.com",
    password: "budi123",
  },
};
```

### Tambah Bank Baru

Edit `src/lib/banks.ts`:

```typescript
export const banks = {
  // ... existing banks
  // Tambah di sini
  permata: { id: "permata", name: "Bank Permata", type: "traditional" },
};
```

### Ubah Warna/Logo

Edit `src/app/page.tsx` dan `src/app/dashboard/page.tsx`

---

## 🐛 Troubleshooting

### Error: "KV_URL is not defined"
- Pastikan environment variables sudah di-add di Vercel
- Redeploy project setelah add variables

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
- Check di Vercel dashboard → Storage → KV

### Login gagal
- Pastikan username dan password benar
- Clear cookies browser (Ctrl+Shift+Delete)
- Coba login ulang

---

## 📚 File Penting

- **README.md** - Dokumentasi lengkap
- **QUICKSTART.md** - Panduan cepat
- **DEPLOYMENT.md** - Panduan deployment
- **SETUP_INSTRUCTIONS.md** - File ini

---

## 🎯 Next Steps

1. **Local Testing:** Jalankan `npm run dev` dan test semua fitur
2. **Customize:** Sesuaikan warna, logo, nama aplikasi
3. **Add Users:** Tambah akun baru di `src/lib/auth.ts`
4. **Deploy:** Push ke GitHub dan deploy ke Vercel
5. **Monitor:** Check Vercel dashboard untuk logs dan analytics

---

## 📞 Support

Jika ada masalah:

1. **Check Console:** Buka F12 → Console untuk error messages
2. **Check Logs:** Di Vercel dashboard → Deployments → Logs
3. **Read Docs:** Baca README.md, DEPLOYMENT.md, QUICKSTART.md
4. **Check Code:** Lihat error message dan trace ke file yang bermasalah

---

## ✨ Fitur yang Bisa Ditambahkan di Masa Depan

- [ ] Export laporan ke PDF/Excel
- [ ] Chart/grafik untuk visualisasi
- [ ] Budget planning
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Mobile app
- [ ] Email notifications
- [ ] Data backup/restore

---

**Selamat menggunakan Pencatat Keuangan! 💰**

Dibuat dengan ❤️ menggunakan Next.js dan Vercel
