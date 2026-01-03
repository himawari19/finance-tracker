# 💰 Finance Tracker - Pencatat Keuangan

Website pencatat keuangan dengan fitur multi-akun, laporan berkala, dan manajemen aset. Dibangun dengan Next.js 15, TypeScript, dan Vercel KV.

![Status](https://img.shields.io/badge/status-ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

---

## ✨ Fitur Utama

- ✅ **Multi-Akun:** Login 2 akun terpisah (Wahyu & Nurma) dengan data terisolasi
- ✅ **Pencatatan Transaksi:** Catat pemasukan/pengeluaran dengan kategori & deskripsi
- ✅ **11 Bank Indonesia:** 5 bank tradisional + 6 bank digital
- ✅ **Laporan Berkala:** Harian, Mingguan, Bulanan, Tahunan
- ✅ **Manajemen Aset:** Daftar aset per bank dengan total otomatis
- ✅ **Dashboard:** Overview total aset, pemasukan, pengeluaran
- ✅ **Responsive Design:** Bekerja di desktop, tablet, mobile
- ✅ **Data Persisten:** Tersimpan di Vercel KV (Redis)

---

## 🚀 Quick Start

### Local Development (5 menit)

```bash
# 1. Clone repository
git clone https://github.com/himawari19/finance-tracker.git
cd finance-tracker

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Buka browser
# http://localhost:3000
```

### Demo Akun

| Username | Password | Nama |
|----------|----------|------|
| wahyu | wahyu123 | Wahyu |
| nurma | nurma123 | Nurma |

---

## 🏦 Bank yang Tersedia

### Bank Tradisional (5)
- BCA (Bank Central Asia)
- Mandiri (Bank Mandiri)
- BNI (Bank Negara Indonesia)
- BRI (Bank Rakyat Indonesia)
- CIMB Niaga

### Bank Digital (6)
- Jenius
- Bank Jago
- Neo Bank
- OVO
- DANA
- GoPay

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Vercel KV (Redis) |
| Authentication | Custom (Cookie-based) |
| Date Handling | date-fns |
| Deployment | Vercel |

---

## 📁 Project Structure

```
finance-tracker/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/login/route.ts
│   │   │   ├── transactions/route.ts
│   │   │   └── assets/route.ts
│   │   ├── dashboard/page.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   ├── TransactionForm.tsx
│   │   └── AssetForm.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── banks.ts
│   │   ├── db.ts
│   │   └── reports.ts
│   └── middleware.ts
├── public/
├── .env.local
├── vercel.json
├── package.json
└── tsconfig.json
```

---

## 📚 Dokumentasi

- **[00_START_HERE.md](./00_START_HERE.md)** - Entry point utama
- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Setup cepat
- **[SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)** - Panduan lengkap
- **[VERCEL_DEPLOY_STEPS.md](./VERCEL_DEPLOY_STEPS.md)** - Deploy ke Vercel
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment guide
- **[DOCS_INDEX.md](./DOCS_INDEX.md)** - Index dokumentasi

---

## 🌐 Deploy ke Vercel

### Step 1: Setup Vercel KV Database
1. Buka https://vercel.com
2. Buat project baru atau gunakan existing
3. Di tab "Storage", buat Vercel KV database
4. Copy environment variables

### Step 2: Add Environment Variables
```
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
```

### Step 3: Deploy
1. Vercel akan auto-detect Next.js
2. Klik "Deploy"
3. Tunggu hingga selesai

Lihat [VERCEL_DEPLOY_STEPS.md](./VERCEL_DEPLOY_STEPS.md) untuk detail lengkap.

---

## 🔧 Perintah Penting

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build untuk production
npm run build

# Check code quality
npm run lint
```

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Add new transaction

### Assets
- `GET /api/assets` - Get all assets
- `POST /api/assets` - Add new asset
- `DELETE /api/assets` - Delete asset

---

## 🔐 Security

- ✅ Cookie-based authentication
- ✅ Route protection dengan middleware
- ✅ User data isolation
- ✅ Session expiration (7 days)
- ✅ HTTPS on Vercel

---

## 🐛 Troubleshooting

### Error: "Cannot find module"
```bash
npm install
```

### Error: "Port 3000 sudah digunakan"
```bash
npm run dev -- -p 3001
```

### Error: "KV_URL is not defined"
- Pastikan environment variables sudah di-add di Vercel
- Redeploy project

### Data tidak tersimpan
- Pastikan Vercel KV database aktif
- Check di Vercel dashboard → Storage → KV

---

## 📈 Future Enhancements

- [ ] Export to PDF/Excel
- [ ] Charts & graphs
- [ ] Budget planning
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Mobile app
- [ ] Email notifications
- [ ] Data backup/restore

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
  permata: { id: "permata", name: "Bank Permata", type: "traditional" },
};
```

---

## 📞 Support

- 📖 Dokumentasi: [DOCS_INDEX.md](./DOCS_INDEX.md)
- 🚀 Quick Start: [GETTING_STARTED.md](./GETTING_STARTED.md)
- 🌐 Deploy: [VERCEL_DEPLOY_STEPS.md](./VERCEL_DEPLOY_STEPS.md)

---

## 📄 License

MIT License - Feel free to use and modify

---

## 👨‍💻 Author

Created with ❤️ using Next.js and Vercel

---

**Version:** 1.0.0  
**Status:** Ready for Production ✅  
**Last Updated:** January 4, 2026
