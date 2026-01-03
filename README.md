# Pencatat Keuangan

Website pencatat keuangan dengan fitur multi-akun, laporan berkala, dan manajemen aset.

## Fitur

- ✅ Login 2 akun (Wahyu & Nurma)
- ✅ Pencatatan transaksi (Pemasukan/Pengeluaran)
- ✅ Bank Indonesia (Tradisional & Digital)
- ✅ Laporan Harian, Mingguan, Bulanan, Tahunan
- ✅ Manajemen Aset
- ✅ Data tersimpan di Vercel KV

## Demo Akun

- Username: `wahyu` | Password: `wahyu123`
- Username: `nurma` | Password: `nurma123`

## Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd keuangan
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Vercel KV Database

1. Buat akun di [Vercel](https://vercel.com)
2. Buat project baru atau gunakan project existing
3. Tambahkan Vercel KV database dari Integrations
4. Copy environment variables ke `.env.local`:
   ```
   KV_URL=
   KV_REST_API_URL=
   KV_REST_API_TOKEN=
   KV_REST_API_READ_ONLY_TOKEN=
   ```

### 4. Run Locally
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Deploy ke Vercel

### 1. Push ke GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy di Vercel
1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik "Add New" → "Project"
3. Import repository GitHub
4. Vercel akan auto-detect Next.js
5. Tambahkan environment variables dari Vercel KV
6. Klik "Deploy"

## Struktur Project

```
keuangan/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/login/
│   │   │   ├── transactions/
│   │   │   └── assets/
│   │   ├── dashboard/
│   │   └── page.tsx
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   ├── TransactionForm.tsx
│   │   └── AssetForm.tsx
│   └── lib/
│       ├── auth.ts
│       ├── banks.ts
│       ├── db.ts
│       └── reports.ts
├── .env.local
└── package.json
```

## Bank yang Tersedia

### Bank Tradisional
- BCA
- Mandiri
- BNI
- BRI
- CIMB Niaga

### Bank Digital
- Jenius
- Bank Jago
- Neo Bank
- OVO
- DANA
- GoPay

## Teknologi

- Next.js 15
- TypeScript
- Tailwind CSS
- Vercel KV (Redis)
- date-fns

## License

MIT
